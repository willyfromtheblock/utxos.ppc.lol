# Specify the Dart SDK base image version using dart:<version> (ex: dart:2.12)
FROM dart:stable AS build

# Resolve app dependencies.
WORKDIR /app
COPY pubspec.* ./
RUN dart pub get

# Copy app source code and AOT compile it.
COPY . .
# Ensure packages are still up-to-date if anything has changed
RUN dart pub get --offline
RUN dart compile exe bin/feeder.dart -o bin/feeder

# Build minimal serving image from AOT-compiled `/server` and required system
# libraries and configuration files stored in `/runtime/` from the build stage.

FROM debian:bullseye-slim
COPY --from=build /runtime/ /
COPY .env .env
COPY --from=build /app/bin/feeder /app/bin/

# Start server.
CMD ["/app/bin/feeder"]