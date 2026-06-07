import React from 'react';
import { useStore } from '../store';
import { Product } from '../types';

// Translation Hook and Dictionary
export const dict = {
  en: {
    HOME: 'Home',
    MARKETPLACE: 'Marketplace',
    ABOUT: 'About',
    CART: 'Cart',
    ADD_TO_CART: 'Add to Cart',
    CHECKOUT: 'Checkout',
    HERO_SUBTITLE: 'Salatiga Coffee Legend',
    HERO_DESC: 'Serving timeless traditional coffee brews. Discover the authentic taste that has been the pride of Salatiga\'s culinary heritage since 1965.',
    SHOP_NOW: 'SHOP NOW',
    OUR_STORY: 'OUR STORY',
    FAVORITE: 'CUSTOMER FAVORITES',
    VIEW_CATALOG: 'VIEW FULL CATALOG',
    HERITAGE: 'HERITAGE SINCE 1965',
    HERITAGE_DESC: 'More than half a century of maintaining traditional recipes without compromise.',
    ORIGINAL: '100% ORIGINAL SALATIGA',
    ORIGINAL_DESC: 'Chosen as one of the proud Culinary Heritages of Salatiga City.',
    PURE: 'NO ADDITIVES',
    PURE_DESC: 'From high quality Nusantara coffee beans, roasted with high precision without artificial flavoring.',
    TRADITION: 'TRADITION & QUALITY',
    TRADITION_DESC: 'We ensure every cup represents the true pleasure of Javanese style coffee.',
    FOOTER_DESC: 'Authentic legendary coffee since 1965 from Salatiga. Included in Salatiga Culinary Heritage. 100% selected Robusta & Arabica.',
    QUICK_LINKS: 'QUICK LINKS',
    WHOLESALE: 'Wholesale',
    FAQ: 'FAQ',
    SOCIAL: 'SOCIAL',
    SHOPPING_CART: 'Shopping Cart',
    GO_TO_SHOP: 'GO TO SHOP',
    SUBTOTAL: 'Subtotal',
    SHIPPING: 'Shipping',
    CART_EMPTY: 'CART EMPTY',
    CONTINUE_SHOPPING: 'CONTINUE SHOPPING',
    BACK_TO_SHOP: 'Back to Shop',
    ROAST_LEVEL: 'Roast Level',
    WEIGHT: 'Weight',
    FLAVOR_NOTES: 'Flavor Notes',
    QUANTITY: 'Quantity',
    IN_STOCK: 'In Stock',
    OUT_OF_STOCK: 'Out of Stock',
    BUY_NOW: 'Buy Now',
    ALL: 'All',
    LIGHT: 'Light',
    MEDIUM: 'Medium',
    DARK: 'Dark',
  },
  id: {
    HOME: 'Beranda',
    MARKETPLACE: 'Pasar',
    ABOUT: 'Tentang Cita',
    CART: 'Keranjang',
    ADD_TO_CART: 'Beli Sekarang',
    CHECKOUT: 'Proses Pesanan',
    HERO_SUBTITLE: 'Legenda Kopi Salatiga',
    HERO_DESC: 'Menyajikan seduhan kopi tradisional yang tak lekang oleh waktu. Temukan cita rasa otentik yang menjadi warisan kuliner kebanggaan Salatiga sejak 1965.',
    SHOP_NOW: 'BELI SEKARANG',
    OUR_STORY: 'TENTANG KAMI',
    FAVORITE: 'FAVORIT PELANGGAN',
    VIEW_CATALOG: 'LIHAT SEMUA KATALOG',
    HERITAGE: 'WARISAN SEJAK 1965',
    HERITAGE_DESC: 'Lebih dari setengah abad mempertahankan resep tradisional tanpa kompromi.',
    ORIGINAL: '100% ASLI SALATIGA',
    ORIGINAL_DESC: 'Terpilih sebagai salah satu Culinary Heritage kebanggaan Kota Salatiga.',
    PURE: 'TANPA CAMPURAN',
    PURE_DESC: 'Dari biji kopi Nusantara berkualitas, disangrai dengan presisi tinggi tanpa tambahan perasa buatan.',
    TRADITION: 'TRADISI & KUALITAS',
    TRADITION_DESC: 'Kami memastikan setiap cangkir merepresentasikan kenikmatan sejati kopi gaya Jawa.',
    FOOTER_DESC: 'Kopi Otentik legendaris sejak 1965 khas Salatiga. Masuk dalam Salatiga Culinary Heritage. 100% Robusta & Arabika pilihan.',
    QUICK_LINKS: 'TAUTAN',
    WHOLESALE: 'Grosir',
    FAQ: 'FAQ',
    SOCIAL: 'SOSIAL',
    SHOPPING_CART: 'Keranjang Belanja',
    GO_TO_SHOP: 'KEMBALI BELANJA',
    SUBTOTAL: 'Subtotal',
    SHIPPING: 'Pengiriman',
    CART_EMPTY: 'KERANJANG KOSONG',
    CONTINUE_SHOPPING: 'LANJUT BELANJA',
    BACK_TO_SHOP: 'Kembali ke Toko',
    ROAST_LEVEL: 'Level Roasting',
    WEIGHT: 'Berat',
    FLAVOR_NOTES: 'Profil Rasa',
    QUANTITY: 'Jumlah',
    IN_STOCK: 'Tersedia',
    OUT_OF_STOCK: 'Habis',
    BUY_NOW: 'Beli Sekarang',
    ALL: 'Semua',
    LIGHT: 'Ringan',
    MEDIUM: 'Sedang',
    DARK: 'Kuat',
  }
};

