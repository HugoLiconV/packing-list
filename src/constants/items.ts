export interface PackingItem {
  id: string;
  name: string;
  checked: boolean;
  category: string;
}

export const DEFAULT_ITEMS: PackingItem[] = [
  // Basics
  { id: "1", name: "Phone Charger", checked: false, category: "Basics" },
  { id: "2", name: "Apple Watch Charger", checked: false, category: "Basics" },
  { id: "3", name: "Glasses Cleaner", checked: false, category: "Basics" },
  {
    id: "4",
    name: "Apple Watch Accessories",
    checked: false,
    category: "Basics"
  },
  { id: "5", name: "Power Bank", checked: false, category: "Basics" },
  { id: "6", name: "iPad", checked: false, category: "Basics" },
  { id: "7", name: "Cash", checked: false, category: "Basics" },
  { id: "8", name: "Gum", checked: false, category: "Basics" },
  { id: "9", name: "Turn off AC", checked: false, category: "Basics" },

  // Documents & Cards
  { id: "10", name: "Passport", checked: false, category: "Documents & Cards" },
  { id: "11", name: "ID", checked: false, category: "Documents & Cards" },
  {
    id: "12",
    name: "Metro Card",
    checked: false,
    category: "Documents & Cards"
  },
  {
    id: "13",
    name: "Credit Card for Concert",
    checked: false,
    category: "Documents & Cards"
  },
  {
    id: "14",
    name: "INE Proof",
    checked: false,
    category: "Documents & Cards"
  },
  {
    id: "15",
    name: "Concert Tickets",
    checked: false,
    category: "Documents & Cards"
  },
  { id: "16", name: "Badge", checked: false, category: "Documents & Cards" },

  // Electronics
  { id: "17", name: "Laptop Charger", checked: false, category: "Electronics" },
  {
    id: "18",
    name: "Wired Headphones",
    checked: false,
    category: "Electronics"
  },
  {
    id: "19",
    name: "Bluetooth Headphones",
    checked: false,
    category: "Electronics"
  },
  {
    id: "20",
    name: "Headphones Charger",
    checked: false,
    category: "Electronics"
  },
  { id: "21", name: "USB Adapter", checked: false, category: "Electronics" },
  { id: "22", name: "Speaker", checked: false, category: "Electronics" },
  {
    id: "23",
    name: "Turn on Computer",
    checked: false,
    category: "Electronics"
  },

  // Toiletries
  {
    id: "24",
    name: "Toothbrush & Toothpaste",
    checked: false,
    category: "Toiletries"
  },
  { id: "25", name: "Deodorant", checked: false, category: "Toiletries" },
  { id: "26", name: "Hair Wax", checked: false, category: "Toiletries" },
  { id: "27", name: "Sunscreen", checked: false, category: "Toiletries" },
  { id: "28", name: "Talcum Powder", checked: false, category: "Toiletries" },
  { id: "29", name: "Perfume", checked: false, category: "Toiletries" },
  { id: "30", name: "Face Cleanser", checked: false, category: "Toiletries" },
  { id: "31", name: "Face Towel", checked: false, category: "Toiletries" },
  { id: "32", name: "Towel", checked: false, category: "Toiletries" },
  { id: "33", name: "Razor", checked: false, category: "Toiletries" },
  { id: "34", name: "Nail Clippers", checked: false, category: "Toiletries" },

  // Accessories & Clothing
  {
    id: "35",
    name: "Walking Shoes",
    checked: false,
    category: "Accessories & Clothing"
  },
  {
    id: "36",
    name: "Flip Flops",
    checked: false,
    category: "Accessories & Clothing"
  },
  { id: "37", name: "Cap", checked: false, category: "Accessories & Clothing" },
  {
    id: "38",
    name: "Raincoat",
    checked: false,
    category: "Accessories & Clothing"
  },

  // Health & Fitness
  {
    id: "39",
    name: "Medication",
    checked: false,
    category: "Health & Fitness"
  },
  {
    id: "40",
    name: "Water Bottle",
    checked: false,
    category: "Health & Fitness"
  },
  { id: "41", name: "Creatine", checked: false, category: "Health & Fitness" }
];

export const CATEGORIES = [
  "Basics",
  "Documents & Cards",
  "Electronics",
  "Toiletries",
  "Accessories & Clothing",
  "Health & Fitness"
] as const;
