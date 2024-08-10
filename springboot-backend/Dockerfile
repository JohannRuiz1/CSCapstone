# Build stage for Spring Boot application
FROM gradle:jdk17 AS BUILD
WORKDIR /vtrc
COPY . .
RUN gradle build -x test

# Final stage for the Spring Boot application
FROM openjdk:17
ENV JAR_NAME=vtresearchconnect-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/vtrc
WORKDIR $APP_HOME
COPY --from=BUILD /vtrc/build/libs/$JAR_NAME $APP_HOME/

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "vtresearchconnect-0.0.1-SNAPSHOT.jar"]
