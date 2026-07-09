"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LetterSection({ onNext }: { onNext: () => void }) {
    const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed');

    const handleOpen = () => {
        if (phase !== 'closed') return;
        setPhase('opening');
        setTimeout(() => setPhase('open'), 1200); // พลิกฝาปุ๊บ เข้าหน้าจดหมายเต็มจอทันที กระชับ ไม่ยืดเยื้อ
    };

    return (
        <section className="min-h-screen w-full bg-[#fce4ec] flex flex-col items-center justify-center p-6 font-sans overflow-hidden relative">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#e8789a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <header className="mb-10 text-center z-10">
                <h2 className="text-[#c2547a] text-3xl font-black italic uppercase tracking-tighter">Final Note</h2>
                <p className="text-[#e8789a]/50 text-[9px] tracking-[0.4em] mt-2">FOR YOUR EYES ONLY</p>
            </header>

            <div className="w-full max-w-sm z-10">
                <AnimatePresence mode="wait">

                    {/* ===== ซองจดหมายตอนปิด/กำลังเปิด (ลบตัวกระดาษข้างในออกถาวร) ===== */}
                    {phase !== 'open' && (
                        <motion.div
                            key="envelope"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.25 } }}
                            className="select-none relative w-full"
                            style={{ 
                                cursor: phase === 'closed' ? 'pointer' : 'default', 
                                height: '220px',
                            }}
                            onClick={handleOpen}
                        >
                            
                            {/* ===== 1. ตัวซองด้านหลังสุด (Base Back) ===== */}
                            <div className="absolute inset-0 bg-[#fff8fb] rounded-xl border-2 border-[#f4a7be]/60 shadow-[0_12px_32px_rgba(232,120,154,0.15)]" style={{ zIndex: 1 }} />

                            {/* ===== 2. ฝาซองจดหมาย (Flap) พลิกหงายขึ้นด้านบนอย่างสวยงามตามสัดส่วนดั้งเดิม ===== */}
                            <motion.div
                                className="absolute top-0 left-0 w-full"
                                style={{
                                    height: '110px',
                                    transformOrigin: 'top center',
                                    zIndex: 30
                                }}
                                initial={{ scaleY: 1 }}
                                animate={phase === 'opening' ? { scaleY: -1 } : { scaleY: 1 }}
                                transition={{ duration: 0.45, ease: "easeInOut" }}
                            >
                                <svg viewBox="0 0 340 110" className="w-full h-full" preserveAspectRatio="none">
                                    <path d="M 0,0 L 340,0 L 170,110 Z" fill="#f4a7be" stroke="#e8789a" strokeWidth="1.5" />
                                </svg>
                            </motion.div>

                            {/* ===== 3. ตัวบอดี้ซองด้านหน้า (ลายพับซ้าย ขวา ล่าง คลีน ๆ สวยงาม) ===== */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
                                <div className="absolute bottom-0 left-0 right-0 h-full"
                                    style={{
                                        background: 'linear-gradient(135deg, #fce4ec 50%, transparent 50%), linear-gradient(225deg, #f9d5e5 50%, transparent 50%)',
                                    }}
                                />
                                <svg viewBox="0 0 340 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <path d="M 0,220 L 170,120 L 340,220" fill="none" stroke="#f4a7be" strokeWidth="1.5" />
                                    <path d="M 0,0 L 0,220 L 170,120" fill="#fce4ec" stroke="#f4a7be" strokeWidth="1" />
                                    <path d="M 340,0 L 340,220 L 170,120" fill="#f9d5e5" stroke="#f4a7be" strokeWidth="1" />
                                </svg>
                            </div>

                            {/* ===== 4. ตราประทับหัวใจสุดคิวท์ ===== */}
                            <motion.div
                                className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#e8789a] rounded-full border-[4px] border-white flex items-center justify-center shadow-[0_6px_16px_rgba(194,84,122,0.4)]"
                                style={{ zIndex: 40, pointerEvents: phase === 'closed' ? 'auto' : 'none' }}
                                animate={phase !== 'closed' ? { opacity: 0, scale: 0.3, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <span className="text-white text-2xl">♥</span>
                            </motion.div>

                            {/* hint */}
                            {phase === 'closed' && (
                                <motion.p
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-center absolute w-full left-0 -bottom-10 text-[10px] font-black uppercase tracking-[0.4em] text-[#e8789a]/60"
                                >
                                    tap to open ♥
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {/* ===== หน้าเนื้อความจดหมายแบบเต็มจอ (หวานเจี๊ยบเหมือนเดิม ไม่แก้จุดนี้) ===== */}
                    {phase === 'open' && (
                        <motion.div
                            key="letter"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                        >
                            <div className="bg-[#fff8fb] rounded-2xl shadow-[0_20px_50px_rgba(232,120,154,0.25)] border border-[#f4a7be]/40 overflow-hidden">
                                <div className="bg-[#f4a7be]/25 px-6 py-3 border-b border-[#f4a7be]/30 flex items-center gap-2">
                                    <span className="text-[#e8789a]">♥</span>
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#c2547a]/60">Final Note</span>
                                </div>
                                <div className="px-7 py-6 text-[#c2547a] space-y-4">
                                    <h3 className="text-base font-black italic border-b border-[#e8789a]/20 pb-3">
                                        ถึง... อ้วน
                                    </h3>
                                    <div className="text-xs leading-7 space-y-3 italic text-[#c2547a]/75">
                                        <p>สุขสันต์วันครบรอบ 7 ปี 🩵

ไม่คิดเลยว่าเราจะมาด้วยกันไกลขนาดนี้ ขอบคุณที่อยู่ข้างกันมาตลอด คอยรับฟัง คอยดูแลมาจนถึงทุกวันนี้ ต่อจากนี้ไม่ว่าจะเป็นยังไง ก็อยากให้รู้ว่ารักนะ ฮี่ๆ </p>
                                    </div>
                                    <div className="text-right font-black italic text-sm pt-2 border-t border-[#e8789a]/10">
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ scale: 1.04, backgroundColor: '#c2547a' }}
                                whileTap={{ scale: 0.96 }}
                                onClick={onNext}
                                className="mt-6 w-full py-4 bg-[#e8789a] text-white font-black rounded-2xl text-xs uppercase tracking-[0.3em] shadow-[0_8px_24px_rgba(232,120,154,0.4)] transition-colors"
                            >
                                Our Soundtrack →
                            </motion.button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </section>
    );
}