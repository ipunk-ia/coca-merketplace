import React from 'react';
import { useTranslation, StampCard } from '../components/Shared';
import { useStore } from '../store';

export default function Home({ navigate }: { navigate: (path: string, params?: any) => void }) {
  const { t } = useTranslation();
  const { state } = useStore();
  
  // Featured products: top 4 by rating
  const featuredProducts = [...state.products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="min-h-[85vh] relative flex items-center bg-white border-b border-[#EEEEEE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="md:w-1/2 z-10 relative">
              <div className="font-sans text-xs font-medium tracking-widest mb-8 uppercase text-[#666666]">
                Since 1965 • Salatiga, Indonesia
              </div>
              
              <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[#000000] mb-8 tracking-tighter">
                KOPI BABAH <br/> KACAMATA
              </h1>
              
              <div className="mb-10 max-w-md">
                <h2 className="font-sans text-xs uppercase tracking-widest text-[#000000] mb-4 font-medium border-b border-[#000000] inline-block pb-1">
                  {t('HERO_SUBTITLE')}
                </h2>
                <p className="font-sans text-lg text-[#666666] leading-relaxed">
                  {t('HERO_DESC')}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('marketplace')}
                  className="font-sans text-xs font-medium tracking-widest uppercase bg-[#000000] text-white px-8 py-4 hover:bg-[#333333] transition-colors rounded-sm shadow-sm"
                >
                  {t('SHOP_NOW')}
                </button>
                <button 
                  onClick={() => navigate('about')}
                  className="font-sans text-xs font-medium tracking-widest uppercase bg-transparent text-[#000000] border border-[#000000] px-8 py-4 hover:bg-[#FAFAFA] transition-colors rounded-sm"
                >
                  {t('OUR_STORY')}
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="md:w-1/2 relative flex justify-center items-center mt-12 md:mt-0">
              <div className="w-full max-w-lg flex items-center justify-center p-4">
                {state.loadingProducts ? (
                  <div className="w-full h-80 bg-[#F0F0F0] animate-pulse rounded-sm" />
                ) : state.products[0]?.image ? (
                  <img 
                    src={state.products[0].image} 
                    alt="Kopi Babah Kacamata Signature" 
                    className="w-full h-auto object-contain drop-shadow-2xl mix-blend-multiply" 
                  />
                ) : null}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#EEEEEE] pb-6 gap-6">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#666666] mb-2 block">Premium Selection</span>
              <h2 className="font-sans font-medium text-4xl text-[#000000] tracking-tight">{t('FAVORITE')}</h2>
            </div>
            <button 
              onClick={() => navigate('marketplace')}
              className="font-sans text-xs font-medium tracking-widest uppercase hover:text-[#666666] transition-colors text-[#000000]"
            >
              {t('VIEW_CATALOG')} →
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <StampCard 
                key={product.id} 
                product={product} 
                onClick={() => navigate('product', { id: product.id })} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-32 border-y border-[#EEEEEE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div>
              <div className="text-2xl mb-6 text-[#000000] font-sans font-semibold">01</div>
              <h3 className="font-sans text-xs font-medium tracking-widest uppercase mb-4 text-[#000000]">{t('HERITAGE')}</h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed">{t('HERITAGE_DESC')}</p>
            </div>
            <div>
              <div className="text-2xl mb-6 text-[#000000] font-sans font-semibold">02</div>
              <h3 className="font-sans text-xs font-medium tracking-widest uppercase mb-4 text-[#000000]">{t('ORIGINAL')}</h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed">{t('ORIGINAL_DESC')}</p>
            </div>
            <div>
              <div className="text-2xl mb-6 text-[#000000] font-sans font-semibold">03</div>
              <h3 className="font-sans text-xs font-medium tracking-widest uppercase mb-4 text-[#000000]">{t('PURE')}</h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed">{t('PURE_DESC')}</p>
            </div>
            <div>
              <div className="text-2xl mb-6 text-[#000000] font-sans font-semibold">04</div>
              <h3 className="font-sans text-xs font-medium tracking-widest uppercase mb-4 text-[#000000]">{t('TRADITION')}</h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed">{t('TRADITION_DESC')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
