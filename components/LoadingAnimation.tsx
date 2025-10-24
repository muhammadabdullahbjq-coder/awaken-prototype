'use client'

import { useEffect, useState } from 'react'

export default function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const facts = [
    "Switching to renewable energy could prevent 4.5 million premature deaths per year from air pollution",
    "Transportation accounts for 24% of global CO2 emissions - the largest source of greenhouse gases",
    "Food waste produces 8-10% of global greenhouse gas emissions",
    "Planting 1 trillion trees could absorb 25% of current CO2 emissions",
    "Buildings use 36% of global energy and produce 39% of energy-related CO2 emissions",
    "The ocean has absorbed 90% of the excess heat from climate change, protecting land ecosystems",
    "If food waste were a country, it would be the 3rd largest greenhouse gas emitter after USA and China",
    "Renewable energy jobs have grown 700% in the last decade",
    "Electric vehicles produce 50% less CO2 over their lifetime than gas cars",
    "Reducing meat consumption by 50% could cut diet-related emissions by 35%",
  ]
  const [climateFact, setClimateFact] = useState(facts[0])

  useEffect(() => {
    // Set random fact only on client to avoid hydration mismatch
    setClimateFact(facts[Math.floor(Math.random() * facts.length)])
  }, [])

  const steps = [
    { label: 'Analyzing spending patterns...', threshold: 33 },
    { label: 'Detecting location data...', threshold: 66 },
    { label: 'Calculating carbon footprint...', threshold: 100 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 500) // 0.5 second pause before next screen
          return 100
        }
        return prev + 2.5
      })
    }, 60) // Total duration: 2.4 seconds (40 * 60ms)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    // Update current step based on progress
    const activeStep = steps.findIndex((step) => progress < step.threshold)
    setCurrentStep(activeStep === -1 ? steps.length - 1 : activeStep)
  }, [progress])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Scattered climate icons throughout the screen */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-16 text-7xl">🌍</div>
        <div className="absolute top-32 right-24 text-5xl">🌱</div>
        <div className="absolute top-48 left-1/4 text-6xl">🌳</div>
        <div className="absolute top-20 right-1/3 text-4xl">💧</div>
        <div className="absolute bottom-40 left-12 text-6xl">☀️</div>
        <div className="absolute bottom-24 right-16 text-7xl">🌿</div>
        <div className="absolute bottom-56 left-1/3 text-5xl">🌊</div>
        <div className="absolute top-1/3 left-8 text-5xl">🍃</div>
        <div className="absolute top-1/2 right-12 text-6xl">🌲</div>
        <div className="absolute bottom-1/3 right-1/4 text-4xl">💚</div>
      </div>

      <div className="text-center w-full max-w-2xl px-8 z-10">
        {/* Awaken Logo with Text on Black Background */}
        <div className="mb-12 flex items-center justify-center">
          <div className="bg-black rounded-2xl px-12 py-6 shadow-2xl border-4 border-awaken-yellow flex items-center gap-6 hover:scale-105 transition-transform duration-300 w-full">
            {/* Logo Icon */}
            <div className="w-28 h-28 bg-awaken-yellow rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-black font-black text-6xl">A</span>
            </div>
            {/* Text */}
            <div className="text-left flex-1">
              <h1 className="text-5xl font-black text-awaken-yellow tracking-tight leading-none mb-2" style={{ textShadow: '0 0 20px rgba(254, 214, 75, 0.5)' }}>AWAKEN</h1>
              <p className="text-sm text-gray-200 uppercase tracking-widest font-semibold">Climate Action for Everyone</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full transition-all duration-300 ease-out bg-awaken-yellow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Step Text */}
        <div className="h-20 flex items-center justify-center mb-8">
          <p className="text-lg font-medium text-gray-200 transition-all duration-300">
            {steps[currentStep]?.label}
          </p>
        </div>

        {/* Climate Fact Box */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border-2 border-awaken-yellow shadow-lg w-full">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm text-awaken-yellow font-semibold mb-2 uppercase tracking-wide">Did you know?</p>
              <p className="text-base text-gray-100 leading-relaxed">
                {climateFact}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
