import React from 'react';
import { useTranslation } from './Shared';

export default function Footer({ navigate }: { navigate: (path: string) => void }) {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-[#000000] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="font-sans font-bold text-3xl mb-4 tracking-tighter">KOPI BABAH KACAMATA</h2>
            <p className="font-sans text-sm text-[#CCCCCC] mb-6 max-w-sm leading-relaxed">{t('FOOTER_DESC')}</p>
          </div>
          
          <div>
            <h3 className="font-sans text-xs font-medium tracking-widest uppercase mb-6 text-[#999999]">{t('QUICK_LINKS')}</h3>
            <ul className="space-y-4 font-sans text-xs uppercase text-[#CCCCCC]">
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('marketplace'); }} className="hover:text-white transition-colors">{t('MARKETPLACE')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('about'); }} className="hover:text-white transition-colors">{t('ABOUT')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('WHOLESALE')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('FAQ')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans text-xs font-medium tracking-widest uppercase mb-6 text-[#999999]">{t('SOCIAL')}</h3>
             <ul className="space-y-4 font-sans text-xs uppercase text-[#CCCCCC]">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tokopedia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#333333] flex flex-col md:flex-row justify-between items-center font-sans text-xs tracking-widest text-[#999999] uppercase">
          <p>&copy; {new Date().getFullYear()} Kopi Babah Kacamata. All rights reserved.</p>
          <p className="mt-4 md:mt-0 font-medium">EST. 1965 • SALATIGA, INDONESIA</p>
        </div>
      </div>
    </footer>
  );
}
