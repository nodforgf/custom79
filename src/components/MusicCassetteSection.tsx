"use client";
import { motion } from 'framer-motion';

export default function MusicCassetteSection() {
  const PLAYLIST_URL = "https://youtu.be/_t0OKDaZLUw?si=WxZSYkAeiEPBKX-_";

  return (
    <section className="min-h-screen w-full bg-[#fce4ec] flex flex-col items-center justify-center p-6 font-sans overflow-hidden relative">

      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#e8789a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Title */}
      <header className="mb-12 text-center z-10">
        <h2 className="text-[#c2547a] text-3xl font-black italic uppercase tracking-tighter">Our Soundtrack</h2>
        <p className="text-[#e8789a]/50 text-[9px] tracking-[0.4em] mt-2 uppercase">Press play to start the vibe</p>
      </header>

      {/* ตลับเทป SVG */}
      <motion.div
        initial={{ rotate: -4, scale: 0.88, opacity: 0 }}
        animate={{ rotate: 2, scale: 1, opacity: 1 }}
        whileHover={{ rotate: 0, scale: 1.04 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xs"
        style={{ filter: 'drop-shadow(0 18px 40px rgba(194,84,122,0.28))' }}
      >
        <svg viewBox="0 0 320 200" className="w-full h-auto">
          <defs>
            <linearGradient id="caseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8789a" />
              <stop offset="100%" stopColor="#c2547a" />
            </linearGradient>
            <linearGradient id="labelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff8fb" />
              <stop offset="100%" stopColor="#fce4ec" />
            </linearGradient>
          </defs>

          {/* ===== ตัวกล่องตลับเทป ===== */}
          <rect x="4" y="4" width="312" height="192" rx="16" fill="url(#caseGrad)" />

          {/* เงาล่าง */}
          <rect x="4" y="170" width="312" height="26" rx="0" fill="#c2547a" opacity="0.3" />
          <rect x="4" y="180" width="312" height="16" rx="0" ry="0"
            style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            fill="#b04870" opacity="0.2" />

          {/* ===== สติกเกอร์กลาง ===== */}
          <rect x="28" y="16" width="264" height="132" rx="10" fill="url(#labelGrad)" stroke="#f4a7be" strokeWidth="1.5" />

          {/* เส้นบนสติกเกอร์ */}
          <line x1="28" y1="38" x2="292" y2="38" stroke="#f4a7be" strokeWidth="1" />

          {/* SIDE A */}
          <text x="44" y="30" fontSize="8" fontWeight="800" fill="#c2547a" opacity="0.6"
            style={{ fontFamily: 'var(--font-mali, sans-serif)', letterSpacing: '0.15em' }}>
            SIDE A
          </text>

          {/* จุดตกแต่ง */}
          <circle cx="272" cy="27" r="4" fill="#f4a7be" opacity="0.6" />
          <circle cx="284" cy="27" r="4" fill="#e8789a" opacity="0.5" />

          {/* ชื่อ playlist */}
          <text x="160" y="72" textAnchor="middle" fontSize="15" fontWeight="800" fill="#c2547a"
            style={{ fontFamily: 'var(--font-mali, sans-serif)' }}>
            Our Memories
          </text>
          <text x="160" y="92" textAnchor="middle" fontSize="15" fontWeight="800" fill="#c2547a"
            style={{ fontFamily: 'var(--font-mali, sans-serif)' }}>
            Playlist ♥
          </text>
          <text x="160" y="112" textAnchor="middle" fontSize="8" fill="#e8789a" opacity="0.6"
            style={{ fontFamily: 'var(--font-mali, sans-serif)' }}>
            Mix for my favorite person
          </text>

          {/* แถบสีด้านล่างสติกเกอร์ */}
          <rect x="28" y="132" width="264" height="14" rx="0"
            style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
            fill="#f4a7be" opacity="0.4" />
          <text x="160" y="141" textAnchor="middle" fontSize="7" fontWeight="800" fill="#c2547a" opacity="0.7"
            style={{ fontFamily: 'var(--font-mali, sans-serif)', letterSpacing: '0.2em' }}>
            ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
          </text>

          {/* ===== รูเทป + แกนหมุนสองข้าง ===== */}
          {/* ซ้าย */}
          <circle cx="96" cy="170" r="22" fill="#c2547a" />
          <circle cx="96" cy="170" r="16" fill="#b04870" />
          <circle cx="96" cy="170" r="10" fill="#e8789a" stroke="#fff8fb" strokeWidth="2" />
          {/* speedo spokes */}
          {[0,60,120,180,240,300].map(deg => {
            const rad = deg * Math.PI / 180;
            return (
              <line key={deg}
                x1={96 + 10 * Math.cos(rad)} y1={170 + 10 * Math.sin(rad)}
                x2={96 + 16 * Math.cos(rad)} y2={170 + 16 * Math.sin(rad)}
                stroke="#fff8fb" strokeWidth="1.5" opacity="0.5"
              />
            );
          })}
          {/* แกนกลางซ้าย */}
          <circle cx="96" cy="170" r="5" fill="#fff8fb" opacity="0.7" />

          {/* ขวา */}
          <circle cx="224" cy="170" r="22" fill="#c2547a" />
          <circle cx="224" cy="170" r="16" fill="#b04870" />
          <circle cx="224" cy="170" r="10" fill="#e8789a" stroke="#fff8fb" strokeWidth="2" />
          {[0,60,120,180,240,300].map(deg => {
            const rad = deg * Math.PI / 180;
            return (
              <line key={deg}
                x1={224 + 10 * Math.cos(rad)} y1={170 + 10 * Math.sin(rad)}
                x2={224 + 16 * Math.cos(rad)} y2={170 + 16 * Math.sin(rad)}
                stroke="#fff8fb" strokeWidth="1.5" opacity="0.5"
              />
            );
          })}
          <circle cx="224" cy="170" r="5" fill="#fff8fb" opacity="0.7" />

          {/* แถบเทประหว่างสองรู */}
          <path d="M 106,162 Q 160,155 214,162" fill="none" stroke="#fff8fb" strokeWidth="2.5" opacity="0.3" />

          {/* ===== ช่องเทป (window) ===== */}
          <rect x="118" y="155" width="84" height="22" rx="6" fill="#b04870" opacity="0.5" />
          <rect x="120" y="157" width="80" height="18" rx="5" fill="#000" opacity="0.15" />

          {/* ขอบตลับด้านล่าง */}
          <line x1="4" y1="150" x2="316" y2="150" stroke="#b04870" strokeWidth="1" opacity="0.3" />

          {/* รูสกรูมุม */}
          {[[20,185],[300,185],[20,15],[300,15]].map(([cx,cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="5" fill="#b04870" opacity="0.5" />
          ))}
        </svg>

        {/* แกนหมุน animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="absolute pointer-events-none"
          style={{ width: 20, height: 20, top: '79%', left: '27%', transformOrigin: 'center' }}
        >
          <div className="w-full h-full rounded-full border-2 border-white/40" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="absolute pointer-events-none"
          style={{ width: 20, height: 20, top: '79%', left: '65.5%', transformOrigin: 'center' }}
        >
          <div className="w-full h-full rounded-full border-2 border-white/40" />
        </motion.div>
      </motion.div>

      {/* ปุ่ม PLAY NOW */}
      <motion.a
        href={PLAYLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.0 }}
        whileHover={{ scale: 1.08, backgroundColor: '#c2547a' }}
        whileTap={{ scale: 0.94 }}
        className="mt-10 z-10 bg-[#e8789a] text-white px-12 py-4 rounded-full font-black uppercase tracking-[0.3em] shadow-[0_8px_30px_rgba(232,120,154,0.45)] flex items-center gap-3 text-sm transition-colors"
      >
        <span className="text-lg"></span> Play Now
      </motion.a>

      {/* background text */}
      <div className="absolute bottom-8 left-8 opacity-[0.04] select-none pointer-events-none">
        <p className="text-[100px] font-black italic text-[#e8789a] leading-none">LOFI<br/>VIBES</p>
      </div>

    </section>
  );
}
