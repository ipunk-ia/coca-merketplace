import React from 'react';
import { useTranslation } from '../components/Shared';

export default function About({ navigate }: { navigate: (path: string, params?: any) => void }) {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in">
      <section className="py-24 md:py-32 text-center border-b border-[#EEEEEE] bg-white">
        <h1 className="font-heading font-medium text-4xl md:text-6xl lg:text-[7rem] tracking-tight leading-none mb-6 text-[#000000]">ABOUT US</h1>
        <p className="font-sans text-xl md:text-2xl text-[#666666]">Warisan kopi otentik khas Salatiga sejak 1965.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="font-sans text-lg md:text-xl leading-relaxed text-[#000000] space-y-10 border-l-[3px] border-[#000000] pl-6 md:pl-10">
          <p>
            Kopi Babah Kacamata bermula dari kecintaan pada seduhan kopi tubruk tradisional Jawa di daerah perbukitan yang sejuk di Salatiga. Semuanya bukan sekadar tentang bisnis, tetapi tentang melestarikan jejak rasa mulai dari tanah tempatnya tumbuh hingga ke cangkir yang Anda nikmati.
          </p>
          <p>
            Setiap biji yang kami sangrai tidak melalui perantara yang panjang. Murni cita rasa terroir Jawa tanpa kompromi, disangrai dengan presisi dan perhatian penuh untuk menonjolkan karakteristik unik dari setiap panen, mempertahankan resep rahasia yang turun temurun dipertahankan.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F9F9] py-24 border-y border-[#EEEEEE]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase mb-4 text-[#000000]">KUALITAS TERJAGA</h3>
            <p className="font-sans text-sm text-[#666666]">Tanpa kompromi dalam profil sangrai maupun seleksi biji kopi.</p>
          </div>
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase mb-4 text-[#000000]">PETANI LOKAL</h3>
            <p className="font-sans text-sm text-[#666666]">Mendukung kesejahteraan mitra petani lokal demi panen yang berkelanjutan.</p>
          </div>
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase mb-4 text-[#000000]">RAMAH LINGKUNGAN</h3>
            <p className="font-sans text-sm text-[#666666]">Berkomitmen pada pengemasan masa kini dengan pendekatan praktis.</p>
          </div>
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase mb-4 text-[#000000]">KEPUASAN ANDA</h3>
            <p className="font-sans text-sm text-[#666666]">Jaminan kepuasan pada setiap kantong kopi yang kami kirim ke rumah Anda.</p>
          </div>
        </div>
      </section>

      <section className="py-32 max-w-3xl mx-auto px-4 text-center font-sans text-[#000000]">
        <h2 className="font-heading font-medium text-4xl mb-16 text-[#000000] tracking-tight">CONTACT</h2>
        <div className="space-y-12">
          <div>
            <div className="text-[10px] font-semibold tracking-widest uppercase mb-3 text-[#000000] border-b border-[#000000] inline-block pb-1">Lokasi Kami</div>
            <div className="text-[#666666] text-sm">Salatiga<br/>Jawa Tengah, Indonesia</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-widest uppercase mb-3 text-[#000000] border-b border-[#000000] inline-block pb-1">Email Toko</div>
            <div className="text-[#666666] text-sm md:lowercase">hello@kopibabahkacamata.com</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-widest uppercase mb-3 text-[#000000] border-b border-[#000000] inline-block pb-1">WhatsApp</div>
            <div className="text-[#666666] text-sm">+62 812 3456 7890</div>
          </div>
        </div>
      </section>
    </div>
  );
}
