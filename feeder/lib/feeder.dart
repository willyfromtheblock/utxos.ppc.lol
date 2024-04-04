import 'dart:convert';

import 'package:dotenv/dotenv.dart';
import 'package:feeder/tools.dart';
import 'package:simple_logger/simple_logger.dart';
import 'package:surrealdb/surrealdb.dart';

final logger = SimpleLogger();

void run(DotEnv env) async {
  //init surreal
  //open db connection
  final surrealClient = SurrealDB(
    '${env["SURREAL_HOST"]}:${env["SURREAL_PORT"]}/rpc',
    options: SurrealDBOptions(
      timeoutDuration: Duration(
        minutes: 1,
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

  //get utxo data (block:-2 means unspent, value > 0 filters out unspendable utxos)
  final res = await surrealClient.query(
          r"SELECT block.height AS height FROM (SELECT block FROM utxo WHERE spent_on_block = 'block:-2' AND value > 0) FETCH block")
      as List<dynamic>;
  final heights = res[0]["result"];

  //parse the response into a list of ints
  List<int> heightList = [];
  for (final height in heights) {
    heightList.add(height['height'] as int);
  }

  //sort the list
  heightList.sort();

  //parse utxo data into a map of height to count in 50k chunks
  Map<int, int> unspentUtxos = {};

  for (int i = 0; i <= currentHeight; i += 50000) {
    heightList.where((element) => element <= i).forEach((element) {
      unspentUtxos[i] = unspentUtxos[i] == null ? 1 : unspentUtxos[i]! + 1;
    });
  }

  //also add currentHeight data point
  heightList.where((element) => element <= currentHeight).forEach((element) {
    unspentUtxos[currentHeight] = unspentUtxos[currentHeight] == null
        ? 1
        : unspentUtxos[currentHeight]! + 1;
  });

  //write aths to aths.json
  final unspentUtxosList = unspentUtxos.entries
      .map((entry) => {'height': entry.key, 'count': entry.value})
      .toList();

  //read the existing file
  await uploadToS3(
    data: jsonEncode(unspentUtxosList),
    env: env,
    fileName: 'utxos.json',
  );

  //close db
  surrealClient.close();
  logger.info('DB connection closed');
}
