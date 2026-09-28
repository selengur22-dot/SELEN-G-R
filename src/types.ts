export type ProductCategory = 
  | 'all'
  | 'omuz-cantasi'
  | 'tote-plaj'
  | 'baget-mini'
  | 'hasir-rafya'
  | 'abiye-clutch'
  | 'telefon-crossbody';

export interface Product {
  id: string;
  code: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  hidePrice?: boolean; // When true, displays "Fiyat Sorunuz" or "DM ile Bilgi Alın"
  image: string;
  secondaryImage?: string;
  description: string;
  fabricDetails: string; // e.g. %100 Pamuk Makrome İpi, Hasır Kağıt İp, Kadife Şerit İp
  sizes: string[];
  colors: string[];
  stockStatus: 'in_stock' | 'limited' | 'preorder';
  dimensions?: string; // e.g. "26 x 18 x 7 cm"
  handleType?: string; // e.g. "Örgü Askı", "Ahşap Halka", "İnci Boncuk Sap"
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface SiteSettings {
  brandName: string;
  brandSubtitle: string;
  topAnnouncement: string;
  heroTitle: string;
  heroSubtitle: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappPhone: string;
  bioBullets: string[];
  onlineSalesNote: string;
}

