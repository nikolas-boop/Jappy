# 🐕 Jappy – Jarnos Spiel im Handy

Eine kindgerechte React-Webapp, in der Spieler (ab ca. 9 Jahren) sich einen virtuellen Hund aussuchen und pflegen: Füttern, Gassi gehen, streicheln, spielen – und mit verdienten "Knochen" Items im Shop kaufen.

## 🎯 Features

✅ PIN-geschützte Profile  
✅ Hund-Auswahl (8+ Rassen mit Bildern)  
✅ Tägliche Aufgaben (Gassi, Füttern, Streicheln, Spielen)  
✅ Knochen-Währung  
✅ Shop (Spielzeuge, Halstücher, Leinen, Hundeboxen, Leckerlies)  
✅ Badges/Achievements  
✅ Mini-Games (Memory, Puzzle)  
✅ Hundeentwicklung (Baby → Young → Adult)  
✅ Saisonale Events (Weihnachten, Ostern, Geburtstag)  
✅ Responsive Design (Mobile-First)  

## 🛠️ Tech-Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + Sequelize (ORM)
- **Database**: MariaDB
- **Hosting**: All-inkl.com
- **Asset Generation**: KI-generierte Bilder (DALL-E/Stable Diffusion)

## 🚀 Installation & Entwicklung

### Voraussetzungen
- Node.js >= 16
- npm oder yarn
- MariaDB (lokal oder Docker)
- Git

### Setup (Lokal)

1. **Repository klonen & Ordner öffnen**
   ```bash
   cd c:\Projekte\Jappy
   ```

2. **Frontend starten**
   ```bash
   cd frontend
   npm install
   npm run dev      # http://localhost:5173
   ```

3. **Backend starten (neues Terminal)**
   ```bash
   cd backend
   npm install
   npm run dev      # http://localhost:3001
   ```

4. **Datenbank initialisieren**
   ```bash
   # Lokal MariaDB starten, dann:
   mysql -u root -p jappy < ../database/schema.sql
   ```

5. **.env Dateien erstellen**
   ```bash
   # Frontend: frontend/.env
   VITE_API_URL=http://localhost:3001/api
   
   # Backend: backend/.env
   NODE_ENV=development
   PORT=3001
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=jappy
   SESSION_SECRET=dev_secret_key
   ```

### Projekt-Struktur

```
nikolas-boop/
├── frontend/              # React + Vite WebApp
│   ├── public/
│   │   └── images/        # Statische Bilder
│   ├── src/
│   │   ├── components/    # Wiederverwendbare UI-Komponenten
│   │   ├── pages/         # Route Pages
│   │   ├── services/      # API Calls (apiClient.js)
│   │   ├── hooks/         # Custom React Hooks
│   │   ├── assets/        # Icons, SVGs
│   │   └── App.jsx
│   └── package.json
│
├── backend/               # Node.js + Express API
│   ├── routes/            # API Endpoints
│   ├── controllers/       # Business Logic
│   ├── models/            # Sequelize Models
│   ├── middleware/        # Auth, CORS, Logging
│   ├── config/            # DB Configuration
│   ├── seeds/             # Initial Daten
│   ├── server.js          # Express App Entry
│   └── package.json
│
├── database/              # DB Schema & Migrations
│   └── schema.sql
│
├── production/            # Build Output (→ Server)
│   ├── public/            # Frontend Build
│   ├── api/               # Backend
│   └── database/
│
└── deploy-all.sh          # Master Deploy Script
```

## 📦 Deployment

### Vor Server-Upload (lokal)

```bash
bash deploy-all.sh
```

Dies erstellt einen `production/`-Ordner mit allem, was auf den Server muss:
- ✓ Frontend Build (/public)
- ✓ Backend Code (/api)
- ✓ Database Schema
- ✓ Config Templates

### Server-Setup (All-inkl.com)

1. **production/ Ordner hochladen** (via SFTP/FTP)
   ```
   Von: production/
   Zu: ~/public_html/ oder ~/html/
   ```

2. **SSH ins Server-Home**
   ```bash
   ssh user@your-domain.com
   cd ~/public_html/production
   ```

3. **Datenbank initialisieren**
   ```bash
   mysql -u user -p databasename < database/schema.sql
   ```

4. **.env konfigurieren**
   ```bash
   cp .env.example .env
   nano .env  # Echo real credentials: DB_PASSWORD, API_KEY, etc.
   ```

5. **Backend starten**
   ```bash
   cd api
   npm install
   npm start  # oder pm2 start server.js --name "jappy-api"
   ```

6. **Frontend servieren**
   ```
   public/ Dateien müssen vom Web-Server (Apache/Nginx) serviert werden
   ```

## 🎮 Spielablauf

### 1. Profil erstellen / Anmelden
- Name eingeben oder aus Liste wählen
- PIN setzen/eingeben (4 Ziffern)

### 2. Hund wählen
- 8-10 verschiedene Rassen
- Jeweils mit Bild + Beschreibung
- Ausgewählter Hund wird Haustier

### 3. Aufgaben erledigen
- **Tägliche Aufgaben** (1x pro Tag, Reset um 00:00):
  - Gassi gehen → +30 Knochen
  - Füttern → +20 Knochen
- **Unbegrenzte Aufgaben**:
  - Streicheln → +5 Knochen (beliebig oft)
  - Spielen → +10 Knochen (alle 2h)

### 4. Im Shop einkaufen
- Verschiedene Item-Kategorien
- Hund optisch verändern (mit Items)
- Ausgegeben Knochen werden abgezogen

### 5. Badges freischalten
- "Hundeflüsterer" → 5x Gassi gehen
- "Futtermittel" → 50 Knochen verdient
- "Jäger" → 3 Mini-Games abgeschlossen
- Reward: +50 Knochen bei Unlock

## 📝 Development Workflow

1. **Code ändern** (frontend/ oder backend/)
2. **Lokal testen**
3. **Änderung pushen** (git commit + push)
4. **Deploy-Script** (bash deploy-all.sh)
5. **production/** hochladen

## 🔐 Sicherheit & Datenschutz

- PIN-Schutz per Server-Vergleich (nicht gehashed, reicht für Kinder-App)
- Keine extern sensiblen Daten
- HTTPS auf Production (All-inkl.com regelt SSL)
- Cookies für Session Management
- CORS auf Backend konfiguriert

## 🐛 Troubleshooting

### Frontend startet nicht
```bash
cd frontend
npm cache clean --force
npm install
npm run dev
```

### Backend-Fehler
```bash
cd backend
npm install
# .env checken: DB_HOST, DB_NAME, DB_USER, DB_PASSWORD
npm run dev
```

### Datenbank-Fehler
```bash
# Schema neu laden:
mysql -u root -p happy_dog < ../database/schema.sql
```

## 📚 Phase-Übersicht

| Phase | Status | Aufgaben |
|-------|--------|----------|
| 1 | ✅ | Setup, Ordnerstruktur, Deploy Scripts |
| 2 | ⏳ | Datenmodell, API Endpoints |
| 3 | ⏳ | Frontend Pages & UI |
| 4 | ⏳ | Mini-Games, Animationen |
| 5 | ⏳ | Backend Logic, Badge System |
| 6 | ⏳ | Asset-Generierung |
| 7 | ⏳ | Testing |
| 8 | ⏳ | Production Deployment |

---

Made with ❤️ for kids who love their virtual dog 🐕
