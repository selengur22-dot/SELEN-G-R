import React from 'react';
import { ArrowDown, Instagram, Sparkles, Truck, Globe, Palette, ShieldCheck, Heart } from 'lucide-react';
import { INSTAGRAM_URL, BRAND_BIO } from '../data/initialProducts';
import { SiteSettings } from '../types';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenPriceManager?: () => void;
  siteSettings?: SiteSettings;
  isAdmin?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenPriceManager, siteSettings, isAdmin }) => {
  const instagramUrl = siteSettings?.instagramUrl || INSTAGRAM_URL;
  const instagramHandle = siteSettings?.instagramHandle || 'guaseistanbul';
  const heroTitle = siteSettings?.heroTitle || 'Özgün Doku, Zamansız El Emeği';
  const heroSubtitle = siteSettings?.heroSubtitle || 'Her ilmeğinde sevgi ve zarafet var.';
  const brandName = siteSettings?.brandName || 'Guasé Istanbul';

  return (
    <section className="relative overflow-hidden bg-[#F7F5EE] border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Instagram Bio & Brand Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Bio Badge */}
            <div className="flex items-center gap-2 mb-3 text-[#7A7065] text-xs font-semibold tracking-[0.22em] uppercase">
              <span className="w-5 h-[1px] bg-[#B8860B]"></span>
              <span>İstanbul · %100 El Emeği Örme Çantalar</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-[1.18] tracking-tight font-medium mb-4">
              {heroTitle}
              <span className="block italic text-[#63554B] font-light mt-1.5 text-2xl sm:text-3xl lg:text-4xl">
                {heroSubtitle}
              </span>
            </h1>

            {/* Instagram Bio Bullets Box */}
            <div className="bg-white/95 border border-[#E0DACE] rounded-lg p-5 mb-6 shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-[#EFECE6] pb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  <Instagram className="w-4 h-4 text-[#C13584]" />
                  <span>@{instagramHandle} · Resmi Instagram Sayfası</span>
                </div>
                <span className="text-[10px] text-[#7A7065] bg-[#F2EDE4] px-2 py-0.5 rounded font-medium">
                  Yalnızca Online Satış
                </span>
              </div>

              <ul className="space-y-2 text-xs text-[#3E3832]">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] font-bold text-xs mt-0.5">•</span>
                  <span>%100 El Örgüsü ve Özgün Tasarım Çantalar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] font-bold text-xs mt-0.5">•</span>
                  <span>Yalnızca Online Satış (Fiziksel Mağazamız Yoktur)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] font-bold text-xs mt-0.5">•</span>
                  <span>İstediğiniz renk ve modelde kişiye özel örgü siparişi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] font-bold text-xs mt-0.5">•</span>
                  <span>Tüm Türkiye'ye Güvenli Kargo Gönderimi</span>
                </li>
                <li className="flex items-start gap-2 text-[#C13584] font-semibold">
                  <span className="text-[#C13584] font-bold text-xs mt-0.5">•</span>
                  <span>Fiyat & Sipariş için Instagram DM (@{instagramHandle})</span>
                </li>
              </ul>

              <div className="mt-3 pt-2.5 border-t border-[#EFECE6] flex items-center justify-between text-[11px]">
                <span className="text-[#855D10] font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Siparişler Instagram DM üzerinden alınmaktadır</span>
                </span>
                <span className="text-[#7A7065]">
                  Tüm Türkiye'ye Hızlı Kargo
                </span>
              </div>
            </div>

            {/* CTAs - Exclusively Instagram */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={onExploreCollection}
                className="px-6 py-3.5 bg-[#1F1C1A] hover:bg-[#38332F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm transition-all shadow-sm flex items-center gap-2"
              >
                <span>Örgü Çantaları İncele</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#C13584] hover:bg-[#A82870] text-white text-xs font-semibold uppercase tracking-[0.14em] rounded-sm transition-all shadow-sm flex items-center gap-2.5 hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram @{instagramHandle} (DM Sipariş)</span>
              </a>
            </div>

            {/* Guarantee Strip */}
            <div className="pt-4 border-t border-[#E0DACE] flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#7A7065]">
              <span className="font-semibold text-[#1A1A1A] flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                Tüm Türkiye'ye Güvenli Kargo
              </span>
              <span aria-hidden="true" className="text-[#C5BEB2]">·</span>
              <span className="flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-[#B8860B]" />
                İstediğiniz Renk & İp Seçeneği
              </span>
              <span aria-hidden="true" className="text-[#C5BEB2]">·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                %100 El Emeği İşçilik
              </span>
            </div>

          </div>

          {/* Right Column: Clean Editorial Brand Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#D5CEC2] rounded-xl p-6 sm:p-7 shadow-md relative overflow-hidden">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#E5C158]" />

              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] tracking-[0.25em] text-[#8C827A] uppercase font-bold">
                    ATÖLYE BİLGİ KARTI
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-semibold">
                    {brandName}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1F1C1A] text-white flex flex-col items-center justify-center text-center p-1 border-2 border-[#D4AF37]">
                  <span className="font-serif font-bold text-xs">G</span>
                  <span className="text-[7px] text-[#D4AF37]">ÖRME</span>
                </div>
              </div>

              {/* Craft Pillars */}
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E8E2D5] flex items-start gap-3">
                  <div className="p-2 bg-white rounded-md text-[#B8860B] shadow-2xs border border-[#E0DACE] shrink-0 mt-0.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A1A1A]">El Emeği & Özgün Dokular</h4>
                    <p className="text-[11px] text-[#6B635A] mt-0.5">
                      Her çanta, birinci sınıf pamuk makrome ve rafya iplerle elde tek tek örülür.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E8E2D5] flex items-start gap-3">
                  <div className="p-2 bg-white rounded-md text-[#B8860B] shadow-2xs border border-[#E0DACE] shrink-0 mt-0.5">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A1A1A]">Kişiye Özel Renk Seçimi</h4>
                    <p className="text-[11px] text-[#6B635A] mt-0.5">
                      Krem, bej, terracotta, adaçayı yeşili, siyah veya dilediğiniz tonda sipariş verebilirsiniz.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E8E2D5] flex items-start gap-3">
                  <div className="p-2 bg-white rounded-md text-[#B8860B] shadow-2xs border border-[#E0DACE] shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A1A1A]">Yalnızca Online Satış & Hızlı Kargo</h4>
                    <p className="text-[11px] text-[#6B635A] mt-0.5">
                      Siparişiniz bez koruma torbasında özenle paketlenip Türkiye geneline ulaştırılır.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Instagram Link Box */}
              <div className="pt-4 border-t border-[#EFECE6] flex items-center justify-between">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#C13584] hover:underline flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram'da İncele & Sipariş Ver</span>
                </a>

                {isAdmin && onOpenPriceManager && (
                  <button
                    onClick={onOpenPriceManager}
                    className="text-xs text-[#7A7065] hover:text-[#1A1A1A] underline"
                  >
                    Fiyatları Düzenle (Yönetici)
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
