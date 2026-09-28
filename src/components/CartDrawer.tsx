import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Instagram, ArrowRight, Truck, Check, Copy } from 'lucide-react';
import { CartItem, SiteSettings } from '../types';
import { formatPrice } from '../utils/formatters';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/initialProducts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  siteSettings?: SiteSettings;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  siteSettings,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [colorNote, setColorNote] = useState('');
  const [copiedNotice, setCopiedNotice] = useState(false);

  if (!isOpen) return null;

  const instagramUrl = siteSettings?.instagramUrl || INSTAGRAM_URL;
  const instagramHandle = siteSettings?.instagramHandle || INSTAGRAM_HANDLE;
  const brandTitle = siteSettings?.brandName || 'Guasé Istanbul';

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Generate Instagram DM Order Message for Knit Bags
  const buildInstagramOrderMessage = () => {
    let msg = `🧶 ${brandTitle} Örme Çanta Sipariş Talebi 🧶\n\n`;
    if (customerName) msg += `Müşteri: ${customerName}\n`;
    if (customerCity) msg += `Teslimat Şehri: ${customerCity}\n\n`;
    msg += `Seçilen Çantalar:\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name} (${item.product.code})\n`;
      msg += `   Renk: ${item.selectedColor} · Ebat: ${item.product.dimensions || 'Standart'}\n`;
      msg += `   Adet: ${item.quantity} x ${formatPrice(item.product.price)} = ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });
    if (colorNote) {
      msg += `Özel Renk / Not: ${colorNote}\n\n`;
    }
    msg += `Toplam Tutar: ${formatPrice(subtotal)}\n`;
    msg += `Kargo: ${subtotal >= freeShippingThreshold ? 'Ücretsiz Kargo' : 'Standart Kargo'}\n`;
    msg += `(Yalnızca Online Satış - Adresime Kargo ile Teslimat)\n\n`;
    msg += `Sipariş onayı ve ödeme bilgileri rica ediyorum.`;
    return msg;
  };

  const handleInstagramCheckout = () => {
    const message = buildInstagramOrderMessage();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 5000);
    }
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl border-l border-[#D5CEC2] flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 bg-white border-b border-[#E8E4DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B8860B]" />
              <h2 className="font-serif text-xl font-semibold text-[#1A1A1A]">
                Sipariş Çantanız
              </h2>
              <span className="text-xs text-[#7A7065] tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} çanta)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8C827A] hover:text-[#1A1A1A] hover:bg-[#EFECE6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping banner */}
          <div className="bg-[#FAF4E8] px-5 py-2.5 border-b border-[#EBDDC5] text-xs text-[#7A5B18] flex items-center gap-2">
            <Truck className="w-4 h-4 shrink-0 text-[#B8860B]" />
            {remainingForFreeShipping > 0 ? (
              <span>
                <strong>{formatPrice(remainingForFreeShipping)}</strong> daha ekleyin, <strong>Ücretsiz Kargo</strong> fırsatından yararlanın!
              </span>
            ) : (
              <span className="font-semibold text-[#1E7E34]">
                Tebrikler! Siparişiniz için Kargo Ücretsiz.
              </span>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EFECE6]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#8C827A]">
                <ShoppingBag className="w-12 h-12 stroke-[1.25] text-[#C5BEB2] mb-3" />
                <p className="font-serif text-lg text-[#1A1A1A] mb-1">
                  Çantanız Henüz Boş
                </p>
                <p className="text-xs text-[#7A7269] max-w-xs mb-4">
                  El örgüsü koleksiyonumuzdan beğendiğiniz çantaları ekleyerek Instagram üzerinden kolayca sipariş oluşturabilirsiniz.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#1F1C1A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
                >
                  Modelleri İncele
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor}-${idx}`} className="py-4 flex gap-4">
                  
                  {/* Bag Thumbnail */}
                  <div className="w-18 h-18 bg-[#F0ECE1] rounded border border-[#E0DACE] overflow-hidden shrink-0 flex items-center justify-center">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl">👜</span>
                    )}
                  </div>

                  {/* Bag Meta */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#A1988E] hover:text-[#9E2A2B] p-0.5 transition-colors"
                          title="Çantayı Çıkar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7A7065] mt-1 space-y-0.5">
                        <div>Renk: <strong>{item.selectedColor}</strong></div>
                        <div>Ebat: {item.product.dimensions || 'Standart'}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F2EDE4]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#D5CEC2] rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 text-xs text-[#59524A] hover:bg-[#F2EDE4]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#59524A] hover:bg-[#F2EDE4]"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#1A1A1A] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E8E4DC] space-y-3">
              
              {/* Optional customer info for fast order */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="İsminiz (İsteğe bağlı)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded text-xs focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Şehir / İlçe"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded text-xs focus:outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Özel renk veya notunuz (Örn: Bej yerine vizon renk örülsün)"
                value={colorNote}
                onChange={(e) => setColorNote(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded text-xs focus:outline-none"
              />

              {/* Total Row */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs uppercase tracking-wider text-[#7A7065] font-medium">
                  Toplam Tutar
                </span>
                <span className="font-serif text-2xl font-bold text-[#1A1A1A] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Copy Notification Toast */}
              {copiedNotice && (
                <div className="p-2.5 bg-[#FDF2F8] border border-[#F472B6] rounded-md text-[11px] text-[#9D174D] flex items-start gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-[#DB2777] shrink-0 mt-0.5" />
                  <span>
                    <strong>Sipariş özeti kopyalandı!</strong> Açılan Instagram sayfamızda DM mesaj alanına yapıştırıp bize gönderebilirsiniz.
                  </span>
                </div>
              )}

              {/* Primary Action: Direct Instagram DM Order */}
              <button
                onClick={handleInstagramCheckout}
                className="w-full py-3.5 bg-[#C13584] hover:bg-[#A82870] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01]"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram DM ile Sipariş Ver</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#7A7065] pt-1">
                <span className="text-[10px] text-[#8C827A]">
                  Tüm Türkiye'ye Anlaşmalı Kargo
                </span>

                <button
                  onClick={onClearCart}
                  className="hover:text-[#9E2A2B] text-[10px] underline"
                >
                  Sepeti Temizle
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
