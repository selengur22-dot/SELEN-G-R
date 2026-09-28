import React, { useState, useEffect } from 'react';
import { Product, CartItem, SiteSettings } from './types';
import { INITIAL_PRODUCTS, DEFAULT_SITE_SETTINGS } from './data/initialProducts';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PriceManagerModal } from './components/PriceManagerModal';
import { CartDrawer } from './components/CartDrawer';
import { InstagramFeed } from './components/InstagramFeed';
import { AtelierStory } from './components/AtelierStory';
import { Footer } from './components/Footer';
import { AdminAuthModal } from './components/AdminAuthModal';
import { SlidersHorizontal, Sparkles, ShieldCheck, LogOut } from 'lucide-react';

const STORAGE_KEY_PRODUCTS = 'guase_knit_bags_catalog_v2';
const STORAGE_KEY_CART = 'guase_knit_cart_v2';
const STORAGE_KEY_SETTINGS = 'guase_site_settings_v1';
const STORAGE_KEY_ADMIN_AUTH = 'guase_admin_auth_v1';

export default function App() {
  // Admin State (Ensures customers NEVER see price editing controls)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
    } catch {}
    setIsAdminAuthModalOpen(false);
    setIsPriceManagerOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    } catch {}
    setIsQuickEditActive(false);
  };
  // Initialize products from localStorage or default dataset
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out sample AI bags (guase-knit-01 .. 06) so only user's own products remain
          const userOnly = parsed.filter((item: Product) => !item.id?.startsWith('guase-knit-'));
          return userOnly;
        }
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return [];
  });

  // Dynamic Site Settings (Phone, Instagram, Banner, Texts)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading settings from localStorage', e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

  // Shopping Bag State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return [];
  });

  // Modal and Navigation States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPriceManagerOpen, setIsPriceManagerOpen] = useState(false);
  const [isQuickEditActive, setIsQuickEditActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist products when updated
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(newProducts));
    } catch (e) {
      console.error('Failed to persist products', e);
    }
  };

  // Persist settings when updated
  const saveSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  };

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [cart]);

  // Price Update Handlers
  const handleUpdateSinglePrice = (id: string, newPrice: number) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, price: Math.max(0, newPrice) } : p
    );
    saveProducts(updated);
  };

  const handleTogglePriceVisibility = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, hidePrice: !p.hidePrice } : p
    );
    saveProducts(updated);
  };

  const handleUpdateAllProducts = (newProducts: Product[]) => {
    saveProducts(newProducts);
  };

  const handleResetToDefaults = () => {
    saveProducts(INITIAL_PRODUCTS);
    saveSettings(DEFAULT_SITE_SETTINGS);
  };

  // Cart Operations
  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    const chosenSize = size || product.sizes[0] || 'Standart';
    const chosenColor = color || product.colors[0] || 'Krem';

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            selectedSize: chosenSize,
            selectedColor: chosenColor,
            quantity: 1,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToCollection = () => {
    const el = document.getElementById('koleksiyon');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A]">
      
      {/* Admin Mode Top Indicator (Only visible to authenticated owner) */}
      {isAdmin && (
        <div className="bg-[#1A1A1A] border-b border-[#D4AF37]/50 text-white px-4 py-2 text-xs flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span className="font-semibold text-[#D4AF37] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Yönetici Modu Açık
            </span>
            <span className="hidden sm:inline text-[#A89E94]">
              · Fiyat ve model düzenleme araçlarını yalnızca siz görüyorsunuz; müşteriler göremez.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPriceManagerOpen(true)}
              className="text-xs bg-[#2E2824] hover:bg-[#3D352F] text-[#D4AF37] px-2.5 py-1 rounded border border-[#D4AF37]/40 font-medium"
            >
              Fiyat & Ürün Paneli
            </button>
            <button
              onClick={handleAdminLogout}
              className="text-xs text-[#C5BEB2] hover:text-white flex items-center gap-1"
              title="Yönetici modunu kapat ve müşteri görünümüne geç"
            >
              <LogOut className="w-3 h-3" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      )}

      {/* 3-Zone Top Bar */}
      <Header
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPriceManager={() => setIsPriceManagerOpen(true)}
        isQuickEditActive={isQuickEditActive}
        onToggleQuickEdit={() => setIsQuickEditActive((prev) => !prev)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isAdmin={isAdmin}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Campaign Hero (No AI Images) */}
        <Hero
          onExploreCollection={scrollToCollection}
          onOpenPriceManager={() => setIsPriceManagerOpen(true)}
          siteSettings={siteSettings}
          isAdmin={isAdmin}
        />

        {/* Product Catalog Grid with In-Place & Modal Price Editing */}
        <ProductGrid
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          isQuickEditActive={isQuickEditActive}
          onUpdatePrice={handleUpdateSinglePrice}
          onTogglePriceVisibility={handleTogglePriceVisibility}
          onOpenPriceManager={() => setIsPriceManagerOpen(true)}
          searchQuery={searchQuery}
          isAdmin={isAdmin}
        />

        {/* Atelier & Craft Story */}
        <AtelierStory />

        {/* Instagram Feed & Profile Highlights (@guaseistanbul) */}
        <InstagramFeed />
      </main>

      {/* Refined Footer with dynamic user WhatsApp number */}
      <Footer
        onOpenPriceManager={() => setIsPriceManagerOpen(true)}
        siteSettings={siteSettings}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminAuthModalOpen(true)}
        onAdminLogout={handleAdminLogout}
      />

      {/* Floating Manager Quick-Launcher: ONLY visible to logged-in Admin */}
      {isAdmin && (
        <aside aria-label="Mağaza Sahibi Fiyat & Düzenleme Alanı" className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsPriceManagerOpen(true)}
            className="group flex items-center gap-2 px-4 py-2.5 bg-[#1F1C1A] hover:bg-[#38332F] text-white text-xs font-semibold rounded-full shadow-xl border border-[#D4AF37]/50 transition-all hover:scale-105"
            title="Fiyatları, fotoğrafları veya metinleri düzenle"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
            <span>Fiyat & Site Yönetim Alanı</span>
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          </button>
        </aside>
      )}

      {/* Modal: Full Product Detail View (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenPriceManager={() => setIsPriceManagerOpen(true)}
        isAdmin={isAdmin}
      />

      {/* Price & Content Management Panel (Owner only) */}
      <PriceManagerModal
        isOpen={isPriceManagerOpen}
        onClose={() => setIsPriceManagerOpen(false)}
        products={products}
        onUpdateAllProducts={handleUpdateAllProducts}
        onResetToDefaults={handleResetToDefaults}
        siteSettings={siteSettings}
        onUpdateSiteSettings={saveSettings}
      />

      {/* Slide-out Cart Drawer with Instagram DM Order Summary */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        siteSettings={siteSettings}
      />

      {/* Admin Password Authentication Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

    </div>
  );
}
