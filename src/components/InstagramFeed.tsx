import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/initialProducts';

export const InstagramFeed: React.FC = () => {
  return (
    <section id="instagram" className="py-12 sm:py-16 bg-white border-b border-[#E8E4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Clean, Elegant Instagram Follow Banner (Small boxes removed) */}
        <div className="bg-[#FAF9F6] border border-[#E0DACE] rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col items-center">
          
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] mb-4">
            <div className="w-full h-full rounded-full bg-[#1F1C1A] text-white flex items-center justify-center border-2 border-white">
              <Instagram className="w-7 h-7 text-white" />
            </div>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-semibold mb-2">
            Bizi Instagram'da Takip Edin
          </h3>

          <p className="text-sm text-[#59524A] max-w-md mx-auto mb-6 leading-relaxed">
            Yeni örme çanta modellerimiz, özel renk seçeneklerimiz ve güncel paylaşımlarımız için <strong className="text-[#1A1A1A]">@{INSTAGRAM_HANDLE}</strong> hesabımızı ziyaret edebilirsiniz.
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C13584] hover:bg-[#A82870] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm hover:scale-105"
          >
            <Instagram className="w-4 h-4" />
            <span>@{INSTAGRAM_HANDLE} Instagram Sayfamız</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>

        </div>

      </div>
    </section>
  );
};
