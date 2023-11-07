FROM openjdk:17
ARG JAR_FILE=target/Student.jar
COPY ${JAR_FILE} Student.jar
ENTRYPOINT ["java", "-jar", "/Student.jar"]