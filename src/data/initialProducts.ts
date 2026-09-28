import { Product } from '../types';

// Catalog starts completely empty so the owner can add their own authentic handmade bags
export const INITIAL_PRODUCTS: Product[] = [];

export const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tüm Örgü Çantalar' },
  { id: 'omuz-cantasi', label: 'Omuz Çantaları' },
  { id: 'tote-plaj', label: 'Tote & Günlük' },
  { id: 'baget-mini', label: 'Baget & Mini' },
  { id: 'hasir-rafya', label: 'Hasır & Rafya' },
  { id: 'abiye-clutch', label: 'Abiye & Boncuklu' },
  { id: 'telefon-crossbody', label: 'Telefon Çantaları' },
];

export const INSTAGRAM_HANDLE = 'guaseistanbul';
export const INSTAGRAM_URL = 'https://www.instagram.com/guaseistanbul?stkn=eHAxZmMxYWlvaHlv';
export const WHATSAPP_PHONE = '+905320000000'; // Sipariş & Danışma Hattı

// Site general settings editable by owner
export const DEFAULT_SITE_SETTINGS = {
  brandName: 'GUASÉ ISTANBUL',
  brandSubtitle: 'HANDMADE KNIT · ÖRME ÇANTA',
  topAnnouncement: '🧶 %100 El Emeği Örme Çantalar · Yalnızca Online Satış · Tüm Türkiye\'ye Hızlı Kargo',
  heroTitle: 'Özgün Doku, Zamansız El Emeği',
  heroSubtitle: 'Her ilmeğinde sevgi ve zarafet var.',
  instagramHandle: 'guaseistanbul',
  instagramUrl: 'https://www.instagram.com/guaseistanbul?stkn=eHAxZmMxYWlvaHlv',
  whatsappPhone: '905320000000',
  bioBullets: [
    '🧶 %100 El Örgüsü ve Özgün Tasarım Çantalar',
    '📍 Yalnızca Online Satış (İstanbul merkezli atölye)',
    '🎨 İstediğiniz renk ve modelde kişiye özel örgü siparişi',
    '📦 Tüm Türkiye’ye Güvenli Kargo Gönderimi',
    '📩 Fiyat ve Sipariş Bilgisi için Instagram DM veya WhatsApp',
  ],
  onlineSalesNote: 'Yalnızca Online Satış Yapılmaktadır. Fiziksel mağazamız bulunmamaktadır.',
};

export const BRAND_BIO = {
  title: DEFAULT_SITE_SETTINGS.brandName,
  tagline: 'El Emeği Özel Tasarım Örme Çantalar',
  bullets: DEFAULT_SITE_SETTINGS.bioBullets,
  salesNote: DEFAULT_SITE_SETTINGS.onlineSalesNote,
};

