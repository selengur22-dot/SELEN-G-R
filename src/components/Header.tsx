import React, { useState } from 'react';
import { ShoppingBag, SlidersHorizontal, Instagram, X, Search, Sparkles } from 'lucide-react';
import { INSTAGRAM_URL } from '../data/initialProducts';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPriceManager: () => void;
  isQuickEditActive: boolean;
  onToggleQuickEdit: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenPriceManager,
  isQuickEditActive,
  onToggleQuickEdit,
  searchQuery,
  onSearchChange,
  isAdmin = false,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
      {/* Top Announcement Bar - Highlights Online Only & Knit Bags */}
      {showBanner && (
        <div className="bg-[#241F1C] text-[#EFECE6] px-4 py-2 text-xs font-medium tracking-wider flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2 sm:gap-3 text-center text-[11px] sm:text-xs">
            <span className="hidden sm:inline">🧶 %100 El Emeği Örme Çantalar</span>
            <span className="hidden sm:inline text-[#8C827A]">·</span>
            <span className="text-[#E8C07D]">Yalnızca Online Satış</span>
            <span className="text-[#8C827A]">·</span>
            <span>Tüm Türkiye'ye Hızlı Kargo</span>
            <span className="hidden md:inline text-[#8C827A]">·</span>
            <span className="hidden md:inline text-[#E8C07D]">İstediğiniz Renkte Özel Örgü Siparişi</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-[#8C827A] hover:text-white p-0.5 rounded transition-colors"
            title="Kapat"
            aria-label="Duyuruyu Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Wordmark */}
        <a
          href="#"
          className="group flex flex-col justify-center text-left focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.22em] text-[#1A1A1A] group-hover:text-[#54463D] transition-colors uppercase">
            GUASÉ
          </span>
          <span className="text-[9px] tracking-[0.3em] text-[#7A7269] uppercase -mt-0.5 font-medium">
            ISTANBUL · HANDMADE KNIT
          </span>
        </a>

        {/* Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-[0.16em] text-[#4A443E]">
          <a href="#koleksiyon" className="hover:text-[#1A1A1A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all">
            Örgü Çanta Koleksiyonu
          </a>
          <a href="#el-emegi" className="hover:text-[#1A1A1A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all">
            El Emeği & Malzeme
          </a>
          <a href="#instagram" className="hover:text-[#1A1A1A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all flex items-center gap-1.5 text-[#1A1A1A]">
            <Instagram className="w-3.5 h-3.5 text-[#B8860B]" />
            @guaseistanbul
          </a>
          <a href="#iletisim" className="hover:text-[#1A1A1A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all">
            Online Sipariş & İletişim
          </a>
        </nav>

        {/* Action Controls & Price Management */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-white border border-[#D5CEC2] rounded-md px-2.5 py-1.5 shadow-sm">
                <Search className="w-3.5 h-3.5 text-[#7A7269] mr-2" />
                <input
                  type="text"
                  placeholder="Çanta modeli veya renk ara..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="text-xs bg-transparent focus:outline-none w-32 sm:w-44 text-[#1A1A1A] placeholder:text-[#9E978D]"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-[#7A7269] hover:text-[#1A1A1A] ml-1 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-[#4A443E] hover:text-[#1A1A1A] rounded-md hover:bg-[#EFECE6] transition-colors"
                title="Çanta Ara"
                aria-label="Çanta Ara"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Admin Controls: Only visible when isAdmin is true */}
          {isAdmin ? (
            <>
              <button
                onClick={onOpenPriceManager}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#1F1C1A] hover:bg-[#38332F] text-[#FAF9F6] text-xs font-semibold rounded-md shadow-xs transition-all whitespace-nowrap border border-[#D4AF37]/40"
                title="Örme çanta fiyatlarını girin veya yeni çanta modeli ekleyin"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Fiyat & Çanta</span> Yönetimi
              </button>

              <button
                onClick={onToggleQuickEdit}
                className={`hidden lg:flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium rounded-md border transition-all ${
                  isQuickEditActive
                    ? 'bg-[#EFE7D8] border-[#B8860B] text-[#5C4308] ring-1 ring-[#B8860B]/30'
                    : 'bg-white/80 border-[#DDD7CD] text-[#5C554E] hover:bg-white'
                }`}
                title="Ürün kartları üzerinde doğrudan fiyat değiştirme modu"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isQuickEditActive ? 'text-[#B8860B]' : 'text-[#8C827A]'}`} />
                <span className="text-[11px]">Hızlı Fiyat Düzenle</span>
              </button>
            </>
          ) : (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FAF9F6] border border-[#D5CEC2] text-[#1A1A1A] text-xs font-medium rounded-md transition-colors shadow-2xs"
            >
              <Instagram className="w-3.5 h-3.5 text-[#C13584]" />
              <span>@guaseistanbul</span>
            </a>
          )}

          {/* Shopping Bag / Sipariş Listesi */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-[#1A1A1A] hover:bg-[#EFECE6] rounded-md transition-colors"
            title="Alışveriş Çantası"
            aria-label="Alışveriş Çantası"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#B8860B] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
