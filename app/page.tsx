'use client'

import { useState } from 'react'
import LoadingAnimation from '@/components/LoadingAnimation'
import Stage1 from '@/components/Stage1'
import Stage2 from '@/components/Stage2'
import Stage3 from '@/components/Stage3'

type Stage = 'loading' | 'stage1' | 'stage2' | 'stage3'

export default function Home() {
  const [currentStage, setCurrentStage] = useState<Stage>('loading')

  return (
    <main className="min-h-screen">
      {currentStage === 'loading' && (
        <LoadingAnimation onComplete={() => setCurrentStage('stage1')} />
      )}

      {currentStage === 'stage1' && (
        <Stage1 onContinue={() => setCurrentStage('stage2')} currentStage={1} />
      )}

      {currentStage === 'stage2' && (
        <Stage2 onContinue={() => setCurrentStage('stage3')} currentStage={2} />
      )}

      {currentStage === 'stage3' && <Stage3 currentStage={3} />}

      {/* Reset Button (for demo purposes) */}
      {currentStage !== 'loading' && (
        <button
          onClick={() => setCurrentStage('loading')}
          className="fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
        >
          Restart Demo
        </button>
      )}
    </main>
  )
}
