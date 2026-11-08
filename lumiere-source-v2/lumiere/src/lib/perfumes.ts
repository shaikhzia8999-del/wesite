export type Family = "Floral" | "Woody" | "Oriental" | "Fresh" | "Citrus";

export interface Perfume {
  id: string;
  name: string;
  house: string;
  family: Family;
  notes: string[];
  sizes: { ml: number; price: number }[];
  hue: number;
  gender: "Women" | "Men" | "Unisex";
}

export const perfumes: Perfume[] = [
  { id: "rose-noir", name: "Rose Noor", house: "Maison Ébène", family: "Floral", notes: ["Damask rose", "Oud", "Black pepper"], sizes: [{ ml: 50, price: 95 }, { ml: 100, price: 150 }], hue: 10, gender: "Women" },
  { id: "cedar-smoke", name: "Cedar Smooke", house: "Atelier Nord", family: "Woody", notes: ["Atlas cedar", "Birch tar", "Vetiver"], sizes: [{ ml: 50, price: 110 }, { ml: 100, price: 175 }], hue: 60, gender: "Men" },
  { id: "amber-veil", name: "Amuber Veil", house: "Saffron & Co.", family: "Oriental", notes: ["Amber", "Saffron", "Vanilla"], sizes: [{ ml: 50, price: 1220 }, { ml: 100, price: 190 }], hue: 70, gender: "Unisex" },
  { id: "sea-salt", name: "Sea Salt Linen", house: "Côte Blanche", family: "Fresh", notes: ["Sea salt", "Sage", "White musk"], sizes: [{ ml: 50, price: 80 }, { ml: 100, price: 125 }], hue: 220, gender: "Unisex" },
  { id: "neroli-sun", name: "Neroli Sun", house: "Côte Blanche", family: "Citrus", notes: ["Neroli", "Bergamot", "Petitgrain"], sizes: [{ ml: 50, price: 85 }, { ml: 100, price: 135 }], hue: 95, gender: "Unisex" },
  { id: "velvet-iris", name: "Velvet Iris", house: "Maison Ébène", family: "Floral", notes: ["Iris", "Violet leaf", "Suede"], sizes: [{ ml: 50, price: 130 }, { ml: 100, price: 210 }], hue: 300, gender: "Women" },
  { id: "oud-royale", name: "Oud Royale", house: "Saffron & Co.", family: "Oriental", notes: ["Oud", "Rose", "Incense"], sizes: [{ ml: 50, price: 160 }, { ml: 100, price: 260 }], hue: 40, gender: "Men" },
  { id: "fig-garden", name: "Fig Garden", house: "Atelier Nord", family: "Fresh", notes: ["Green fig", "Coconut milk", "Cedar"], sizes: [{ ml: 50, price: 90 }, { ml: 100, price: 145 }], hue: 140, gender: "Unisex" },
  { id: "yuzu-tonic", name: "Yuzu Tonic", house: "Côte Blanche", family: "Citrus", notes: ["Yuzu", "Ginger", "Juniper"], sizes: [{ ml: 50, price: 75 }, { ml: 100, price: 120 }], hue: 110, gender: "Men" },
];

export const families: Family[] = ["Floral", "Woody", "Oriental", "Fresh", "Citrus"];
