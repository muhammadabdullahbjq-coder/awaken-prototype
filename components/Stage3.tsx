'use client'

import { useState } from 'react'

export default function Stage3({ currentStage }: { currentStage: number }) {
  const userName = "Ahmed" // Can be personalized
  const totalReduction = 397 // kg CO2/year (31% of 1280)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  // Initial solutions - will be added to dynamically
  const initialSolutions = [
    {
      title: "Purchase Doha Metro Monthly Gold Card",
      icon: "🚇",
      description: "Buy a monthly Gold Card for unlimited Metro + bus access. This one-time purchase commits you to public transport for 30 days. Your daily 30km commute emits 6.5kg CO2 weekly—the Metro reduces this by 60%.",
      impact: {
        co2Reduction: "13.5 kg CO2",
        percentage: "One month of reduced commute emissions",
        financialSaving: "Saves QAR 200 vs driving this month",
      },
      islamicConnection: {
        concept: "Guardianship (Khalifa)",
        explanation: "As caretakers of Allah's Earth, we reduce harm to His creation",
      },
      steps: [
        "Visit any Metro station (Al Sadd, West Bay, or nearest to you) this week",
        "Purchase Gold Card (QAR 300) and download Doha Metro app to save your commute route",
      ],
    },
    {
      title: "Buy Meal Prep Containers & Plan This Week's Meals",
      icon: "🥘",
      description: "Purchase 7 glass meal prep containers and plan your meals for the week. You currently waste QAR 180 of groceries monthly. This one-time setup enables systematic meal planning to cut waste by 50%.",
      impact: {
        co2Reduction: "9 kg CO2",
        percentage: "One month of halved food waste",
        financialSaving: "Saves QAR 90 on wasted groceries this month",
      },
      islamicConnection: {
        concept: "Gratitude (Shukr)",
        explanation: "Honor the blessing of sustenance by wasting nothing",
      },
      steps: [
        "Purchase 7 glass containers (QAR 45 from Carrefour City Centre) by this weekend",
        "Before next Friday's grocery shop, write meal plan for 6 dinners using current fridge contents",
      ],
    },
    {
      title: "Install & Program Smart Thermostat Timer",
      icon: "❄️",
      description: "Install a programmable timer on your AC unit to automatically raise temperature to 23°C during your 8-hour work day (7am-3pm). One-time setup that saves 24% cooling energy without behavior change.",
      impact: {
        co2Reduction: "7 kg CO2",
        percentage: "One month of optimized cooling",
        financialSaving: "Saves QAR 60 on electricity this month",
      },
      islamicConnection: {
        concept: "Trusteeship (Amanah)",
        explanation: "Resources are a trust from Allah—we must use them wisely",
      },
      steps: [
        "Purchase AC programmable timer (QAR 60 from Lulu Electronics) by this weekend",
        "Set schedule: 20°C when home, 23°C during work hours (7am-3pm), confirm it runs for 1 week",
      ],
    },
    {
      title: "Sign Gulf Climate Petition & Share with 10 People",
      icon: "📢",
      description: "Sign the Gulf Climate Petition calling for 40% renewable energy by 2030, then share with 10 contacts. Concrete advocacy action that takes 15 minutes but influences systemic policy change affecting millions.",
      impact: {
        co2Reduction: "Policy impact",
        percentage: "Systemic change multiplier",
        financialSaving: "Amplifies all climate actions",
      },
      islamicConnection: {
        concept: "Collective Duty (Fard Kifayah)",
        explanation: "When the community faces harm, speaking out becomes a shared obligation",
      },
      steps: [
        "Visit gulfclimate.org and sign the petition with your name and email (5 minutes)",
        "Share petition link on your WhatsApp status + send directly to 10 family/friends by end of week",
      ],
    },
  ]

  const [solutions, setSolutions] = useState(initialSolutions)
  const [actionStatus, setActionStatus] = useState<{ [key: number]: 'not-started' | 'in-progress' | 'completed' }>(
    Object.fromEntries(initialSolutions.map((_, i) => [i, 'not-started']))
  )
  const [completedActions, setCompletedActions] = useState<any[]>([]) // Track completed actions separately
  const [suggestedAction, setSuggestedAction] = useState<any>(null)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [lastCompletedIndex, setLastCompletedIndex] = useState<number | null>(null)

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const updateStatus = (index: number, status: 'not-started' | 'in-progress' | 'completed') => {
    setActionStatus({ ...actionStatus, [index]: status })

    // When an action is completed, suggest an alternative
    if (status === 'completed' && actionStatus[index] !== 'completed') {
      setLastCompletedIndex(index)
      const newSuggestion = getRandomAlternativeAction()
      setSuggestedAction(newSuggestion)
      setShowSuggestion(true)
    }
  }

  const acceptSuggestion = () => {
    if (lastCompletedIndex !== null) {
      // Replace the completed action at lastCompletedIndex
      const newSolutions = [...solutions]

      // Save the completed action to completedActions array with its CO2 value
      const completedAction = newSolutions[lastCompletedIndex]
      const match = completedAction.impact.co2Reduction.match(/[\d.]+/)
      const co2Value = match ? parseFloat(match[0]) : 0
      setCompletedActions([...completedActions, { ...completedAction, co2Value }])

      // Replace with new action
      newSolutions[lastCompletedIndex] = suggestedAction
      setSolutions(newSolutions)

      // Reset the status for the new action at this index
      const newStatus = { ...actionStatus }
      newStatus[lastCompletedIndex] = 'not-started'
      setActionStatus(newStatus)

      setShowSuggestion(false)
      setLastCompletedIndex(null)
    }
  }

  const rejectSuggestion = () => {
    const newSuggestion = getRandomAlternativeAction()
    setSuggestedAction(newSuggestion)
  }

  const dismissSuggestion = () => {
    setShowSuggestion(false)
  }

  const replaceCompletedAction = (index: number) => {
    const newSuggestion = getRandomAlternativeAction()
    setSuggestedAction(newSuggestion)
    setLastCompletedIndex(index)
    setShowSuggestion(true)
  }

  const getCompletedCount = () => {
    return completedActions.length
  }

  const getInProgressCount = () => {
    return Object.values(actionStatus).filter(status => status === 'in-progress').length
  }

  const getCurrentCO2Reduction = () => {
    // Sum CO2 from completed actions only
    return completedActions.reduce((total, action) => total + (action.co2Value || 0), 0)
  }

  const getTotalPotentialCO2 = () => {
    // Sum of active solutions + completed actions
    const activeCO2 = solutions.reduce((total, solution) => {
      const match = solution.impact.co2Reduction.match(/[\d.]+/)
      const co2Value = match ? parseFloat(match[0]) : 0
      return total + co2Value
    }, 0)
    const completedCO2 = completedActions.reduce((total, action) => total + (action.co2Value || 0), 0)
    return activeCO2 + completedCO2
  }

  const alternativeActions = [
    {
      title: "Schedule Solar Panel Installation Assessment",
      icon: "☀️",
      description: "Book a free home assessment for rooftop solar panels through Kahramaa's Tarsheed program. Qatar averages 3,500 hours of sunshine yearly—enough to power most of your home. A 5kW system can offset 6,500 kg CO2 annually.",
      impact: {
        co2Reduction: "6,500 kg CO2/year potential",
        percentage: "Could offset 500% of current footprint",
        financialSaving: "40% government subsidy available",
      },
      islamicConnection: {
        concept: "Using Allah's Provisions Wisely",
        explanation: "Harnessing abundant solar energy fulfills our duty as caretakers of creation",
      },
      steps: [
        "Call Kahramaa Tarsheed at +974 4484-5555 to book your free home assessment by [specific date]",
        "Receive assessment report within 2 weeks showing potential savings and installation timeline",
      ],
    },
    {
      title: "Replace All Home Light Bulbs with LEDs This Month",
      icon: "💡",
      description: "A one-time switch of all 40+ bulbs in your home to LEDs. Each LED uses 75% less energy and lasts 25x longer than incandescent bulbs. This is a concrete, completable action with immediate impact.",
      impact: {
        co2Reduction: "280 kg CO2/year",
        percentage: "Complete home lighting upgrade",
        financialSaving: "Saves QAR 720/year on electricity",
      },
      islamicConnection: {
        concept: "Avoiding Waste (Israf)",
        explanation: "The Prophet ﷺ taught moderation in all things, including energy use",
      },
      steps: [
        "Purchase 40 LED bulbs from Kahramaa's free exchange program (bring old bulbs to any Kahramaa office)",
        "Replace all bulbs in one day and recycle old ones properly—mark completion date on calendar",
      ],
    },
    {
      title: "Purchase & Set Up Home Compost System",
      icon: "🌱",
      description: "Buy and install a sealed compost bin for organic waste. This one-time setup prevents 72 kg CO2/year from methane emissions in landfills. Organic waste makes up 30% of household trash.",
      impact: {
        co2Reduction: "72 kg CO2/year",
        percentage: "Eliminates 100% organic waste emissions",
        financialSaving: "Saves QAR 300/year on fertilizer",
      },
      islamicConnection: {
        concept: "Returning to Earth (Cycle of Creation)",
        explanation: "Returning organic matter to soil honors the natural cycles Allah created",
      },
      steps: [
        "Purchase sealed compost bin (QAR 150 from Ace Hardware, heat-resistant for Qatar) by [specific date]",
        "Watch 15-min setup tutorial at qatargbc.org/composting and begin composting kitchen scraps",
      ],
    },
    {
      title: "Install Programmable Thermostat This Week",
      icon: "🌡️",
      description: "Replace manual AC controls with a smart thermostat that auto-adjusts temperature when you're away. This one-time installation saves 15-20% on cooling costs—critical in Qatar's climate where AC is 60% of energy use.",
      impact: {
        co2Reduction: "420 kg CO2/year",
        percentage: "20% reduction in cooling emissions",
        financialSaving: "Saves QAR 960/year on electricity",
      },
      islamicConnection: {
        concept: "Trusteeship (Amanah)",
        explanation: "Managing resources efficiently honors our role as Allah's trustees on Earth",
      },
      steps: [
        "Purchase Nest or Ecobee smart thermostat (QAR 450 from Jarir) with Kahramaa rebate eligibility",
        "Schedule professional installation within 7 days or follow YouTube DIY guide (2 hours)",
      ],
    },
    {
      title: "Switch to 100% Renewable Energy Plan",
      icon: "⚡",
      description: "Sign up for Kahramaa's Green Tariff program—a one-time enrollment that sources your electricity from Qatar's solar farms. Immediate impact with zero behavior change required after signup.",
      impact: {
        co2Reduction: "3,200 kg CO2/year",
        percentage: "100% of home electricity emissions",
        financialSaving: "Comparable pricing to standard tariff",
      },
      islamicConnection: {
        concept: "Choosing the Better Path",
        explanation: "When given a choice between harm and benefit, Islam guides us toward benefit",
      },
      steps: [
        "Visit kahramaa.qa/green-tariff and complete online enrollment form (10 minutes)",
        "Receive confirmation email within 3 business days—switch takes effect next billing cycle",
      ],
    },
    {
      title: "Book AC Maintenance Service This Month",
      icon: "❄️",
      description: "Schedule professional AC cleaning and filter replacement. Dirty AC units use 30% more energy in Qatar's dust climate. This completable service has immediate measurable impact.",
      impact: {
        co2Reduction: "340 kg CO2/year",
        percentage: "30% improvement in AC efficiency",
        financialSaving: "Saves QAR 820/year on electricity",
      },
      islamicConnection: {
        concept: "Maintaining What We Own (Ihsan)",
        explanation: "Excellence includes properly maintaining the resources Allah has provided",
      },
      steps: [
        "Call AC service company (Hitachi Service: +974 4432-2323) to schedule deep cleaning by [date]",
        "Keep service receipt and schedule next maintenance in 6 months for continued efficiency",
      ],
    },
    {
      title: "Purchase Reusable Shopping Bags & Containers Set",
      icon: "♻️",
      description: "One-time purchase of 10 reusable bags and 5 food containers to eliminate single-use plastic. Average Qatari household uses 400 plastic bags yearly. This is a concrete completable action.",
      impact: {
        co2Reduction: "85 kg CO2/year",
        percentage: "100% elimination of shopping bag emissions",
        financialSaving: "Saves QAR 200/year on bags + reduces waste",
      },
      islamicConnection: {
        concept: "Protecting Creation (Hifz)",
        explanation: "Preventing ocean plastic pollution protects the creatures Allah created",
      },
      steps: [
        "Purchase 10 reusable bags + 5 containers (QAR 120 total from Carrefour sustainability section)",
        "Place 5 bags in car trunk and 2 in each home entrance—mark purchase date as completion",
      ],
    },
    {
      title: "Enroll in Doha Metro Annual Pass This Week",
      icon: "🚇",
      description: "Purchase 1-year Metro Gold Card for unlimited travel. One-time signup commitment to reduce car dependency. The action is enrolling and getting the card, making it completable.",
      impact: {
        co2Reduction: "540 kg CO2/year potential",
        percentage: "Up to 40% commute emission reduction",
        financialSaving: "Saves QAR 2,880/year vs driving",
      },
      islamicConnection: {
        concept: "Community & Shared Resources",
        explanation: "Using public transportation embodies the Islamic principle of shared resources",
      },
      steps: [
        "Visit any Metro station (closest: [your area]) and purchase annual Gold Card (QAR 3,600)",
        "Download Doha Metro app and save your common routes—card active immediately upon purchase",
      ],
    },
    {
      title: "Plant 10 Native Trees Through Qatar Regreening",
      icon: "🌳",
      description: "Make a one-time sponsorship to plant 10 native Ghaf or Sidr trees through Qatar's National Regreening program. Each tree absorbs 20 kg CO2/year for 40+ years. Concrete, completable climate action.",
      impact: {
        co2Reduction: "200 kg CO2/year for 40+ years",
        percentage: "Direct carbon sequestration",
        financialSaving: "Tax-deductible charitable donation",
      },
      islamicConnection: {
        concept: "Continuous Charity (Sadaqah Jariyah)",
        explanation: "The Prophet ﷺ said planting trees is among the best ongoing charities",
      },
      steps: [
        "Visit qatarregreening.org and sponsor 10 trees (QAR 500 total) with GPS location tracking",
        "Receive certificate with tree locations and GPS coordinates within 30 days of planting",
      ],
    },
  ]

  const getRandomAlternativeAction = () => {
    const randomIndex = Math.floor(Math.random() * alternativeActions.length)
    return alternativeActions[randomIndex]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-awaken-yellow rounded-lg flex items-center justify-center">
              <span className="text-awaken-black font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Stage 3 - Your Action Plan</h2>
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
        <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-awaken-black mb-3">Stage 3 - Your Action Plan</h1>
          <p className="text-base md:text-lg text-gray-600">Personalized climate solutions for your lifestyle</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-yellow-50 border-2 border-awaken-yellow rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-awaken-black mb-2">
              {Math.round(getCurrentCO2Reduction())}/{Math.round(getTotalPotentialCO2())} <span className="text-xl md:text-2xl">kg</span>
            </div>
            <div className="text-sm text-gray-700 font-medium">CO₂ Reduction So Far</div>
          </div>
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">{getCompletedCount()}</div>
            <div className="text-sm text-gray-700 font-medium">Actions Completed</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">{getInProgressCount()}</div>
            <div className="text-sm text-gray-700 font-medium">In Progress</div>
          </div>
        </div>

        {/* Progress Overview */}
        {(getCompletedCount() > 0 || getInProgressCount() > 0) && (
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-300 rounded-xl p-6 mb-8 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Your Progress</h3>
            <div className="space-y-3">
              {getCompletedCount() > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {getCompletedCount()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Actions completed!</p>
                    <p className="text-sm text-gray-600">You're making real impact on climate change</p>
                  </div>
                </div>
              )}
              {getInProgressCount() > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-awaken-yellow rounded-full flex items-center justify-center text-awaken-black text-xl font-bold">
                    {getInProgressCount()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Actions in progress</p>
                    <p className="text-sm text-gray-600">Keep going - every step counts!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {solutions.map((solution, index) => {
            const isExpanded = expandedCard === index
            const status = actionStatus[index]
            return (
              <div
                key={index}
                className={`relative bg-white border-2 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all animate-slide-up ${
                  status === 'completed' ? 'border-green-500 bg-green-50' :
                  status === 'in-progress' ? 'border-awaken-yellow bg-yellow-50' :
                  'border-gray-200 hover:border-awaken-yellow'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Green Overlay for Completed Actions */}
                {status === 'completed' && (
                  <div className="absolute inset-0 bg-green-500 bg-opacity-30 rounded-xl flex items-center justify-center z-10 pointer-events-none">
                    <button
                      onClick={() => replaceCompletedAction(index)}
                      className="pointer-events-auto bg-white border-2 border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold shadow-lg"
                    >
                      🔄 Replace with Another Action
                    </button>
                  </div>
                )}
                {/* Card Header with Status Badge */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-3xl">{solution.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-lg font-bold text-awaken-black">{solution.title}</h2>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                        status === 'completed' ? 'bg-green-200 text-green-800' :
                        status === 'in-progress' ? 'bg-yellow-200 text-yellow-900' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {status === 'completed' ? '✓ Done' :
                         status === 'in-progress' ? '⏳ In Progress' :
                         '○ Not Started'}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-awaken-yellow">
                      {solution.impact.co2Reduction} reduction
                    </p>
                  </div>
                </div>

                {/* Islamic Connection - Always Visible */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <div className="text-xs font-semibold text-amber-900 mb-1">
                    🕌 {solution.islamicConnection.concept}
                  </div>
                  <div className="text-xs text-amber-800 leading-relaxed">{solution.islamicConnection.explanation}</div>
                </div>

                {/* Next Steps - Always Visible */}
                <div className="mb-4">
                  <div className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">Next Steps:</div>
                  <ul className="space-y-2">
                    {solution.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-xs text-gray-700 flex items-start gap-2">
                        <span className="text-awaken-yellow font-bold mt-0.5 flex-shrink-0">→</span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Section */}
                {isExpanded && (
                  <div className="border-t border-gray-200 pt-4 mt-4 animate-fade-in">
                    {/* Why Recommended */}
                    <div className="mb-4">
                      <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Why Recommended for You:</div>
                      <p className="text-sm text-gray-600 leading-relaxed">{solution.description}</p>
                    </div>

                    {/* Impact Metrics */}
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">Impact & Benefits:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="bg-yellow-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-600 mb-1">CO₂ Reduction</div>
                          <div className="font-bold text-sm text-awaken-black">{solution.impact.co2Reduction}</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-600 mb-1">% Impact</div>
                          <div className="font-bold text-sm text-awaken-black">{solution.impact.percentage}</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-600 mb-1">Savings</div>
                          <div className="font-bold text-sm text-awaken-black">{solution.impact.financialSaving}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={() => updateStatus(index, 'in-progress')}
                    disabled={status === 'completed'}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      status === 'in-progress'
                        ? 'bg-awaken-yellow text-awaken-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {status === 'in-progress' ? '⏳ Working on it' : 'Start Action'}
                  </button>
                  <button
                    onClick={() => updateStatus(index, 'completed')}
                    disabled={status === 'completed'}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                    } disabled:cursor-not-allowed`}
                  >
                    {status === 'completed' ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>

                {/* Toggle Details Button */}
                <button
                  onClick={() => toggleCard(index)}
                  className="w-full mt-2 py-2 text-xs font-medium text-gray-600 hover:text-awaken-black border border-gray-200 rounded-lg hover:border-awaken-yellow transition-colors"
                >
                  {isExpanded ? '▲ Hide details' : '▼ Why this matters'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Quran Quote - More Prominent */}
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-10 text-center mb-8 shadow-lg border-2 border-green-400">
          <div className="text-5xl mb-4">📖</div>
          <p className="text-2xl font-semibold mb-4 leading-relaxed max-w-3xl mx-auto text-gray-900">
            "Indeed, Allah will not change the condition of a people until they change what is in themselves."
          </p>
          <p className="text-base font-bold text-gray-800">— Quran 13:11</p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={() => window.print()}
            className="bg-white border-2 border-awaken-yellow text-awaken-black px-8 py-3 rounded-lg hover:bg-yellow-50 transition-colors font-bold"
          >
            📄 Print Action Plan
          </button>
        </div>
        </div>
      </div>

      {/* Suggestion Modal */}
      {showSuggestion && suggestedAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl animate-slide-up">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{suggestedAction.icon}</div>
              <h2 className="text-2xl font-bold text-awaken-black mb-2">Great Progress!</h2>
              <p className="text-gray-600">Since you completed an action, here's another way to increase your impact:</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-awaken-yellow rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-awaken-black mb-3">{suggestedAction.title}</h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{suggestedAction.description}</p>

              {/* Islamic Connection */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3 mb-4">
                <div className="text-xs font-semibold text-amber-900 mb-1">
                  🕌 {suggestedAction.islamicConnection.concept}
                </div>
                <div className="text-xs text-amber-800 leading-relaxed">{suggestedAction.islamicConnection.explanation}</div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">CO₂ Reduction</div>
                  <div className="font-bold text-sm text-awaken-black">{suggestedAction.impact.co2Reduction}</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">% Impact</div>
                  <div className="font-bold text-sm text-awaken-black">{suggestedAction.impact.percentage}</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">Savings</div>
                  <div className="font-bold text-sm text-awaken-black">{suggestedAction.impact.financialSaving}</div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mb-4">
                <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Next Steps:</div>
                <ul className="space-y-2">
                  {suggestedAction.steps.map((step: string, stepIndex: number) => (
                    <li key={stepIndex} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-awaken-yellow font-bold mt-0.5 flex-shrink-0">→</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptSuggestion}
                className="flex-1 bg-awaken-yellow text-awaken-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-bold"
              >
                ✓ Add to My Plan
              </button>
              <button
                onClick={rejectSuggestion}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                ↻ Show Another
              </button>
              <button
                onClick={dismissSuggestion}
                className="sm:flex-none bg-white border-2 border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
