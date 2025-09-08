FROM openjdk:17-jdk-slim

WORKDIR /app

COPY bank_simulation/pom.xml .
COPY bank_simulation/mvnw .
COPY bank_simulation/.mvn .mvn
COPY bank_simulation/src ./src

RUN ./mvnw clean install

EXPOSE 5036

ENTRYPOINT ["java", "-jar", "target/bank_simulation-0.0.1-SNAPSHOT.jar", "--server.port=5036"]