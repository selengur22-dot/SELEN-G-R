import React, { useState } from 'react';
import { X, Check, Instagram, ShoppingBag, Truck, ShieldCheck, Heart, Palette, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/initialProducts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenPriceManager: () => void;
  isAdmin?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenPriceManager,
  isAdmin = false,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standart');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Krem');
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF9F6] w-full max-w-4xl rounded-lg shadow-2xl border border-[#D5CEC2] overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Left Side: Knit Bag Photo */}
        <div className="md:w-1/2 relative bg-[#F2EDE4] overflow-hidden aspect-square md:aspect-auto flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-[#8C827A]">
              <span className="text-5xl mb-2">👜</span>
              <span className="text-sm font-semibold text-[#1A1A1A]">{product.name}</span>
              <span className="text-xs text-[#7A7065] mt-1">Bu model için henüz fotoğraf yüklenmedi</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="md:hidden absolute top-3 right-3 p-1.5 bg-black/60 text-white rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side: Product Details & Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          
          <div>
            
            {/* Header info */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8C7A6B] block">
                  {product.categoryLabel} · %100 El Emeği
                </span>
                <span className="text-xs font-mono text-[#A89F94]">{product.code}</span>
              </div>
              <button
                onClick={onClose}
                className="hidden md:flex p-1.5 text-[#8C827A] hover:text-[#1A1A1A] hover:bg-[#EFECE6] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium leading-snug mb-3">
              {product.name}
            </h2>

            {/* Price Presentation */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E2D5]">
              {product.hidePrice ? (
                <div className="text-sm font-semibold text-[#855D10]">
                  Fiyat Bilgisi ve Özel Sipariş için Instagram DM
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1A1A1A] tabular-nums font-serif">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#9C9488] line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              )}

              {isAdmin && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenPriceManager();
                  }}
                  className="ml-auto text-xs text-[#8C7A6B] hover:text-[#1A1A1A] flex items-center gap-1 underline"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Fiyatı Düzenle</span>
                </button>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#544E48] leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Craft Details Box */}
            <div className="bg-white/80 border border-[#E0DACE] rounded-md p-3.5 space-y-2 mb-5 text-xs text-[#4A443E]">
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                <span><strong>İşçilik:</strong> {product.fabricDetails}</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                <span><strong>Ebat:</strong> {product.dimensions || 'Kişiye özel örülebilir'}</span>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <label className="block text-xs font-semibold text-[#2E2824] uppercase tracking-wider mb-2">
                  Renk Seçimi: <span className="text-[#855D10] font-normal">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 text-xs rounded-sm transition-all border ${
                        selectedColor === color
                          ? 'border-[#1F1C1A] bg-[#1F1C1A] text-white shadow-2xs'
                          : 'border-[#D5CEC2] bg-white text-[#4A443E] hover:border-[#8C827A]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Action Module */}
          <div className="pt-4 border-t border-[#E8E2D5] space-y-2.5">
            
            {addedNotice && (
              <div className="p-2 bg-[#E8F5E9] text-[#1B5E20] text-xs font-medium rounded text-center flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Çanta başarıyla sepete eklendi!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-[#1F1C1A] hover:bg-[#3D3732] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sepete Ekle</span>
              </button>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#C13584] hover:bg-[#A82870] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram DM Sipariş</span>
              </a>
            </div>

            {/* Trust markers */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-[#7A7065]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Tüm Türkiye'ye Kargo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>%100 El Emeği Örgü</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
