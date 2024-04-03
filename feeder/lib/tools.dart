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
