# 📦 NPM Scripts Reference

## Root Scripts (globetrotter-app/)

```bash
npm install              # Install frontend dependencies
npm run dev             # Start frontend dev server (Vite)
npm run build           # Build frontend for production
npm run preview         # Preview production build

npm run backend:install # Install backend dependencies
npm run backend:dev     # Start backend with nodemon (auto-reload)
npm run backend:start   # Start backend (production)
npm run backend:seed    # Seed database with sample data
```

## Backend Scripts (backend/)

```bash
npm install             # Install backend dependencies
npm start              # Start Express server (default)
npm run dev            # Start with nodemon (development)
npm run seed           # Seed MongoDB with sample data
```

## Development Workflow

### First Time Setup
```bash
# 1. Install all dependencies
npm install
npm run backend:install

# 2. Setup MongoDB
# - Start mongod in another terminal
# - OR configure MongoDB Atlas URI in .env

# 3. Create backend/.env file
# MONGODB_URI=mongodb://localhost:27017/globetrotter
# PORT=5000
# JWT_SECRET=your_secret_key
# NODE_ENV=development

# 4. Seed database (optional)
npm run backend:seed

# 5. Start development servers
# Terminal 1:
npm run backend:dev
# Terminal 2:
npm run dev
```

### Daily Development
```bash
# Terminal 1 - Backend (with auto-reload)
npm run backend:dev

# Terminal 2 - Frontend (with hot reload)
npm run dev

# Open http://localhost:5173 in browser
```

### Testing APIs
```bash
# Start backend
npm run backend:dev

# In another terminal, test with curl
curl http://localhost:5000/api/health
curl http://localhost:5000/api/cities
```

## Common Commands

### Database Operations
```bash
# Seed database with sample data
npm run backend:seed

# Reset and reseed
npm run backend:seed  # Run multiple times to reset
```

### Building for Production
```bash
# Frontend
npm run build         # Creates dist/ folder
npm run preview       # Preview the build locally

# Backend
# Just deploy server.js to production
# MongoDB should be on Atlas (cloud)
```

### Stopping Servers
```bash
# Frontend: Ctrl+C
# Backend: Ctrl+C

# Kill port if needed
# macOS/Linux:
lsof -i :5000        # Show process on port 5000
kill -9 <PID>        # Kill the process

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Environment-Specific Scripts

### Development
```bash
npm run backend:dev   # With hot-reload (nodemon)
npm run dev          # Frontend with Vite hot reload
```

### Production
```bash
npm run backend:start # Without hot-reload
npm run build        # Build frontend
npm run preview      # Preview built frontend
```

## Package.json Structure

### Root (Frontend)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "backend:install": "cd backend && npm install",
    "backend:dev": "cd backend && npm run dev",
    "backend:start": "cd backend && npm start",
    "backend:seed": "cd backend && npm run seed"
  }
}
```

### Backend
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Useful Development Tips

### Running Both Servers
```bash
# Use VS Code terminal split
# Or open 2 terminal windows/tabs

# Terminal 1
cd globetrotter-app
npm run backend:dev

# Terminal 2
cd globetrotter-app
npm run dev
```

### Debugging

#### Frontend
```bash
# Open Chrome DevTools (F12)
# Check Console for errors
# Check Application > localStorage for token
# Check Network tab for API calls
```

#### Backend
```bash
# Check terminal output for logs
# Use console.log() for debugging
# Or use Node debugger:
node --inspect server.js
# Then go to chrome://inspect
```

### Checking Ports
```bash
# macOS/Linux
lsof -i :5000    # Backend port
lsof -i :5173    # Frontend port

# Windows
netstat -ano | grep 5000
netstat -ano | grep 5173
```

## Troubleshooting Scripts

### Package Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
npm run backend:install

# Update dependencies
npm update
```

### Port Conflicts
```bash
# Stop all Node processes
# macOS/Linux:
pkill -f node

# Windows:
taskkill /IM node.exe /F

# Then restart servers
```

### Database Issues
```bash
# Reseed database
npm run backend:seed

# Or restart MongoDB:
# macOS (with Homebrew):
brew services stop mongodb-community
brew services start mongodb-community

# Or use MongoDB Atlas (cloud)
```

## Advanced Commands

### Running Tests (when added)
```bash
npm test              # Frontend tests
npm run backend:test  # Backend tests
```

### Linting (when configured)
```bash
npm run lint          # Check code style
npm run lint:fix      # Fix code style
```

### Monitoring
```bash
# Monitor changes in src/
npm run dev -- --debug

# Monitor backend
npm run backend:dev   # Nodemon already watches
```

## Script Execution Flow

### `npm run dev`
```
npm run dev
    ↓
package.json scripts.dev
    ↓
vite (command)
    ↓
• Starts dev server on :5173
• Hot reload enabled
• Watches src/ for changes
• Compiles on save
```

### `npm run backend:dev`
```
npm run backend:dev
    ↓
package.json scripts.backend:dev
    ↓
cd backend && npm run dev
    ↓
nodemon (package.json script)
    ↓
• Starts server on :5000
• Watches .js files
• Auto-restarts on save
• Logs to console
```

### `npm run backend:seed`
```
npm run backend:seed
    ↓
cd backend && npm run seed
    ↓
node seed.js
    ↓
• Connects to MongoDB
• Clears existing data
• Inserts 8 cities + 10 activities
• Disconnects
• Exits
```

## CI/CD Pipeline Scripts (for future)

When you add CI/CD:
```bash
npm run build        # Build frontend
npm run backend:build # Build backend (if needed)
npm test            # Run tests
npm run lint        # Check code quality
```

## Summary

| Command | Purpose | Terminal | Port |
|---------|---------|----------|------|
| `npm install` | Install frontend deps | 1 | - |
| `npm run backend:install` | Install backend deps | 1 | - |
| `npm run dev` | Start frontend | 2 | 5173 |
| `npm run backend:dev` | Start backend | 1 | 5000 |
| `npm run backend:seed` | Seed database | 1 | - |
| `npm run build` | Build for production | 1 | - |

---

**Pro Tip**: Keep both terminal windows open during development for best experience! 🚀
