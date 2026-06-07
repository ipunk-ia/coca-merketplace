import { useState, useEffect } from 'react';
import { StoreProvider } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import OrderSuccess from './pages/OrderSuccess';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  const [route, setRoute] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\//, '');
    return path || 'home';
  });
  const [routeParams, setRouteParams] = useState<any>(null);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      setRoute(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, params?: any) => {
    setRoute(path);
    setRouteParams(params || null);
    window.history.pushState({}, '', '/' + (path === 'home' ? '' : path));
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (route) {
      case 'home': return <Home navigate={navigate} />;
      case 'marketplace': return <Marketplace navigate={navigate} />;
      case 'product': return <ProductDetail navigate={navigate} productId={routeParams?.id} />;
      case 'cart': return <Cart navigate={navigate} />;
      case 'checkout': return <Checkout navigate={navigate} />;
      case 'about': return <About navigate={navigate} />;
      case 'success': return <OrderSuccess navigate={navigate} orderId={routeParams?.orderId} />;
      case 'coca': return <AdminLogin navigate={navigate} />;
      case 'admin-dashboard': return <Admin navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col font-sans text-black bg-white overflow-x-hidden selection:bg-black selection:text-white">
        <Navbar navigate={navigate} />
        <main className="flex-grow pt-[120px] md:pt-[100px]">
          {renderPage()}
        </main>
        <Footer navigate={navigate} />
      </div>
    </StoreProvider>
  );
}
