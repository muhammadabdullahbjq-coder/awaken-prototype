'use client'

import { useEffect, useState } from 'react'

export default function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center w-full max-w-md px-8">
        {/* Awaken Logo */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-awaken-yellow mb-2">AWAKEN</h1>
          <p className="text-sm text-gray-400 uppercase tracking-wider">Climate Action Platform</p>
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
        <div className="h-20 flex items-center justify-center">
          {steps[currentStep]?.highlight && progress === 100 ? (
            <div className="px-8 py-4 rounded-lg shadow-2xl scale-110 animate-fade-in flex items-center gap-3" style={{ backgroundColor: '#D4A017' }}>
              <p className="text-xl font-bold text-awaken-black">{steps[currentStep]?.label}</p>
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
            <p className="text-lg font-medium text-gray-300 transition-all duration-300">
              {steps[currentStep]?.label}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
