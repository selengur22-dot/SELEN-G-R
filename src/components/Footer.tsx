import React from 'react';
import { Instagram, Globe, SlidersHorizontal, ArrowUp, Truck, Lock, LogOut, ShieldCheck } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/initialProducts';
import { SiteSettings } from '../types';

interface FooterProps {
  onOpenPriceManager: () => void;
  siteSettings?: SiteSettings;
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
  onAdminLogout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPriceManager,
  siteSettings,
  isAdmin = false,
  onOpenAdminLogin,
  onAdminLogout,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const instagramHandle = siteSettings?.instagramHandle || INSTAGRAM_HANDLE;
  const instagramUrl = siteSettings?.instagramUrl || INSTAGRAM_URL;
  const brandName = siteSettings?.brandName || 'GUASÉ';

  return (
    <footer id="iletisim" className="bg-[#191614] text-[#E5E0D8] pt-14 pb-10 border-t border-[#2E2824]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#2E2824]">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3.5">
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white block uppercase">
                {brandName}
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#B8860B] uppercase block">
                ISTANBUL · ÖRME ÇANTA
              </span>
            </div>
            
            <p className="text-xs text-[#A89E94] leading-relaxed">
              İstanbul merkezli el emeği örme çanta markası. %100 el örgüsü, doğal pamuk ve rafya iplerle işlenen zamansız çanta tasarımları.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#26211E] hover:bg-[#C13584] text-white rounded text-xs transition-colors"
                title={`Instagram: @${instagramHandle}`}
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>@{instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Online Sales & Direct Instagram Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Satış & Sipariş Kanalı
            </h4>
            <div className="space-y-2.5 text-xs text-[#A89E94]">
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                <span className="text-[#E0DACE] font-medium">Yalnızca Online Satış (Fiziksel Mağazamız Yoktur)</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span>İstanbul Atölyesinden Tüm Türkiye'ye Kargo</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#C13584] shrink-0" />
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors font-medium text-white/95"
                >
                  Sipariş & DM: @{instagramHandle}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2 text-xs text-[#A89E94]">
              <li>
                <a href="#koleksiyon" className="hover:text-white transition-colors">
                  Örme Çanta Kataloğu
                </a>
              </li>
              <li>
                <a href="#el-emegi" className="hover:text-white transition-colors">
                  El Emeği & Sipariş Aşamaları
                </a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-white transition-colors">
                  Instagram @{instagramHandle}
                </a>
              </li>
              {isAdmin && (
                <li>
                  <button
                    onClick={onOpenPriceManager}
                    className="hover:text-[#D4AF37] text-left transition-colors flex items-center gap-1.5 text-[#D4AF37]"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>Fiyat & Model Yönetim Alanı</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Guasé Knit Promises */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Guasé Güvencesi
            </h4>
            <div className="text-xs text-[#A89E94] space-y-2">
              <p>• %100 el örgüsü, el emeği özgün modeller.</p>
              <p>• Dilediğiniz renk kombinasyonunda kişiye özel örgü imkanı.</p>
              <p>• Bez saklama torbası ve özenli ambalaj.</p>
              <p>• Tüm Türkiye'ye anlaşmalı güvenli kargo.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Admin Lock Toggle */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7269] gap-4">
          <div>
            © {new Date().getFullYear()} {brandName} · El Emeği Örme Çantalar. Yalnızca Online Satış.
          </div>

          <div className="flex items-center gap-5">
            {isAdmin ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenPriceManager}
                  className="text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Yönetici Paneli</span>
                </button>
                <button
                  onClick={onAdminLogout}
                  className="text-[#C5BEB2] hover:text-white flex items-center gap-1"
                  title="Yönetici Modundan Çık"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="text-[#7A7269] hover:text-[#C5BEB2] flex items-center gap-1.5 transition-colors"
                title="Yalnızca Mağaza Sahibi İçindir"
              >
                <Lock className="w-3 h-3 text-[#A89E94]" />
                <span>Yönetici Girişi</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#A89E94] hover:text-white transition-colors"
            >
              <span>Başa Dön</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
