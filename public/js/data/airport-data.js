/**
 * Airport Data - Global Airport Database
 * 
 * Contains comprehensive data for 100+ major international airports
 * Used by: index.html, sf.html, globe.html, stealth.html, test-*.html
 * 
 * Structure: { "CODE": { name, lat, lng, country } }
 * Last updated: August 13, 2025
 * 
 * IMPORTANT: All route files must reference valid airport codes from this database
 */
const airports = {
    // NORTH AMERICA - UNITED STATES (25 airports)
    "ATL": {
        name: "Hartsfield-Jackson Atlanta International Airport",
        lat: 33.6407,
        lng: -84.4277,
        country: "United States"
    },
    "LAX": {
        name: "Los Angeles International Airport",
        lat: 33.9416,
        lng: -118.4085,
        country: "United States"
    },
    "ORD": {
        name: "Chicago O'Hare International Airport",
        lat: 41.9742,
        lng: -87.9073,
        country: "United States"
    },
    "DFW": {
        name: "Dallas/Fort Worth International Airport",
        lat: 32.8998,
        lng: -97.0403,
        country: "United States"
    },
    "DEN": {
        name: "Denver International Airport",
        lat: 39.8561,
        lng: -104.6737,
        country: "United States"
    },
    "JFK": {
        name: "John F. Kennedy International Airport",
        lat: 40.6413,
        lng: -73.7781,
        country: "United States"
    },
    "SFO": {
        name: "San Francisco International Airport",
        lat: 37.6213,
        lng: -122.3790,
        country: "United States"
    },
    "SEA": {
        name: "Seattle-Tacoma International Airport",
        lat: 47.4502,
        lng: -122.3088,
        country: "United States"
    },
    "LAS": {
        name: "Harry Reid International Airport",
        lat: 36.0840,
        lng: -115.1537,
        country: "United States"
    },
    "MCO": {
        name: "Orlando International Airport",
        lat: 28.4294,
        lng: -81.3089,
        country: "United States"
    },
    "EWR": {
        name: "Newark Liberty International Airport",
        lat: 40.6895,
        lng: -74.1745,
        country: "United States"
    },
    "MIA": {
        name: "Miami International Airport",
        lat: 25.7932,
        lng: -80.2906,
        country: "United States"
    },
    "PHX": {
        name: "Phoenix Sky Harbor International Airport",
        lat: 33.4352,
        lng: -112.0101,
        country: "United States"
    },
    "IAH": {
        name: "George Bush Intercontinental Airport",
        lat: 29.9902,
        lng: -95.3368,
        country: "United States"
    },
    "BOS": {
        name: "Boston Logan International Airport",
        lat: 42.3656,
        lng: -71.0096,
        country: "United States"
    },
    "MSP": {
        name: "Minneapolis–Saint Paul International Airport",
        lat: 44.8848,
        lng: -93.2223,
        country: "United States"
    },
    "DTW": {
        name: "Detroit Metropolitan Wayne County Airport",
        lat: 42.2162,
        lng: -83.3554,
        country: "United States"
    },
    "FLL": {
        name: "Fort Lauderdale–Hollywood International Airport",
        lat: 26.0742,
        lng: -80.1506,
        country: "United States"
    },
    "LGA": {
        name: "LaGuardia Airport",
        lat: 40.7769,
        lng: -73.8740,
        country: "United States"
    },
    "BWI": {
        name: "Baltimore/Washington International Airport",
        lat: 39.1774,
        lng: -76.6684,
        country: "United States"
    },
    "PHL": {
        name: "Philadelphia International Airport",
        lat: 39.8744,
        lng: -75.2424,
        country: "United States"
    },
    "SAN": {
        name: "San Diego International Airport",
        lat: 32.7338,
        lng: -117.1933,
        country: "United States"
    },
    "IAD": {
        name: "Washington Dulles International Airport",
        lat: 38.9531,
        lng: -77.4565,
        country: "United States"
    },
    "CLT": {
        name: "Charlotte Douglas International Airport",
        lat: 35.2140,
        lng: -80.9431,
        country: "United States"
    },
    "DCA": {
        name: "Ronald Reagan Washington National Airport",
        lat: 38.8512,
        lng: -77.0402,
        country: "United States"
    },
    "HNL": {
        name: "Daniel K. Inouye International Airport",
        lat: 21.3245,
        lng: -157.9250,
        country: "United States"
    },
    "OGG": {
        name: "Kahului Airport",
        lat: 20.8986,
        lng: -156.4305,
        country: "United States"
    },
    "KOA": {
        name: "Ellison Onizuka Kona International Airport",
        lat: 19.7388,
        lng: -156.0456,
        country: "United States"
    },
    "LIH": {
        name: "Lihue Airport",
        lat: 21.9760,
        lng: -159.3390,
        country: "United States"
    },
    "ANC": {
        name: "Ted Stevens Anchorage International Airport",
        lat: 61.1742,
        lng: -149.9962,
        country: "United States"
    },
    
    // NORTH AMERICA - CANADA (5 airports)
    "YYZ": {
        name: "Toronto Pearson International Airport",
        lat: 43.6777,
        lng: -79.6248,
        country: "Canada"
    },
    "YVR": {
        name: "Vancouver International Airport",
        lat: 49.1967,
        lng: -123.1815,
        country: "Canada"
    },
    "YUL": {
        name: "Montréal-Pierre Elliott Trudeau International Airport",
        lat: 45.4706,
        lng: -73.7408,
        country: "Canada"
    },
    "YYC": {
        name: "Calgary International Airport",
        lat: 51.1215,
        lng: -114.0076,
        country: "Canada"
    },
    "YEG": {
        name: "Edmonton International Airport",
        lat: 53.3097,
        lng: -113.5800,
        country: "Canada"
    },
    
    // MEXICO, CENTRAL AMERICA & CARIBBEAN (8 airports)
    "MEX": {
        name: "Mexico City International Airport",
        lat: 19.4361,
        lng: -99.0719,
        country: "Mexico"
    },
    "CUN": {
        name: "Cancún International Airport",
        lat: 21.0365,
        lng: -86.8771,
        country: "Mexico"
    },
    "GDL": {
        name: "Guadalajara International Airport",
        lat: 20.5218,
        lng: -103.3111,
        country: "Mexico"
    },
    "MTY": {
        name: "Monterrey International Airport",
        lat: 25.7785,
        lng: -100.1069,
        country: "Mexico"
    },
    "SJO": {
        name: "Juan Santamaría International Airport",
        lat: 9.9981,
        lng: -84.2041,
        country: "Costa Rica"
    },
    "LIR": {
        name: "Daniel Oduber Quirós International Airport",
        lat: 10.5933,
        lng: -85.5444,
        country: "Costa Rica"
    },
    "PTY": {
        name: "Tocumen International Airport",
        lat: 9.0713,
        lng: -79.3834,
        country: "Panama"
    },
    "GUA": {
        name: "La Aurora International Airport",
        lat: 14.5833,
        lng: -90.5275,
        country: "Guatemala"
    },
    "SAL": {
        name: "El Salvador International Airport",
        lat: 13.4409,
        lng: -89.0557,
        country: "El Salvador"
    },
    "MBJ": {
        name: "Sangster International Airport",
        lat: 18.5037,
        lng: -77.9134,
        country: "Jamaica"
    },
    "PUJ": {
        name: "Punta Cana International Airport",
        lat: 18.5674,
        lng: -68.3725,
        country: "Dominican Republic"
    },
    
    // SOUTH AMERICA (10 airports)
    "GRU": {
        name: "São Paulo/Guarulhos International Airport",
        lat: -23.4356,
        lng: -46.4731,
        country: "Brazil"
    },
    "GIG": {
        name: "Rio de Janeiro/Galeão International Airport",
        lat: -22.8099,
        lng: -43.2506,
        country: "Brazil"
    },
    "EZE": {
        name: "Ministro Pistarini International Airport",
        lat: -34.8222,
        lng: -58.5358,
        country: "Argentina"
    },
    "AEP": {
        name: "Jorge Newbery Airpark",
        lat: -34.5592,
        lng: -58.4156,
        country: "Argentina"
    },
    "RES": {
        name: "Resistencia International Airport",
        lat: -27.4511,
        lng: -59.0561,
        country: "Argentina"
    },
    "CNQ": {
        name: "Doctor Fernando Piragine Niveyro International Airport",
        lat: -27.4455,
        lng: -58.7619,
        country: "Argentina"
    },
    "SCL": {
        name: "Santiago International Airport",
        lat: -33.3930,
        lng: -70.7858,
        country: "Chile"
    },
    "BOG": {
        name: "El Dorado International Airport",
        lat: 4.7016,
        lng: -74.1469,
        country: "Colombia"
    },
    "LIM": {
        name: "Jorge Chávez International Airport",
        lat: -12.0219,
        lng: -77.1143,
        country: "Peru"
    },
    "UIO": {
        name: "Mariscal Sucre International Airport",
        lat: -0.1292,
        lng: -78.3574,
        country: "Ecuador"
    },
    "CCS": {
        name: "Simón Bolívar International Airport",
        lat: 10.6013,
        lng: -66.9910,
        country: "Venezuela"
    },
    "MVD": {
        name: "Carrasco International Airport",
        lat: -34.8383,
        lng: -56.0308,
        country: "Uruguay"
    },
    "ASU": {
        name: "Silvio Pettirossi International Airport",
        lat: -25.2397,
        lng: -57.5195,
        country: "Paraguay"
    },
    
    // EUROPE (22 airports)
    "LHR": {
        name: "London Heathrow Airport",
        lat: 51.4700,
        lng: -0.4543,
        country: "United Kingdom"
    },
    "CDG": {
        name: "Paris Charles de Gaulle Airport",
        lat: 49.0097,
        lng: 2.5479,
        country: "France"
    },
    "FRA": {
        name: "Frankfurt Airport",
        lat: 50.0379,
        lng: 8.5622,
        country: "Germany"
    },
    "AMS": {
        name: "Amsterdam Airport Schiphol",
        lat: 52.3105,
        lng: 4.7683,
        country: "Netherlands"
    },
    "MAD": {
        name: "Adolfo Suárez Madrid–Barajas Airport",
        lat: 40.4983,
        lng: -3.5676,
        country: "Spain"
    },
    "BCN": {
        name: "Barcelona–El Prat Airport",
        lat: 41.2971,
        lng: 2.0785,
        country: "Spain"
    },
    "FCO": {
        name: "Leonardo da Vinci–Fiumicino Airport",
        lat: 41.8045,
        lng: 12.2508,
        country: "Italy"
    },
    "MXP": {
        name: "Milan Malpensa Airport",
        lat: 45.6306,
        lng: 8.7281,
        country: "Italy"
    },
    "ZRH": {
        name: "Zurich Airport",
        lat: 47.4647,
        lng: 8.5492,
        country: "Switzerland"
    },
    "VIE": {
        name: "Vienna International Airport",
        lat: 48.1103,
        lng: 16.5697,
        country: "Austria"
    },
    "MUC": {
        name: "Munich Airport",
        lat: 48.3538,
        lng: 11.7861,
        country: "Germany"
    },
    "CPH": {
        name: "Copenhagen Airport",
        lat: 55.6180,
        lng: 12.6508,
        country: "Denmark"
    },
    "OSL": {
        name: "Oslo Airport, Gardermoen",
        lat: 60.1976,
        lng: 11.0004,
        country: "Norway"
    },
    "ARN": {
        name: "Stockholm Arlanda Airport",
        lat: 59.6498,
        lng: 17.9239,
        country: "Sweden"
    },
    "HEL": {
        name: "Helsinki Airport",
        lat: 60.3183,
        lng: 24.9497,
        country: "Finland"
    },
    "DUB": {
        name: "Dublin Airport",
        lat: 53.4264,
        lng: -6.2499,
        country: "Ireland"
    },
    "LIS": {
        name: "Lisbon Airport",
        lat: 38.7756,
        lng: -9.1354,
        country: "Portugal"
    },
    "ATH": {
        name: "Athens International Airport",
        lat: 37.9364,
        lng: 23.9475,
        country: "Greece"
    },
    "IST": {
        name: "Istanbul Airport",
        lat: 41.2608,
        lng: 28.7418,
        country: "Turkey"
    },
    "SAW": {
        name: "Sabiha Gökçen International Airport",
        lat: 40.8986,
        lng: 29.3092,
        country: "Turkey"
    },
    "PMI": {
        name: "Palma de Mallorca Airport",
        lat: 39.5517,
        lng: 2.7388,
        country: "Spain"
    },
    "KEF": {
        name: "Keflavík International Airport",
        lat: 63.9850,
        lng: -22.6056,
        country: "Iceland"
    },
    "TBS": {
        name: "Tbilisi International Airport",
        lat: 41.6692,
        lng: 44.9547,
        country: "Georgia"
    },
    "JMK": {
        name: "Mykonos International Airport",
        lat: 37.4351,
        lng: 25.3479,
        country: "Greece"
    },
    
    // RUSSIA & CIS (3 airports)
    "SVO": {
        name: "Sheremetyevo International Airport",
        lat: 55.9736,
        lng: 37.4125,
        country: "Russia"
    },
    "DME": {
        name: "Moscow Domodedovo Airport",
        lat: 55.4103,
        lng: 37.9025,
        country: "Russia"
    },
    "KBP": {
        name: "Boryspil International Airport",
        lat: 50.3452,
        lng: 30.8947,
        country: "Ukraine"
    },
    
    // MIDDLE EAST (10 airports)
    "DXB": {
        name: "Dubai International Airport",
        lat: 25.2532,
        lng: 55.3657,
        country: "United Arab Emirates"
    },
    "AUH": {
        name: "Abu Dhabi International Airport",
        lat: 24.4330,
        lng: 54.6511,
        country: "United Arab Emirates"
    },
    "DOH": {
        name: "Hamad International Airport",
        lat: 25.2609,
        lng: 51.6138,
        country: "Qatar"
    },
    "RUH": {
        name: "King Khalid International Airport",
        lat: 24.9576,
        lng: 46.6988,
        country: "Saudi Arabia"
    },
    "JED": {
        name: "King Abdulaziz International Airport",
        lat: 21.6805,
        lng: 39.1505,
        country: "Saudi Arabia"
    },
    "TLV": {
        name: "Ben Gurion Airport",
        lat: 32.0114,
        lng: 34.8866,
        country: "Israel"
    },
    "CAI": {
        name: "Cairo International Airport",
        lat: 30.1219,
        lng: 31.4056,
        country: "Egypt"
    },
    "BAH": {
        name: "Bahrain International Airport",
        lat: 26.2708,
        lng: 50.6337,
        country: "Bahrain"
    },
    "KWI": {
        name: "Kuwait International Airport",
        lat: 29.2266,
        lng: 47.9689,
        country: "Kuwait"
    },
    "AMM": {
        name: "Queen Alia International Airport",
        lat: 31.7225,
        lng: 35.9932,
        country: "Jordan"
    },
    
    // AFRICA (7 airports)
    "JNB": {
        name: "O.R. Tambo International Airport",
        lat: -26.1392,
        lng: 28.2460,
        country: "South Africa"
    },
    "CPT": {
        name: "Cape Town International Airport",
        lat: -33.9649,
        lng: 18.6017,
        country: "South Africa"
    },
    "RAK": {
        name: "Marrakesh Menara Airport",
        lat: 31.6069,
        lng: -8.0363,
        country: "Morocco"
    },
    "CMN": {
        name: "Mohammed V International Airport",
        lat: 33.3675,
        lng: -7.5899,
        country: "Morocco"
    },
    "NBO": {
        name: "Jomo Kenyatta International Airport",
        lat: -1.3192,
        lng: 36.9278,
        country: "Kenya"
    },
    "ADD": {
        name: "Addis Ababa Bole International Airport",
        lat: 8.9778,
        lng: 38.7994,
        country: "Ethiopia"
    },
    "LOS": {
        name: "Murtala Muhammed International Airport",
        lat: 6.5774,
        lng: 3.3216,
        country: "Nigeria"
    },
    
    // ASIA (15 airports)
    "PEK": {
        name: "Beijing Capital International Airport",
        lat: 40.0799,
        lng: 116.6031,
        country: "China"
    },
    "PVG": {
        name: "Shanghai Pudong International Airport",
        lat: 31.1443,
        lng: 121.8083,
        country: "China"
    },
    "TSA": {
        name: "Taipei Songshan Airport",
        lat: 25.0697,
        lng: 121.5522,
        country: "Taiwan"
    },
    "CAN": {
        name: "Guangzhou Baiyun International Airport",
        lat: 23.3959,
        lng: 113.3080,
        country: "China"
    },
    "HKG": {
        name: "Hong Kong International Airport",
        lat: 22.3080,
        lng: 113.9185,
        country: "Hong Kong"
    },
    "TPE": {
        name: "Taiwan Taoyuan International Airport",
        lat: 25.0797,
        lng: 121.2342,
        country: "Taiwan"
    },
    "NRT": {
        name: "Tokyo Narita International Airport",
        lat: 35.7720,
        lng: 140.3929,
        country: "Japan"
    },
    "HND": {
        name: "Tokyo Haneda International Airport",
        lat: 35.5533,
        lng: 139.7810,
        country: "Japan"
    },
    "KIX": {
        name: "Kansai International Airport",
        lat: 34.4347,
        lng: 135.2440,
        country: "Japan"
    },
    "ICN": {
        name: "Incheon International Airport",
        lat: 37.4602,
        lng: 126.4407,
        country: "South Korea"
    },
    "SIN": {
        name: "Singapore Changi Airport",
        lat: 1.3644,
        lng: 103.9915,
        country: "Singapore"
    },
    "BKK": {
        name: "Suvarnabhumi Airport",
        lat: 13.6900,
        lng: 100.7501,
        country: "Thailand"
    },
    "KUL": {
        name: "Kuala Lumpur International Airport",
        lat: 2.7456,
        lng: 101.7099,
        country: "Malaysia"
    },
    "MNL": {
        name: "Ninoy Aquino International Airport",
        lat: 14.5086,
        lng: 121.0197,
        country: "Philippines"
    },
    "DEL": {
        name: "Indira Gandhi International Airport",
        lat: 28.5562,
        lng: 77.1000,
        country: "India"
    },
    "BOM": {
        name: "Chhatrapati Shivaji Maharaj International Airport",
        lat: 19.0896,
        lng: 72.8656,
        country: "India"
    },
    "CGK": {
        name: "Soekarno-Hatta International Airport",
        lat: -6.1256,
        lng: 106.6558,
        country: "Indonesia"
    },
    
    // OCEANIA (5 airports)
    "SYD": {
        name: "Sydney Kingsford Smith Airport",
        lat: -33.9399,
        lng: 151.1753,
        country: "Australia"
    },
    "MEL": {
        name: "Melbourne Airport",
        lat: -37.6690,
        lng: 144.8410,
        country: "Australia"
    },
    "BNE": {
        name: "Brisbane Airport",
        lat: -27.3842,
        lng: 153.1175,
        country: "Australia"
    },
    "AKL": {
        name: "Auckland Airport",
        lat: -37.0082,
        lng: 174.7850,
        country: "New Zealand"
    },
    "PPT": {
        name: "Tahiti Faa'a International Airport",
        lat: -17.5555,
        lng: -149.6113,
        country: "French Polynesia"
    },
    
    // CARIBBEAN (1 airport)
    "TTT": {
        name: "Trinidad and Tobago Airport (Tobago)",
        lat: 11.1497,
        lng: -60.8322,
        country: "Trinidad and Tobago"
    }
};

// Support Node/CommonJS without breaking browsers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = airports;
}