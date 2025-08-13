document.addEventListener('DOMContentLoaded', function() {
    // Set up Three.js scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('globe').appendChild(renderer.domElement);

    // Post-processing composer with bloom
    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.6,
        0.4,
        0.85
    );
    bloomPass.renderToScreen = true;
    composer.addPass(bloomPass);
    
    // Set initial camera position
    camera.position.set(0, 0, 2.5);
    
    // Add orbit controls to allow rotation
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 1.5;
    controls.maxDistance = 5;
    
    // Create Earth globe
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
    const earthBumpMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
    const earthSpecular = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');
    
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: earthBumpMap,
        bumpScale: 0.05,
        specularMap: earthSpecular,
        specular: new THREE.Color('grey'),
        shininess: 5
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Subtle atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x4dafff,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    // Add directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    
    // Add some stars in the background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
        transparent: true
    });
    
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Convert latitude and longitude to 3D coordinates
    function latLongToVector3(lat, lon, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        return new THREE.Vector3(x, y, z);
    }
    
    // Create airport markers
    const airportMarkers = {};
    const landingDots = {};
    const airportRadius = 1.01; // Slightly above Earth's surface
    
    for (const code in airports) {
        const airport = airports[code];
        
        // Create a sphere for each airport - but don't show until visited
        const markerGeometry = new THREE.SphereGeometry(0.01, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        
        // Position based on lat/long
        const position = latLongToVector3(airport.lat, airport.lng, airportRadius);
        marker.position.copy(position);
        marker.scale.set(0, 0, 0); // Initially invisible
        
        // Create landing dot (blue)
        const landingDotGeometry = new THREE.SphereGeometry(0.005, 16, 16);
        const landingDotMaterial = new THREE.MeshBasicMaterial({ color: 0x00bfff });
        const landingDot = new THREE.Mesh(landingDotGeometry, landingDotMaterial);
        landingDot.position.copy(position);
        landingDot.scale.set(0, 0, 0); // Initially invisible
        
        scene.add(marker);
        airportMarkers[code] = marker;
        landingDots[code] = landingDot;
    }
    
    // Create a simple green dot to represent the current flight position
    const planeGeometry = new THREE.SphereGeometry(0.025, 16, 16);
    const planeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00FF00, // Same bright green as the routes
    });
    
    // Create the dot mesh
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.visible = false;
    scene.add(plane);
    
    // Add a subtle glow effect to the plane
    const glowGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FF00,
        transparent: true,
        opacity: 0.4
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    plane.add(glow); // Add glow as a child of the plane
    
    // Function to calculate arc points between two points on the globe
    function calculateArcPoints(startLat, startLng, endLat, endLng, steps) {
        // Convert to radians
        const startLatRad = startLat * (Math.PI / 180);
        const startLngRad = startLng * (Math.PI / 180);
        const endLatRad = endLat * (Math.PI / 180);
        const endLngRad = endLng * (Math.PI / 180);
        
        // Calculate the great circle distance
        const d = 2 * Math.asin(
            Math.sqrt(
                Math.pow(Math.sin((endLatRad - startLatRad) / 2), 2) +
                Math.cos(startLatRad) * Math.cos(endLatRad) *
                Math.pow(Math.sin((endLngRad - startLngRad) / 2), 2)
            )
        );
        
        const points = [];
        
        // Calculate the arc height based on distance
        // Longer distances get higher arcs
        const distance = calculateDistance(startLat, startLng, endLat, endLng);
        let arcHeight = 0.05;
        
        if (distance < 1000) {
            arcHeight = 0.03; // Shorter flights have lower arcs
        } else if (distance < 3000) {
            arcHeight = 0.08; // Medium flights
        } else if (distance < 6000) {
            arcHeight = 0.12; // Long flights
        } else if (distance < 10000) {
            arcHeight = 0.15; // Very long flights
        } else {
            arcHeight = 0.18; // Ultra long flights
        }
        
        for (let i = 0; i <= steps; i++) {
            const f = i / steps;
            
            // Interpolate using the great circle
            const A = Math.sin((1 - f) * d) / Math.sin(d);
            const B = Math.sin(f * d) / Math.sin(d);
            
            const x = A * Math.cos(startLatRad) * Math.cos(startLngRad) + B * Math.cos(endLatRad) * Math.cos(endLngRad);
            const y = A * Math.cos(startLatRad) * Math.sin(startLngRad) + B * Math.cos(endLatRad) * Math.sin(endLngRad);
            const z = A * Math.sin(startLatRad) + B * Math.sin(endLatRad);
            
            const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * (180 / Math.PI);
            const lng = Math.atan2(y, x) * (180 / Math.PI);
            
            // Add arc height using a sine wave that peaks in the middle
            const arcFactor = Math.sin(f * Math.PI);
            const radius = 1 + arcHeight * arcFactor;
            
            points.push(latLongToVector3(lat, lng, radius));
        }
        
        return points;
    }
    
    // Function to calculate bearing between two points
    function calculateBearing(startLat, startLng, endLat, endLng) {
        const startLatRad = startLat * (Math.PI / 180);
        const startLngRad = startLng * (Math.PI / 180);
        const endLatRad = endLat * (Math.PI / 180);
        const endLngRad = endLng * (Math.PI / 180);
        
        const y = Math.sin(endLngRad - startLngRad) * Math.cos(endLatRad);
        const x = Math.cos(startLatRad) * Math.sin(endLatRad) -
                Math.sin(startLatRad) * Math.cos(endLatRad) * Math.cos(endLngRad - startLngRad);
        const bearing = Math.atan2(y, x) * (180 / Math.PI);
        
        return (bearing + 360) % 360;
    }
    
    // Animation control variables
    let currentFlightIndex = 0;
    let animationStep = 0;
    let animationFrameId;
    let completedAirports = new Set();
    let currentFlights = [];
    let flightPaths = [];
    let allFlightsLoaded = false;
    let loadingErrors = [];
    
    // Camera animation variables for intro
    let isIntroAnimating = true;
    let introStartTime = 0;
    let introDuration = 2500; // 2.5 seconds intro animation
    
    // Camera positioning based on route type
    const isJohnRoutes = window.location.pathname.includes('john-doe');
    const isRosaliaRoutes = window.location.pathname.includes('rosalia');
    
    let introStartPosition, introEndPosition;
    
    if (isJohnRoutes) {
        // Europe/Americas focus for John's business routes
        introStartPosition = { x: -1.5, y: 1.8, z: 3.0 };   // Wider view for Americas/Europe focus
        introEndPosition = { x: -1.2, y: 1.2, z: 2.0 };     // Focus on Americas/Europe corridor
    } else if (isRosaliaRoutes) {
        // Asia/Pacific focus for Rosalia's K-pop routes
        introStartPosition = { x: 0.0, y: 2.0, z: 3.5 };   // Wide Pacific view
        introEndPosition = { x: 0.0, y: 1.3, z: 2.2 };     // Focus on Asia/Pacific region
    } else {
        // Global focus for other routes
        introStartPosition = { x: -2.0, y: 1.5, z: 3.0 };  // Wider view for global routes
        introEndPosition = { x: -1.2, y: 1.0, z: 2.0 };    // Focus on global view
    }
    let selectedYear = '2025';
    let lineMaterials = [];
    
    // Calculate distance between two points in km using Haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        const distance = R * c; // Distance in km
        return distance;
    }
    
    // Utility to flatten Vector3 array
    function flattenVector3Array(vectors) {
        const result = new Float32Array(vectors.length * 3);
        for (let i = 0; i < vectors.length; i++) {
            const p = vectors[i];
            result[i * 3] = p.x;
            result[i * 3 + 1] = p.y;
            result[i * 3 + 2] = p.z;
        }
        return result;
    }

    // Build flight paths for a single year
    function buildYearFlightPaths(yearStr) {
        // Clear any existing flight paths
        flightPaths = [];
        lineMaterials = [];
        allFlightsLoaded = false;
        
        try {
            // Load flight data based on the current page
            let flightRoutes;
            if (isJohnRoutes && typeof johnRoutes !== 'undefined') {
                flightRoutes = johnRoutes;
            } else if (isRosaliaRoutes && typeof rosaliaRoutes !== 'undefined') {
                flightRoutes = rosaliaRoutes;
            } else {
                console.error('Flight routes not loaded. Expected johnRoutes or rosaliaRoutes global variable.');
                document.getElementById('flight-info').textContent = 'Error: Flight data not loaded correctly. Check console.';
                return;
            }
            
            const yearFlights = flightRoutes[yearStr] || [];
            if (yearFlights.length === 0) {
                document.getElementById('flight-info').textContent = `No flights found for ${yearStr}.`;
                return;
            }
            
            const supportsLine2 = typeof THREE.Line2 !== 'undefined' && typeof THREE.LineGeometry !== 'undefined' && typeof THREE.LineMaterial !== 'undefined';
            
            for (let i = 0; i < yearFlights.length; i++) {
                const flight = yearFlights[i];
                if (!flight) continue;
                
                flight.year = yearStr;
                
                if (!airports[flight.from] || !airports[flight.to]) {
                    console.warn(`Missing airport data for flight ${flight.id}: ${flight.from} to ${flight.to}`);
                    continue;
                }
                
                const fromAirport = airports[flight.from];
                const toAirport = airports[flight.to];
                
                const steps = 60;
                const points = calculateArcPoints(fromAirport.lat, fromAirport.lng, toAirport.lat, toAirport.lng, steps);
                
                if (supportsLine2) {
                    // Create empty positions array for progressive drawing
                    const emptyPositions = new Float32Array(points.length * 3);
                    for (let j = 0; j < emptyPositions.length; j++) {
                        emptyPositions[j] = 0; // Start with all positions at origin
                    }
                    const lineGeometry = new THREE.LineGeometry();
                    lineGeometry.setPositions(Array.from(emptyPositions));
                    const lineMaterial = new THREE.LineMaterial({
                        color: 0x00ff99,
                        linewidth: 2.0,
                        transparent: true,
                        opacity: 0.9
                    });
                    lineMaterial.resolution.set(window.innerWidth, window.innerHeight);
                    const line = new THREE.Line2(lineGeometry, lineMaterial);
                    line.computeLineDistances();
                    scene.add(line);
                    lineMaterials.push(lineMaterial);
                    flightPaths.push({ 
                        flight, 
                        points, 
                        line, 
                        material: lineMaterial, 
                        animationStep: 0,
                        originalPositions: flattenVector3Array(points),
                        isLine2: true
                    });
                } else {
                    // Fallback to thin line if Line2 is unavailable - create empty initially
                    const fallbackPositions = new Float32Array(points.length * 3);
                    for (let j = 0; j < fallbackPositions.length; j++) {
                        fallbackPositions[j] = 0; // Start with all positions at origin
                    }
                    const fallbackGeom = new THREE.BufferGeometry();
                    fallbackGeom.setAttribute('position', new THREE.BufferAttribute(fallbackPositions, 3));
                    const fallbackMat = new THREE.LineBasicMaterial({ color: 0x00ff99, transparent: true, opacity: 0.9 });
                    const fallbackLine = new THREE.Line(fallbackGeom, fallbackMat);
                    scene.add(fallbackLine);
                    flightPaths.push({ 
                        flight, 
                        points, 
                        line: fallbackLine, 
                        material: fallbackMat, 
                        animationStep: 0,
                        positions: fallbackPositions,
                        isLine2: false
                    });
                }
            }
            
            allFlightsLoaded = true;
            if (flightPaths.length > 0) {
                setTimeout(() => {
                    updateFlightInfo(0);
                    startAnimation();
                }, 50);
            }
        } catch (error) {
            console.error('Error building year flight paths:', error);
            loadingErrors.push(error.message || 'Unknown error');
            document.getElementById('flight-info').textContent = `Error loading flights: ${error.message || 'Unknown error'}.`;
        }
    }
    
    // Legacy function kept for compatibility - no longer used
    function createFlightPaths() {
        console.warn('createFlightPaths() is deprecated. Use buildYearFlightPaths() instead.');
    }
    
    // Update flight info display
    function updateFlightInfo(flightIndex) {
        const flightPath = flightPaths[flightIndex];
        const flight = flightPath.flight;
        const fromAirport = airports[flight.from];
        const toAirport = airports[flight.to];
        
        const infoElement = document.getElementById('flight-info');
        infoElement.innerHTML = `
            <div>${flight.year}: ${flight.date}</div>
            <div>${flight.flightNumber}: ${fromAirport.name} (${flight.from}) → ${toAirport.name} (${flight.to})</div>
            <div>${fromAirport.country} → ${toAirport.country}</div>
        `;
        
        // Update year display
        document.querySelector('.flight-year').textContent = `${flight.year} Journeys`;
    }
    
    // Clean up scene when changing years
    function cleanupScene() {
        // Remove all flight paths
        flightPaths.forEach(flightPath => {
            scene.remove(flightPath.line);
            flightPath.line.geometry.dispose();
            flightPath.line.material.dispose();
        });
        
        // Reset airport markers
        for (const code in airportMarkers) {
            airportMarkers[code].scale.set(0, 0, 0); // Hide all markers
        }
        
        // Remove all landing dots
        for (const code in landingDots) {
            if (scene.getObjectById(landingDots[code].id)) {
                scene.remove(landingDots[code]);
            }
            landingDots[code].scale.set(0, 0, 0); // Hide all dots
        }
        
        // Reset animation variables
        currentFlightIndex = 0;
        animationStep = 0;
        completedAirports = new Set();
        
        // Hide plane
        plane.visible = false;
        
        // Cancel any ongoing animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
    
    // Start the animation loop
    function startAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        // Set initial camera position for intro animation
        camera.position.set(introStartPosition.x, introStartPosition.y, introStartPosition.z);
        controls.update();
        
        // Animation function
        function animate(time) {
            animationFrameId = requestAnimationFrame(animate);
            
            // Handle intro camera animation
            if (isIntroAnimating) {
                if (introStartTime === 0) {
                    introStartTime = time;
                }
                
                const elapsed = time - introStartTime;
                const progress = Math.min(elapsed / introDuration, 1);
                
                // Smooth easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                
                // Interpolate camera position
                camera.position.x = introStartPosition.x + (introEndPosition.x - introStartPosition.x) * easeOut;
                camera.position.y = introStartPosition.y + (introEndPosition.y - introStartPosition.y) * easeOut;
                camera.position.z = introStartPosition.z + (introEndPosition.z - introStartPosition.z) * easeOut;
                
                // Update controls
                controls.update();
                
                // Check if intro is complete
                if (progress >= 1) {
                    isIntroAnimating = false;
                }
                
                // Skip flight animations during intro, just render
                composer.render();
                return;
            }
            
            // Update controls
            controls.update();
            
            // Removed automatic Earth rotation as requested
            // earth.rotation.y += 0.0005;
            
            // If we've gone through all loaded flights, restart from the beginning
            // or load more flights if available
            if (currentFlightIndex >= flightPaths.length) {
                // If we're still loading flights, wait for more
                // If not loaded yet, still render the scene to ensure globe is visible
                
                // Otherwise, restart from the beginning of this year's flights
                currentFlightIndex = 0;
                animationStep = 0;
                
                // Reset completed airports
                completedAirports = new Set();
                
                // Reset airport markers
                for (const code in airportMarkers) {
                    airportMarkers[code].scale.set(0, 0, 0); // Hide all markers
                }
                
                // Remove all landing dots
                for (const code in landingDots) {
                    if (scene.getObjectById(landingDots[code].id)) {
                        scene.remove(landingDots[code]);
                    }
                }
                
                // Update flight info for the first flight
                updateFlightInfo(0);
            }
            
            // Animate dashed flow on all routes
            for (let k = 0; k < lineMaterials.length; k++) {
                const mat = lineMaterials[k];
                if (mat && mat.uniforms && mat.uniforms.dashOffset) {
                    mat.uniforms.dashOffset.value -= 0.002;
                }
            }

            // Animate current flight plane position and progressive line drawing
            if (currentFlightIndex < flightPaths.length) {
                const currentFlight = flightPaths[currentFlightIndex];
                const flight = currentFlight.flight;
                const points = currentFlight.points;
                
                // Calculate how many points to skip based on distance
                // This makes longer flights not take too much longer to animate
                const fromAirport = airports[flight.from];
                const toAirport = airports[flight.to];
                const distance = calculateDistance(fromAirport.lat, fromAirport.lng, toAirport.lat, toAirport.lng);
                
                let pointsToSkip = 1;
                if (distance > 5000) pointsToSkip = 3;
                else if (distance > 3000) pointsToSkip = 2;
                
                if (animationStep < points.length) {
                    // If this is the first step, add the origin airport
                    if (animationStep === 0) {
                        // Add the origin airport to the completed set
                        completedAirports.add(flight.from);
                        
                        // Make the airport marker visible
                        if (airportMarkers[flight.from]) {
                            airportMarkers[flight.from].scale.set(1, 1, 1); // Make visible
                        }
                        
                        // Add the blue dot for the origin airport
                        if (landingDots[flight.from] && !scene.getObjectById(landingDots[flight.from].id)) {
                            landingDots[flight.from].scale.set(1, 1, 1); // Make visible
                            scene.add(landingDots[flight.from]);
                        }
                    }
                    
                    // Progressive line drawing - update the current flight's line
                    if (currentFlight.isLine2) {
                        // Handle Line2 (thick lines) progressive drawing
                        const newPositions = new Float32Array((animationStep + 1) * 3);
                        for (let i = 0; i <= animationStep && i < points.length; i++) {
                            newPositions[i * 3] = points[i].x;
                            newPositions[i * 3 + 1] = points[i].y;
                            newPositions[i * 3 + 2] = points[i].z;
                        }
                        currentFlight.line.geometry.setPositions(Array.from(newPositions));
                        currentFlight.line.computeLineDistances();
                    } else {
                        // Handle basic Line progressive drawing
                        const positions = currentFlight.positions;
                        for (let i = 0; i <= animationStep && i < points.length; i++) {
                            positions[i * 3] = points[i].x;
                            positions[i * 3 + 1] = points[i].y;
                            positions[i * 3 + 2] = points[i].z;
                        }
                        currentFlight.line.geometry.attributes.position.needsUpdate = true;
                    }
                    
                    // Update plane position
                    const currentPoint = points[animationStep];
                    plane.position.copy(currentPoint);
                    plane.visible = true;
                    
                    // Skip points based on distance to speed up longer flights
                    animationStep += pointsToSkip;
                } else {
                    // Flight completed
                    // Add the destination airport to the completed set
                    completedAirports.add(flight.to);
                    
                    // Make the destination airport marker visible
                    if (airportMarkers[flight.to]) {
                        airportMarkers[flight.to].scale.set(1, 1, 1); // Make visible
                    }
                    
                    // Add blue landing dot for the destination airport
                    if (landingDots[flight.to] && !scene.getObjectById(landingDots[flight.to].id)) {
                        landingDots[flight.to].scale.set(1, 1, 1); // Make visible
                        scene.add(landingDots[flight.to]);
                    }
                    
                    // Move to the next flight
                    animationStep = 0;
                    currentFlightIndex++;
                    
                    if (currentFlightIndex < flightPaths.length) {
                        updateFlightInfo(currentFlightIndex);
                        
                        // No batch loading; all flights for the year are already built
                    } else {
                        plane.visible = false; // Hide plane when all flights are done
                    }
                }
            }
            
            // Render with bloom
            composer.render();
        }
        
        // Start animation
        animate(0);
    }
    
    // Animate flights for a given year
    function animateFlightsForYear(yearStr) {
        cleanupScene();
        currentFlightIndex = 0;
        animationStep = 0;
        flightPaths = [];
        loadingErrors = [];
        selectedYear = yearStr;
        document.getElementById('flight-info').textContent = `Loading flights from ${yearStr}...`;
        document.querySelector('.flight-year').textContent = `${yearStr} Journeys`;
        buildYearFlightPaths(yearStr);
    }

    // Set up year selector buttons
    const yearButtons = document.querySelectorAll('#year-selector .route-btn');
    yearButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const year = btn.getAttribute('data-year');
            yearButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            animateFlightsForYear(year);
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        if (bloomPass && typeof bloomPass.setSize === 'function') {
            bloomPass.setSize(window.innerWidth, window.innerHeight);
        }
        // Update line material resolution
        lineMaterials.forEach(m => m.resolution.set(window.innerWidth, window.innerHeight));
    });
    
    // Start with default year and highlight its button
    const defaultYear = (window.DEFAULT_YEAR || '2025');
    const defaultBtn = document.querySelector(`#year-selector .route-btn[data-year="${defaultYear}"]`);
    if (defaultBtn) defaultBtn.classList.add('active');
    animateFlightsForYear(defaultYear);
});
