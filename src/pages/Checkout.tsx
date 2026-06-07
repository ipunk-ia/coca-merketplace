import React, { useState } from 'react';
import { useStore } from '../store';
import { useTranslation } from '../components/Shared';
import { formatPrice } from '../data';

export default function Checkout({ navigate }: { navigate: (path: string, params?: any) => void }) {
  const { state, dispatch } = useStore();
  const { t, lang } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingError, setShippingError] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', province: '', zip: '', method: 'standard', payment: 'vatransfer'
  });

  const subtotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150000 || subtotal === 0 ? 0 : 20000;
  const total = subtotal + shipping;

  const displayPrice = (amount: number) => {
    const p = formatPrice(amount);
    return lang === 'en' ? p.usd : p.idr;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.address || !formData.city) {
        setShippingError(true);
        return;
      }
      setShippingError(false);
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    dispatch({ type: 'CLEAR_CART' });
    navigate('success', { orderId: Math.floor(10000 + Math.random() * 90000).toString() });
  };

  if (state.cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center animate-fade-in">
        <h2 className="font-heading font-medium text-4xl mb-6 text-[#000000]">{t('CART_EMPTY')}</h2>
        <button onClick={() => navigate('marketplace')} className="font-sans text-xs tracking-widest uppercase bg-[#000000] text-white px-8 py-4">{t('GO_TO_SHOP')}</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="font-heading font-medium text-4xl mb-12 text-center text-[#000000] tracking-tight">CHECKOUT</h1>

      {/* Progress */}
      <div className="flex border border-[#EEEEEE] mb-12 bg-white text-[#666666] rounded-sm">
        {[
          { num: 1, label: 'SHIPPING' },
          { num: 2, label: 'PAYMENT' },
          { num: 3, label: 'CONFIRM' }
        ].map((s, i) => (
          <div 
            key={i}
            className={`flex-1 text-center py-4 font-sans text-xs font-medium tracking-widest uppercase border-r border-[#EEEEEE] last:border-0 transition-colors ${
              step === s.num ? 'bg-[#000000] text-white' : 
              step > s.num ? 'bg-[#F9F9F9] text-[#000000]' : ''
            }`}
          >
            {s.num}. {s.label}
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#EEEEEE] p-8 md:p-12 rounded-sm shadow-sm">
      {step === 1 && (
        <div>
          <div className="font-sans text-xs font-medium tracking-widest uppercase border-b border-[#EEEEEE] pb-4 mb-8 text-[#000000]">SHIPPING INFORMATION</div>
          
          <div className="space-y-8 font-sans text-xs tracking-widest uppercase text-[#000000]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="flex flex-col">
                 <label className="font-medium mb-2">FULL NAME *</label>
                 <input 
                   type="text" 
                   value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                   className="bg-transparent border-b border-[#EEEEEE] px-0 py-3 outline-none focus:border-[#000000] transition-colors"
                 />
               </div>
               <div className="flex flex-col">
                 <label className="font-medium mb-2">EMAIL ADDRESS *</label>
                 <input 
                   type="email" 
                   value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                   className="bg-transparent border-b border-[#EEEEEE] px-0 py-3 outline-none focus:border-[#000000] transition-colors"
                 />
               </div>
            </div>
            
            <div className="flex flex-col">
              <label className="font-medium mb-2">STREET ADDRESS *</label>
              <input 
                type="text" 
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                className="bg-transparent border-b border-[#EEEEEE] px-0 py-3 outline-none focus:border-[#000000] transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="flex flex-col">
                 <label className="font-medium mb-2">CITY *</label>
                 <input 
                   type="text" 
                   value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                   className="bg-transparent border-b border-[#EEEEEE] px-0 py-3 outline-none focus:border-[#000000] transition-colors"
                 />
               </div>
               <div className="flex flex-col">
                 <label className="font-medium mb-2">PROVINCE</label>
                 <input 
                   type="text" 
                   value={formData.province} onChange={e => setFormData({...formData, province: e.target.value})}
                   className="bg-transparent border-b border-[#EEEEEE] px-0 py-3 outline-none focus:border-[#000000] transition-colors"
                 />
               </div>
               <div className="flex flex-col">
                 <label className="font-medium mb-2">POSTAL CODE</label>
                 <input 
                   type="text" 
                   value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})}
                   className="bg-transparent border-b border-[#EEEEEE] px-0 py-3 outline-none focus:border-[#000000] transition-colors"
                 />
               </div>
            </div>

            {shippingError && <div className="text-red-500 mt-4">REQUIRED FIELDS MISSING.</div>}

            <div className="pt-8">
              <button 
                onClick={handleNext}
                className="bg-[#000000] text-white py-4 px-12 float-right hover:bg-[#333333] transition-colors rounded-sm"
              >
                PROCEED TO PAYMENT
              </button>
              <div className="clear-both"></div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
         <div>
           <div className="font-sans text-xs font-medium tracking-widest uppercase border-b border-[#EEEEEE] pb-4 mb-8 text-[#000000]">PAYMENT METHOD</div>
           <div className="space-y-4">
             {[
               { id: 'vatransfer', name: 'BANK TRANSFER' },
               { id: 'ewallet', name: 'E-WALLET' },
               { id: 'cc', name: 'CREDIT CARD' }
             ].map(opt => (
               <div 
                 key={opt.id}
                 onClick={() => setFormData({...formData, payment: opt.id})}
                 className={`p-6 border rounded-sm cursor-pointer transition-colors ${
                   formData.payment === opt.id 
                     ? 'border-[#000000] bg-[#F9F9F9]' 
                     : 'border-[#EEEEEE] hover:bg-[#FAFAFA]'
                 }`}
               >
                 <div className="font-sans text-sm font-medium tracking-widest uppercase text-[#000000]">{opt.name}</div>
               </div>
             ))}
           </div>
           
           <div className="mt-12 flex justify-between items-center font-sans text-xs font-medium tracking-widest uppercase">
              <button onClick={() => setStep(1)} className="border-b border-transparent text-[#666666] pb-1 hover:text-[#000000] hover:border-[#000000] transition-colors">← BACK TO SHIPPING</button>
              <button 
                onClick={handleNext}
                className="bg-[#000000] text-white py-4 px-12 hover:bg-[#333333] transition-colors rounded-sm"
              >
                REVIEW ORDER
              </button>
            </div>
         </div>
      )}

      {step === 3 && (
        <div>
          <div className="font-sans text-xs font-medium tracking-widest uppercase border-b border-[#EEEEEE] pb-4 mb-8 text-[#000000]">ORDER SUMMARY</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border border-[#EEEEEE] rounded-sm p-8 bg-[#F9F9F9] mb-12 font-sans text-xs tracking-widest uppercase text-[#000000]">
            <div>
              <div className="font-medium mb-4 border-b border-[#000000] inline-block pb-1">BILL TO:</div>
              <div className="space-y-1">
                <div className="font-medium">{formData.name}</div>
                <div>{formData.address}</div>
                <div>{formData.city}, {formData.province} {formData.zip}</div>
                <div className="pt-2 text-[#666666] lowercase tracking-normal">{formData.email}</div>
              </div>
            </div>
            <div>
              <div className="font-medium mb-4 border-b border-[#000000] inline-block pb-1">PAYMENT:</div>
              <div className="space-y-4">
                <div>{formData.payment === 'vatransfer' ? 'BANK TRANSFER' : formData.payment === 'ewallet' ? 'E-WALLET' : 'CREDIT CARD'}</div>
                <div className="font-sans text-2xl font-medium pt-2">{displayPrice(total)}</div>
              </div>
            </div>
          </div>
          
          <div className="mb-12 font-sans text-xs uppercase tracking-widest">
             <div className="border-b border-[#EEEEEE] pb-4 mb-4 font-medium text-[#000000] flex justify-between">
               <span>ITEMS</span>
               <span>SUBTOTAL</span>
             </div>
             <div className="space-y-4 mb-8">
               {state.cart.map(item => (
                 <div key={item.product.id} className="flex justify-between text-[#666666]">
                   <span>{item.quantity} × {item.product.name} ({item.product.weight})</span>
                   <span className="text-[#000000]">{displayPrice(item.product.price * item.quantity)}</span>
                 </div>
               ))}
               <div className="flex justify-between text-[#666666] pt-4">
                 <span>SHIPPING</span>
                 <span className="text-[#000000]">{shipping === 0 ? 'FREE' : displayPrice(shipping)}</span>
               </div>
             </div>
             <div className="border-t border-[#EEEEEE] pt-4 flex justify-between font-medium text-[#000000]">
               <span className="font-sans text-xs">TOTAL</span>
               <span className="font-sans font-medium text-lg">{displayPrice(total)}</span>
             </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 font-sans text-xs font-medium tracking-widest uppercase">
            <button onClick={() => setStep(2)} className="border-b border-transparent text-[#666666] pb-1 hover:text-[#000000] hover:border-[#000000] transition-colors">← MODIFY ORDER</button>
            <button 
              onClick={handlePlaceOrder}
              className="w-full sm:w-auto bg-[#000000] text-white py-4 px-12 hover:bg-[#333333] transition-colors rounded-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
