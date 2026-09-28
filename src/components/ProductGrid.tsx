import React, { useState } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data/initialProducts';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Filter, Plus, ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  isQuickEditActive: boolean;
  onUpdatePrice: (id: string, newPrice: number) => void;
  onTogglePriceVisibility: (id: string) => void;
  onOpenPriceManager: () => void;
  searchQuery: string;
  isAdmin?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  isQuickEditActive,
  onUpdatePrice,
  onTogglePriceVisibility,
  onOpenPriceManager,
  searchQuery,
  isAdmin = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'newest'>('recommended');

  // Filter products by category and search
  const filtered = products.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fabricDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.colors && item.colors.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0; // recommended order
  });

  return (
    <section id="koleksiyon" className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#85796E] mb-2 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#B8860B]"></span>
              <span>El Emeği Koleksiyonumuz</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-medium tracking-tight">
              Örme Çanta Modelleri
            </h2>
            <p className="text-xs sm:text-sm text-[#6B635A] mt-1.5 max-w-xl">
              Pamuk makrome, rafya kağıt ip ve yumuşak kordonlarla elde örülen dayanıklı, zarif çanta tasarımları.
            </p>
          </div>

          {/* User Requested: Quick Launch for Price Management */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPriceManager}
              className="px-4 py-2 bg-white border border-[#D5CEC2] hover:border-[#1A1A1A] text-[#2E2824] hover:text-[#1A1A1A] text-xs font-medium rounded-sm shadow-2xs transition-all flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Çanta Fiyatlarını Düzenle</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs & Sorting Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E8E4DC] mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? products.length 
                : products.filter(p => p.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1F1C1A] text-white shadow-xs'
                      : 'bg-white/80 text-[#59524A] hover:bg-white hover:text-[#1A1A1A] border border-[#E0DACE]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] tabular-nums ${isActive ? 'text-[#D4AF37]' : 'text-[#8C827A]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Count & Sort Dropdown */}
          <div className="flex items-center justify-between lg:justify-end gap-3 text-xs text-[#6B635A]">
            <span className="tabular-nums">
              <strong>{sorted.length}</strong> çanta modeli
            </span>

            <div className="flex items-center gap-2 bg-white border border-[#DDD7CD] px-2.5 py-1.5 rounded-sm">
              <ArrowUpDown className="w-3 h-3 text-[#7A7269]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#1A1A1A] font-medium focus:outline-none cursor-pointer"
              >
                <option value="recommended">Öne Çıkanlar</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="newest">En Yeni Modeller</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid / Empty State */}
        {products.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-2xl border border-[#D5CEC2] shadow-xs max-w-2xl mx-auto my-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF5EC] border border-[#E8DFC8] flex items-center justify-center mx-auto mb-4 text-3xl">
              👜
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] mb-2">
              Henüz Çanta Modeli Eklenmedi
            </h3>
            <p className="text-xs sm:text-sm text-[#6B635A] max-w-md mx-auto mb-6 leading-relaxed">
              {isAdmin 
                ? 'Kendi el emeği örgü çantalarınızın fotoğraflarını yükleyip fiyatlarını girerek hemen sergilemeye başlayabilirsiniz.'
                : 'Yeni el emeği örgü çanta modellerimiz hazırlanmaktadır. Güncel modellerimiz için Instagram @guaseistanbul sayfamızı ziyaret edebilirsiniz.'}
            </p>
            {isAdmin ? (
              <button
                onClick={onOpenPriceManager}
                className="px-6 py-3.5 bg-[#1F1C1A] hover:bg-[#38332F] text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md transition-all inline-flex items-center gap-2 hover:scale-105"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>İlk Çantanızı ve Fiyatınızı Ekleyin</span>
              </button>
            ) : (
              <a
                href={CATEGORIES ? 'https://www.instagram.com/guaseistanbul?stkn=eHAxZmMxYWlvaHlv' : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#C13584] hover:bg-[#A82870] text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Instagram @guaseistanbul Hesabımızı İnceleyin</span>
              </a>
            )}
          </div>
        ) : sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sorted.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                isQuickEditActive={isQuickEditActive}
                onUpdatePrice={onUpdatePrice}
                onTogglePriceVisibility={onTogglePriceVisibility}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-md border border-[#E0DACE] p-8">
            <Filter className="w-8 h-8 text-[#A89F91] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-1">
              Aramanıza uygun çanta modeli bulunamadı
            </h3>
            <p className="text-xs text-[#7A7269] mb-4">
              Farklı bir renk veya kategori seçebilir ya da tüm koleksiyonu görüntüleyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-[#1F1C1A] text-white text-xs font-semibold rounded-sm"
            >
              Tüm Çantaları Göster
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
