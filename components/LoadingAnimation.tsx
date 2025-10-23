'use client'

import { useEffect, useState } from 'react'

export default function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [climateFact] = useState(() => {
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
    return facts[Math.floor(Math.random() * facts.length)]
  })

  const steps = [
    { label: 'Analyzing spending patterns...', threshold: 25 },
    { label: 'Detecting location data...', threshold: 50 },
    { label: 'Identifying cultural background...', threshold: 99 },
    { label: 'Cultural profile: Muslim', threshold: 100, highlight: true },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 2000) // 2 second pause to read the final message
          return 100
        }
        return prev + 1
      })
    }, 60) // Total duration: 6 seconds (100 * 60ms)

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

      <div className="text-center w-full max-w-md px-8 z-10">
        {/* Awaken Logo with Pulse Animation */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-awaken-yellow mb-2 animate-pulse">AWAKEN</h1>
          <p className="text-sm text-gray-200 uppercase tracking-wider">Climate Action for Everyone</p>
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
          {steps[currentStep]?.highlight && progress === 100 ? (
            <div className="px-8 py-4 rounded-lg shadow-2xl scale-110 animate-fade-in flex items-center gap-3 bg-yellow-100">
              <p className="text-xl font-bold text-yellow-900">{steps[currentStep]?.label}</p>
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <p className="text-lg font-medium text-gray-200 transition-all duration-300">
              {steps[currentStep]?.label}
            </p>
          )}
        </div>

        {/* Climate Fact Box */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border-2 border-green-500 shadow-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm text-green-400 font-semibold mb-2 uppercase tracking-wide">Did you know?</p>
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
