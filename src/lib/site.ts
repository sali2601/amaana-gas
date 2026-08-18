export const SITE = {
  name: "Amaanallah Gas",
  domain: "amaanallahresources.com",
  phone: "0500804207",
  whatsapp: "0593533943",
  whatsappIntl: "233593533943",
  email: "amaanallahresources@gmail.com",
  location: "Koforidua / Akim-Tafo area, Eastern Region, Ghana",
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${SITE.whatsappIntl}?text=${encodeURIComponent(message)}`;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  details: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "lpg-delivery",
    title: "LPG Delivery",
    blurb: "Fast and convenient LPG delivery to your doorstep.",
    details: [
      "Home, school, restaurant and hotel delivery",
      "All common cylinder sizes",
      "Choose your preferred delivery date and time",
      "Cash, Mobile Money or bank transfer on delivery",
    ],
  },
  {
    slug: "leakage-testing",
    title: "Gas Leakage Testing",
    blurb: "Professional gas leakage inspection and safety checks.",
    details: [
      "Routine and emergency leak inspection",
      "Regulator, hose and valve testing",
      "Full premises safety report",
      "Priority response for suspected leaks",
    ],
  },
  {
    slug: "installation",
    title: "Cylinder Installation",
    blurb: "Safe cylinder installation with proper safety cage setup.",
    details: [
      "Cylinder, regulator and hose installation",
      "Safety cage fabrication and fitting",
      "Complete setup inspection before handover",
      "Compliant with LPG safety standards",
    ],
  },
  {
    slug: "accessories",
    title: "Gas Accessories",
    blurb: "Quality LPG accessories and appliances.",
    details: [
      "Regulators, hoses and burners",
      "Cookers and gas stoves",
      "Safety cages and gas detectors",
      "Genuine, approved equipment only",
    ],
  },
  {
    slug: "maintenance",
    title: "Appliance Maintenance",
    blurb: "Maintenance and servicing for your gas appliances.",
    details: [
      "Gas cookers and burners",
      "Commercial cooking equipment",
      "Regulator replacement and servicing",
      "Scheduled maintenance plans",
    ],
  },
  {
    slug: "commercial",
    title: "Commercial LPG Solutions",
    blurb: "Reliable LPG supply and support for schools, restaurants and hotels.",
    details: [
      "Bulk LPG supply contracts",
      "Gas system design and inspection",
      "Staff safety briefing",
      "Dedicated account support",
    ],
  },
];

export type Product = {
  name: string;
  category: "LPG Equipment" | "Cooking Appliances" | "Safety Equipment";
  description: string;
  price: string;
  availability: "In stock" | "On request";
};

export const PRODUCTS: Product[] = [
  {
    name: "14.5kg LPG Cylinder",
    category: "LPG Equipment",
    description: "Standard household cylinder, filled and pressure tested.",
    price: "Ask for today's price",
    availability: "In stock",
  },
  {
    name: "6kg LPG Cylinder",
    category: "LPG Equipment",
    description: "Compact cylinder ideal for small households and students.",
    price: "Ask for today's price",
    availability: "In stock",
  },
  {
    name: "Gas Regulator",
    category: "LPG Equipment",
    description: "Approved low-pressure regulator with safety lock.",
    price: "On request",
    availability: "In stock",
  },
  {
    name: "Reinforced Gas Hose",
    category: "LPG Equipment",
    description: "Durable LPG-rated hose with clamps, sold per metre.",
    price: "On request",
    availability: "In stock",
  },
  {
    name: "Cylinder Safety Cage",
    category: "Safety Equipment",
    description: "Ventilated steel cage that secures cylinders outdoors.",
    price: "Quoted per size",
    availability: "On request",
  },
  {
    name: "LPG Gas Detector",
    category: "Safety Equipment",
    description: "Audible alarm that detects gas build-up early.",
    price: "On request",
    availability: "On request",
  },
  {
    name: "Table Top Gas Cooker",
    category: "Cooking Appliances",
    description: "2 to 4 burner table top cookers for home kitchens.",
    price: "On request",
    availability: "In stock",
  },
  {
    name: "Commercial Burner",
    category: "Cooking Appliances",
    description: "High-output burner for restaurants, hotels and schools.",
    price: "Quoted per spec",
    availability: "On request",
  },
  {
    name: "Standing Gas Cooker",
    category: "Cooking Appliances",
    description: "Full standing cooker with oven, installed on request.",
    price: "On request",
    availability: "On request",
  },
];

export const SAFETY_TIPS = [
  {
    title: "Always check for leaks",
    body: "Brush soapy water on joints and connections. Bubbles mean a leak — close the valve immediately.",
  },
  {
    title: "Keep cylinders upright",
    body: "A cylinder must always stand upright on firm, level ground, never on its side.",
  },
  {
    title: "Keep LPG away from flames and heat",
    body: "Store cylinders far from open flames, cooking fires, generators and direct sunlight.",
  },
  {
    title: "Do not tamper with regulators",
    body: "Only a qualified technician should fit, adjust or replace a regulator.",
  },
  {
    title: "Use approved gas hoses",
    body: "Replace cracked or hardened hoses. Use LPG-rated hoses with proper clamps only.",
  },
  {
    title: "Ventilate the storage area",
    body: "Keep cylinders in a well-ventilated outdoor space, never in a closed bedroom or store room.",
  },
  {
    title: "Never ignore the smell of gas",
    body: "If you smell gas, act at once — do not wait to see whether it clears on its own.",
  },
];
