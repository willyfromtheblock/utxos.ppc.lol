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
      //validate the height and value
      if (height['height'] == null || height['value'] == null) {
        logger.warning(
          'Invalid height or value, skipping $height',
        ); // values manually checked in surrealdb, no idea why they are RANDOMLY null.. they are stored correctly.
        continue;
      }

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

    //start from the chain tip, move down 50k blocks, and read up
    if (currentHeight > 50000) {
      for (int i = currentHeight - 50000; i >= 0; i -= 50000) {
        heightList.where((element) => element >= i).forEach((element) {
          numberOfUnspentUtxos[i] = numberOfUnspentUtxos[i] == null
              ? 1
              : numberOfUnspentUtxos[i]! + 1;
        });
      }
    }

    //also add total chain data point and store it at index 0
    heightList.where((element) => element <= 0).forEach((element) {
      numberOfUnspentUtxos[0] =
          numberOfUnspentUtxos[0] == null ? 1 : numberOfUnspentUtxos[0]! + 1;
    });

    //parse utxo data into a map of height to count in 50k chunks
    Map<int, double> commulativeValueOfUtxos = {};

    //start from the chain tip, move down 50k blocks, and read up
    if (currentHeight > 50000) {
      for (int i = currentHeight - 50000; i >= 0; i -= 50000) {
        valueList.where((element) => element.height >= i).forEach((element) {
          commulativeValueOfUtxos[i] = commulativeValueOfUtxos[i] == null
              ? element.value
              : commulativeValueOfUtxos[i]! + element.value;
        });
      }
    }

    //also add total chain data point and store it at index 0
    valueList.where((element) => element.height >= 0).forEach((element) {
      commulativeValueOfUtxos[0] = commulativeValueOfUtxos[0] == null
          ? element.value
          : commulativeValueOfUtxos[0]! + element.value;
    });

    //Differential values are the age in blocks. Index backwards from currentHeight.
    Map<int, int> diffNumberOfUtxos = {};
    int? prevKeyDiff;
    for (final slice in numberOfUnspentUtxos.entries) {
      if (prevKeyDiff != null) {
        diffNumberOfUtxos[currentHeight - slice.key] =
            slice.value - numberOfUnspentUtxos[prevKeyDiff]!;
      } else {
        diffNumberOfUtxos[currentHeight - slice.key] = slice.value;
      }
      prevKeyDiff = slice.key;
    }

    //Differential values are the age in blocks. Index backwards from currentHeight.
    Map<int, double> diffValueOfUtxos = {};
    int? prevKey;
    for (final slice in commulativeValueOfUtxos.entries) {
      if (prevKey != null) {
        diffValueOfUtxos[currentHeight - slice.key] =
            slice.value - commulativeValueOfUtxos[prevKey]!;
      } else {
        diffValueOfUtxos[currentHeight - slice.key] = slice.value;
      }
      prevKey = slice.key;
    }

    //serialize numberOfUnspentUtxosList for upload
    final numberOfUnspentUtxosList = serializeData(numberOfUnspentUtxos);

    //serialize commulativeValueOfUtxosList for upload
    final commulativeValueOfUtxosList = serializeData(commulativeValueOfUtxos);

    //serialize diffValueOfUtxos for upload
    final diffNumberOfUtxosList = serializeData(diffNumberOfUtxos);

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
      data: jsonEncode(diffNumberOfUtxosList),
      env: env,
      fileName: 'diffValueOfUtxos.json',
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
