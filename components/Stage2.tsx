'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type SurveyAnswers = {
  importance?: string
  concern?: string
  personalImpact?: string
  futureImpact?: string
}

export default function Stage2({ onContinue, currentStage }: { onContinue: () => void; currentStage: number }) {
  const [surveyState, setSurveyState] = useState<'intro' | 'questions' | 'completed'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({})
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! Climate change is a big topic, but we'll take it step by step.\n\nQuick question to start: Do you think climate change is real?",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const [demoMode, setDemoMode] = useState(false) // Toggle for demo mode
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (force = false) => {
    const chatContainer = messagesEndRef.current?.parentElement
    if (chatContainer) {
      if (force) {
        // Force scroll (when user sends a message)
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Only auto-scroll if user is already near the bottom (within 100px)
        const isNearBottom = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 100
        if (isNearBottom) {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  useEffect(() => {
    // Delay scroll slightly to let message render first
    const timer = setTimeout(() => {
      scrollToBottom(shouldAutoScroll)
      if (shouldAutoScroll) setShouldAutoScroll(false) // Reset after forced scroll
    }, 100)
    return () => clearTimeout(timer)
  }, [messages])

  // Map survey answers to Yale Six Americas categories
  const determineYaleCategory = (): string => {
    const { importance, concern, personalImpact, futureImpact } = surveyAnswers

    // If survey not completed, default to 'concerned'
    if (!importance && !concern) return 'concerned'

    // Alarmed: Extremely significant + Extremely concerned
    if ((importance === 'Extremely significant' || concern === 'Extremely concerned') &&
        futureImpact === 'Severely impacted') {
      return 'alarmed'
    }

    // Concerned: Very/Moderately significant + concerned
    if ((importance === 'Very significant' || importance === 'Moderately significant') ||
        (concern === 'Very concerned' || concern === 'Somewhat concerned')) {
      return 'concerned'
    }

    // Cautious: Moderately significant but not very concerned
    if (importance === 'Moderately significant' && concern !== 'Very concerned') {
      return 'cautious'
    }

    // Disengaged: Low significance + low concern
    if ((importance === 'Slightly significant' || importance === 'Not at all significant') &&
        concern === 'Not very concerned') {
      return 'disengaged'
    }

    // Doubtful: Uncertain or mixed signals
    if (personalImpact === 'Not sure' || importance === 'Slightly significant') {
      return 'doubtful'
    }

    // Dismissive: Not significant + not concerned
    if (importance === 'Not at all significant' && concern === 'Not concerned at all') {
      return 'dismissive'
    }

    // Default
    return 'concerned'
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setShouldAutoScroll(true) // Force scroll when user sends message
    const newMessages: Message[] = [...messages, { role: 'user' as const, content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: newMessages, // Send full conversation for context
          userProfile: {
            culturalBackground: 'Muslim',
            yaleCategory: determineYaleCategory(), // Based on survey responses
          },
          footprintData: {
            // From Stage 1 - TODO: pass this as prop from parent
            transport: 450,
            transportPercent: 35,
            food: 360,
            foodPercent: 28,
            energy: 280,
            energyPercent: 22,
            goods: 190,
            goodsPercent: 15,
            total: 1280
          },
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setMessages((prev) => [...prev, { role: 'assistant' as const, content: data.message }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: 'I apologize, but I encountered an error. Please make sure you have set up your ANTHROPIC_API_KEY in the .env.local file.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Convert markdown-style formatting to HTML
  const formatMessage = (text: string) => {
    // Convert **bold** to <strong>bold</strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Convert bullet points • to proper list items
    formatted = formatted.replace(/^• (.+)$/gm, '<div class="ml-4">• $1</div>')
    // Preserve line breaks
    formatted = formatted.replace(/\n/g, '<br />')
    return formatted
  }

  const surveyQuestions = [
    {
      id: 'importance',
      question: 'How significant is climate change as an issue to you?',
      options: ['Extremely significant', 'Very significant', 'Moderately significant', 'Slightly significant', 'Not at all significant']
    },
    {
      id: 'concern',
      question: 'How concerned are you about the effects of climate change?',
      options: ['Extremely concerned', 'Very concerned', 'Somewhat concerned', 'Not very concerned', 'Not concerned at all']
    },
    {
      id: 'personalImpact',
      question: 'To what extent do you think climate change will affect you?',
      options: ['A great deal', 'A moderate amount', 'A little', 'Not at all', 'Not sure']
    },
    {
      id: 'futureImpact',
      question: 'How much do you think future generations will be impacted by climate change?',
      options: ['Severely impacted', 'Significantly impacted', 'Moderately impacted', 'Minimally impacted', 'Not impacted']
    }
  ]

  const handleBeginSurvey = () => {
    setSurveyState('questions')
  }

  const handleNextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setSurveyState('completed')
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const currentQuestionData = surveyQuestions[currentQuestion]
  const currentAnswer = currentQuestionData ? surveyAnswers[currentQuestionData.id as keyof SurveyAnswers] : undefined

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-awaken-yellow rounded-lg flex items-center justify-center">
              <span className="text-awaken-black font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Stage 2 - AI-Powered Climate Education</h2>
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
        <div className="max-w-4xl mx-auto">
        {surveyState === 'intro' && (
          /* Survey Intro Screen */
          <div className="max-w-2xl mx-auto mt-20 animate-fade-in">
            <div className="card text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Quick Climate Perception Survey</h1>
              <p className="text-gray-600 mb-6">Help us personalize your climate education experience</p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
                <p className="text-sm text-gray-700 leading-relaxed">
                  This brief survey is based on research from the <strong>Yale Program on Climate Change Communication</strong>.
                  Your responses help us tailor content to your perspective and concerns, making your learning experience
                  more relevant and impactful.
                </p>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  <span>4 questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  <span>Less than 2 minutes</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <button onClick={handleBeginSurvey} className="btn-primary text-lg px-12 py-4">
                  Begin Survey
                </button>
                <button
                  onClick={() => setSurveyState('completed')}
                  className="text-gray-600 hover:text-awaken-black text-sm font-medium underline transition-colors"
                >
                  Skip Survey
                </button>
              </div>
            </div>
          </div>
        )}

        {surveyState === 'questions' && (
          /* One Question at a Time */
          <div className="max-w-2xl mx-auto mt-20 animate-fade-in">
            <div className="card">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">Question {currentQuestion + 1} of {surveyQuestions.length}</span>
                  <div className="flex gap-1">
                    {surveyQuestions.map((_, idx) => (
                      <div key={idx} className={`h-2 w-8 rounded-full ${idx <= currentQuestion ? 'bg-awaken-yellow' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestionData.question}</h2>
              </div>

              <div className="space-y-3 mb-8">
                {currentQuestionData.options.map((option) => (
                  <label key={option} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-yellow-50 cursor-pointer transition-all" style={{ borderColor: surveyAnswers[currentQuestionData.id as keyof SurveyAnswers] === option ? '#FED64B' : '#E5E7EB' }}>
                    <input
                      type="radio"
                      name={currentQuestionData.id}
                      value={option}
                      checked={surveyAnswers[currentQuestionData.id as keyof SurveyAnswers] === option}
                      onChange={(e) => setSurveyAnswers({...surveyAnswers, [currentQuestionData.id]: e.target.value})}
                      className="w-5 h-5 text-awaken-yellow focus:ring-awaken-yellow"
                    />
                    <span className="text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={!currentAnswer}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === surveyQuestions.length - 1 ? 'Complete Survey' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {surveyState === 'completed' && (
          <>
            {/* Header - Show after survey */}
            <div className="text-center mb-8 animate-fade-in px-4">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Stage 2 - AI-Powered Climate Education</h1>
              <p className="text-base md:text-lg text-gray-600">Building climate literacy through LLM-powered education</p>
            </div>

            {/* How It Works Box */}
            <div className="bg-yellow-50 border border-amber-400 rounded-lg p-4 mb-8 animate-fade-in">
              <p className="text-sm text-gray-900">
                <strong>How it works:</strong> This AI chatbot uses peer-reviewed scientific sources to answer your questions
                about climate change. It adapts its responses based on the Yale Six Americas framework and integrates
                Islamic perspectives when relevant.
              </p>
            </div>

            {/* Chat Container */}
            <div className="card mb-6 h-[500px] flex flex-col animate-slide-up">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === 'user'
                      ? 'bg-awaken-yellow text-awaken-black font-medium'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about climate change..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-awaken-yellow"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

            {/* Social Tipping Point Box */}
            <div className="bg-yellow-50 border border-amber-400 rounded-lg p-4 mb-8 animate-fade-in">
              <p className="text-sm text-gray-900">
                <strong>💡 Social Tipping Point #5:</strong> Once climate education becomes accessible to everyone, societal change becomes inevitable.
              </p>
            </div>

            {/* Continue Button */}
            <div className="text-center mt-8">
              <button onClick={onContinue} className="btn-primary text-lg px-8 py-4">
                Continue to Action Plan →
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  )
}
