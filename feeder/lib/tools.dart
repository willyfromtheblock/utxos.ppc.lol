import 'dart:convert';
import 'dart:io';

import 'package:aws_s3_api/s3-2006-03-01.dart' as s3;
import 'package:dotenv/dotenv.dart';
import 'package:simple_logger/simple_logger.dart';

Map parseQueryResults(Object? result) {
  if (result == []) return {};

  final asList = result as List;
  if (asList[0] != null) {
    final asMap = asList[0] as Map;
    if (asMap.isNotEmpty) {
      if (asMap["result"].runtimeType == List<dynamic>) {
        if (asMap["result"].isNotEmpty) {
          return asMap["result"][0];
        } else {
          return {};
        }
      }
      return asMap["result"];
    }
  }
  return {};
}

Future<void> uploadToS3({
  required String data,
  required DotEnv env,
  required String fileName,
}) async {
  final logger = SimpleLogger();

  final tempFile = File('./$fileName');
  bool fileExists = await tempFile.exists();

  if (!fileExists || (fileExists && await tempFile.readAsString() != data)) {
    // If the file doesn't exist or the content is different, upload to S3
    final newFileContent = utf8.encode(data);

    //upload to s3
    final service = s3.S3(
      region: 'auto',
      endpointUrl: env['S3_ENDPOINT_URL'],
      credentials: s3.AwsClientCredentials(
        accessKey: env['S3_ACCESS_KEY']!,
        secretKey: env['S3_SECRET_KEY']!,
      ),
    );

    await service.putObject(
      bucket: env['S3_BUCKET_NAME']!,
      key: env['S3_FILE_NAME']!,
      body: newFileContent,
      contentType: 'application/json',
    );

    // Update the temp file with the new content
    await tempFile.writeAsBytes(newFileContent);
    logger.info('$fileName: updated and uploaded to S3');
  } else {
    logger.info('$fileName: no changes detected');
  }
}
