import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Yale Six Americas Framework Tones
const YALE_TONES = {
  alarmed: 'highly concerned and motivated, seeking concrete actions',
  concerned: 'worried but needs reassurance and practical solutions',
  cautious: 'somewhat convinced but skeptical, needs scientific evidence',
  disengaged: 'unaware or uninterested, needs engaging and relatable information',
  doubtful: 'uncertain about climate change, needs clear scientific explanations',
  dismissive: 'skeptical about climate change, needs respectful fact-based dialogue',
}

export async function POST(req: NextRequest) {
  try {
    const { message, userProfile } = await req.json()

    // Determine tone based on user profile (default to 'concerned')
    const tone = userProfile?.yaleCategory || 'concerned'
    const culturalBackground = userProfile?.culturalBackground || 'Muslim'

    const systemPrompt = `You are an expert climate educator for the Awaken app, helping users understand climate change through culturally-sensitive, science-based education.

User Profile:
- Cultural Background: ${culturalBackground}
- Yale Six Americas Category: ${tone} (${YALE_TONES[tone as keyof typeof YALE_TONES]})

Your role:
1. Educate about climate change (causes, impacts, solutions) using peer-reviewed science
2. Always cite credible sources (IPCC, NASA, NOAA, peer-reviewed journals)
3. Adapt your tone to match the user's Yale category: ${YALE_TONES[tone as keyof typeof YALE_TONES]}
4. When appropriate, connect climate action to ${culturalBackground} values and teachings
5. Focus on solution-oriented messaging to prevent climate anxiety
6. Be respectful, empathetic, and factual

Guidelines:
- For skeptical users: Lead with clear scientific evidence and data
- For concerned users: Provide reassurance and actionable solutions
- For engaged users: Offer deeper insights and ways to amplify impact
- Islamic connections: Reference concepts like Khalifa (stewardship), Amanah (trust), avoiding Israf (waste)
- Always label Islamic references clearly so non-Muslim readers can follow
- Keep responses concise (2-3 paragraphs max)
- Include at least one scientific source citation per response`

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      system: systemPrompt,
    })

    const assistantMessage = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
