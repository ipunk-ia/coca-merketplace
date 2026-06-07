import React from 'react';
import { useTranslation } from '../components/Shared';

export default function OrderSuccess({ navigate, orderId }: { navigate: (path: string, params?: any) => void, orderId?: string }) {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 py-32 animate-fade-in flex flex-col items-center text-center">
      
      <h1 className="font-heading font-medium text-4xl md:text-6xl tracking-tight text-[#000000] mb-6">THANK YOU</h1>
      <p className="font-sans text-xl text-[#666666] mb-16">Your order has been placed.</p>
      
      <div className="w-full border border-[#EEEEEE] bg-[#F9F9F9] p-12 mb-12 rounded-sm shadow-sm">
        <div className="font-sans text-[10px] tracking-widest font-semibold uppercase text-[#666666] mb-4">ORDER NUMBER</div>
        <div className="font-sans font-semibold text-2xl text-[#000000] tracking-widest border-b border-[#EEEEEE] inline-block pb-4 mb-4">
          #KBK-{orderId || '95827'}
        </div>
        <div className="font-sans text-xs text-[#666666] mt-4 max-w-sm mx-auto leading-relaxed">
          A confirmation email has been sent to your address with your receipt and shipping details.
        </div>
      </div>

      <button 
        onClick={() => navigate('marketplace')}
        className="font-sans text-xs font-semibold tracking-widest uppercase bg-[#000000] text-white px-12 py-4 hover:bg-[#333333] transition-colors rounded-sm"
      >
        {t('CONTINUE_SHOPPING')}
      </button>
    </div>
  );
}
