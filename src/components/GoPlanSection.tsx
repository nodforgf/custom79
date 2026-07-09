"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// --- ความปรารถนา preset ทั้งหมด ---
const WISHES = [
  { id: 1,  text: "ไปเที่ยวต่างประเทศ",                color: "#ffd6e7" },
  { id: 2,  text: "ตั้งแคมป์", color: "#fce4ec" },
  { id: 3,  text: "กินของอร่อยร้านที่อยากลอง",        color: "#fff0f8" },
  { id: 4,  text: "ไปต่างจังหวัดแบบไม่มีแพลน",           color: "#ffd6e7" },
  { id: 5,  text: "นั่งดูพระอาทิตย์ตกที่ทะเล",          color: "#fce4ec" },
  { id: 6,  text: "นอนดูซีรีส์ทั้งวันในวันหยุด",  color: "#fff0f8" },
  { id: 7,  text: "ดูหนังรอบดึก",          color: "#ffd6e7" },
  { id: 8,  text: "ฉลองวันสำคัญทุกปีด้วยกัน",         color: "#fce4ec" },
  { id: 9,  text: "ดูคอนเสิร์ตวงที่ยังไม่ได้ดู",            color: "#fff0f8" },
  { id: 10, text: "เก็บเงินทำตามความฝันด้วยกัน",            color: "#ffd6e7" },
];

// ตำแหน่งกระดาษในโหล (x, y, rotate) — อยู่ใน viewBox 300x360
const SCROLL_POSITIONS = [
  { x: 80,  y: 130, r: -18 },
  { x: 155, y: 115, r:  10 },
  { x: 225, y: 125, r: -8  },
  { x: 70,  y: 190, r:  12 },
  { x: 148, y: 182, r: -14 },
  { x: 220, y: 188, r:  16 },
  { x: 88,  y: 255, r: -10 },
  { x: 155, y: 248, r:   8 },
  { x: 222, y: 258, r: -16 },
  { x: 155, y: 310, r:   -12 },
];

