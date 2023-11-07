FROM openjdk:17
ARG JAR_FILE=target/TestScore.jar
COPY ${JAR_FILE} TestScore.jar
ENTRYPOINT ["java", "-jar", "/TestScore.jar"]