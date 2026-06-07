import React, { useState } from 'react';
import { useTranslation, StampCard, dict } from '../components/Shared';
import { useStore } from '../store';

type RoastFilter = 'ALL' | 'LIGHT' | 'MEDIUM' | 'DARK';
type SortOption = 'PRICE_UP' | 'PRICE_DOWN' | 'RATING' | 'NEWEST';

export default function Marketplace({ navigate }: { navigate: (path: string, params?: any) => void }) {
  const { t } = useTranslation();
  const { state } = useStore();
  const [filter, setFilter] = useState<RoastFilter>('ALL');
  const [sort, setSort] = useState<SortOption>('NEWEST');

  const filteredProducts = state.products.filter(p => {
    if (filter === 'ALL') return true;
    if (filter === 'LIGHT') return p.roastLevel.toUpperCase().includes('LIGHT');
    if (filter === 'MEDIUM') return p.roastLevel.toUpperCase().includes('MEDIUM') && !p.roastLevel.toUpperCase().includes('LIGHT');
    if (filter === 'DARK') return p.roastLevel.toUpperCase().includes('DARK') && !p.roastLevel.toUpperCase().includes('MEDIUM');
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'PRICE_UP': return a.price - b.price;
      case 'PRICE_DOWN': return b.price - a.price;
      case 'RATING': return b.rating - a.rating;
      case 'NEWEST': return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
      default: return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <div className="mb-16">
        <h1 className="font-heading font-medium text-4xl md:text-6xl tracking-tight text-[#000000] mb-4">SHOP COFFEE</h1>
        <p className="font-sans text-xl text-[#666666]">All available roasts from our current harvest</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#EEEEEE] pb-6 gap-8">
        <div className="flex flex-wrap gap-6 items-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-[#000000]">ROAST:</span>
          {['ALL', 'LIGHT', 'MEDIUM', 'DARK'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as RoastFilter)}
              className={`font-sans text-xs tracking-widest uppercase transition-colors pb-1 border-b-2 ${
                filter === f 
                  ? 'border-[#000000] text-[#000000] font-medium' 
                  : 'border-transparent text-[#666666] hover:text-[#000000]'
              }`}
            >
              {t(f as keyof typeof dict.en)}
            </button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-[#000000]">SORT:</span>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="font-sans text-xs uppercase tracking-widest bg-transparent border border-[#EEEEEE] p-2 outline-none focus:border-[#000000] cursor-pointer text-[#000000]"
          >
            <option value="NEWEST">Newest Arrivals</option>
            <option value="PRICE_UP">Price: Low to High</option>
            <option value="PRICE_DOWN">Price: High to Low</option>
            <option value="RATING">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
          <StampCard 
            key={product.id} 
            product={product} 
            onClick={() => navigate('product', { id: product.id })} 
          />
        ))}
      </div>
      
      {sortedProducts.length === 0 && (
        <div className="text-center py-32 font-sans text-sm tracking-widest uppercase text-[#666666]">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
}
