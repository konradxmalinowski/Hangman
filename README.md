## Hangman 🎮

A full‑stack Hangman game built with Angular and Spring Boot. Guess the word, track your results, and learn a few Polish letters along the way! 🇵🇱🧩

### Features ✨

- **Play Hangman**: 5 lives, instant feedback, and a random word every round
- **Polish alphabet support**: includes diacritics like Ą, Ć, Ę, Ł, Ń, Ó, Ś, Ź, Ż
- **Score history**: results are saved to MySQL and viewable via a modal
- **Responsive UI**: Angular + Angular Material dialog

### Tech Stack 🧱

- **Frontend**: Angular 15, SCSS, Angular Material
- **Backend**: Spring Boot 3, Spring Web, Spring Data JPA, Lombok
- **Database**: MySQL 8 (JPA `ddl-auto=update`)

### Monorepo Structure 📁

- `frontend/`: Angular application (dev server on `http://localhost:4200`)
- `backend/`: Spring Boot API (default on `http://localhost:8080`)

---

## Quick Start 🚀

### Prerequisites

- Node.js 16–18 and npm
- Java 21+ (project is configured for `java.version=24`)
- MySQL 8 running locally with a database named `hangman`

### 1) Backend (Spring Boot)

1. Configure MySQL in `backend/src/main/resources/application.properties`:
   - `spring.datasource.url=jdbc:mysql://localhost:3306/hangman?useSSL=false`
   - `spring.datasource.username=root`
   - `spring.datasource.password=` (set your password if needed)
2. Start the API:

```bash
cd backend
./mvnw spring-boot:run   # Windows: mvnw.cmd spring-boot:run
```

The API runs at `http://localhost:8080`.

Note: CORS allows `http://localhost:4200` by default (see `CorsConfig`).

### 2) Frontend (Angular)

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the dev server:

```bash
npm start
```

The app runs at `http://localhost:4200`.

---

## API Reference 🔌

Base URL: `http://localhost:8080`

Entity `Score`:

```json
{
  "id": 1,
  "win": true,
  "leftChances": 3,
  "date": "2025-01-01"
}
```

Endpoints:

- `GET /scores` → list all scores
- `GET /scores/{id}` → get score by id
- `POST /scores` → create score
- `DELETE /scores/{id}` → remove score

Examples:

```bash
curl http://localhost:8080/scores

curl -X POST http://localhost:8080/scores \
  -H "Content-Type: application/json" \
  -d '{"win":true,"leftChances":4}'

curl -X DELETE http://localhost:8080/scores/1
```

---

## Gameplay Notes 🎯

- You start with 5 lives
- Letters are case‑insensitive and shown in uppercase
- Missed guesses reduce lives; run out and the full word is revealed
- Winning or losing saves a `Score` to the backend

---

## Scripts 📜

Frontend:

- `npm start` → dev server at `4200`
- `npm run build` → production build to `dist/frontend`

Backend:

- `mvnw spring-boot:run` → start API
- `mvnw test` → run tests

---

## Configuration ⚙️

- CORS origin is `http://localhost:4200` (`backend/src/main/java/com/example/backend/CorsConfig.java`)
- MySQL credentials are set in `backend/src/main/resources/application.properties`
- JPA uses `hibernate.ddl-auto=update` and `MySQL8Dialect`

---

## Troubleshooting 🛠️

- If the frontend can’t fetch scores, ensure the backend is running on port 8080 and MySQL is reachable
- Check CORS if using a different frontend origin
- Verify Node/Java versions (Angular 15 works best with Node 16–18)

---

## Screenshot 🖼️

<img width="1122" height="646" alt="Hangman screenshot" src="https://github.com/user-attachments/assets/3fb26c1d-3e52-470c-857b-ea1f503a8306" />

---

## License 📄

Licensed under the MIT License. See `LICENSE` for details.
