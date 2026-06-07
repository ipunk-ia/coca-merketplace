import React, { useState } from 'react';
import { useStore } from '../store';
import { useTranslation } from '../components/Shared';
import { formatPrice } from '../data';

export default function ProductDetail({ navigate, productId }: { navigate: (path: string, params?: any) => void, productId?: number }) {
  const { state, dispatch } = useStore();
  const { t, lang } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [addedTimeout, setAddedTimeout] = useState<any>(null);
  const [justAdded, setJustAdded] = useState(false);

  const product = state.products.find(p => p.id === productId) || state.products[0];
  
  const name = lang === 'en' ? product.name : product.nameId;
  const description = lang === 'en' ? product.description : product.descriptionId;
  const notes = lang === 'en' ? product.flavorNotes : product.flavorNotesId;
  const prices = formatPrice(product.price);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    setJustAdded(true);
    if (addedTimeout) clearTimeout(addedTimeout);
    setAddedTimeout(setTimeout(() => setJustAdded(false), 2000));
  };

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    navigate('cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <button 
        onClick={() => navigate('marketplace')}
        className="font-sans text-xs font-medium tracking-widest uppercase text-[#666666] hover:text-[#000000] flex items-center mb-12 transition-colors"
      >
        ← {t('BACK_TO_SHOP')}
      </button>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Image Left Column */}
        <div className="w-full lg:w-1/2 flex justify-center items-start bg-[#F9F9F9] p-12 border border-[#EEEEEE] rounded-sm">
          <img 
            src={product.image} 
            alt={name} 
            className="w-full max-w-md h-auto object-contain drop-shadow-xl mix-blend-multiply" 
          />
        </div>

        {/* Details Right Column */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="font-sans text-xs font-medium tracking-widest uppercase text-[#666666] mb-4">
            {product.origin}
          </div>
          
          <h1 className="font-heading font-medium text-4xl md:text-5xl leading-[1.1] mb-4 text-[#000000] tracking-tight">{name}</h1>
          
          <div className="flex items-end gap-3 mb-10">
            <div className="font-sans font-semibold text-3xl text-[#000000]">
              {lang === 'en' ? prices.usd : prices.idr}
            </div>
          </div>

          <p className="font-sans text-xl text-[#000000] leading-relaxed mb-12 border-b border-[#EEEEEE] pb-12">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-10 mb-12 font-sans text-xs uppercase tracking-widest">
            <div>
              <span className="text-[#666666] block mb-2">{t('ROAST_LEVEL')}</span>
              <span className="font-medium text-[#000000]">{product.roastLevel}</span>
            </div>
            <div>
              <span className="text-[#666666] block mb-2">{t('WEIGHT')}</span>
              <span className="font-medium text-[#000000]">{product.weight}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[#666666] block mb-2">{t('FLAVOR_NOTES')}</span>
              <div className="flex flex-wrap gap-2 text-[#000000]">
                {notes.map((note, i) => (
                  <span key={i} className="font-medium">
                    {note}{i < notes.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-6 mb-8">
              <span className="font-sans text-[10px] font-medium uppercase tracking-widest text-[#666666]">{t('QUANTITY')}</span>
              <div className="flex items-center border border-[#EEEEEE] bg-white text-[#000000] rounded-sm">
                <button 
                  className="px-4 py-3 hover:bg-[#F9F9F9] transition-colors"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >−</button>
                <span className="px-6 font-sans text-sm text-center min-w-[3rem] font-medium">{quantity}</span>
                <button 
                  className="px-4 py-3 hover:bg-[#F9F9F9] transition-colors"
                  onClick={() => setQuantity(q => q + 1)}
                >+</button>
              </div>
            </div>

            <div className="mb-8 font-sans text-[10px] tracking-widest uppercase">
              {product.stock > 0 ? (
                <span className="text-green-700 font-medium">{t('IN_STOCK')} ({product.stock} available)</span>
              ) : (
                <span className="text-red-500 font-medium">{t('OUT_OF_STOCK')}</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 font-sans text-xs font-medium tracking-widest uppercase py-4 border border-[#000000] text-[#000000] hover:bg-[#F9F9F9] transition-colors disabled:opacity-50 rounded-sm"
              >
                {justAdded ? '✓ ADDED' : t('ADD_TO_CART')}
              </button>
              
              <button 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 font-sans text-xs font-medium tracking-widest uppercase py-4 bg-[#000000] text-white border border-[#000000] hover:bg-[#333333] transition-colors disabled:opacity-50 rounded-sm"
              >
                {t('BUY_NOW')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
