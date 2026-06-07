import React from 'react';
import { useStore } from '../store';
import { useTranslation } from '../components/Shared';
import { formatPrice } from '../data';

export default function Cart({ navigate }: { navigate: (path: string, params?: any) => void }) {
  const { state, dispatch } = useStore();
  const { t, lang } = useTranslation();

  const handleUpdate = (id: number, qty: number) => {
    if (qty < 1) dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    else dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, quantity: qty } });
  };

  const subtotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150000 || subtotal === 0 ? 0 : 20000;
  const total = subtotal + shipping;

  const displayPrice = (amount: number) => {
    const p = formatPrice(amount);
    return lang === 'en' ? p.usd : p.idr;
  };

  if (state.cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 animate-fade-in text-center">
        <h1 className="font-heading font-medium text-4xl mb-6 text-[#000000] tracking-tight">{t('SHOPPING_CART')}</h1>
        <p className="font-sans text-[#666666] mb-12">Your cart is currently empty.</p>
        <button 
          onClick={() => navigate('marketplace')}
          className="font-sans text-xs font-medium tracking-widest uppercase bg-[#000000] text-white px-8 py-4 hover:bg-[#333333] transition-colors"
        >
          {t('GO_TO_SHOP')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="font-heading font-medium text-4xl mb-12 text-[#000000] tracking-tight">{t('SHOPPING_CART')}</h1>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-2/3">
          <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-[#EEEEEE] pb-4 mb-6 font-sans text-xs tracking-widest uppercase font-medium text-[#666666]">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>
          
          <div className="space-y-8">
            {state.cart.map((item) => {
              const name = lang === 'en' ? item.product.name : item.product.nameId;
              return (
                <div key={item.product.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-b border-[#EEEEEE] pb-8 last:border-0">
                  <div className="col-span-6 flex gap-6 items-start sm:items-center">
                    <div className="w-20 h-28 bg-[#F9F9F9] flex items-center justify-center p-2 flex-shrink-0 relative overflow-hidden rounded-sm">
                      <img src={item.product.image} alt={name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm" />
                    </div>
                    <div>
                      <h3 className="font-sans font-medium text-base leading-tight mb-2 text-[#000000]">{name}</h3>
                      <div className="font-sans text-xs text-[#666666] uppercase tracking-widest">
                        {item.product.weight}
                      </div>
                      <button 
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })}
                        className="font-sans text-xs text-[#666666] uppercase tracking-widest mt-4 hover:text-[#000000] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex justify-start sm:justify-center mt-4 sm:mt-0">
                    <div className="flex items-center border border-[#EEEEEE] bg-white text-[#000000] rounded-sm">
                      <button onClick={() => handleUpdate(item.product.id, item.quantity - 1)} className="px-3 py-2 hover:bg-[#F9F9F9] transition-colors">−</button>
                      <span className="font-sans px-4 text-center min-w-[2.5rem]">{item.quantity}</span>
                      <button onClick={() => handleUpdate(item.product.id, item.quantity + 1)} className="px-3 py-2 hover:bg-[#F9F9F9] transition-colors">+</button>
                    </div>
                  </div>
                  
                  <div className="col-span-3 text-left sm:text-right mt-2 sm:mt-0">
                    <div className="font-sans font-medium text-base text-[#000000]">{displayPrice(item.product.price * item.quantity)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-[#F9F9F9] p-8 rounded-sm">
            <h2 className="font-sans text-xs font-medium tracking-widest uppercase mb-6 border-b border-[#EEEEEE] pb-4 text-[#000000]">Order Summary</h2>
            
            <div className="space-y-4 mb-8 font-sans text-xs tracking-widest uppercase text-[#666666]">
              <div className="flex justify-between">
                <span>{t('SUBTOTAL')}</span>
                <span className="text-[#000000]">{displayPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>{t('SHIPPING')}</span>
                <span className="text-[#000000]">
                  {shipping === 0 ? 'Free' : displayPrice(shipping)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-[#EEEEEE] pt-6 mb-8 text-[#000000]">
              <span className="font-sans text-xs font-medium tracking-widest uppercase">Total</span>
              <span className="font-sans font-medium text-lg">{displayPrice(total)}</span>
            </div>
            
            <button 
              onClick={() => navigate('checkout')}
              className="w-full font-sans text-xs font-medium tracking-widest uppercase py-4 bg-[#000000] text-white hover:bg-[#333333] transition-colors rounded-sm"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
