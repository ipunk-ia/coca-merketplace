import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { useTranslation } from './Shared';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar({ navigate }: { navigate: (path: string, params?: any) => void }) {
  const { state, dispatch } = useStore();
  const { t, lang } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleLang = () => {
    dispatch({ type: 'SET_LANG', payload: lang === 'en' ? 'id' : 'en' });
  };

  const navLinks = [
    { label: t('HOME'), path: 'home' },
    { label: t('MARKETPLACE'), path: 'marketplace' },
    { label: t('ABOUT'), path: 'about' }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className={`bg-white text-[#000000] transition-all duration-300 ${isScrolled ? 'py-4 shadow-sm' : 'py-6'} border-b border-[#EEEEEE]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div 
              className="font-sans font-bold text-2xl tracking-tighter cursor-pointer text-[#000000] hover:text-[#666666] transition-colors"
              onClick={() => navigate('home')}
            >
              KOPI BABAH KACAMATA
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-12 items-center font-sans font-medium text-xs tracking-widest">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="hover:text-[#666666] transition-colors uppercase"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-8">
              <button onClick={toggleLang} className="font-sans font-medium text-xs tracking-widest hover:text-[#666666] transition-colors">
                {lang === 'en' ? 'EN' : 'ID'}
              </button>
              
              <button 
                className="relative flex items-center hover:text-[#666666] transition-colors"
                onClick={() => navigate('cart')}
              >
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#000000] text-white font-sans text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <button className="md:hidden text-[#000000]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-[#000000] border-b border-[#EEEEEE]">
          <div className="px-4 py-8 space-y-8 flex flex-col items-center">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => { navigate(link.path); setIsMobileMenuOpen(false); }}
                className="font-sans font-medium text-sm tracking-widest uppercase hover:text-[#666666] w-full text-center"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
