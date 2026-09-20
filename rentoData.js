import {
  Camera, Bike, Gamepad2, Tent, Wrench, Music2, Sofa, BookOpen,
  Car, PartyPopper, Cpu
} from "lucide-react";

export const CATEGORIES = [
  { name: "Electronics", icon: Cpu },
  { name: "Cameras", icon: Camera },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Vehicles", icon: Car },
  { name: "Bikes", icon: Bike },
  { name: "Tools", icon: Wrench },
  { name: "Sports", icon: PartyPopper },
  { name: "Camping", icon: Tent },
  { name: "Books", icon: BookOpen },
  { name: "Musical Instruments", icon: Music2 },
  { name: "Event Equipment", icon: PartyPopper },
  { name: "Furniture", icon: Sofa },
];

export const CATEGORY_SPECS = {
  Cameras: [
    { key: "Lens Mount", placeholder: "e.g. Sony E-Mount, Canon RF", default: "Sony E-Mount" },
    { key: "Sensor Resolution", placeholder: "e.g. 24.2 MP Full-Frame", default: "24.2 MP Full-Frame" },
    { key: "Video Capability", placeholder: "e.g. 4K 60fps 10-bit", default: "4K 30fps HDR" },
    { key: "Included Lens", placeholder: "e.g. 28-70mm f/3.5-5.6 OSS", default: "Body only + 28-70mm kit" }
  ],
  Bikes: [
    { key: "Frame Size", placeholder: "e.g. Medium (17.5\")", default: "Medium (17.5\")" },
    { key: "Gear System", placeholder: "e.g. Shimano Altus 2x8 speed", default: "Shimano 21-Speed" },
    { key: "Brake Type", placeholder: "e.g. Hydraulic Disc Brakes", default: "Hydraulic Disc" },
    { key: "Helmet & Lock Included", placeholder: "Yes / No", default: "Yes (helmet + combo lock)" }
  ],
  Electronics: [
    { key: "Processor", placeholder: "e.g. Apple M3 Pro / Intel i7", default: "Apple M3 (8-Core)" },
    { key: "RAM", placeholder: "e.g. 16 GB Unified Memory", default: "16 GB" },
    { key: "Storage", placeholder: "e.g. 512 GB NVMe SSD", default: "512 GB SSD" },
    { key: "Operating System", placeholder: "e.g. macOS Sonoma / Windows 11", default: "macOS" }
  ],
  Gaming: [
    { key: "Platform Edition", placeholder: "e.g. Disc Edition / Digital", default: "Standard Disc Edition" },
    { key: "Controllers Included", placeholder: "e.g. 2x DualSense Wireless", default: "2x DualSense Controllers" },
    { key: "Storage Capacity", placeholder: "e.g. 825 GB SSD + 1TB expanded", default: "1 TB High-Speed SSD" },
    { key: "Pre-installed Games", placeholder: "e.g. FIFA 24, Spider-Man 2", default: "Spider-Man 2, Gran Turismo 7" }
  ],
  Camping: [
    { key: "Sleeping Capacity", placeholder: "e.g. 4 Persons", default: "4 Adults" },
    { key: "Total Weight", placeholder: "e.g. 3.8 kg", default: "3.8 kg (compact carry bag)" },
    { key: "Weather Rating", placeholder: "e.g. 3-Season / Waterproof 3000mm", default: "3-Season (3000mm hydrostatic)" },
    { key: "Setup Type", placeholder: "e.g. Pop-up / Dual aluminum poles", default: "Poles with color-coded clips" }
  ],
  Tools: [
    { key: "Power Source", placeholder: "e.g. Cordless 18V Li-Ion", default: "18V Cordless Li-Ion" },
    { key: "Batteries Included", placeholder: "e.g. 2x 4.0Ah batteries + fast charger", default: "2x 4.0Ah Batteries + Fast Charger" },
    { key: "Chuck Size", placeholder: "e.g. 1/2-inch Keyless Metal Chuck", default: "13mm (1/2\") Keyless" },
    { key: "Carrying Case", placeholder: "e.g. Heavy duty L-BOXX", default: "Bosch Heavy-Duty Case" }
  ]
};

