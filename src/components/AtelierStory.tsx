import React from 'react';
import { Sparkles, Instagram, Heart, Globe, Truck, Palette, CheckCircle2, Scissors, PackageCheck } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/initialProducts';

export const AtelierStory: React.FC = () => {
  return (
    <section id="el-emegi" className="py-16 sm:py-20 bg-[#F4F1EA] border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Craft Story */}
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#85796E] flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#B8860B]"></span>
              <span>İstanbul Atölyesi · %100 El Emeği</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-medium leading-tight">
              Her İlmekte Sevgi, <br />
              <span className="italic text-[#63554B]">Özgün Dokular.</span>
            </h2>

            <p className="text-sm text-[#59524A] leading-relaxed">
              Guasé Istanbul olarak seri fabrika üretimi yerine; her biri saatlerce el emeğiyle örülen, dokusu ve ruhu olan çantalar tasarlıyoruz. Pamuk makrome, kaliteli kordon, rafya kağıt ip ve kadife şeritlerle ördüğümüz modellerimizde hem dayanıklılık hem de zamansız bir estetik sunuyoruz.
            </p>

            <div className="p-4 bg-white/95 rounded-lg border border-[#E0DACE] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#855D10] font-semibold text-xs">
                <Globe className="w-4 h-4" />
                <span>Yalnızca Online Satış (Fiziksel Mağazamız Yoktur)</span>
              </div>
              <p className="text-xs text-[#59524A] leading-relaxed">
                Fiziksel bir mağaza işletme masraflarını ortadan kaldırarak en kaliteli el emeği çantaları en adil fiyatlarla sunuyoruz. Siparişleriniz atölyemizde özenle hazırlanıp Türkiye’nin her yerine kargolanmaktadır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 bg-white/80 rounded-md border border-[#E0DACE]">
                <div className="flex items-center gap-2 text-[#2E2824] font-semibold text-xs mb-1">
                  <Palette className="w-4 h-4 text-[#B8860B]" />
                  <span>Özel Renk Seçeneği</span>
                </div>
                <p className="text-[11px] text-[#6B635A]">
                  Beğendiğiniz modeli gardırobunuza uygun dilediğiniz renk tonunda sizin için örüyoruz.
                </p>
              </div>

              <div className="p-3.5 bg-white/80 rounded-md border border-[#E0DACE]">
                <div className="flex items-center gap-2 text-[#2E2824] font-semibold text-xs mb-1">
                  <Heart className="w-4 h-4 text-[#B8860B]" />
                  <span>Kumaş Astar & Detay</span>
                </div>
                <p className="text-[11px] text-[#6B635A]">
                  Çantalarımızın içi kaliteli kumaş astar, çıtçıt veya fermuar ile titizlikle tamamlanır.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C13584] hover:bg-[#A82870] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-xs hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram DM'den Özel Renk Siparişi Ver</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3-Step Online Sipariş Süreci */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="bg-white rounded-xl border border-[#D5CEC2] p-6 sm:p-7 shadow-xs">
              <div className="text-[10px] tracking-[0.22em] text-[#8C827A] uppercase font-bold mb-1">
                SİPARİŞ VE HAZIRLANMA SÜRECİ
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-semibold mb-5">
                El Emeği Çantanız Nasıl Hazırlanıyor?
              </h3>

              <div className="space-y-4">
                
                {/* Step 1 */}
                <div className="flex items-start gap-4 p-3.5 bg-[#FAF9F6] rounded-lg border border-[#EFECE6]">
                  <div className="w-8 h-8 rounded-full bg-[#1F1C1A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A1A1A] mb-0.5">Model ve Renk Belirleme</h4>
                    <p className="text-[11px] text-[#6B635A] leading-relaxed">
                      Siteden beğendiğiniz çantayı seçin veya Instagram @{INSTAGRAM_HANDLE} DM üzerinden dilediğiniz renk kombinasyonunu bize iletin.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 p-3.5 bg-[#FAF9F6] rounded-lg border border-[#EFECE6]">
                  <div className="w-8 h-8 rounded-full bg-[#1F1C1A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A1A1A] mb-0.5">Özenle Elde Örülme</h4>
                    <p className="text-[11px] text-[#6B635A] leading-relaxed">
                      Seçtiğiniz iplik türüyle (doğal pamuk makrome veya hasır kağıt ip) sık iğne tekniğiyle formunu koruyacak şekilde tek tek örülür. Kumaş astarı dikilir.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 p-3.5 bg-[#FAF9F6] rounded-lg border border-[#EFECE6]">
                  <div className="w-8 h-8 rounded-full bg-[#1F1C1A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A1A1A] mb-0.5">Özel Paketleme ve Kargo</h4>
                    <p className="text-[11px] text-[#6B635A] leading-relaxed">
                      Bez koruma torbası ve özenli ambalajı ile hazırlanarak kargoya verilir. Kargo takip kodunuz Instagram DM üzerinden iletilir.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Quote Box */}
              <div className="mt-5 pt-4 border-t border-[#EFECE6] text-center">
                <span className="text-xs text-[#7A7065] italic font-serif">
                  "Her ilmek, sabır ve zarafetin buluştuğu bir sanat eseridir."
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
