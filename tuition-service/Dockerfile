FROM openjdk:17
ARG JAR_FILE=target/Tuition.jar
COPY ${JAR_FILE} Tuition.jar
ENTRYPOINT ["java", "-jar", "/Tuition.jar"]