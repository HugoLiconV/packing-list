export interface PackingItem {
  id: string;
  name: string;
  checked: boolean;
  category: string;
}

export const DEFAULT_ITEMS: PackingItem[] = [
  // Basics
  { id: "1", name: "Cargador teléfono", checked: false, category: "Basics" },
  { id: "2", name: "CargadorApple Watch", checked: false, category: "Basics" },
  { id: "3", name: "Limpiador de lentes", checked: false, category: "Basics" },
  { id: "5", name: "Power Bank", checked: false, category: "Basics" },
  { id: "6", name: "iPad", checked: false, category: "Basics" },
  { id: "7", name: "Efectivo", checked: false, category: "Basics" },
  // Documents & Cards
  {
    id: "11",
    name: "Credencial",
    checked: false,
    category: "Documents & Cards"
  },
  {
    id: "12",
    name: "Tarjeta de metro",
    checked: false,
    category: "Documents & Cards"
  },
  {
    id: "14",
    name: "Comprobante de INE",
    checked: false,
    category: "Documents & Cards"
  },
  { id: "16", name: "Badge", checked: false, category: "Documents & Cards" },

  // Electronics
  {
    id: "17",
    name: "Cargador de laptop",
    checked: false,
    category: "Electronics"
  },
  {
    id: "18",
    name: "Audifonos alámbricos",
    checked: false,
    category: "Electronics"
  },
  {
    id: "19",
    name: "Audifonos Bluetooth",
    checked: false,
    category: "Electronics"
  },
  {
    id: "20",
    name: "Cargador de audifonos",
    checked: false,
    category: "Electronics"
  },
  { id: "21", name: "USB Adapter", checked: false, category: "Electronics" },
  { id: "22", name: "Bocina", checked: false, category: "Electronics" },

  // Toiletries
  {
    id: "24",
    name: "Pasta de dientes y cepillo",
    checked: false,
    category: "Toiletries"
  },
  { id: "25", name: "Desodorante", checked: false, category: "Toiletries" },
  { id: "26", name: "Cera", checked: false, category: "Toiletries" },
  {
    id: "27",
    name: "Bloqueador solar",
    checked: false,
    category: "Toiletries"
  },
  { id: "28", name: "Talco", checked: false, category: "Toiletries" },
  { id: "29", name: "Perfume", checked: false, category: "Toiletries" },
  {
    id: "30",
    name: "Limpiador facial",
    checked: false,
    category: "Toiletries"
  },
  { id: "31", name: "Toalla facial", checked: false, category: "Toiletries" },
  { id: "32", name: "Toalla", checked: false, category: "Toiletries" },
  { id: "33", name: "Rasuradora", checked: false, category: "Toiletries" },
  { id: "34", name: "Corta uñas", checked: false, category: "Toiletries" },

  // Accessories & Clothing
  {
    id: "35",
    name: "Tennis",
    checked: false,
    category: "Accessories & Clothing"
  },
  {
    id: "36",
    name: "Chanclas",
    checked: false,
    category: "Accessories & Clothing"
  },
  {
    id: "37",
    name: "Gorra",
    checked: false,
    category: "Accessories & Clothing"
  },
  {
    id: "38",
    name: "Impermeable",
    checked: false,
    category: "Accessories & Clothing"
  },

  // Health & Fitness
  {
    id: "39",
    name: "Medicamentos",
    checked: false,
    category: "Health & Fitness"
  },
  {
    id: "40",
    name: "Botella de agua",
    checked: false,
    category: "Health & Fitness"
  },
  { id: "41", name: "Creatina", checked: false, category: "Health & Fitness" },
  {
    id: "9",
    name: "Apagar aire acondicionado",
    checked: false,
    category: "Others"
  }
];