export const SAMPLE_PHOTOS = [
  { label: "Sony A7 III Camera", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" },
  { label: "PlayStation 5 Console", url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop" },
  { label: "DJI Drone Kit", url: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1200&auto=format&fit=crop" },
  { label: "Trek Mountain Bike", url: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1200&auto=format&fit=crop" },
  { label: "Fender Guitar", url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop" },
  { label: "MacBook Pro Laptop", url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop" },
  { label: "Camping Tent & Gear", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop" },
  { label: "Pioneer DJ Audio Mixer", url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop" },
  { label: "Bosch Professional Drill", url: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=1200&auto=format&fit=crop" }
];

export const REJECTION_REASONS = [
  "Image quality is insufficient. Photos must be clear, well-lit, and show all angles.",
  "Product description is incomplete or lacks key specifications.",
  "Prohibited item under Rento safety and community guidelines.",
  "Security deposit or rental price is unrealistically high or low.",
  "Item condition appears damaged or not ready for safe peer rental."
];

export const INITIAL_LISTINGS = [
  {
    id: 1,
    title: "Sony A7 III Mirrorless Kit",
    category: "Cameras",
    price: 800,
    weekly: 4800,
    monthly: 17500,
    deposit: 6000,
    deliveryFee: 150,
    rating: 4.9,
    reviews: 62,
    views: 840,
    favoritesCount: 38,
    rentalCount: 14,
    earnings: 28400,
    location: "Koramangala, Bengaluru",
    area: "Koramangala 4th Block",
    city: "Bengaluru",
    pincode: "560034",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Aditya R.",
    ownerId: "user_aditya",
    condition: "Like new",
    brand: "Sony",
    model: "ILCE-7M3",
    yearPurchased: "2023",
    description: "Full-frame mirrorless camera suitable for high-end photography, documentary video, and event coverage. Excellent low-light performance and 4K HDR.",
    includedAccessories: "Camera body, 28-70mm OSS lens, 2x genuine NP-FZ100 batteries, dual charger, SanDisk Extreme Pro 64GB SD card, and padded camera shoulder bag.",
    quantity: 1,
    specifications: [
      { key: "Sensor", value: "24.2 MP Full-Frame Exmor R BSI CMOS" },
      { key: "Lens Mount", value: "Sony E-Mount" },
      { key: "Video", value: "4K 30fps HDR, 1080p 120fps slow-motion" },
      { key: "Stabilization", value: "5-Axis In-Body Optical SteadyShot" }
    ],
    rules: [
      "Valid Government ID required at handover",
      "No outdoor use in heavy rain or sandstorms",
      "Do not touch or clean image sensor directly",
      "Return in clean original condition with both batteries charged"
    ],
    minDays: 1,
    maxDays: 14,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 12,
    pickupInstructions: "Meet at reception of 4th Block Club Road. 15-minute quick walkthrough of equipment condition before handover.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [
      { date: "2026-09-10 11:30 AM", action: "SUBMITTED", by: "Aditya R." },
      { date: "2026-09-10 01:15 PM", action: "APPROVED", by: "Admin (Siddharth K.)", note: "Verified images and serial info." }
    ],
    blockedDates: ["2026-09-28", "2026-09-29"],
    bookings: [
      {
        id: "b_101",
        renter: "Vivek Chandra",
        startDate: "2026-09-18",
        endDate: "2026-09-20",
        days: 3,
        total: 2592,
        status: "Pending",
        handoverOwnerConfirmed: false,
        handoverRenterConfirmed: false
      }
    ],
    featured: true
  },
  {
    id: 2,
    title: "PlayStation 5 + 2 Controllers",
    category: "Gaming",
    price: 700,
    weekly: 3900,
    monthly: 14000,
    deposit: 5000,
    deliveryFee: 100,
    rating: 4.8,
    reviews: 140,
    views: 1220,
    favoritesCount: 74,
    rentalCount: 28,
    earnings: 32600,
    location: "Andheri West, Mumbai",
    area: "Lokhandwala",
    city: "Mumbai",
    pincode: "400053",
    img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Meera S.",
    ownerId: "user_meera",
    condition: "Excellent",
    brand: "Sony Interactive",
    model: "PS5 Disc Edition",
    yearPurchased: "2023",
    description: "PS5 console with lightning-fast ultra-high speed SSD, ray tracing, 4K 120Hz support, and haptic feedback. Comes with 2 controllers and popular pre-installed games.",
    includedAccessories: "Console, 2 DualSense controllers, HDMI 2.1 cable, power cord, charging dock.",
    quantity: 1,
    specifications: [
      { key: "Storage", value: "825 GB SSD" },
      { key: "Output", value: "4K 120Hz / 8K Support" },
      { key: "Audio", value: "Tempest 3D AudioTech" }
    ],
    rules: [
      "Valid Government ID required",
      "Keep in well-ventilated area to avoid overheating",
      "No food or beverages next to controllers"
    ],
    minDays: 2,
    maxDays: 20,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 10,
    pickupInstructions: "Pickup near Lokhandwala Complex circle.",
    approvalMode: "instant",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [
      { date: "2026-09-08 09:00 AM", action: "APPROVED", by: "Admin" }
    ],
    blockedDates: ["2026-09-22", "2026-09-23", "2026-09-24"],
    bookings: [
      {
        id: "b_102",
        renter: "Ananya Bose",
        startDate: "2026-09-22",
        endDate: "2026-09-24",
        days: 3,
        total: 2268,
        status: "Accepted",
        handoverOwnerConfirmed: true,
        handoverRenterConfirmed: true
      }
    ],
    featured: true
  },
  {
    id: 3,
    title: "Epson Home Cinema Projector",
    category: "Electronics",
    price: 600,
    weekly: 3200,
    monthly: 11000,
    deposit: 4000,
    deliveryFee: 120,
    rating: 4.7,
    reviews: 38,
    views: 410,
    favoritesCount: 19,
    rentalCount: 9,
    earnings: 12800,
    location: "Baner, Pune",
    area: "Baner Road",
    city: "Pune",
    pincode: "411045",
    img: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1615751072497-5f5169febe17?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Rohan K.",
    ownerId: "user_rohan",
    condition: "Good",
    brand: "Epson",
    model: "EH-TW7100 4K PRO-UHD",
    yearPurchased: "2022",
    description: "Bright 3,000 lumens 4K projector perfect for movie nights, sports screenings, and terrace gatherings. Easy HDMI plug-and-play with any laptop or Fire TV Stick.",
    includedAccessories: "Projector, remote, 5m HDMI cord, power cable, portable tripod stand.",
    quantity: 1,
    specifications: [
      { key: "Brightness", value: "3000 ANSI Lumens" },
      { key: "Resolution", value: "4K PRO-UHD" },
      { key: "Screen Size", value: "Up to 300 inches" }
    ],
    rules: ["Handle lamp lens carefully", "Allow 5-min cooldown before unplugging"],
    minDays: 1,
    maxDays: 7,
    pickupAvailable: true,
    deliveryAvailable: false,
    deliveryRadius: 0,
    pickupInstructions: "Self-pickup from Baner high street.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [{ date: "2026-09-05", action: "APPROVED", by: "Admin" }],
    blockedDates: [],
    bookings: [],
    featured: false
  },
  {
    id: 4,
    title: "Trek Marlin 7 Mountain Bike",
    category: "Bikes",
    price: 500,
    weekly: 2800,
    monthly: 9000,
    deposit: 3000,
    deliveryFee: 200,
    rating: 4.9,
    reviews: 27,
    views: 650,
    favoritesCount: 42,
    rentalCount: 16,
    earnings: 15400,
    location: "HSR Layout, Bengaluru",
    area: "Sector 2, HSR",
    city: "Bengaluru",
    pincode: "560102",
    img: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Priya N.",
    ownerId: "user_priya",
    condition: "Excellent",
    brand: "Trek",
    model: "Marlin 7 Gen 3",
    yearPurchased: "2023",
    description: "Trail-ready mountain bike with RockShox suspension fork, wide-range 1x10 drivetrain, and hydraulic disc brakes. Perfect for weekend trails in Turahalli or city rides.",
    includedAccessories: "Helmet, heavy-duty U-lock, water bottle cage, USB rechargeable front/rear lights.",
    quantity: 1,
    specifications: [
      { key: "Frame Size", value: "Medium (M) 29-inch wheels" },
      { key: "Fork", value: "RockShox Judy 100mm travel" },
      { key: "Drivetrain", value: "Shimano Deore 1x10 speed" }
    ],
    rules: ["Always wear provided helmet", "Lock frame and wheels when parking in public"],
    minDays: 1,
    maxDays: 14,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 15,
    pickupInstructions: "Pickup near HSR BDA Complex.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [{ date: "2026-09-02", action: "APPROVED", by: "Admin" }],
    blockedDates: [],
    bookings: [],
    featured: true
  },
  {
    id: 5,
    title: "Fender Acoustic Guitar",
    category: "Musical Instruments",
    price: 300,
    weekly: 1600,
    monthly: 5200,
    deposit: 2000,
    deliveryFee: 100,
    rating: 5.0,
    reviews: 19,
    views: 310,
    favoritesCount: 15,
    rentalCount: 7,
    earnings: 6300,
    location: "Indiranagar, Bengaluru",
    area: "12th Main, Indiranagar",
    city: "Bengaluru",
    pincode: "560038",
    img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Kabir M.",
    ownerId: "user_kabir",
    condition: "Good",
    brand: "Fender",
    model: "FA-125 Dreadnought",
    yearPurchased: "2022",
    description: "Warm, rich acoustic sound with spruce top and mahogany back/sides. Freshly strung with D'Addario phosphor bronze strings.",
    includedAccessories: "Padded gig bag, digital clip-on tuner, capo, and 4 picks.",
    quantity: 1,
    specifications: [
      { key: "Body Shape", value: "Dreadnought" },
      { key: "Top Wood", value: "Laminated Spruce" }
    ],
    rules: ["Do not expose to high heat or moisture", "Always store in gig bag when not in use"],
    minDays: 2,
    maxDays: 30,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 8,
    pickupInstructions: "Indiranagar Metro station exit B.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [{ date: "2026-09-01", action: "APPROVED", by: "Admin" }],
    blockedDates: [],
    bookings: [],
    featured: false
  },
  {
    id: 6,
    title: "Bosch Professional Power Drill",
    category: "Tools",
    price: 250,
    weekly: 1300,
    monthly: 4200,
    deposit: 1500,
    deliveryFee: 80,
    rating: 4.6,
    reviews: 44,
    views: 420,
    favoritesCount: 18,
    rentalCount: 22,
    earnings: 11200,
    location: "Wakad, Pune",
    area: "Datta Mandir Road",
    city: "Pune",
    pincode: "411057",
    img: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Sameer D.",
    ownerId: "user_sameer",
    condition: "Good",
    brand: "Bosch",
    model: "GSB 18V-50 Brushless",
    yearPurchased: "2023",
    description: "Robust cordless impact drill and driver suitable for concrete masonry, wood, and metal drilling. Brushless motor for maximum endurance.",
    includedAccessories: "2x 18V 4.0Ah batteries, fast charger, 30-piece masonry & screwdriver bit set, carry case.",
    quantity: 1,
    specifications: [
      { key: "Max Torque", value: "50 Nm" },
      { key: "Chuck Capacity", value: "1.5 - 13 mm" }
    ],
    rules: ["Use safety eyewear", "Do not operate beyond rated bit capacities"],
    minDays: 1,
    maxDays: 7,
    pickupAvailable: true,
    deliveryAvailable: false,
    deliveryRadius: 0,
    pickupInstructions: "Wakad near Ginger Hotel.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [{ date: "2026-08-25", action: "APPROVED", by: "Admin" }],
    blockedDates: [],
    bookings: [],
    featured: false
  },
  {
    id: 7,
    title: "Pioneer DJ Speaker Set",
    category: "Event Equipment",
    price: 1000,
    weekly: 5600,
    monthly: 19000,
    deposit: 7000,
    deliveryFee: 250,
    rating: 4.8,
    reviews: 33,
    views: 780,
    favoritesCount: 39,
    rentalCount: 18,
    earnings: 26000,
    location: "Powai, Mumbai",
    area: "Hiranandani Gardens",
    city: "Mumbai",
    pincode: "400076",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Neha T.",
    ownerId: "user_neha",
    condition: "Excellent",
    brand: "Pioneer DJ",
    model: "VM-80 Active Pair",
    yearPurchased: "2023",
    description: "High-power active monitor speakers delivering crystal clear punchy bass for house parties, DJ events, and private gatherings.",
    includedAccessories: "2x active monitors, 2x floor stands, XLR and RCA audio cables, power cords.",
    quantity: 1,
    specifications: [
      { key: "Power", value: "120W Class D with DSP" },
      { key: "Frequency", value: "34 Hz - 36 kHz" }
    ],
    rules: ["Avoid water/drink spills", "Do not run above peak distortion threshold"],
    minDays: 1,
    maxDays: 5,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 18,
    pickupInstructions: "Pickup at Powai Galleria.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [{ date: "2026-08-28", action: "APPROVED", by: "Admin" }],
    blockedDates: [],
    bookings: [],
    featured: true
  },
  {
    id: 8,
    title: "4-Person Camping Tent + Gear",
    category: "Camping",
    price: 400,
    weekly: 2100,
    monthly: 7000,
    deposit: 2500,
    deliveryFee: 150,
    rating: 4.7,
    reviews: 21,
    views: 390,
    favoritesCount: 22,
    rentalCount: 11,
    earnings: 9800,
    location: "Whitefield, Bengaluru",
    area: "ITPL Main Road",
    city: "Bengaluru",
    pincode: "560066",
    img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Arjun V.",
    ownerId: "user_arjun",
    condition: "Like new",
    brand: "Quechua / Decathlon",
    model: "MH100 4-Person Waterproof",
    yearPurchased: "2023",
    description: "Self-supporting waterproof dome tent for 4 campers. Sets up in 8 minutes. Includes 2 sleeping mats and rechargeable LED camp lantern.",
    includedAccessories: "Tent flysheet, bedroom compartment, pegs, guy ropes, 2 sleeping mats, lantern.",
    quantity: 1,
    specifications: [
      { key: "Waterproofness", value: "2000 mm / sq meter / hour" },
      { key: "Weight", value: "4.9 kg complete kit" }
    ],
    rules: ["Dry and clean completely before packing back into sleeve", "No open flames inside tent"],
    minDays: 2,
    maxDays: 10,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 10,
    pickupInstructions: "Whitefield near Forum Shantiniketan.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [{ date: "2026-08-30", action: "APPROVED", by: "Admin" }],
    blockedDates: [],
    bookings: [],
    featured: false
  },
  {
    id: 9,
    title: "MacBook Pro 14-inch M3",
    category: "Electronics",
    price: 900,
    weekly: 5200,
    monthly: 18500,
    deposit: 8000,
    deliveryFee: 150,
    rating: 4.9,
    reviews: 51,
    views: 1100,
    favoritesCount: 56,
    rentalCount: 20,
    earnings: 31000,
    location: "Viman Nagar, Pune",
    area: "Near Phoenix Marketcity",
    city: "Pune",
    pincode: "411014",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Ishaan P.",
    ownerId: "user_ishaan",
    condition: "Like new",
    brand: "Apple",
    model: "MacBook Pro 14-inch (M3)",
    yearPurchased: "2024",
    description: "M3 chip with 8-core CPU and 10-core GPU, Liquid Retina XDR display with ProMotion 120Hz. Perfect for video editing, iOS compiling, and intensive creative work.",
    includedAccessories: "70W USB-C Power Adapter, 2m MagSafe 3 braided cable, protective sleeve.",
    quantity: 1,
    specifications: [
      { key: "Chip", value: "Apple M3 (8-Core CPU / 10-Core GPU)" },
      { key: "Memory", value: "16 GB Unified RAM" },
      { key: "Storage", value: "512 GB SSD" }
    ],
    rules: ["Sign out of all personal Apple IDs before return", "No food or drinks near keyboard"],
    minDays: 2,
    maxDays: 30,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 15,
    pickupInstructions: "Viman Nagar near Symbiosis Law School.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [{ date: "2026-09-01", action: "APPROVED", by: "Admin" }],
    blockedDates: [],
    bookings: [],
    featured: true
  },
  {
    id: 10,
    title: "Mid-Century Lounge Chair",
    category: "Furniture",
    price: 350,
    weekly: 1900,
    monthly: 6500,
    deposit: 2000,
    deliveryFee: 300,
    rating: 4.8,
    reviews: 14,
    views: 290,
    favoritesCount: 17,
    rentalCount: 6,
    earnings: 4800,
    location: "Bandra West, Mumbai",
    area: "Pali Hill",
    city: "Mumbai",
    pincode: "400050",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Zara F.",
    ownerId: "user_zara",
    condition: "Excellent",
    brand: "Urban Ladder",
    model: "Teak Velvet Accent Chair",
    yearPurchased: "2023",
    description: "Sophisticated retro accent armchair crafted with solid teak wood and stain-resistant velvet fabric. Ideal for photo shoots, staging, and film sets.",
    includedAccessories: "Matching lumbar pillow, floor protective felt pads.",
    quantity: 1,
    specifications: [
      { key: "Material", value: "Kiln-dried solid Teak Wood + Velvet" },
      { key: "Dimensions", value: "32\"H x 28\"W x 30\"D" }
    ],
    rules: ["Dry vacuum only", "No smoking or pets directly on fabric"],
    minDays: 1,
    maxDays: 14,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 10,
    pickupInstructions: "Pali Hill near Candies.",
    approvalMode: "manual",
    status: "PUBLISHED",
    rejectionReason: null,
    approvalHistory: [{ date: "2026-08-20", action: "APPROVED", by: "Admin" }],
    blockedDates: [],
    bookings: [],
    featured: false
  },
  // Item 11: Pre-configured PENDING_APPROVAL item so the user can immediately test Admin Approval out of the box!
  {
    id: 11,
    title: "DJI Mini 4 Pro Drone Fly More Combo",
    category: "Cameras",
    price: 950,
    weekly: 5500,
    monthly: 19500,
    deposit: 7500,
    deliveryFee: 150,
    rating: 5.0,
    reviews: 0,
    views: 12,
    favoritesCount: 2,
    rentalCount: 0,
    earnings: 0,
    location: "Koramangala, Bengaluru",
    area: "Koramangala 5th Block",
    city: "Bengaluru",
    pincode: "560095",
    img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Aditya R.",
    ownerId: "user_aditya",
    condition: "Like new",
    brand: "DJI",
    model: "Mini 4 Pro (RC 2 Screen Remote)",
    yearPurchased: "2024",
    description: "Sub-249g ultra-lightweight drone with omnidirectional obstacle sensing, 4K/60fps HDR True Vertical Shooting, and 20km FHD video transmission. Perfect for travel vlogs and cinematic aerial shoots.",
    includedAccessories: "DJI Mini 4 Pro, DJI RC 2 controller with built-in screen, 3x Intelligent Flight Batteries, Two-Way Charging Hub, shoulder bag, spare propellers, 128GB SanDisk Extreme MicroSD.",
    quantity: 1,
    specifications: [
      { key: "Takeoff Weight", value: "< 249 g" },
      { key: "Camera", value: "1/1.3-inch CMOS, f/1.7, 4K/60fps HDR" },
      { key: "Flight Time", value: "Up to 34 mins per battery (3 included)" },
      { key: "Obstacle Sensing", value: "Omnidirectional active obstacle avoidance" }
    ],
    rules: [
      "Comply with local DGCA drone airspace regulations (Green zone flights only)",
      "Do not fly over crowds, airports, or defense establishments",
      "Do not fly in winds exceeding 24 km/h or in rain",
      "Handover with all 3 batteries and SD card intact"
    ],
    minDays: 2,
    maxDays: 10,
    pickupAvailable: true,
    deliveryAvailable: true,
    deliveryRadius: 10,
    pickupInstructions: "Pickup at Koramangala 5th block near Empire Restaurant.",
    approvalMode: "manual",
    status: "PENDING_APPROVAL",
    rejectionReason: null,
    approvalHistory: [
      { date: "2026-09-15 04:20 PM", action: "SUBMITTED", by: "Aditya R.", note: "New listing submitted for verification." }
    ],
    blockedDates: [],
    bookings: [],
    featured: false
  },
  // Item 12: Pre-configured REJECTED item so the user can test the rejected state & rejection reasons!
  {
    id: 12,
    title: "Vintage 35mm Film Projector",
    category: "Electronics",
    price: 450,
    weekly: 2400,
    monthly: 8000,
    deposit: 3000,
    deliveryFee: 100,
    rating: 4.5,
    reviews: 0,
    views: 4,
    favoritesCount: 0,
    rentalCount: 0,
    earnings: 0,
    location: "Koramangala, Bengaluru",
    area: "Koramangala",
    city: "Bengaluru",
    pincode: "560034",
    img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop"
    ],
    owner: "Aditya R.",
    ownerId: "user_aditya",
    condition: "Good",
    brand: "Kodak",
    model: "Vintage Carousel",
    yearPurchased: "2018",
    description: "Old-school slide projector with carousel tray. Good for vintage displays and prop setups.",
    includedAccessories: "Projector unit and power cable.",
    quantity: 1,
    specifications: [
      { key: "Format", value: "35mm Slides" }
    ],
    rules: ["Handle vintage bulb with care"],
    minDays: 1,
    maxDays: 5,
    pickupAvailable: true,
    deliveryAvailable: false,
    deliveryRadius: 0,
    pickupInstructions: "Pickup in Koramangala.",
    approvalMode: "manual",
    status: "REJECTED",
    rejectionReason: "Image quality is insufficient. Photos must be clear, well-lit, and show all sides of the equipment and power cords.",
    approvalHistory: [
      { date: "2026-09-14 10:15 AM", action: "SUBMITTED", by: "Aditya R." },
      { date: "2026-09-14 11:45 AM", action: "REJECTED", by: "Admin (Siddharth K.)", note: "Image quality is insufficient. Photos must be clear, well-lit, and show all sides of the equipment and power cords." }
    ],
    blockedDates: [],
    bookings: [],
    featured: false
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_1",
    title: "Listing Verification Pending",
    message: "Your listing 'DJI Mini 4 Pro Drone Fly More Combo' is currently being reviewed by our trust & safety team.",
    time: "20 mins ago",
    read: false,
    type: "pending"
  },
  {
    id: "notif_2",
    title: "Action Required: Listing Needs Revisions",
    message: "Your listing 'Vintage 35mm Film Projector' was rejected: Image quality is insufficient. Please update your photos.",
    time: "Yesterday",
    read: false,
    type: "rejected"
  },
  {
    id: "notif_3",
    title: "New Rental Request Received",
    message: "Vivek Chandra sent a rental request for 'Sony A7 III Mirrorless Kit' (Sep 18 – Sep 20).",
    time: "2 hours ago",
    read: false,
    type: "request"
  },
  {
    id: "notif_4",
    title: "Listing Live & Approved!",
    message: "Your listing 'Sony A7 III Mirrorless Kit' was approved and is now discoverable by thousands of renters.",
    time: "3 days ago",
    read: true,
    type: "success"
  }
];

export const INITIAL_REQUESTS = [
  { id: "b_101", listingId: 1, item: "Sony A7 III Mirrorless Kit", renter: "Vivek Chandra", dates: "2026-09-18 – 2026-09-20", status: "Pending", handoverOwnerConfirmed: false, handoverRenterConfirmed: false },
  { id: "b_102", listingId: 2, item: "PlayStation 5 + 2 Controllers", renter: "Ananya Bose", dates: "2026-09-22 – 2026-09-24", status: "Accepted", handoverOwnerConfirmed: true, handoverRenterConfirmed: true },
  { id: "b_103", listingId: 4, item: "Trek Marlin 7 Mountain Bike", renter: "Rahul Iyer", dates: "2026-09-12 – 2026-09-13", status: "Completed", handoverOwnerConfirmed: true, handoverRenterConfirmed: true },
  { id: "b_104", listingId: 7, item: "Pioneer DJ Speaker Set", renter: "Tanvi Kulkarni", dates: "2026-09-09 – 2026-09-10", status: "Overdue", handoverOwnerConfirmed: true, handoverRenterConfirmed: false }
];

export const TESTIMONIALS = [
  { name: "Ishaan Mehta", role: "Renter, Bengaluru", quote: "Needed a full camera kit for a two-day shoot. Booked it, picked it up, shot the whole thing for less than a lens rental would've cost elsewhere." },
  { name: "Fatima Sheikh", role: "Owner, Mumbai", quote: "My DJ speakers sit unused most weekdays. They've now paid for themselves twice over just renting on weekends." },
  { name: "Devansh Rao", role: "Renter, Pune", quote: "The deposit and cancellation terms were clear before I paid anything. No surprises at pickup." }
];

export const EARNINGS_DATA = [
  { month: "Apr", value: 4200 }, { month: "May", value: 6100 }, { month: "Jun", value: 5400 },
  { month: "Jul", value: 8300 }, { month: "Aug", value: 7100 }, { month: "Sep", value: 9600 }
];

export const money = (n) => `₹${(Number(n) || 0).toLocaleString("en-IN")}`;

export const loadFromStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("Error loading from localStorage", key, e);
    return fallback;
  }
};

export const saveToStorage = (key, val) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn("Error saving to localStorage", key, e);
  }
};

/**
 * Checks whether a given date range conflicts with existing bookings or blocked dates
 */
export function checkBookingConflict(listing, startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return { hasConflict: false };
  const reqStart = new Date(startDateStr);
  const reqEnd = new Date(endDateStr);
  if (isNaN(reqStart.getTime()) || isNaN(reqEnd.getTime()) || reqStart > reqEnd) {
    return { hasConflict: true, reason: "Invalid date selection" };
  }

  // Check against blocked dates
  if (listing.blockedDates && listing.blockedDates.length > 0) {
    for (const bDateStr of listing.blockedDates) {
      const bDate = new Date(bDateStr);
      if (bDate >= reqStart && bDate <= reqEnd) {
        return {
          hasConflict: true,
          reason: `Item is blocked by owner on ${bDateStr}`
        };
      }
    }
  }

  // Check against confirmed or active bookings
  if (listing.bookings && listing.bookings.length > 0) {
    for (const booking of listing.bookings) {
      if (booking.status === "Accepted" || booking.status === "Confirmed" || booking.status === "Active") {
        const bStart = new Date(booking.startDate);
        const bEnd = new Date(booking.endDate);
        // Overlap condition: max(start1, start2) <= min(end1, end2)
        if (reqStart <= bEnd && reqEnd >= bStart) {
          return {
            hasConflict: true,
            reason: `Dates overlap with an existing confirmed rental (${booking.startDate} to ${booking.endDate})`
          };
        }
      }
    }
  }

  return { hasConflict: false };
}
