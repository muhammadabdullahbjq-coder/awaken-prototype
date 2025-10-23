'use client'

import { useState, useEffect } from 'react'

export default function LoadingDesignsComparison() {
  const [activeDesign, setActiveDesign] = useState<number | null>(null)

  const designs = [
    {
      name: "Current: Progress Bar",
      component: <ProgressBarDesign />
    },
    {
      name: "Vertical Timeline",
      component: <VerticalTimelineDesign />
    },
    {
      name: "Card Flip",
      component: <CardFlipDesign />
    },
    {
      name: "Expanding Circles",
      component: <ExpandingCirclesDesign />
    },
    {
      name: "Islamic Geometric",
      component: <IslamicGeometricDesign />
    },
    {
      name: "Data Visualization",
      component: <DataVizDesign />
    },
    {
      name: "Seed Growing",
      component: <SeedGrowingDesign />
    },
    {
      name: "Mosque Silhouette",
      component: <MosqueSilhouetteDesign />
    },
    {
      name: "Pulse/Heartbeat",
      component: <PulseDesign />
    },
    {
      name: "Sunrise/Dawn",
      component: <SunriseDesign />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Loading Screen Design Options</h1>
          <p className="text-lg text-gray-600">Click any design to see it in full screen mode</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
              onClick={() => setActiveDesign(index)}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">{design.name}</h3>
              </div>
              <div className="h-80 geometric-pattern flex items-center justify-center p-6">
                {design.component}
              </div>
              <div className="p-4 bg-gray-50">
                <button className="w-full btn-primary text-sm">
                  View Full Screen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Full Screen Modal */}
        {activeDesign !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8"
            onClick={() => setActiveDesign(null)}
          >
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 geometric-pattern relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setActiveDesign(null)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {designs[activeDesign].name}
              </h2>
              <div className="h-96 flex items-center justify-center">
                {designs[activeDesign].component}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Design 1: Progress Bar (Current)
function ProgressBarDesign() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center w-full">
      <h1 className="text-5xl font-bold text-awaken-yellow mb-2">AWAKEN</h1>
      <p className="text-xs text-gray-600 uppercase mb-8">Climate Action Platform</p>
      <div className="mb-4">
        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div
            className="h-full bg-yellow-500 transition-all rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-gray-700">
        {progress < 25 ? 'Analyzing spending...' :
         progress < 50 ? 'Detecting location...' :
         progress < 75 ? 'Identifying cultural background...' :
         progress < 100 ? 'Cultural profile: Muslim' : 'Complete!'}
      </p>
    </div>
  )
}

// Design 2: Vertical Timeline
function VerticalTimelineDesign() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 0 : prev + 1))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    'Analyzing spending patterns',
    'Detecting location data',
    'Identifying cultural background',
    'Cultural profile: Muslim'
  ]

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <div className="flex flex-col gap-4 items-start max-w-xs mx-auto">
        {steps.map((label, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              idx < step ? 'bg-green-500 border-green-500' :
              idx === step ? 'bg-yellow-500 border-yellow-500 animate-pulse' :
              'bg-white border-gray-300'
            }`}>
              {idx < step && <span className="text-white text-xs">✓</span>}
            </div>
            <p className={`text-sm ${idx === step ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Design 3: Card Flip
function CardFlipDesign() {
  const [currentCard, setCurrentCard] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev >= 3 ? 0 : prev + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const cards = [
    { title: 'Analyzing', subtitle: 'Spending Patterns', step: '1/4' },
    { title: 'Detecting', subtitle: 'Location Data', step: '2/4' },
    { title: 'Identifying', subtitle: 'Cultural Background', step: '3/4' },
    { title: 'Profile:', subtitle: 'Muslim', step: '4/4', highlight: true }
  ]

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <div className={`bg-white p-8 rounded-xl shadow-2xl max-w-xs mx-auto transition-all duration-500 ${
        cards[currentCard].highlight ? 'bg-awaken-yellow' : ''
      }`}>
        <p className="text-2xl font-bold text-gray-900 mb-2">{cards[currentCard].title}</p>
        <p className="text-lg text-gray-700 mb-4">{cards[currentCard].subtitle}</p>
        <p className="text-sm text-gray-500">Step {cards[currentCard].step}</p>
      </div>
    </div>
  )
}

// Design 4: Expanding Circles
function ExpandingCirclesDesign() {
  const [ripple, setRipple] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRipple((prev) => (prev >= 4 ? 0 : prev + 1))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <div className="relative w-40 h-40 mx-auto mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-full border-4 ${
              i <= ripple ? 'border-yellow-500' : 'border-gray-300'
            }`}
            style={{
              transform: `scale(${1 + i * 0.25})`,
              opacity: i <= ripple ? 1 - (i * 0.2) : 0.3
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-yellow-500" />
        </div>
      </div>
      <p className="text-sm text-gray-700">Awareness spreading...</p>
    </div>
  )
}

// Design 5: Islamic Geometric
function IslamicGeometricDesign() {
  const [filled, setFilled] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFilled((prev) => (prev >= 16 ? 0 : prev + 1))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <div className="grid grid-cols-4 gap-2 w-48 mx-auto mb-4">
        {Array.from({ length: 16 }).map((_, idx) => (
          <div
            key={idx}
            className={`w-10 h-10 ${
              idx < filled ? 'bg-yellow-500' : 'bg-gray-200'
            } transition-all duration-300`}
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
            }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-700">{Math.round((filled / 16) * 100)}% Complete</p>
    </div>
  )
}

// Design 6: Data Viz
function DataVizDesign() {
  const [bars, setBars] = useState([0, 0, 0, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => {
        const next = [...prev]
        const incomplete = next.findIndex(v => v < 100)
        if (incomplete !== -1) {
          next[incomplete] = Math.min(next[incomplete] + 10, 100)
        } else {
          return [0, 0, 0, 0]
        }
        return next
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <div className="flex gap-4 justify-center items-end h-32 mb-4">
        {bars.map((height, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className="w-12 bg-gray-200 h-32 rounded-t-lg overflow-hidden">
              <div
                className="bg-yellow-500 w-full transition-all duration-200"
                style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
              />
            </div>
            {height === 100 && <span className="text-green-500 text-xl">✓</span>}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-700">Processing data...</p>
    </div>
  )
}

// Design 7: Seed Growing
function SeedGrowingDesign() {
  const [growth, setGrowth] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGrowth((prev) => (prev >= 4 ? 0 : prev + 1))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <div className="text-6xl mb-4">
        {growth === 0 && '●'}
        {growth === 1 && '🌱'}
        {growth === 2 && '🌿'}
        {growth === 3 && '🌳'}
        {growth === 4 && '🌺'}
      </div>
      <p className="text-sm text-gray-700">
        {growth === 0 && 'Planting seed...'}
        {growth === 1 && 'Sprouting...'}
        {growth === 2 && 'Growing...'}
        {growth === 3 && 'Maturing...'}
        {growth === 4 && 'Blooming!'}
      </p>
    </div>
  )
}

// Design 8: Mosque Silhouette
function MosqueSilhouetteDesign() {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeight((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <div className="w-48 mx-auto">
        {/* Dome */}
        <div className="text-gray-400 text-4xl mb-2">🕌</div>
        {/* Building */}
        <div className="w-32 h-32 bg-gray-200 mx-auto rounded-t-lg overflow-hidden">
          <div
            className="bg-yellow-500 w-full transition-all duration-200"
            style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-4">{height}% Complete</p>
    </div>
  )
}

// Design 9: Pulse
function PulseDesign() {
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev >= 4 ? 0 : prev + 1))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <svg width="200" height="80" className="mx-auto mb-4">
        <polyline
          points={`0,40 ${pulse >= 1 ? '40,10 50,70' : '40,40 50,40'} ${pulse >= 2 ? '80,10 90,70' : '80,40 90,40'} ${pulse >= 3 ? '120,10 130,70' : '120,40 130,40'} ${pulse >= 4 ? '160,10 170,70' : '160,40 170,40'} 200,40`}
          fill="none"
          stroke="#EAB308"
          strokeWidth="3"
          className="transition-all duration-300"
        />
      </svg>
      <div className="flex gap-2 justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < pulse ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Design 10: Sunrise
function SunriseDesign() {
  const [rise, setRise] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRise((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-awaken-yellow mb-8">AWAKEN</h1>
      <div className="relative w-48 h-32 mx-auto mb-4 overflow-hidden">
        {/* Horizon */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400" />
        {/* Sun */}
        <div
          className="absolute w-16 h-16 rounded-full bg-gradient-to-t from-orange-500 to-yellow-400 left-1/2 transform -translate-x-1/2 transition-all duration-200"
          style={{ bottom: `${rise * 0.8}%` }}
        >
          {/* Rays */}
          {rise > 50 && (
            <>
              <div className="absolute w-1 h-8 bg-yellow-300 left-1/2 transform -translate-x-1/2 -top-10" />
              <div className="absolute w-1 h-8 bg-yellow-300 left-1/2 transform -translate-x-1/2 -bottom-10" />
              <div className="absolute w-8 h-1 bg-yellow-300 top-1/2 transform -translate-y-1/2 -left-10" />
              <div className="absolute w-8 h-1 bg-yellow-300 top-1/2 transform -translate-y-1/2 -right-10" />
            </>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-700">The dawn is breaking...</p>
    </div>
  )
}
