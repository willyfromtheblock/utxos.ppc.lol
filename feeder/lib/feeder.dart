import 'dart:convert';

import 'package:dotenv/dotenv.dart';
import 'package:feeder/logger.dart';
import 'package:feeder/tools.dart';
import 'package:sentry/sentry.dart';
import 'package:surrealdb/surrealdb.dart';

void run(DotEnv env) async {
  try {
    //init surreal
    //open db connection
    final surrealClient = SurrealDB(
      '${env["SURREAL_HOST"]}:${env["SURREAL_PORT"]}/rpc',
      options: SurrealDBOptions(
        timeoutDuration: Duration(
          minutes: 2,
        ),
      ),
    );
    try {
      surrealClient.connect();
    } catch (e) {
      logger.info('Failed to connect to SurrealDB');
      logger.info(e.toString());
    }
    await surrealClient.wait();
    await surrealClient.use(
      env['SURREAL_NAME_SPACE']!,
      env['SURREAL_DB_NAME']!,
    );
    await surrealClient.signin(
      user: env["SURREAL_USER"]!,
      pass: env["SURREAL_PASS"]!,
    );
    logger.info('Connected to SurrealDB');
    //db initialization successful

    //get current height
    final currentHeight = parseQueryResults(
        await surrealClient.query("SELECT * FROM blockchain:height"))["height"];
    logger.info(currentHeight);

    //get utxo data (block:-2 means unspent, value > 0 filters out unspendable utxos)
    final dbRes = await surrealClient.query(
            r"SELECT block.height AS height, value FROM (SELECT block,value FROM utxo WHERE spent_on_block = 'block:-2' AND value > 0) FETCH block")
        as List<dynamic>;
    final results = dbRes[0]["result"];

    //parse the response into a list of ints
    List<int> heightList = [];
    List<({int height, double value})> valueList = [];
    for (final height in results) {
      heightList.add(height['height'] as int);
      valueList.add((
        height: height['height'] as int,
        value: height['value'] as double,
      ));
    }

    //sort the heightList
    heightList.sort();

    //parse utxo data into a map of height to count in 50k chunks
    Map<int, int> numberOfUnspentUtxos = {};

    for (int i = 0; i <= currentHeight; i += 50000) {
      heightList.where((element) => element <= i).forEach((element) {
        numberOfUnspentUtxos[i] =
            numberOfUnspentUtxos[i] == null ? 1 : numberOfUnspentUtxos[i]! + 1;
      });
    }

    //also add currentHeight data point
    heightList.where((element) => element <= currentHeight).forEach((element) {
      numberOfUnspentUtxos[currentHeight] =
          numberOfUnspentUtxos[currentHeight] == null
              ? 1
              : numberOfUnspentUtxos[currentHeight]! + 1;
    });

    //parse utxo data into a map of height to count in 50k chunks
    Map<int, double> commulativeValueOfUtxos = {};

    for (int i = 0; i <= currentHeight; i += 50000) {
      valueList.where((element) => element.height <= i).forEach((element) {
        commulativeValueOfUtxos[i] = commulativeValueOfUtxos[i] == null
            ? element.value
            : commulativeValueOfUtxos[i]! + element.value;
      });
    }

    //also add currentHeight data point
    valueList
        .where((element) => element.height <= currentHeight)
        .forEach((element) {
      commulativeValueOfUtxos[currentHeight] =
          commulativeValueOfUtxos[currentHeight] == null
              ? element.value
              : commulativeValueOfUtxos[currentHeight]! + element.value;
    });

    Map<int, double> diffValueOfUtxos = {};
    int? prevKey;
    for (final slice in commulativeValueOfUtxos.entries) {
      if (prevKey != null) {
        diffValueOfUtxos[slice.key] =
            slice.value - commulativeValueOfUtxos[prevKey]!;
      } else {
        diffValueOfUtxos[slice.key] = slice.value;
      }
      prevKey = slice.key;
    }

    //serialize numberOfUnspentUtxosList for upload
    final numberOfUnspentUtxosList = serializeData(numberOfUnspentUtxos);

    //serialize commulativeValueOfUtxosList for upload
    final commulativeValueOfUtxosList = serializeData(commulativeValueOfUtxos);

    //serialize diffValueOfUtxos for upload
    final diffValueOfUtxosList = serializeData(diffValueOfUtxos);

    //upload all the data to S3
    await uploadToS3(
      data: jsonEncode(numberOfUnspentUtxosList),
      env: env,
      fileName: 'nOfUtxos.json',
    );
    await uploadToS3(
      data: jsonEncode(commulativeValueOfUtxosList),
      env: env,
      fileName: 'valuesOfUtxos.json',
    );
    await uploadToS3(
      data: jsonEncode(diffValueOfUtxosList),
      env: env,
      fileName: 'diffValueOfUtxos.json',
    );

    //close db
    surrealClient.close();
    logger.info('DB connection closed');
  } catch (e, stackTrace) {
    logger.severe('Error: $e');
    Sentry.captureException(e, stackTrace: stackTrace);
  }
}
