"use client";
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface TransitionProps {
  onComplete: () => void;
}

export default function TransitionPage({ onComplete }: TransitionProps) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="fixed inset-0 bg-[#fce4ec] flex flex-col items-center justify-center overflow-hidden z-[999]">
      
      {/* เส้นถนนวิ่งสวน */}
      <div className="absolute inset-0 flex justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 1000, opacity: [0, 0.4, 0] }}
            transition={{
              duration: 0.8, 
              repeat: Infinity,
              delay: i * 0.15,
              ease: "linear"
            }}
            className="absolute w-[4px] h-40 bg-[#e8789a]/40"
          />
        ))}
      </div>

      {/* ตัวรถ */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ 
            y: [0, -4, 0, -2, 0],
            rotate: [0, 1, -1, 0.5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.4, 
            ease: "linear" 
          }}
          className="relative"
        >
          {/* รถมินิมอล สีชมพู */}
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 40C10 34.4772 14.4772 30 20 30H35L45 10H85L95 30H105C110.523 30 115 34.4772 115 40V50H5V40Z" fill="#fff8fb" stroke="#f4a7be" strokeWidth="1.5"/>
            <rect x="50" y="15" width="30" height="10" fill="#f4a7be" />
            <circle cx="25" cy="50" r="8" fill="#c2547a" />
            <circle cx="95" cy="50" r="8" fill="#c2547a" />
            <circle cx="25" cy="50" r="4" fill="#fff8fb" />
            <circle cx="95" cy="50" r="4" fill="#fff8fb" />
          </svg>
          
          {/* ควัน */}
          <div className="absolute -left-4 bottom-2 flex gap-1">
            {[1, 2, 3].map((p) => (
              <motion.div
                key={p}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: [1, 2], opacity: 0, x: -20, y: -10 }}
                transition={{ repeat: Infinity, duration: 0.6, delay: p * 0.2 }}
                className="w-2 h-2 bg-[#f4a7be]/50 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* ข้อความสถานะ */}
        <div className="mt-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#c2547a] text-xl font-black uppercase tracking-[0.6em]"
          >
            Driving to Us
          </motion.h2>
          
          <div className="mt-4 flex gap-2 justify-center">
             <span className="text-[#e8789a]/60 text-[10px] font-bold tracking-widest uppercase">Next Destination: Future</span>
          </div>
        </div>
      </div>

      {/* แสงวาบตอนจบ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 3.8, times: [0, 0.9, 1] }}
        className="fixed inset-0 bg-[#fff8fb] z-[1000] pointer-events-none"
      />
    </section>
  );
}
