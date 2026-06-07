export interface Product {
  id: number;
  name: string;
  nameId: string;
  price: number;
  weight: string;
  roastLevel: string;
  origin: string;
  flavorNotes: string[];
  flavorNotesId: string[];
  description: string;
  descriptionId: string;
  rating: number;
  reviews: number;
  stock: number;
  isNew: boolean;
  badge: string | null;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