export default function GoPlanSection({ onUnlock }: { onUnlock: () => void }) {
  const [openWish, setOpenWish] = useState<typeof WISHES[0] | null>(null);
  const [read, setRead] = useState<Set<number>>(new Set());
  const [bursting, setBursting] = useState(false);

  const handlePick = (wish: typeof WISHES[0]) => {
    setOpenWish(wish);
    setRead(prev => new Set([...prev, wish.id]));
  };

  const handleUnlock = () => {
    setBursting(true);
    setTimeout(() => onUnlock(), 1600);
  };

  return (
    <section className="min-h-screen w-full bg-[#fce4ec] flex flex-col items-center font-sans overflow-x-hidden pb-20">

      {/* Header */}
      <header className="w-full text-center pt-14 pb-2 px-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#c2547a]"
        >
          Wish Jar
        </motion.h1>
        <p className="mt-2 text-[10px] tracking-[0.5em] text-[#e8789a]/60 uppercase">
          our little dreams together
        </p>
        {/* อ่านไปแล้วกี่ใบ */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-3 text-xs font-black text-[#e8789a]/70 uppercase tracking-widest"
        >
          หยิบอ่านแล้ว {read.size} / {WISHES.length} ใบ
        </motion.p>
      </header>

      {/* โหลแก้ว */}
      <div className="relative w-full max-w-xs px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ filter: 'drop-shadow(0 16px 40px rgba(232,120,154,0.28))' }}
        >
          <svg viewBox="0 0 300 390" className="w-full h-auto" style={{ overflow: 'visible' }}>
            <defs>
              {/* gradient ตัวโหล */}
              <linearGradient id="jarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#fce4ec" stopOpacity="0.85" />
                <stop offset="45%"  stopColor="#fff8fb" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#f4a7be" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#f9c6d8" />
                <stop offset="100%" stopColor="#e8789a" />
              </linearGradient>
              {/* clip ตัวโหล — กระดาษที่อยู่ข้างในจะถูกตัดให้อยู่ในโหล */}
              <clipPath id="jarBody">
                <path d="M 58,68 Q 46,92 42,132 L 36,308 Q 36,342 150,348 Q 264,342 264,308 L 258,132 Q 254,92 242,68 Z" />
              </clipPath>
              {/* เงาหมุด */}
              <filter id="scrollShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#c2547a" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* ===== ฝาโหล ===== */}
            <rect x="72" y="30" width="156" height="42" rx="14" fill="url(#lidGrad)" />
            <rect x="84" y="20" width="132" height="18" rx="9" fill="#f4a7be" />
            {/* ลายริ้วฝา */}
            {[96,112,128,144,160,176,192,208].map(x => (
              <line key={x} x1={x} y1="22" x2={x} y2="38" stroke="#e8789a" strokeWidth="1.2" opacity="0.3" />
            ))}
            {/* ปุ่มกลางฝา */}
            <ellipse cx="150" cy="20" rx="18" ry="7" fill="#e8789a" opacity="0.5" />

            {/* ===== ตัวโหล (พื้นหลัง) ===== */}
            <path
              d="M 58,68 Q 46,92 42,132 L 36,308 Q 36,342 150,348 Q 264,342 264,308 L 258,132 Q 254,92 242,68 Z"
              fill="url(#jarGrad)"
              stroke="#f4a7be"
              strokeWidth="2.5"
            />

            {/* ===== กระดาษม้วนในโหล ===== */}
            {WISHES.map((wish, i) => {
              const pos = SCROLL_POSITIONS[i] || { x: 150, y: 200, r: 0 };
              const isRead = read.has(wish.id);
              return (
                <g
                  key={wish.id}
                  clipPath="url(#jarBody)"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePick(wish)}
                >
                  <g transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}>
                    {/* ตัวกระดาษ */}
                    <rect
                      x="-16" y="-22" width="32" height="30" rx="3"
                      fill={isRead ? "#f4a7be" : wish.color}
                      stroke={isRead ? "#c2547a" : "#f4a7be"}
                      strokeWidth="1.2"
                      opacity={isRead ? 0.55 : 1}
                      filter="url(#scrollShadow)"
                    />
                    {/* ม้วนบน */}
                    <ellipse cx="0" cy="-22" rx="16" ry="5"
                      fill={isRead ? "#f4a7be" : wish.color}
                      stroke={isRead ? "#c2547a" : "#f4a7be"}
                      strokeWidth="1.2" opacity={isRead ? 0.55 : 1}
                    />
                    {/* ม้วนล่าง */}
                    <ellipse cx="0" cy="8" rx="16" ry="5"
                      fill={isRead ? "#f4a7be" : wish.color}
                      stroke={isRead ? "#c2547a" : "#f4a7be"}
                      strokeWidth="1.2" opacity={isRead ? 0.55 : 1}
                    />
                    {/* ลายเส้นในกระดาษ */}
                    <line x1="-10" y1="-12" x2="10" y2="-12" stroke="#e8789a" strokeWidth="0.8" opacity="0.35" />
                    <line x1="-10" y1="-5"  x2="10" y2="-5"  stroke="#e8789a" strokeWidth="0.8" opacity="0.35" />
                    <line x1="-10" y1="2"   x2="10" y2="2"   stroke="#e8789a" strokeWidth="0.8" opacity="0.35" />
                    {/* icon กลาง */}
                    <text y="-6" textAnchor="middle" fontSize="9" fill={isRead ? "#c2547a" : "#e8789a"} opacity={isRead ? 0.6 : 1}>
                      {isRead ? "✓" : "♥"}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* ===== แสงสะท้อนในโหล (วาดทับสุดท้าย) ===== */}
            <path
              d="M 66,82 Q 58,160 58,268"
              fill="none" stroke="white"
              strokeWidth="7" strokeLinecap="round" opacity="0.38"
            />
            <path
              d="M 80,78 Q 74,140 74,230"
              fill="none" stroke="white"
              strokeWidth="3" strokeLinecap="round" opacity="0.22"
            />
          </svg>
        </motion.div>

        {/* hint */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="text-center mt-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#e8789a]/60"
        >
        </motion.p>
      </div>

      {/* ===== Popup อ่านกระดาษ ===== */}
      <AnimatePresence>
        {openWish && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#fce4ec]/75 backdrop-blur-sm p-6"
            onClick={() => setOpenWish(null)}
          >
            <motion.div
              initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, rotate: 12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-[#fff8fb] rounded-3xl px-8 pt-10 pb-8 max-w-xs w-full shadow-[0_20px_60px_rgba(232,120,154,0.32)] border border-[#f4a7be]/50"
            >
              {/* กระดาษม้วนใหญ่ด้านบน */}
              <div className="flex justify-center -mt-16 mb-4">
                <svg viewBox="0 0 90 90" className="w-24 h-24 drop-shadow-xl">
                  <rect x="12" y="16" width="66" height="58" rx="4" fill={openWish.color} stroke="#f4a7be" strokeWidth="1.8" />
                  <ellipse cx="45" cy="16" rx="33" ry="9"  fill={openWish.color} stroke="#f4a7be" strokeWidth="1.8" />
                  <ellipse cx="45" cy="74" rx="33" ry="9"  fill={openWish.color} stroke="#f4a7be" strokeWidth="1.8" />
                  <line x1="22" y1="34" x2="68" y2="34" stroke="#e8789a" strokeWidth="1" opacity="0.4" />
                  <line x1="22" y1="44" x2="68" y2="44" stroke="#e8789a" strokeWidth="1" opacity="0.4" />
                  <line x1="22" y1="54" x2="68" y2="54" stroke="#e8789a" strokeWidth="1" opacity="0.4" />
                  <text x="45" y="50" textAnchor="middle" fontSize="18" fill="#e8789a">♥</text>
                </svg>
              </div>

              {/* ป้ายเล็ก */}
              <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-[#e8789a]/50 mb-3">
                ในอนาคตเราจะ...
              </p>

              {/* ข้อความ */}
              <p className="text-[#c2547a] text-lg font-black italic text-center leading-relaxed mb-8 break-keep">
                "{openWish.text}"
              </p>

              {/* ปุ่มปิด */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenWish(null)}
                className="w-full py-3.5 bg-[#e8789a] text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#c2547a] transition-colors shadow-md"
              >
                ♥ เก็บไว้ในใจแล้ว
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ปุ่มวาร์ปหน้าต่อไป ===== */}
      <div className="mt-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleUnlock}
          className="relative cursor-pointer"
        >
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-[#f4a7be] rounded-full -z-10"
          />
          <div className="w-24 h-24 bg-[#e8789a] rounded-full shadow-[0_10px_30px_rgba(232,120,154,0.4)] flex items-center justify-center border-2 border-[#c2547a]">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-white text-4xl"
            >
              ♥
            </motion.span>
          </div>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-max text-center"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#c2547a]">
              Tap to claim surprise
            </p>
            <div className="w-full h-[1.5px] bg-[#e8789a]/40 mt-1" />
          </motion.div>
        </motion.div>
      </div>

      {/* ===== overlay หัวใจขยายตอนเปลี่ยนหน้า ===== */}
      <AnimatePresence>
        {bursting && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 80, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeIn" }}
              className="text-[#e8789a]"
            >
              <svg viewBox="0 0 512 512" className="w-16 h-16 fill-current">
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
