
export enum Category {
  TOPS = 'Tops',
  BOTTOMS = 'Bottoms',
  OUTERWEAR = 'Outerwear',
  SHOES = 'Shoes',
  ACCESSORIES = 'Accessories'
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: Category;
  imageUrl: string;
  brand?: string;
  isPublic: boolean;
}

export interface Outfit {
  id: string;
  name: string;
  items: WardrobeItem[];
  imageUrl: string;
  creatorHandle: string;
  likes: number;
}

export interface User {
  id: string;
  handle: string;
  name: string;
  profilePic: string;
  bio: string;
}
