import React, { useState } from 'react';
import { ShoppingBag, Eye, Instagram, Edit3, Check, X, Tag } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';
import { INSTAGRAM_URL } from '../data/initialProducts';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  isQuickEditActive: boolean;
  onUpdatePrice: (id: string, newPrice: number) => void;
  onTogglePriceVisibility: (id: string) => void;
  isAdmin?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  isQuickEditActive,
  onUpdatePrice,
  onTogglePriceVisibility,
  isAdmin = false,
}) => {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState(product.price.toString());

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val >= 0) {
      onUpdatePrice(product.id, val);
      setIsEditingPrice(false);
    }
  };

  return (
    <div className="group flex flex-col bg-white border border-[#EBE7DF] rounded-md overflow-hidden hover:border-[#D0C7B8] hover:shadow-md transition-all duration-300">
      
      {/* Product Image Slot */}
      <div 
        className="relative aspect-square w-full overflow-hidden bg-[#F3EFE8] cursor-pointer flex items-center justify-center"
        onClick={() => onSelectProduct(product)}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center text-[#8C827A]">
            <span className="text-3xl mb-1">👜</span>
            <span className="text-[11px] font-medium text-[#4A443E]">{product.name}</span>
            <span className="text-[10px] text-[#A69C93] mt-0.5">Fotoğraf Yüklemek İçin Tıklayın</span>
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#1F1C1A] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-xs shadow-xs">
              Yeni Model
            </span>
          )}
          {product.stockStatus === 'limited' && (
            <span className="text-[10px] font-medium tracking-wider uppercase text-[#8B0000] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-xs shadow-xs">
              Sınırlı Adet
            </span>
          )}
        </div>

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 pointer-events-none">
          <span className="px-4 py-2 bg-white/95 text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Modeli İncele
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        
        <div>
          {/* Category & Code line */}
          <div className="flex items-center justify-between text-[11px] text-[#7A7269] uppercase tracking-[0.14em] mb-1.5">
            <span>{product.categoryLabel}</span>
            <span className="font-mono text-[10px] text-[#A39B91]">{product.code}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg text-[#1A1A1A] font-semibold group-hover:text-[#52443C] transition-colors cursor-pointer line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Yarn & Specs Snippet */}
          <p className="text-xs text-[#6B635A] line-clamp-1 mb-1">
            {product.fabricDetails}
          </p>

          {product.dimensions && (
            <div className="text-[11px] text-[#8C827A] mb-3">
              Ölçü: <span className="font-medium text-[#4A443E]">{product.dimensions}</span>
            </div>
          )}
        </div>

        {/* Price & Price Management Area */}
        <div className="pt-3 border-t border-[#F0ECE3]">
          
          {/* Quick Price Edit Mode or Normal Price Display */}
          {isEditingPrice ? (
            <form onSubmit={handleSavePrice} className="mb-3 bg-[#FAF8F5] p-2 rounded border border-[#B8860B]/40">
              <div className="text-[11px] text-[#6B5A4E] font-medium mb-1 flex items-center justify-between">
                <span>Çanta Fiyatı (TL):</span>
                <span className="text-[10px] text-[#9E9284]">Enter bas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(e.target.value)}
                  autoFocus
                  className="w-full text-xs px-2 py-1 bg-white border border-[#D5CEC2] rounded text-[#1A1A1A] font-semibold tabular-nums focus:outline-none focus:border-[#B8860B]"
                />
                <button
                  type="submit"
                  className="p-1.5 bg-[#2E2824] text-white hover:bg-black rounded"
                  title="Kaydet"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempPrice(product.price.toString());
                    setIsEditingPrice(false);
                  }}
                  className="p-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded"
                  title="İptal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-baseline justify-between mb-3">
              <div className="flex items-baseline gap-2">
                {product.hidePrice ? (
                  <span className="text-xs font-medium text-[#7A6A58] italic">
                    Fiyat Sorunuz (DM / WhatsApp)
                  </span>
                ) : (
                  <>
                    <span className="font-serif text-lg font-bold text-[#1A1A1A] tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-[#9E978D] line-through tabular-nums">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Owner Quick Edit Trigger (Only visible to Admin) */}
              {isAdmin && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setTempPrice(product.price.toString());
                      setIsEditingPrice(true);
                    }}
                    className={`p-1 rounded text-xs transition-colors ${
                      isQuickEditActive 
                        ? 'bg-[#EFE7D8] text-[#855D10] hover:bg-[#E5DBC7]' 
                        : 'text-[#9E978D] hover:text-[#1A1A1A] hover:bg-[#F3EFE8]'
                    }`}
                    title="Fiyat Bilgisini Gir / Düzenle (Yönetici)"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onTogglePriceVisibility(product.id)}
                    className="p-1 text-[#9E978D] hover:text-[#1A1A1A] hover:bg-[#F3EFE8] rounded text-xs transition-colors"
                    title={product.hidePrice ? "Fiyatı Göster" : "Fiyatı Gizle (Fiyat Sorunuz yap)"}
                  >
                    <Tag className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons: Add to Bag & Instagram DM Order */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-2.5 px-2 bg-[#26221F] hover:bg-black text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Sepete Ekle</span>
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-2 bg-[#C13584]/10 hover:bg-[#C13584]/20 border border-[#C13584]/30 text-[#8E2560] text-xs font-medium tracking-wide rounded-sm transition-colors flex items-center justify-center gap-1.5"
              title="Instagram DM ile sipariş ver"
            >
              <Instagram className="w-3.5 h-3.5 text-[#C13584]" />
              <span>Instagram DM</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
