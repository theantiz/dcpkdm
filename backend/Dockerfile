
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml first (better caching)
COPY pom.xml .

# Pre-download dependencies (cached layer)
RUN mvn dependency:go-offline -B

# Copy full source
COPY src ./src

# Build the JAR (skip tests for faster deploy)
RUN mvn clean package -DskipTests


FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy compiled Spring Boot jar from builder
COPY --from=builder /app/target/*.jar app.jar

# Render / Railway / Fly.io provide PORT variable
ENV PORT=8080
ENV SERVER_PORT=${PORT}

# Expose the port (for local Docker)
EXPOSE 8080

# Enable strong crypto providers (important for RSA/AES/BC)
ENV JAVA_OPTS="-Djdk.crypto.KeyAgreement.legacyKDF=true"

# Spring Boot launcher
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
