import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

export default function Admin({ navigate }: { navigate: (path: string) => void }) {
  const { state, dispatch } = useStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [roastLevel, setRoastLevel] = useState<Product['roastLevel']>('Medium');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://dummy.supabase.co') {
        setCheckingAuth(false);
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('coca'); // Redirect to login
      } else {
        setCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (state.loadingProducts || checkingAuth) {
    return <div className="py-32 text-center text-[#666666]">Loading admin...</div>;
  }

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setPrice(p.price.toString());
    setStock(p.stock.toString());
    setDescription(p.description);
    setImage(p.image);
    setImageFile(null);
    setRoastLevel(p.roastLevel || 'Medium');
    setIsAdding(false);
    setMessage('');
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setStock('');
    setDescription('');
    setImage('');
    setImageFile(null);
    setRoastLevel('Medium');
    setIsAdding(true);
    setMessage('');
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      
      dispatch({ type: 'SET_PRODUCTS', payload: state.products.filter(p => p.id !== id) });
      setMessage('Product deleted successfully.');
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Error deleting product');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      let finalImageUrl = image;

      if (imageFile) {
        setMessage('Mengunggah gambar ke Supabase Storage...');
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile);
          
        if (uploadError) {
          throw new Error('Gagal mengunggah gambar. Pastikan bucket "product-images" sudah dibuat dan diset Public. Detail: ' + uploadError.message);
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
          
        finalImageUrl = publicUrl;
      }

      const productData = {
        name,
        nameId: name,
        price: parseInt(price),
        stock: parseInt(stock),
        description,
        descriptionId: description,
        image: finalImageUrl || 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80',
        roastLevel
      };

      if (editingProduct) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([
          {
            ...productData,
            weight: '250g',
            origin: 'Salatiga, Central Java',
            flavorNotes: ['Coffee'],
            flavorNotesId: ['Kopi'],
            rating: 5,
            reviews: 0,
            isNew: true,
            badge: null
          }
        ]);
        if (error) throw error;
      }

      // Re-fetch products
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        dispatch({ type: 'SET_PRODUCTS', payload: data });
      }
      
      setEditingProduct(null);
      setIsAdding(false);
      setMessage('Saved successfully!');
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <h1 className="font-heading font-medium text-4xl mb-8 text-[#000000] tracking-tight">ADMIN DASHBOARD</h1>
      
      {message && (
        <div className="mb-8 p-4 bg-[#F9F9F9] border border-[#EEEEEE] text-[#666666] font-sans text-sm">
          {message}
        </div>
      )}

      {editingProduct || isAdding ? (
        <div className="bg-[#F9F9F9] p-8 border border-[#EEEEEE] rounded-sm mb-12">
          <h2 className="font-sans font-semibold text-lg mb-6 text-[#000000]">
            {isAdding ? 'Add New Product' : `Edit Product : ${editingProduct?.name}`}
          </h2>
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#666666]">Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="w-full border border-[#EEEEEE] p-3 text-sm focus:border-[#000000] outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#666666]">Price (IDR)</label>
                <input 
                  type="number" 
                  required 
                  value={price} 
                  onChange={e => setPrice(e.target.value)}
                  className="w-full border border-[#EEEEEE] p-3 text-sm focus:border-[#000000] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#666666]">Stock</label>
                <input 
                  type="number" 
                  required 
                  value={stock} 
                  onChange={e => setStock(e.target.value)}
                  className="w-full border border-[#EEEEEE] p-3 text-sm focus:border-[#000000] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#666666]">Roast Level</label>
              <select
                value={roastLevel}
                onChange={e => setRoastLevel(e.target.value)}
                className="w-full border border-[#EEEEEE] p-3 text-sm focus:border-[#000000] outline-none"
              >
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#666666]">Description</label>
              <textarea 
                required 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-[#EEEEEE] p-3 text-sm focus:border-[#000000] outline-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#666666]">Product Image</label>
              
              {image && (
                <div className="mb-4">
                  <img src={image} alt="Preview" className="w-32 h-32 object-contain border border-[#EEEEEE] p-2 bg-white" />
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    setImageFile(file);
                    setImage(URL.createObjectURL(file));
                    setMessage('Gambar dipilih. Gambar akan diunggah saat Anda klik Simpan Product.');
                  }}
                  className="w-full text-sm text-[#666666] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#000000] file:text-white hover:file:bg-[#333333] transition-colors cursor-pointer"
                />
                <span className="text-[10px] text-[#666666] italic">* Gambar akan diunggah ke Supabase Storage (Bucket: product-images).</span>
                <input 
                  type="url" 
                  value={image} 
                  onChange={e => setImage(e.target.value)}
                  className="w-full border border-[#EEEEEE] p-3 text-sm focus:border-[#000000] outline-none mt-2"
                  placeholder="Atau masukkan URL gambar secara manual (opsional)..."
                />
              </div>
            </div>
            <div className="pt-4 flex gap-4">
              <button 
                type="button" 
                onClick={cancelEdit}
                className="px-6 py-3 border border-[#000000] text-[#000000] font-sans text-xs tracking-widest uppercase hover:bg-[#F9F9F9] transition-colors rounded-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="px-6 py-3 bg-[#000000] text-white font-sans text-xs tracking-widest uppercase hover:bg-[#333333] transition-colors disabled:opacity-50 rounded-sm"
              >
                {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-12">
          <button 
            onClick={handleAdd}
            className="px-6 py-3 bg-[#000000] text-white font-sans text-xs tracking-widest uppercase hover:bg-[#333333] transition-colors mb-8 rounded-sm"
          >
            + Add New Product
          </button>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#000000] text-[#666666] text-xs tracking-widest uppercase">
                  <th className="pb-4 pr-6">Image</th>
                  <th className="pb-4 pr-6">Name</th>
                  <th className="pb-4 pr-6">Price</th>
                  <th className="pb-4 pr-6">Stock</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.products.map(product => (
                  <tr key={product.id} className="border-b border-[#EEEEEE] hover:bg-[#F9F9F9] transition-colors">
                    <td className="py-4 pr-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover bg-white p-1 border border-[#EEEEEE] rounded-sm" />
                    </td>
                    <td className="py-4 pr-4 text-[#000000] font-medium max-w-[200px] truncate">{product.name}</td>
                    <td className="py-4 pr-4 text-[#666666]">Rp {product.price.toLocaleString('id-ID')}</td>
                    <td className="py-4 pr-4">
                      <span className={product.stock < 10 ? "text-red-500 font-semibold" : "text-[#666666]"}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="text-[#666666] font-sans text-xs tracking-widest uppercase hover:text-[#000000] underline"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 font-sans text-xs tracking-widest uppercase hover:text-red-700 underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
