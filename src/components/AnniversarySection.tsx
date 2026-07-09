"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AnniversarySectionProps {
  onFinish: () => void;
}

export default function AnniversaryPage({ onFinish }: AnniversarySectionProps) {
  const [isExploding, setIsExploding] = useState(false); 
  // 🎯 หัวใจวันที่ 10 กรกฎาคม 2019
  const anniversaryDay = 10; 
  
  const handleBurst = () => {
    setIsExploding(true);
    setTimeout(() => {
      onFinish(); 
      setIsExploding(false);
    }, 2200);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#fce4ec] flex items-center justify-center p-4 font-sans">
      
      {/* กระดาษโน้ต */}
      <motion.div 
        initial={{ rotate: 1, y: 0, opacity: 1 }}
        animate={{ rotate: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0 }}
        className="relative bg-[#fff8fb] w-full max-w-[420px] h-[620px] flex flex-col items-center pt-10 overflow-hidden border-r-[2px] border-[#f4a7be]/20"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 98% 93%, 95% 91%, 92% 94%, 88% 92%, 85% 95%, 80% 92%, 77% 94%, 73% 91%, 70% 93%, 66% 90%, 62% 94%, 58% 92%, 55% 95%, 50% 92%, 47% 94%, 43% 91%, 40% 93%, 36% 90%, 32% 94%, 28% 92%, 25% 95%, 20% 92%, 17% 94%, 13% 91%, 10% 93%, 6% 90%, 2% 94%, 0% 92%)',
        }}
      >
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(#e8789a 1px, transparent 1px)', backgroundSize: '100% 30px' }} 
        />
        <div className="absolute -top-2 right-10 w-24 h-10 bg-[#f4a7be]/30 backdrop-blur-[2px] rotate-[15deg] border-x border-[#f4a7be]/20 z-30" />

        <div className="absolute top-4 left-0 w-full px-12 flex justify-between opacity-25 pointer-events-none z-0">
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-[#e8789a] text-xl">♥</motion.span>
          <motion.span animate={{ scale: [1.2, 1, 1.2] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-[#e8789a] text-sm mt-4">♥</motion.span>
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="text-[#e8789a] text-lg mt-2">♥</motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.4,
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="w-full flex flex-col items-center z-10"
        >
          <div className="text-center mb-6 relative px-4">
            <span className="absolute -left-2 -top-2 text-[#e8789a] opacity-40 text-xs">♥</span>
            <span className="absolute -right-2 top-0 text-[#e8789a] opacity-40 text-xs">♥</span>
            <h1 className="text-[#c2547a] text-2xl font-black tracking-tighter uppercase italic leading-none">HAPPY ANNIVERSARY</h1>
            <div className="w-16 h-1 bg-[#e8789a] mx-auto mt-3 opacity-60" />
          </div>

          <div className="w-[90%] bg-white/60 border border-[#f4a7be]/30 rounded-xl p-5 shadow-sm relative">
            <div className="flex justify-between items-center mb-6 px-1">
              {/* 📅 หัวข้อ July 2019 */}
              <span className="text-[#c2547a] font-black text-[14px] uppercase tracking-[0.2em]">July 2019</span>
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center items-center">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => (
                <span key={`h-${index}`} className="text-[9px] font-black text-[#e8789a]/50 tracking-tighter">{day}</span>
              ))}
              
              {/* 🗓️ วันที่ 1 กรกฎา 2019 ตรงกับวันจันทร์ = offset 2 ช่อง (SUN, MON → เริ่ม MON) */}
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={`empty-${index}`} className="h-10" />
              ))}
              
              {/* กรกฎาคม มี 31 วัน */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <div key={`d-${day}`} className="relative h-10 flex items-center justify-center">
                  {day === anniversaryDay ? (
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      onClick={handleBurst} 
                      className="absolute z-30 cursor-pointer outline-none flex items-center justify-center w-16 h-16"
                    >
                      <svg viewBox="0 0 512 512" className="absolute inset-0 w-full h-full fill-[#e8789a] drop-shadow-lg">
                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                      </svg>
                      <span className="absolute text-2xl text-white font-black mt-1 tracking-tight z-10">{day}</span>
                    </motion.button>
                  ) : (
                    <span className="text-[#c2547a]/50 text-[11px] font-medium">{day}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <motion.p 
            animate={{ y: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="mt-10 text-[#c2547a]/70 text-[11px] font-black uppercase tracking-[0.2em]"
          >
            ⭡ tap the big heart {anniversaryDay} ⭡
          </motion.p>
        </motion.div>
      </motion.div>

      {/* LAYER พิเศษ: หัวใจพองทะลุจอ */}
      <AnimatePresence>
        {isExploding && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 80, opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeIn" }}
              className="text-[#e8789a]"
            >
              <svg viewBox="0 0 512 512" className="w-16 h-16 fill-current">
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
              </svg>
            </motion.div>

            {Array.from({ length: 30 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 1200, 
                  y: (Math.random() - 0.5) * 1200, 
                  opacity: [0, 1, 0],
                  scale: Math.random() * 2 + 1,
                  rotate: Math.random() * 360
                }}
                transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                className="absolute text-[#fff8fb] text-3xl"
              >
                ♥
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}