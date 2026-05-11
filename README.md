# APEX GARAGE — JDM 3D Customizer

Full-stack 3D car customization visualizer with autobody shop aesthetic.

## Stack
- **Backend:** Java 21 + Spring Boot 3.x + H2 (dev) / PostgreSQL (prod)
- **Frontend:** React + TypeScript (Vite) + Three.js + @react-three/fiber + Zustand + TailwindCSS

## Quick Start

### Backend
```bash
cd backend
mvn spring-boot:run
# API available at http://localhost:8080
# H2 console at http://localhost:8080/h2-console
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

## Project Structure
```
apex-garage/
├── backend/          Java Spring Boot API
│   └── src/main/
│       ├── java/com/apexgarage/
│       │   ├── controller/   REST endpoints
│       │   ├── service/      Business logic
│       │   ├── model/        JPA entities
│       │   └── repository/   Data access
│       └── resources/
│           ├── application.yml
│           └── data.sql      Seed data (JDM cars + parts)
└── frontend/         Vite + React app
    └── src/
        ├── components/
        │   ├── Viewer3D/     Three.js canvas + shop environment
        │   ├── CarSelector/  Horizontal car stall picker
        │   ├── PartsPanel/   Collapsible mods panel
        │   ├── GaragePanel/  Saved builds modal
        │   └── UI/           Shop chrome (header, etc.)
        ├── store/            Zustand global state
        ├── api/              Axios service layer
        └── types/            TypeScript interfaces
```

## Adding Real GLB Models
1. Drop `.glb` files into `frontend/public/models/` named exactly as in `data.sql` (e.g. `supra_mk4.glb`)
2. The viewer auto-detects the file and swaps the placeholder geometry

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET | /api/cars | List all cars |
| GET | /api/parts?car=supra_mk4&category=wheels | Filter parts |
| POST | /api/builds | Save a build |
| GET | /api/builds | List saved builds |
| GET | /api/builds/:id | Load a build |
| PUT | /api/builds/:id | Update a build |
| DELETE | /api/builds/:id | Delete a build |
