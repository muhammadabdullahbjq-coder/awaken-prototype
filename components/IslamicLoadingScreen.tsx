'use client'

import { useEffect, useState } from 'react'

export default function IslamicLoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const hadiths = [
    "\"The world is beautiful and green, and verily Allah, the Exalted, has made you stewards in it, and He sees how you acquit yourselves.\" (Sahih Muslim 2742)",
    "\"No Muslim plants a tree or sows a seed, and then a bird, or a person, or an animal eats thereof, but it is charity on his part.\" (Sahih Bukhari 2320)",
    "\"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift for him.\" (Sahih Muslim 1553)",
    "\"Do not be wasteful with water even if you are at a flowing river.\" (Sunan Ibn Majah 425)",
  ]
  const [hadith, setHadith] = useState(hadiths[0])

  useEffect(() => {
    // Set random hadith only on client to avoid hydration mismatch
    setHadith(hadiths[Math.floor(Math.random() * hadiths.length)])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 1000) // 1 second pause before continuing
          return 100
        }
        return prev + 1.67
      })
    }, 60) // Total duration: 3.6 seconds (60 steps * 60ms)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 relative overflow-hidden">
      {/* Scattered Islamic icons throughout the screen */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-16 text-7xl">🕌</div>
        <div className="absolute top-32 right-24 text-5xl">☪️</div>
        <div className="absolute top-48 left-1/4 text-6xl">📿</div>
        <div className="absolute top-20 right-1/3 text-5xl">🌙</div>
        <div className="absolute bottom-40 left-12 text-6xl">⭐</div>
        <div className="absolute bottom-24 right-16 text-7xl">🕋</div>
        <div className="absolute bottom-56 left-1/3 text-5xl">📖</div>
        <div className="absolute top-1/3 left-8 text-6xl">🤲</div>
        <div className="absolute top-1/2 right-12 text-5xl">🌟</div>
        <div className="absolute bottom-1/3 right-1/4 text-6xl">☪️</div>
      </div>

      <div className="text-center w-full max-w-2xl px-8 z-10">
        {/* Main Content Box */}
        <div className="bg-white rounded-2xl px-12 py-10 shadow-2xl border-4 border-yellow-400">

          {/* Circular Loading Animation */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-24 h-24">
              {/* Spinner Circle */}
              <svg className="animate-spin w-24 h-24" viewBox="0 0 50 50">
                <circle
                  className="opacity-25"
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="#FCD34D"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  className="opacity-75"
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="80"
                  strokeDashoffset="20"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Status Text */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Personalizing Your Experience</h2>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-100 rounded-lg border-2 border-yellow-400 shadow-md">
              <span className="text-xl font-bold text-yellow-900">Cultural Profile: Muslim</span>
              <svg
                className="w-6 h-6 text-green-600 flex-shrink-0"
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
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full transition-all duration-300 ease-out bg-gradient-to-r from-yellow-400 to-amber-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="text-sm text-gray-600">Personalizing your climate education experience...</p>
        </div>

        {/* Hadith Box */}
        <div className="mt-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-400 shadow-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">📖</span>
            <div>
              <p className="text-sm text-yellow-700 font-semibold mb-2 uppercase tracking-wide">From the Prophet (ﷺ)</p>
              <p className="text-base text-gray-800 leading-relaxed italic">
                {hadith}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
