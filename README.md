# AirTrails3D
✈️  AirTrails3D. An interactive 3D globe system for visualizing flight routes using Three.js, Node.js, and real flight data.

## 🌍 Live Demo

See the interactive visualizations at [stealth.travel/github/](https://stealth.travel/github/)

## 📖 Overview

This project creates immersive 3D visualizations of travel routes on an interactive Earth globe. We've built example maps for two fictional characters with distinct travel patterns:

- **John Doe** - A frequent traveler between Europe, South America, and California (approximately 10 trips)
- **Rosalia** - A K-pop fan following bands across Latin America, Europe, and Asia (approximately 10 trips)

*Note: These are fictional characters with randomly generated names. Both characters are entirely fictional, and we're mapping some of their routes for demonstration purposes. The flight data is created using publicly available flight information from sources like FlightRadar24 to recreate realistic travel routes.*

## ✨ Features

- **Interactive 3D Globe** - Smooth Earth rendering with realistic textures
- **Animated Flight Paths** - Routes draw progressively with moving aircraft
- **Smart Camera Positioning** - Automatic regional focus based on route patterns  
- **Intro Animations** - Cinematic zoom from wide view to focused region
- **Progressive Line Drawing** - Flight paths appear as aircraft travel
- **Distance-Based Styling** - Visual differentiation for short/long haul flights
- **Regional Themes** - Color schemes adapted to geographic regions

## 🛠 Technical Stack

### Backend
- **Node.js** - Local development server with live reloading
- **Express-style routing** - Clean URL handling (`/john-doe`, `/maria-rodriguez`)

### Frontend  
- **Three.js** - 3D graphics and WebGL rendering
- **Orbit Controls** - Interactive camera movement
- **Earth Textures** - High-resolution NASA Earth imagery
- **Post-processing** - Bloom effects and visual enhancements

### Data Format
- **JSON Route Files** - Structured flight data with IATA codes
- **Airport Database** - Global airport coordinates and metadata
- **Flight Information** - Airlines, flight numbers, dates

## 📁 Project Structure

```
airtrails3d/
├── server.js              # Node.js development server
├── public/
│   ├── pages/
│   │   ├── john-doe.html   # John's travel visualization  
│   │   └── rosalia.html # Rosalia's travel visualization
│   ├── js/
│   │   ├── data/
│   │   │   ├── airport-data.js    # Global airport database
│   │   │   ├── john-routes.json   # John's flight data
│   │   │   └── rosalia-routes.json  # Rosalia's flight data  
│   │   └── app/
│   │       └── globe.js           # 3D globe rendering logic
│   └── css/
│       └── styles.css             # Visual styling
```

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd airtrails3d
npm install
```

### 2. Start Development Server
```bash
npm run dev
# Server starts at http://localhost:3000
```

### 3. View Visualizations
- John Doe's routes: `http://localhost:3000/john-doe`
- Rosalia's routes: `http://localhost:3000/rosalia`

## 📊 Creating Route Data

### Route JSON Format
```json
{
  "2025": [
    {
      "id": 1,
      "from": "LAX",
      "to": "CDG", 
      "date": "2025-01-15",
      "flightNumber": "AF 066",
      "airline": "Air France"
    },
    {
      "id": 2, 
      "from": "CDG",
      "to": "GRU",
      "date": "2025-01-20",
      "flightNumber": "AF 456",
      "airline": "Air France"
    }
  ]
}
```

### Airport Codes
All routes use standard IATA airport codes (LAX, CDG, NRT, etc.). The system includes a comprehensive airport database with coordinates for accurate positioning.

### Data Sources
Route data is created using publicly available information from:
- FlightRadar24
- Airline schedules  
- Airport departure boards
- Flight tracking websites

## 🎨 Customization

### Camera Positioning
Each character's routes get optimized camera positioning:

```javascript
// Europe-focused (John Doe)
const cameraPosition = { x: 1.4, y: 1.2, z: 2.0 };

// Pacific-focused (Rosalia)  
const cameraPosition = { x: 0.0, y: 1.3, z: 2.2 };

// Global view (mixed routes)
const cameraPosition = { x: -1.2, y: 1.0, z: 2.0 };
```

### Visual Themes
Routes can be styled with different color schemes:

```javascript
// Distance-based coloring
if (distance > 8000) color = 0xff6b9d;      // Pink - transcontinental
else if (distance > 4000) color = 0xdc267f; // Magenta - long haul  
else if (distance > 1500) color = 0x9d4edd; // Purple - medium haul
else color = 0x7209b7;                       // Deep purple - short haul

// Regional themes
const asiaTheme = 0xdc267f;    // Magenta for K-pop routes
const europeTheme = 0x00ff99;  // Cyan for European circuits  
```

### Animation Settings
Customize the viewing experience:

```javascript
const introDuration = 2500;     // 2.5 second intro animation
const flightSpeed = 1;          // Animation speed multiplier
const arcHeight = 0.12;         // Flight path arc height
const planeSize = 0.015;        // Aircraft marker size
```

## 🔧 Adding New Characters

### 1. Create Route Data
Create `/public/js/data/new-character-routes.json`:
```json
{
  "2025": [
    // Add flight objects here
  ]
}
```

### 2. Create HTML Page  
Create `/public/pages/new-character.html` using existing templates.

### 3. Add Server Route
In `server.js`, add:
```javascript
'/new-character': '/pages/new-character.html'
```

### 4. Configure Camera
In `globe.js`, add camera positioning logic for the new character's travel patterns.

## 🌟 Advanced Features

### Progressive Route Drawing
Routes appear progressively as aircraft move along paths, creating a "live" feeling.

### Regional Focus
Camera automatically positions based on route patterns:
- **Europe Focus** - For European circuit routes
- **Pacific Focus** - For trans-Pacific journeys  
- **Global View** - For worldwide travel patterns

### Post-Processing Effects  
Optional bloom and glow effects for enhanced visuals.

### Timeline Support
Display routes across multiple years with year selection controls.

## 🎯 Example Use Cases

### Travel Bloggers
Visualize your own travel history by converting flight confirmations to route JSON.

### Travel Agencies
Showcase sample itineraries with immersive 3D presentations.

### Educational Content
Demonstrate global connectivity and flight patterns.

### Entertainment
Create fictional character journeys for storytelling or gaming.

## 📝 Technical Notes

### Performance
- Optimized for 50-100 simultaneous routes
- Dynamic arc calculation for smooth curves
- Efficient WebGL rendering with Three.js

### Browser Support  
- Modern browsers with WebGL support
- Responsive design for desktop and mobile
- Graceful fallbacks for older browsers

### Data Validation
- Airport code validation against IATA database
- Route logic verification (realistic connections)
- Flight number format checking

## 🤝 Contributing

Feel free to contribute additional character routes, visual themes, or technical improvements. The system is designed to be easily extensible for new travel patterns and regions.

## 📄 License

This project demonstrates technical capabilities for educational and entertainment purposes. Flight data is sourced from publicly available information.

---

**Ready to map your own travel adventures?** Start by creating route data and watch your journeys come to life in 3D!


