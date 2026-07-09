"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CARD_IMAGES: { src: string; position: string }[] = [
    { src: "/images/7.jpeg",  position: "center center" },
    { src: "/images/8.jpeg",  position: "center 75%" },
    { src: "/images/9.jpeg",  position: "center center" },
    { src: "/images/10.jpeg", position: "center center" },
    { src: "/images/11.jpeg", position: "center center" },
    { src: "/images/12.jpeg", position: "center center" },
];

export default function GiftQuestSection({ onBack, onFinish }: { onBack: () => void, onFinish: () => void }) {
    const [cards, setCards] = useState(() =>
        [...CARD_IMAGES, ...CARD_IMAGES]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ id: index, img: card.src, position: card.position, flipped: false, matched: false }))
    );

    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isWon, setIsWon] = useState(false);
    const [showWheel, setShowWheel] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const GIFTS = [
        "รองเท้าคู่ใหม่ 👟", "ขับรถไปต่างจังหวัดแบบไม่มีแพลน 🚗", "ดูหนังเรื่องที่อ้วนอยากดู 🎬", "ไปกินโอชิเน 🍣",
        "ไปเที่ยวต่างจังหวัด 2 วัน 1 คืน ⛺.", "เล่นเกมด้วย 1 วัน 🎮", "รองเท้าคู่ใหม่ 🥾", "Secret 🤫."
    ];

    const fireConfetti = () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#fff8fb', '#e8789a', '#f4a7be']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#fff8fb', '#e8789a', '#f4a7be']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length >= 2 || cards[id].flipped || cards[id].matched) return;
        const newCards = [...cards];
        newCards[id].flipped = true;
        setCards(newCards);
        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].img === cards[second].img) {
                newCards[first].matched = true;
                newCards[second].matched = true;
                setCards(newCards);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    newCards[first].flipped = false;
                    newCards[second].flipped = false;
                    setCards(newCards);
                    setFlippedCards([]);
                }, 600);
            }
        }
    };

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.matched)) {
            setIsWon(true);
            fireConfetti();
        }
    }, [cards]);

    const spinWheel = () => {
        if (isSpinning) return;
        const newRotation = rotation + 1800 + Math.random() * 360;
        setRotation(newRotation);
        setIsSpinning(true);
        setTimeout(() => {
            const index = Math.floor((360 - (newRotation % 360)) / (360 / GIFTS.length)) % GIFTS.length;
            setResult(GIFTS[index]);
            setIsSpinning(false);
            fireConfetti();
        }, 4000);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen w-full bg-[#fce4ec] flex flex-col items-center justify-center p-6 font-sans text-[#c2547a] relative z-50 overflow-hidden"
        >
            <button onClick={onBack} className="absolute top-6 left-6 z-[60] text-[10px] uppercase tracking-widest text-[#c2547a]/40 hover:text-[#c2547a] p-2">
                ← Back
            </button>

            {!showWheel ? (
                <div className="max-w-md w-full flex flex-col items-center z-50">
                    <motion.h2
                        animate={isWon ? { scale: [1, 1.1, 1], rotate: [-2, 2, -2] } : {}}
                        className="text-4xl font-black uppercase italic mb-8 tracking-tighter text-[#c2547a]"
                    >
                        {isWon ? "✨ YOU DID IT! ✨" : "Memory Quest"}
                    </motion.h2>

                    <motion.div
                        animate={isWon ? { y: [0, -10, 0] } : {}}
                        className="grid grid-cols-3 gap-3 w-full relative"
                    >
                        {cards.map((card) => (
                            <div key={card.id} onClick={() => handleCardClick(card.id)} className="aspect-square cursor-pointer relative z-50" style={{ perspective: '1000px' }}>
                                <motion.div animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }} transition={{ duration: 0.4 }} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                                    <div className="absolute inset-0 bg-[#fff8fb] border border-[#f4a7be]/50 rounded-xl flex items-center justify-center text-3xl font-black text-[#e8789a] shadow-inner" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>?</div>
                                    <div className="absolute inset-0 bg-[#fff8fb] rounded-xl overflow-hidden shadow-2xl" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                        <img src={card.img} alt="couple" className="w-full h-full object-cover" style={{ objectPosition: card.position }} />
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>

                    <AnimatePresence>
                        {isWon && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center"
                            >
                                <motion.p
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-[#e8789a]"
                                >
                                    Master of Memory!
                                </motion.p>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowWheel(true)}
                                    className="mt-8 bg-[#e8789a] text-white px-12 py-5 rounded-full font-black uppercase shadow-[0_10px_40px_rgba(232,120,154,0.4)] z-[70] text-lg"
                                >
                                    Go to Lucky Wheel 🎡
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center z-50 w-full max-w-sm px-4"
                >
                    <h2 className="text-4xl font-black italic uppercase mb-8 text-[#c2547a]">Lucky Wheel</h2>

                    <div className="relative w-72 h-72 md:w-80 md:h-80">
                        {/* ลูกศรชี้ */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-[100] drop-shadow-lg">
                            <svg viewBox="0 0 28 28" className="w-7 h-7">
                                <polygon points="14,28 0,4 28,4" fill="#c2547a" />
                                <polygon points="14,24 3,6 25,6" fill="#e8789a" />
                            </svg>
                        </div>

                        <motion.svg
                            viewBox="0 0 200 200"
                            className="w-full h-full drop-shadow-2xl"
                            animate={{ rotate: rotation }}
                            transition={{ duration: 4, ease: [0.45, 0.05, 0.55, 0.95] }}
                            style={{ transformOrigin: 'center' }}
                        >
                            {/* พื้นหลัง */}
                            <circle cx="100" cy="100" r="98" fill="#fff8fb" stroke="#e8789a" strokeWidth="3" />

                            {GIFTS.map((gift, i) => {
                                const total = GIFTS.length;
                                const angleDeg = 360 / total;
                                const startDeg = angleDeg * i - 90;
                                const endDeg   = angleDeg * (i + 1) - 90;
                                const s = startDeg * Math.PI / 180;
                                const e = endDeg   * Math.PI / 180;
                                const r = 96, cx = 100, cy = 100;
                                const x1 = cx + r * Math.cos(s);
                                const y1 = cy + r * Math.sin(s);
                                const x2 = cx + r * Math.cos(e);
                                const y2 = cy + r * Math.sin(e);

                                const colors = ['#fff0f8','#ffd6e7','#fff8fb','#fce4ec'];
                                const fill = colors[i % colors.length];

                                // กึ่งกลาง wedge
                                const midDeg = startDeg + angleDeg / 2;
                                const midRad = midDeg * Math.PI / 180;

                                // emoji ที่ r=62 กลาง wedge
                                const er = 62;
                                const ex = cx + er * Math.cos(midRad);
                                const ey = cy + er * Math.sin(midRad);

                                const emojiMatch = gift.match(/\p{Emoji_Presentation}/u);
                                const emoji = emojiMatch ? emojiMatch[0] : '';

                                return (
                                    <g key={i}>
                                        {/* wedge */}
                                        <path
                                            d={`M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 0,1 ${x2},${y2} Z`}
                                            fill={fill}
                                            stroke="#f4a7be"
                                            strokeWidth="1.5"
                                        />
                                        {/* emoji อย่างเดียว */}
                                        <text x={ex} y={ey} textAnchor="middle" dominantBaseline="middle" fontSize="16">
                                            {emoji}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* วงขอบนอก */}
                            <circle cx="100" cy="100" r="96" fill="none" stroke="#e8789a" strokeWidth="2" />
                            {/* วงกลมกลาง */}
                            <circle cx="100" cy="100" r="14" fill="#e8789a" stroke="#fff8fb" strokeWidth="3" />
                            <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="white">♥</text>
                        </motion.svg>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={spinWheel}
                        disabled={isSpinning}
                        className={`mt-10 px-14 py-4 rounded-full font-black uppercase tracking-widest transition-all shadow-[0_8px_30px_rgba(232,120,154,0.4)] text-sm ${
                            isSpinning
                                ? 'bg-[#f4a7be] text-white opacity-50 cursor-not-allowed'
                                : 'bg-[#e8789a] text-white hover:bg-[#c2547a]'
                        }`}
                    >
                        {isSpinning ? '🍀 Good Luck...' : '✨ Spin Now!'}
                    </motion.button>
                </motion.div>
            )}

            {/* Result Modal */}
            {/* Result Modal */}
            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="fixed inset-0 z-[200] flex items-center justify-center bg-[#fce4ec]/95 p-6 backdrop-blur-xl"
                >
                  <motion.div 
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="bg-[#fff8fb] p-8 md:p-12 rounded-[40px] text-center w-full max-w-sm shadow-[0_20px_80px_rgba(232,120,154,0.3)] border-8 border-[#f4a7be]"
                  >
                    <motion.span 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-6xl block mb-4"
                    >
                      🎁
                    </motion.span>
                    <p className="text-[#e8789a]/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Congratulations!</p>
                    
                    {/* 🎯 ปรับแก้ขนาดตรงนี้: จาก text-4xl เหลือ text-2xl และเพิ่ม leading-snug เพื่อแก้ปัญหาสระซ้อน/ตกบรรทัดบนมือถือ */}
                    <h3 className="text-[#c2547a] font-black text-2xl uppercase italic mb-6 leading-snug px-2 break-words">
                      {result}
                    </h3>
                    
                    <div className="w-full h-px bg-[#e8789a]/10 mb-6" />
                    
                    <button 
                      onClick={() => {
                        setResult(null);
                        onFinish();
                      }} 
                      className="w-full py-4 bg-[#e8789a] text-white font-black rounded-2xl hover:bg-[#c2547a] transition-colors uppercase tracking-widest text-sm"
                    >
                      Keep it Forever
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.section>
    );
}
