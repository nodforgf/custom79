"use client";
import { useState } from 'react';
import LobbySection from '../src/components/LobbySection';
import AnniversarySection from '../src/components/AnniversarySection';
import GallerySection from '../src/components/GallerySection';
import TransitionPage from '../src/components/TransitionPage';
import GoPlanSection from '../src/components/GoPlanSection';
import GiftQuestSection from '../src/components/GiftQuestSection';
import LetterSection from '../src/components/LetterSection';
import MusicCassetteSection from '../src/components/MusicCassetteSection';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'lobby' | 'anniversary' | 'gallery' | 'transition' | 'goplan' | 'quest' | 'letter' | 'music'>('lobby');

  return (
    <main className="min-h-screen bg-[#fce4ec]">
      
      {/* 1. หน้าแมว (Lobby) */}
      {currentStep === 'lobby' && (
        <LobbySection onEnter={() => setCurrentStep('anniversary')} />
      )}

      {/* 2. หน้าปฏิทิน (Anniversary) */}
      {currentStep === 'anniversary' && (
        <AnniversarySection onFinish={() => setCurrentStep('gallery')} />
      )}

      {/* 3. หน้าคลังรูปภาพ (Gallery) */}
      {currentStep === 'gallery' && (
        <GallerySection onNext={() => setCurrentStep('transition')} /> 
      )}

      {/* 4. หน้าอนิเมชั่นคั่นเวลา (Transition) */}
      {currentStep === 'transition' && (
        <TransitionPage onComplete={() => setCurrentStep('goplan')} />
      )}

      {/* 5. หน้าแผนท่องเที่ยวในอนาคต (GoPlan) */}
      {currentStep === 'goplan' && (
        <GoPlanSection onUnlock={() => setCurrentStep('quest')} />
      )}

      {/* 6. หน้าเกม (Gift Quest) */}
      {currentStep === 'quest' && (
        <GiftQuestSection onBack={() => setCurrentStep('goplan')} onFinish={() => setCurrentStep('letter')} />
      )}

      {/* 7. หน้าจดหมาย (Letter) */}
      {currentStep === 'letter' && (
        <LetterSection onNext={() => setCurrentStep('music')} />
      )}

      {/* 8. หน้าตลับเทปเพลง (Music Cassette) */}
      {currentStep === 'music' && (
        <MusicCassetteSection />
      )}

    </main>
  );
}
