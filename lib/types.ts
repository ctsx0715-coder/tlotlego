export type CategorySlug = "handbags" | "wallets" | "belts" | "accessories";

export interface ProductColour {
  name: string;
  hex: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  price: number; // ZAR, whole rands
  tagline: string;
  description: string;
  images: string[];
  colours: ProductColour[];
  material: string;
  details: string[];
  care: string;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  inStock: boolean;
  createdAt: string;
}

export interface CartLine {
  key: string; // productId:colour
  productId: string;
  slug: string;
  name: string;
  colour: string;
  image: string;
  price: number;
  quantity: number;
}
