import { products } from "@/data/products";
import type { CategorySlug, Product } from "./types";

/**
 * Commerce data layer. Every page reads through these functions.
 * To connect a real backend (Shopify, WooCommerce, Medusa, Supabase),
 * replace the bodies below and keep the signatures.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(category: CategorySlug): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}

export async function getFeatured(limit = 6): Promise<Product[]> {
  return products.filter((p) => p.featured).slice(0, limit);
}

export async function getBestsellers(limit = 4): Promise<Product[]> {
  return products.filter((p) => p.bestseller).slice(0, limit);
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const rest = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...same, ...rest].slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.tagline, p.category, p.material, ...p.colours.map((c) => c.name)]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
