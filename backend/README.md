# Hangman Backend API

RESTful API dla gry Hangman zbudowane w Spring Boot z Redis caching, Swagger dokumentacją i profesjonalnymi praktykami.

## Technologie

- **Spring Boot 3.5.4**
- **Java 24**
- **MySQL 8** - baza danych
- **Redis** - cachowanie zapytań
- **Swagger/OpenAPI** - dokumentacja API
- **Lombok** - redukcja boilerplate code
- **ModelMapper** - mapowanie DTO ↔ Entity
- **Bean Validation** - walidacja danych

## Architektura

Projekt wykorzystuje czystą architekturę warstwową:

```
┌─────────────────┐
│   Controller    │  ← REST API endpoints
├─────────────────┤
│     Service     │  ← Logika biznesowa + Cache
├─────────────────┤
│   Repository    │  ← Dostęp do bazy danych
├─────────────────┤
│     Entity      │  ← Modele JPA
└─────────────────┘

     ↕ Mapper ↕

┌─────────────────┐
│      DTO        │  ← Warstwa prezentacji
└─────────────────┘
```

## Funkcje

- ✅ CRUD operacje dla wyników gry
- ✅ Redis caching dla wydajności
- ✅ Walidacja danych z @Valid
- ✅ Global Exception Handler
- ✅ Swagger UI dokumentacja
- ✅ Logowanie z SLF4J
- ✅ DTO pattern z mapperami
- ✅ CORS configuration
- ✅ Transaction management

## Wymagania

- Java 24 lub nowszy
- Maven 3.6+
- MySQL 8.0+
- Redis 6.0+

## Instalacja

### 1. Zainstaluj Redis

**Windows (Docker):**
```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

**Linux/MacOS:**
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis

# MacOS
brew install redis
brew services start redis
```

Sprawdź czy działa:
```bash
redis-cli ping
# Powinno zwrócić: PONG
```

### 2. Skonfiguruj MySQL

Utwórz bazę danych:
```sql
CREATE DATABASE hangman;
```

Zaktualizuj `application.properties` jeśli używasz innego hasła:
```properties
spring.datasource.password=twoje_haslo
```

### 3. Zbuduj projekt

```bash
mvn clean install
```

### 4. Uruchom aplikację

```bash
mvn spring-boot:run
```

Aplikacja będzie dostępna pod adresem: `http://localhost:8080`

## Dokumentacja API

Po uruchomieniu aplikacji otwórz:

**Swagger UI:**
```
http://localhost:8080/swagger-ui.html
```

**OpenAPI JSON:**
```
http://localhost:8080/api-docs
```

## Endpointy

| Metoda | Endpoint | Opis | Cache |
|--------|----------|------|-------|
| GET | `/api/scores` | Pobierz wszystkie wyniki | ✅ 10 min |
| GET | `/api/scores/{id}` | Pobierz wynik po ID | ✅ 10 min |
| POST | `/api/scores` | Utwórz nowy wynik | ❌ (evict) |
| DELETE | `/api/scores/{id}` | Usuń wynik | ❌ (evict) |

## Przykłady Użycia

### Utworzenie nowego wyniku

```bash
curl -X POST http://localhost:8080/api/scores \
  -H "Content-Type: application/json" \
  -d '{
    "win": true,
    "leftChances": 3
  }'
```

**Odpowiedź:**
```json
{
  "id": 1,
  "win": true,
  "leftChances": 3,
  "date": "2025-12-30"
}
```

### Pobranie wszystkich wyników

```bash
curl http://localhost:8080/api/scores
```

### Pobranie wyniku po ID

```bash
curl http://localhost:8080/api/scores/1
```

### Usunięcie wyniku

```bash
curl -X DELETE http://localhost:8080/api/scores/1
```

## Walidacja

Przykład błędu walidacji przy nieprawidłowych danych:

```bash
curl -X POST http://localhost:8080/api/scores \
  -H "Content-Type: application/json" \
  -d '{
    "leftChances": 15
  }'
```

**Odpowiedź (400 Bad Request):**
```json
{
  "timestamp": "2025-12-30T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Invalid input data",
  "path": "/api/scores",
  "details": [
    "win: Win status cannot be null",
    "leftChances: Left chances cannot exceed 10"
  ]
}
```

## Cache Redis

### Działanie cache:

1. **Pierwsze zapytanie** - pobiera z bazy, zapisuje do Redis
2. **Kolejne zapytania** - pobiera z Redis (szybsze)
3. **Po 10 minutach** - TTL wygasa, ponownie z bazy
4. **POST/DELETE** - czyści cały cache

### Monitorowanie cache:

```bash
# Sprawdź klucze w Redis
redis-cli KEYS "hangman:*"

# Monitor operacji w czasie rzeczywistym
redis-cli monitor

# Sprawdź TTL klucza
redis-cli TTL "hangman:scores::allScores"
```

## Struktura Projektu

```
src/main/java/com/example/backend/
├── config/
│   ├── CorsConfig.java          # CORS configuration
│   ├── OpenApiConfig.java       # Swagger configuration
│   └── RedisConfig.java         # Redis cache configuration
├── dto/
│   ├── ErrorResponse.java       # Error response format
│   └── ScoreDTO.java           # Score data transfer object
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── InvalidScoreDataException.java
│   └── ScoreNotFoundException.java
├── mapper/
│   └── ScoreMapper.java        # DTO ↔ Entity mapping
├── service/
│   └── ScoreService.java       # Business logic + caching
├── HangmanController.java      # REST endpoints
├── HangmanRepository.java      # JPA repository
├── Score.java                  # JPA entity
└── BackendApplication.java     # Main application
```

## Konfiguracja

Główne ustawienia w `application.properties`:

```properties
# Server
server.port=8080

# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/hangman
spring.datasource.username=root
spring.datasource.password=

# Redis
spring.data.redis.host=localhost
spring.data.redis.port=6379

# Cache
spring.cache.type=redis
spring.cache.redis.time-to-live=600000  # 10 minut

# Swagger
springdoc.swagger-ui.path=/swagger-ui.html
```

## Rozwój

### Dodanie nowego endpointu:

1. Dodaj metodę w `HangmanController`
2. Dodaj logikę biznesową w `ScoreService`
3. Dodaj adnotacje cache jeśli potrzebne
4. Dokumentuj z @Operation i @ApiResponse
5. Testuj w Swagger UI

### Best Practices:

- ✅ Używaj DTO zamiast encji w API
- ✅ Dodawaj walidację z Bean Validation
- ✅ Używaj constructor injection (@RequiredArgsConstructor)
- ✅ Loguj ważne operacje
- ✅ Obsługuj błędy w GlobalExceptionHandler
- ✅ Dokumentuj wszystko w Swagger

## Logi

Aplikacja loguje:
- Wszystkie zapytania SQL (hibernate)
- Cache miss/hit (ScoreService)
- Utworzenie/usunięcie wyników
- Błędy i wyjątki

Poziomy logowania:
```properties
logging.level.root=INFO
logging.level.com.example.backend=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

## Troubleshooting

### Redis connection refused
```bash
# Sprawdź czy Redis działa
redis-cli ping

# Uruchom Redis
redis-server
```

### MySQL connection refused
```bash
# Sprawdź czy MySQL działa
sudo systemctl status mysql

# Uruchom MySQL
sudo systemctl start mysql
```

### Port 8080 zajęty
Zmień port w `application.properties`:
```properties
server.port=8081
```

## Licencja

MIT License

## Autor

Hangman API - Demo project for Spring Boot best practices
