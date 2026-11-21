
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  commission: number;
  affiliateLink?: string;
  featured: boolean;
  available: boolean;
}

export interface SearchFilters {
  search: string;
  category: string;
  priceMin: number;
  priceMax: number;
}
