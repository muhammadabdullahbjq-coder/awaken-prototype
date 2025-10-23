'use client'

import { useState, useRef } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts'

export default function Stage1({ onContinue, currentStage }: { onContinue: () => void; currentStage: number }) {
  const [hoveredSector, setHoveredSector] = useState<number | null>(null)
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const footprintData = [
    {
      name: 'Transport',
      value: 35,
      co2: 450,
      details: 'Includes your daily commute, car usage, and occasional flights. This is your largest carbon contributor.',
      consequences: 'Equivalent to melting 1,350 kg of Arctic ice, or the CO2 absorbed by 20 trees in a year. Contributes to extreme weather events affecting vulnerable communities worldwide.'
    },
    {
      name: 'Food',
      value: 28,
      co2: 360,
      details: 'Food production, packaging, and waste. Meat consumption is a major factor in this category.',
      consequences: 'Equal to 1,080 kg of melted Arctic ice. Your food waste alone could feed a family for 2 weeks while emitting greenhouse gases as it decomposes in landfills.'
    },
    {
      name: 'Energy',
      value: 22,
      co2: 280,
      details: 'Home electricity, heating, and cooling. Older appliances and poor insulation increase this.',
      consequences: 'Equivalent to burning 125 liters of gasoline or charging 34,000 smartphones. Contributes to air pollution that increases childhood asthma rates in your city by 1.2%.'
    },
    {
      name: 'Goods',
      value: 15,
      co2: 190,
      details: 'Manufacturing and shipping of clothing, electronics, and consumer products you purchase.',
      consequences: 'Equal to the carbon released from producing 38 pairs of jeans. Every purchase creates ocean acidification affecting 570 liters of seawater, harming marine ecosystems.'
    },
  ]

  // Bolder Soft Pastels palette
  const COLORS = ['#F87171', '#FB923C', '#FBBF24', '#4ADE80']

  const totalCO2 = footprintData.reduce((sum, item) => sum + item.co2, 0)

  // Comparison data - You vs Neighbors
  const neighborComparisonData = [
    { category: 'Transport', you: 450, neighbors: 380, national: 420 },
    { category: 'Food', you: 360, neighbors: 340, national: 370 },
    { category: 'Energy', you: 280, neighbors: 310, national: 290 },
    { category: 'Goods', you: 190, neighbors: 160, national: 180 },
  ]

  // Historical trend data - Past 6 months
  const historicalData = [
    { month: 'Jan', emissions: 1350 },
    { month: 'Feb', emissions: 1320 },
    { month: 'Mar', emissions: 1380 },
    { month: 'Apr', emissions: 1340 },
    { month: 'May', emissions: 1300 },
    { month: 'Jun', emissions: 1280 },
  ]

  const impacts = [
    {
      title: 'Annual Carbon Footprint',
      value: `${totalCO2} kg CO2`,
      description: 'Equivalent to what 23 mature trees absorb in one year',
      icon: '🌳',
    },
    {
      title: 'Climate Impact',
      value: 'Contributing to extreme weather',
      description: 'Your emissions add to the warming affecting vulnerable communities worldwide',
      icon: '🌍',
      islamicRef: '(Part of our stewardship of Allah\'s creation)',
    },
    {
      title: 'Local Air Quality',
      value: '1.2% higher asthma risk',
      description: 'Transport emissions contribute to childhood respiratory issues in your city',
      icon: '💨',
    },
    {
      title: 'Ocean Acidification',
      value: '15 liters affected',
      description: 'Your carbon emissions contribute to ocean chemistry changes',
      icon: '🌊',
    },
  ]

  // Graph carousel data
  const graphs = [
    {
      id: 'breakdown',
      title: 'By Category',
      component: 'pie'
    },
    {
      id: 'comparison',
      title: 'You vs. Others (kg CO2)',
      component: 'bar'
    },
    {
      id: 'trend',
      title: '6-Month Trend (kg CO2)',
      component: 'line'
    },
    {
      id: 'yearly',
      title: 'Year-Over-Year Comparison',
      component: 'yearlyBar'
    },
    {
      id: 'category-trend',
      title: 'Category Trends (6 Months)',
      component: 'categoryLine'
    }
  ]

  // Additional graph data
  const yearlyComparisonData = [
    { year: '2023', emissions: 1450, fill: '#FBBF24' }, // Light yellow
    { year: '2024', emissions: 1280, fill: '#D4A017' }, // Dark gold (current)
    { year: '2025 Goal', emissions: 900, fill: '#FBBF24' }, // Light yellow
  ]

  const categoryTrendData = [
    { month: 'Jan', transport: 470, food: 380, energy: 290, goods: 210 },
    { month: 'Feb', transport: 460, food: 370, energy: 285, goods: 205 },
    { month: 'Mar', transport: 465, food: 375, energy: 295, goods: 215 },
    { month: 'Apr', transport: 455, food: 365, energy: 285, goods: 195 },
    { month: 'May', transport: 450, food: 360, energy: 280, goods: 190 },
    { month: 'Jun', transport: 450, food: 360, energy: 280, goods: 190 },
  ]

  const nextGraph = () => {
    setCurrentGraphIndex((prev) => (prev + 1) % graphs.length)
  }

  const prevGraph = () => {
    setCurrentGraphIndex((prev) => (prev - 1 + graphs.length) % graphs.length)
  }

  const getGraphIndex = (offset: number) => {
    return (currentGraphIndex + offset + graphs.length) % graphs.length
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX) * 2
    if (Math.abs(walk) > 100) {
      if (walk > 0) {
        prevGraph()
      } else {
        nextGraph()
      }
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].pageX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX
    const walk = x - startX
    if (Math.abs(walk) > 100) {
      if (walk > 0) {
        prevGraph()
      } else {
        nextGraph()
      }
      setStartX(x)
    }
  }

  const renderGraph = (graphType: string) => {
    switch (graphType) {
      case 'pie':
        return (
          <div className="max-w-xl mx-auto">
            <div className="h-[250px] md:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={footprintData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={window.innerWidth < 768 ? 70 : 85}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(data, index) => setHoveredSector(index)}
                    onMouseLeave={() => setHoveredSector(null)}
                    cursor="pointer"
                  >
                    {footprintData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '12px', fontWeight: '600' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 px-2 md:px-4">
              {footprintData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-gray-700">{item.name}</span>
                  <span className="font-semibold text-gray-900 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'bar':
        return (
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={neighborComparisonData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: '11px' }} />
                <Bar dataKey="you" fill="#F87171" name="You" />
                <Bar dataKey="neighbors" fill="#60A5FA" name="Neighbors Avg" />
                <Bar dataKey="national" fill="#A78BFA" name="National Avg" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-center text-gray-600 mt-4 px-2">
              📊 You emit <strong>7% more</strong> than your neighbors
            </p>
          </div>
        )
      case 'line':
        return (
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[1200, 1400]} />
                <Tooltip contentStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="emissions" stroke="#10B981" strokeWidth={2} name="Monthly Emissions" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-center text-gray-600 mt-4 px-2">
              📉 You've reduced emissions by <strong>5.2%</strong> since January
            </p>
          </div>
        )
      case 'yearlyBar':
        return (
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyComparisonData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: '11px' }} />
                <Bar dataKey="emissions" name="Annual Emissions">
                  {yearlyComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-center text-gray-600 mt-4 px-2">
              📈 You've improved by <strong>11.7%</strong> from last year
            </p>
          </div>
        )
      case 'categoryLine':
        return (
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={categoryTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="transport" stroke="#F87171" strokeWidth={2} name="Transport" />
                <Line type="monotone" dataKey="food" stroke="#FB923C" strokeWidth={2} name="Food" />
                <Line type="monotone" dataKey="energy" stroke="#FBBF24" strokeWidth={2} name="Energy" />
                <Line type="monotone" dataKey="goods" stroke="#4ADE80" strokeWidth={2} name="Goods" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-center text-gray-600 mt-4 px-2">
              🎯 Transport is your biggest reduction opportunity
            </p>
          </div>
        )
      default:
        return null
    }
  }

  const nudges = [
    {
      title: `Transport: 450kg CO2/Year (35% of your footprint)`,
      message: `Your daily car commute emits as much CO2 as 20 trees absorb annually. This contributes to heat waves that make outdoor work dangerous for migrant laborers in Qatar. Be a **Khalifa** (guardian) of Allah's creation.`,
      time: `Just now`,
      icon: `🚗`,
    },
    {
      title: `Food: 360kg CO2/Year (28% of your footprint)`,
      message: `Food waste in your bin could have fed a family for weeks. As it rots, it releases methane—84x more potent than CO2. Honor the blessing of sustenance through **Shukr** (gratitude) by wasting less.`,
      time: `2h ago`,
      icon: `🍽️`,
    },
    {
      title: `Energy: 280kg CO2/Year (22% of your footprint)`,
      message: `Leaving AC at 20°C instead of 24°C wastes energy equivalent to powering a refugee family's home for a month. Rising emissions worsen droughts that displace millions. Practice **Amanah** (trusteeship) with resources.`,
      time: `1d ago`,
      icon: `⚡`,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-awaken-yellow rounded-lg flex items-center justify-center">
              <span className="text-awaken-black font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Stage 1 - Nudging</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentStage >= 1 ? 'bg-awaken-yellow' : 'bg-gray-300'}`}></div>
            <div className={`w-2 h-2 rounded-full ${currentStage >= 2 ? 'bg-awaken-yellow' : 'bg-gray-300'}`}></div>
            <div className={`w-2 h-2 rounded-full ${currentStage >= 3 ? 'bg-awaken-yellow' : 'bg-gray-300'}`}></div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Stage 1 - Nudging</h1>
          <p className="text-base md:text-lg text-gray-600">Building climate awareness one nudge at a time</p>
        </div>

        {/* How It Works Box */}
        <div className="bg-yellow-50 border border-amber-400 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-900">
            <strong>How Stage 1 Works:</strong> We use data-driven nudges to reveal your carbon impact. By seeing your emissions translated into real-world consequences, you're more likely to take action—this is behavioral economics in practice.
          </p>
        </div>

        {/* Carbon Footprint Chart */}
        <div className="card mb-6 animate-slide-up">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-900">Your Carbon Footprint Breakdown</h2>

          {/* Carousel Container */}
          <div className="relative mb-4">
            {/* Graph Carousel */}
            <div
              ref={carouselRef}
              className="flex items-center gap-2 md:gap-6 px-2 md:px-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              {/* Previous Graph (Peek) - Hidden on mobile */}
              <div className="hidden md:flex flex-shrink-0 w-40 opacity-20 pointer-events-none">
                <div className="w-full">
                  <div className="text-xs text-center text-gray-500 mb-2 truncate">{graphs[getGraphIndex(-1)].title}</div>
                  <div className="h-48 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-gray-300 text-sm">Previous</span>
                  </div>
                </div>
              </div>

              {/* Current Graph */}
              <div className="flex-1 max-w-3xl mx-auto w-full">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 text-center">{graphs[currentGraphIndex].title}</h3>
                {renderGraph(graphs[currentGraphIndex].component)}
              </div>

              {/* Next Graph (Peek) - Hidden on mobile */}
              <div className="hidden md:flex flex-shrink-0 w-40 opacity-20 pointer-events-none">
                <div className="w-full">
                  <div className="text-xs text-center text-gray-500 mb-2 truncate">{graphs[getGraphIndex(1)].title}</div>
                  <div className="h-48 bg-gradient-to-l from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-gray-300 text-sm">Next</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Arrow Button - Positioned over the peek */}
            <button
              onClick={prevGraph}
              className="absolute left-1 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm border-2 border-gray-300 rounded-full shadow-lg hover:bg-white hover:border-awaken-yellow transition-all flex items-center justify-center"
              aria-label="Previous graph"
            >
              <span className="text-gray-600 text-xl md:text-2xl font-bold">←</span>
            </button>

            {/* Right Arrow Button - Positioned over the peek */}
            <button
              onClick={nextGraph}
              className="absolute right-1 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm border-2 border-gray-300 rounded-full shadow-lg hover:bg-white hover:border-awaken-yellow transition-all flex items-center justify-center"
              aria-label="Next graph"
            >
              <span className="text-gray-600 text-xl md:text-2xl font-bold">→</span>
            </button>
          </div>

          {/* Hover Information Box - Only Real-World Impact */}
          {hoveredSector !== null && (
            <div
              className="mt-6 p-4 rounded-lg border-2 animate-fade-in"
              style={{
                backgroundColor: `${COLORS[hoveredSector]}20`,
                borderColor: COLORS[hoveredSector]
              }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: COLORS[hoveredSector].replace(/[^,]+(?=\))/, '0.8') }}>
                {footprintData[hoveredSector].name} - Real-World Impact
              </h3>
              <p className="text-sm text-gray-900 font-medium">🌍 {footprintData[hoveredSector].consequences}</p>
            </div>
          )}

          <p className="text-center text-2xl font-bold text-gray-900 mt-12">
            Total: {totalCO2} kg CO2/year
          </p>
        </div>

        {/* Social Tipping Point Box */}
        <div className="bg-yellow-50 border border-amber-400 rounded-lg p-4 mb-8 animate-fade-in">
          <p className="text-sm text-gray-900">
            <strong>💡 Social Tipping Point #6:</strong> Increasing transparency through the disclosure of information about each individual's emissions can improve climate consciousness – creating positive feedback loops that accelerate climate action.
          </p>
        </div>

        {/* Sample Nudges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Personalized Nudges</h2>
          <p className="text-center text-gray-600 mb-6 text-sm">How notifications would appear on your phone</p>
          <div className="max-w-4xl mx-auto space-y-3">
            {nudges.map((nudge, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 animate-slide-up hover:shadow-xl transition-all"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-gray-900 font-bold text-2xl">A</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900 text-sm">Awaken</p>
                      <p className="text-xs text-gray-500">{nudge.time}</p>
                    </div>
                    <p className="font-medium text-gray-800 text-sm mb-1.5">{nudge.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{nudge.message.replace(/\*\*/g, '')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center mt-12">
          <button onClick={onContinue} className="btn-primary text-lg px-8 py-4">
            Continue to Education →
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
