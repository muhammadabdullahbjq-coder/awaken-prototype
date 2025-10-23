# Quick Start Guide

## Get Your Anthropic API Key

1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys" section
4. Create a new API key
5. Copy the key (you'll need it in the next step)

## Setup (3 steps)

1. **Create environment file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your API key:**
   Open `.env.local` and replace `your_api_key_here` with your actual Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxx
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Go to http://localhost:3000

## Demo Flow for Video Recording

**Total time: 30 seconds**

1. **Seconds 0-5:** Loading animation shows ML detecting "Muslim" profile
2. **Seconds 5-15:** Scroll through Stage 1 (carbon footprint, impacts, nudges)
3. **Seconds 15-25:** Stage 2 - Ask chatbot: "How does Islam view environmental stewardship?"
4. **Seconds 25-30:** Stage 3 - Show personalized action plan

## Tips for Best Demo

- Use Chrome or Safari for best experience
- Record in 1080p or higher
- Zoom browser to 90-100% for optimal view
- Click "Restart Demo" button (bottom right) to restart flow
- For Stage 2, type the question beforehand to save time

## Troubleshooting

**Chatbot not working?**
- Check that your `.env.local` file exists and has a valid API key
- Restart the dev server after adding the API key

**Styles not loading?**
- Clear browser cache
- Run `npm run build` to check for errors

**Port already in use?**
- Stop other Next.js apps
- Or use a different port: `npm run dev -- -p 3001`
