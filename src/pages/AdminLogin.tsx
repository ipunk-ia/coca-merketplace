import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminLogin({ navigate }: { navigate: (path: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For Supabase, the 'username' is treated as the user's email
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });

      if (authError) {
        throw authError;
      }

      if (data.user) {
        navigate('admin-dashboard'); 
      }
    } catch (err: any) {
      // Use a generic error message to prevent user enumeration or leaking system details
      console.error('Login error:', err);
      setError('Kredensial tidak valid. Silakan periksa kembali username/email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8 p-8 border border-[#EEEEEE] rounded-sm drop-shadow-sm bg-[#F9F9F9]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-heading font-medium tracking-tight text-[#000000]">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-[#666666] font-sans">
            Please sign in to access the dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 text-sm text-center border border-red-100 rounded-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#666666]">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#EEEEEE] p-3 text-sm focus:border-[#000000] outline-none rounded-sm transition-colors"
                placeholder="coca"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#666666]">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full border border-[#EEEEEE] p-3 text-sm focus:border-[#000000] outline-none rounded-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-xs font-sans tracking-widest uppercase text-white bg-[#000000] hover:bg-[#333333] focus:outline-none disabled:opacity-50 transition-colors"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
