"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PhotoCardProps {
  photoUrl: string;
  idx: number;
  style: { top: string; left: string; rotate: number };
  photoDate: string;
}

interface GallerySectionProps {
  onNext: () => void;
}

function PhotoCard({ photoUrl, idx, style, photoDate }: PhotoCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const messages = [
    "โฟโต้บูธที่ชอบที่สุด",
    "ดอกกุหลาบช่อแรกที่เธอให้",
    "ขอบคุณที่อยู่ข้างๆกันในวันที่เหนื่อยนะ มิม่อนน่ารักมาก",
    "ไปเที่ยวด้วยกันครั้งแรกสองคน",
    "พาไปกินช็อกมินต์อีกด้วยนะ :)",
    "อยู่เลี้ยงเยติด้วยกันไปนานๆเลยย",
  ];

  return (
    <motion.div
      className="absolute cursor-pointer z-10"
      style={{
        top: style.top,
        left: style.left,
        width: "45vw",
        maxWidth: "200px",
        aspectRatio: "3/4",
        perspective: "1000px",
      }}
      initial={{ opacity: 0, scale: 0, x: "-50%", y: "300px", left: "50%", rotate: 0 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0, left: style.left, top: style.top, rotate: style.rotate }}
      transition={{ delay: idx * 0.2, duration: 1.8, type: "spring", stiffness: 40, damping: 15 }}
      drag
      dragConstraints={{ top: -300, bottom: 300, left: -300, right: 300 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full bg-[#fff8fb] p-3 pb-12 shadow-[0_25px_50px_rgba(232,120,154,0.3)] border border-[#f4a7be]/20 rounded-sm"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* หน้าแรก (Front): รูปถ่าย */}
        <div className="absolute inset-3 bottom-12" style={{ backfaceVisibility: "hidden" }}>
          {idx < 2 && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#f4a7be]/20 backdrop-blur-[2px] rotate-[-5deg] border-x border-[#f4a7be]/10 z-20" />
          )}

          <div className="relative w-full h-full bg-[#fce4ec] overflow-hidden rounded-sm pointer-events-none">
            <img src={photoUrl} className="w-full h-full object-cover" alt="Memory" />
          </div>

          <div className="absolute -bottom-9 left-0 w-full text-center">
            <span className="text-[#e8789a] text-[10px] font-black tracking-widest uppercase pointer-events-none">
              ♥ {photoDate} ♥
            </span>
          </div>

          <motion.div
            animate={{ opacity: isFlipped ? 0 : [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 rotate-[15deg] pointer-events-none"
          >
            <span className="bg-[#e8789a] text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap">
              Tap to flip
            </span>
          </motion.div>
        </div>

        {/* หน้าหลัง (Back): ข้อความ */}
        <div
          className="absolute inset-3 bottom-12 flex flex-col items-center justify-center p-3 bg-[#fff8fb] rounded-sm overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-[#e8789a] mb-1 text-base flex-shrink-0">♥</span>
          <div className="flex-1 w-full flex items-center justify-center overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <p
              className="text-[#c2547a] font-bold text-center italic w-full"
              style={{
                fontSize: 'clamp(9px, 2.2vw, 12px)',
                lineHeight: '1.8',
                paddingTop: '4px',
                paddingBottom: '4px',
              }}
            >
              &ldquo;{messages[idx % messages.length]}&rdquo;
            </p>
          </div>
          <div className="w-8 h-[1px] bg-[#e8789a]/20 my-2 flex-shrink-0" />
          <span className="text-[#c2547a]/40 text-[9px] uppercase tracking-tighter flex-shrink-0">
            Memory #{idx + 1}
          </span>
          <span className="absolute bottom-2 text-[#e8789a]/30 text-[8px]">Tap to flip back</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection({ onNext }: GallerySectionProps) {
  const myPhotos = [
    "/images/1.jpg",
    "/images/2.png",
    "/images/3.png",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.png",
  ];

  // 🎯 ปรับอัปเดตวันที่ 1-6 ตรงตามบรีฟลูกค้า (แฟน) แป๊ะ ๆ ห้ามแตะอย่างอื่นเรียบร้อยครับเกลอ!
  const photoDates = [
    "1/6", // 1. ปีใหม่ด้วยกันครั้งแรก
    "2/6", // 2. วาเลนไทน์
    "3/6", // 3. ดูคอนเสิร์ตด้วยกัน
    "4/6", // 4. ทริปเชียงใหม่
    "5/6", // 5. ดอกไม้ช่อแรก
    "6/6", // 6. Yessss!
  ];

  const scatteredStyles = [
    { top: '5%',  left: '5vw',  rotate: -8 },
    { top: '15%', left: '40vw', rotate: 12 },
    { top: '28%', left: '10vw', rotate: -15 },
    { top: '40%', left: '35vw', rotate: 10 },
    { top: '55%', left: '5vw',  rotate: -5 },
    { top: '68%', left: '45vw', rotate: 18 },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#fce4ec] overflow-hidden font-sans">

      {/* Background Title */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="text-[#e8789a] text-[5rem] md:text-[12rem] font-black italic uppercase leading-none text-center select-none"
        >
          Our <br /> Memories
        </motion.h1>
      </div>

      {/* ปุ่ม See our future */}
      <div className="fixed bottom-12 left-0 w-full flex justify-center pointer-events-none" style={{ zIndex: 9999 }}>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="pointer-events-auto bg-[#fff8fb] text-[#c2547a] px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(232,120,154,0.4)] border-2 border-[#f4a7be]/40"
          style={{
            transform: "translateZ(500px)",
            boxShadow: "0 0 50px rgba(232,120,154,0.3)"
          }}
        >
          See our future →
        </motion.button>
      </div>

      {/* พื้นที่โปรยรูปภาพ */}
      <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="relative w-full max-w-[1000px] mx-auto py-10" style={{ height: '1350px' }}>

          {myPhotos.map((p, idx) => {
            const style = scatteredStyles[idx % scatteredStyles.length];
            return (
              <PhotoCard
                key={idx}
                photoUrl={p}
                idx={idx}
                style={style}
                photoDate={photoDates[idx % photoDates.length]}
              />
            );
          })}

          {/* spacer เล็กลงแค่พอให้เลื่อนถึงปุ่ม */}
          <div className="h-[120px] w-full" />
        </div>
      </div>

      {/* ละอองหัวใจ */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 0.4, 0] }}
            transition={{ repeat: Infinity, duration: 5 + Math.random() * 5, delay: Math.random() * 5 }}
            className="absolute text-[#f4a7be] text-2xl"
          >
            ♥
          </motion.span>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
      `}</style>
    </section>
  );
}