export const useTranslation = () => {
  const { state } = useStore();
  const lang = state.lang as keyof typeof dict;
  
  return {
    t: (key: keyof typeof dict.en) => dict[lang][key] || key,
    lang
  };
};

// Reusable Stamp/Card Component
export const StampCard: React.FC<{ product: Product, onClick: () => void }> = ({ product, onClick }) => {
  const { lang } = useTranslation();
  
  const prices = typeof product.price === 'number' 
    ? { usd: `$${(product.price / 15000).toFixed(2)}`, idr: `Rp ${product.price.toLocaleString('id-ID')}` }
    : product.price;

  const notes = product.flavorNotes || [];
  const name = product.name;

  return (
    <div 
      className="bg-white border border-[#EEEEEE] hover:border-[#000000] cursor-pointer flex flex-col p-6 transition-all duration-300 hover:shadow-sm w-full group relative rounded-sm"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-6">
        <span className="font-sans text-[10px] tracking-widest text-[#666666] uppercase">Indonesia</span>
        <span className="font-sans text-[10px] tracking-widest font-medium uppercase">{product.weight}</span>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center pb-6">
        <div className="w-full h-48 mb-8 relative flex justify-center items-center overflow-hidden bg-[#F9F9F9] rounded-sm p-2">
          <img 
            src={product.image} 
            alt={name} 
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform duration-500" 
          />
        </div>
        <h3 className="font-sans font-medium text-lg text-center leading-tight mb-3 text-[#000000]">{name}</h3>
        
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {notes.map((note, i) => (
            <span key={i} className="text-[10px] font-sans text-[#666666] uppercase tracking-wider">
              {note}{i < notes.length - 1 ? ' •' : ''}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end mt-auto pt-4 border-t border-[#EEEEEE]">
        <div>
          <div className="font-sans font-semibold text-lg text-[#000000]">
            {lang === 'en' ? prices.usd : prices.idr}
          </div>
        </div>
      </div>

      {product.badge && (
        <div className="absolute top-4 right-4 bg-[#000000] text-white font-sans text-[9px] tracking-widest px-2 py-1 uppercase rounded-sm">
          {product.badge}
        </div>
      )}
    </div>
  );
};
