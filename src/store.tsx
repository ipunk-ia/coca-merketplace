import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, CartItem } from './types';
import { supabase } from './lib/supabase';
import { products as initialDataProducts } from './data';

interface State {
  lang: 'en' | 'id';
  cart: CartItem[];
  products: Product[];
  loadingProducts: boolean;
}

type Action = 
  | { type: 'SET_LANG'; payload: 'en' | 'id' }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: State = {
  lang: 'en',
  cart: [],
  products: [],
  loadingProducts: true
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LANG': return { ...state, lang: action.payload };
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.product.id === action.payload.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item => 
            item.product.id === action.payload.product.id 
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case 'REMOVE_FROM_CART': return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload) };
    case 'UPDATE_QUANTITY': return { ...state, cart: state.cart.map(item => item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item) };
    case 'CLEAR_CART': return { ...state, cart: [] };
    case 'SET_PRODUCTS': return { ...state, products: action.payload };
    case 'SET_LOADING': return { ...state, loadingProducts: action.payload };
    default: return state;
  }
}

const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          console.error('Fetch error:', error);
          dispatch({ type: 'SET_PRODUCTS', payload: [] });
        } else if (data) {
          // Strictly use Supabase data, never fall back to dummy
          dispatch({ type: 'SET_PRODUCTS', payload: data });
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    fetchProducts();
  }, []);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
