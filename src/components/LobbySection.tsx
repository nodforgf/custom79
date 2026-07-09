"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LobbySection({ onEnter }: { onEnter: () => void }) {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = async () => {
    setIsClicked(true);
    setTimeout(() => {
      onEnter();
    }, 1800);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#fce4ec] flex items-center justify-center p-4 font-sans">
      
      {/* Background กระดาษโน้ต */}
      <motion.div 
        initial={{ rotate: -2, y: 20, opacity: 0 }}
        animate={{ rotate: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#fff8fb] w-full max-w-[420px] h-[620px] flex flex-col items-center justify-center overflow-hidden border-r-[2px] border-[#f4a7be]/20"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 98% 93%, 95% 91%, 92% 94%, 88% 92%, 85% 95%, 80% 92%, 77% 94%, 73% 91%, 70% 93%, 66% 90%, 62% 94%, 58% 92%, 55% 95%, 50% 92%, 47% 94%, 43% 91%, 40% 93%, 36% 90%, 32% 94%, 28% 92%, 25% 95%, 20% 92%, 17% 94%, 13% 91%, 10% 93%, 6% 90%, 2% 94%, 0% 92%)',
        }}
      >
        
        {/* ลายเส้นบรรทัด */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#e8789a 1px, transparent 1px)', backgroundSize: '100% 30px' }} 
        />

        {/* เทปแปะมุมขวาบน */}
        <div className="absolute -top-2 right-10 w-24 h-10 bg-[#f4a7be]/30 backdrop-blur-[2px] rotate-[15deg] border-x border-[#f4a7be]/20 z-30" />

        {/* หัวใจกระจายดุ๊กดิ๊ก */}
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-10 left-10 text-2xl text-[#e8789a] opacity-30">♥</motion.span>
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute top-28 right-12 text-xl text-[#e8789a] opacity-25">♥</motion.span>
        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute bottom-24 left-14 text-2xl text-[#e8789a] opacity-30">♥</motion.span>

        {/* หัวใจแขวน */}
        <div className="absolute top-0 left-20 flex gap-6 pointer-events-none">
            <div className="flex flex-col items-center">
                <div className="w-[1px] h-10 bg-[#e8789a] opacity-30" />
                <span className="text-[#e8789a] text-xl -mt-1 font-bold">♡</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-[1px] h-16 bg-[#e8789a] opacity-30" />
                <span className="text-[#e8789a] text-2xl -mt-1 font-bold">♡</span>
            </div>
        </div>

        <AnimatePresence mode="wait">
          {!isClicked ? (
            <motion.div 
              key="main-content"
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="z-10 text-center flex flex-col items-center w-full px-6 mt-0"
            >
              {/* หัวข้อ: Something Special */}
              <div className="relative w-full h-24 mb-0 flex justify-center overflow-visible text-[#c2547a]">
                <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                  <path id="curvePath" d="M 40,85 Q 200,10 360,85" fill="transparent" />
                  <text className="fill-current text-[28px] font-black tracking-tight uppercase">
                    <textPath xlinkHref="#curvePath" startOffset="50%" textAnchor="middle">
                      something special
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* รูปแมวดุ๊กดิ๊ก */}
              <motion.div 
                animate={{ 
                  rotate: [0, -8, 8, 0],
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="relative w-44 h-44 mb-4 flex items-center justify-center"
              >
                <img 
                  src="/my-cat.jpg" 
                  alt="My Cat"
                  className="w-full h-full object-contain" 
                />
              </motion.div>

              {/* ข้อความ */}
              <div className="space-y-0 mb-4 pointer-events-none">
                <p className="text-[#c2547a] text-2xl font-black tracking-tighter italic">
                  click to open
                </p>
                <p className="text-[#e8789a]/60 text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
                  i made something for u
                </p>
              </div>

              {/* ปุ่ม SURPRISE */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePress}
                className="bg-[#e8789a] text-white font-black px-12 py-3 rounded-full border-b-4 border-r-4 border-[#c2547a]/40 shadow-2xl flex items-center gap-3 group transition-all"
              >
                <span className="tracking-tighter italic text-xl">SURPRISE</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }} className="text-2xl"></motion.span>
              </motion.button>
            </motion.div>
          ) : (
            /* เอฟเฟกต์ตอนคลิก */
            <motion.div 
              key="effect"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 4], opacity: [1, 0] }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="z-50"
            >
              <img 
                src="/my-cat.jpg" 
                alt="My Cat Effect"
                className="w-44 h-44 object-contain" 
              />
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
