# Awaken - Climate Action Prototype

A culturally-adaptive climate action web application for the Sydney Innovation Challenge (SDG-13: Climate Action).

## Overview

Awaken demonstrates how climate action can become a social norm through culturally-sensitive, personalized engagement. The prototype showcases a 3-stage framework:

1. **Stage 1: Nudging** - Data-driven carbon footprint analysis with real-world impact comparisons
2. **Stage 2: Education** - AI-powered chatbot for climate literacy (Yale Six Americas framework)
3. **Stage 3: Action** - Personalized climate action plan with cultural integration

## Features

### 🤖 ML Detection Animation
- Simulates cultural background identification
- Smooth transition to personalized content
- Demonstrates non-intrusive profiling

### 📊 Stage 1: Carbon Footprint Dashboard
- Interactive pie chart visualization
- Real-world impact metrics (health, environment, climate)
- Culturally-adapted nudges with Islamic references
- Comparison to tangible outcomes

### 💬 Stage 2: AI Chatbot
- Real-time climate education powered by Claude AI
- Adapts tone based on Yale Six Americas model
- Scientific source citations (IPCC, NASA, peer-reviewed journals)
- Islamic perspective integration when relevant

### 📄 Stage 3: Action Plan
- Professional A4-style personalized plan
- 3 high-impact solutions tailored to user's footprint
- Impact metrics (CO2 reduction, cost savings)
- Islamic connections clearly labeled
- Printable format

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Anthropic API key (for chatbot functionality)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Add your Anthropic API key to `.env.local`:**
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```
   Get your API key from: https://console.anthropic.com/

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## Demo Recording Guide

For your 30-second video demonstration:

1. **0-5s:** Loading animation showing "Muslim" being detected
2. **5-10s:** Stage 1 - Scroll through carbon footprint chart and nudges
3. **10-20s:** Stage 2 - Show chatbot responding to a climate question
4. **20-30s:** Stage 3 - Display the personalized action plan

### Suggested Chatbot Question for Demo:
- "What are the main causes of climate change?"
- "How does Islam view environmental stewardship?"

## Technology Stack

- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **AI:** Anthropic Claude API
- **Language:** TypeScript

## Key Design Principles

1. **Cultural Sensitivity:** Islamic concepts clearly labeled for universal understanding
2. **Solution-Focused:** Emphasizes action over anxiety
3. **Science-Based:** AI chatbot uses peer-reviewed sources
4. **Accessibility:** Clean UI, smooth animations, intuitive flow

## Research Foundation

- **Behavioral Economics:** Nudge theory (Richard Thaler)
- **Climate Communication:** Yale Six Americas framework
- **Moral Psychology:** Intrinsic motivation through cultural values
- **Positive Tipping Points:** Focuses on the 6 positive climate tipping points

## Project Structure

```
awaken-prototype/
├── app/
│   ├── api/chat/route.ts    # Claude AI chatbot endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main orchestration
├── components/
│   ├── LoadingAnimation.tsx # ML detection simulation
│   ├── Stage1.tsx          # Carbon footprint dashboard
│   ├── Stage2.tsx          # AI chatbot interface
│   └── Stage3.tsx          # Action plan document
└── README.md
```

## Notes for Judges

- The ML detection is simulated for demo purposes
- Chatbot requires valid Anthropic API key to function
- Cultural adaptation framework can extend to any background
- All data shown is sample data for demonstration

## Future Enhancements

- Real spending data integration
- Multi-cultural profiles beyond Islam
- Progress tracking over time
- Community challenges and social features
- Mobile app version

## Contact

For questions about this prototype, please refer to the Sydney Innovation Challenge submission.

---

**Generated for Sydney Innovation Challenge 2025**
*SDG-13: Climate Action*
