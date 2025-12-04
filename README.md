# WebScraper AI

A powerful full-stack web scraping application with AI-powered analysis using Google's Gemini Flash model.

## Features

- 🚀 **Intelligent Web Scraping** - Scrape any website with advanced content extraction
- 🤖 **AI Analysis** - Powered by Gemini Flash for deep content insights
- 📊 **Dual Modes**:
  - **Basic Scrape** - Quick extraction of title, description, and metadata
  - **Nerd Scrape** - Advanced AI analysis with structured data extraction
- 📈 **Statistics Dashboard** - Comprehensive scraping analytics with Basic/Nerd view modes
- 🔥 **Firebase Integration** - Real-time data storage and retrieval
- ✨ **Beautiful UI** - Smooth animations with Framer Motion and modern design
- 🛡️ **Robust Error Handling** - Graceful error management throughout the app

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **AI**: Google Gemini Flash API
- **Database**: Firebase Firestore
- **Scraping**: Cheerio, Axios
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created
- Gemini API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd web-scraper
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting API Keys

### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your \`.env.local\` file

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to Project Settings > General
4. Scroll to "Your apps" and click the web icon (</>)
5. Copy the configuration values to your \`.env.local\` file
6. Enable Firestore Database in the Firebase Console

## Deployment to Vercel

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Add environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add all variables from your \`.env.local\` file

4. Deploy! Vercel will automatically build and deploy your app

## Usage

### Basic Scrape Mode
- Enter any website URL
- Click "Basic Scrape"
- Get title, description, word count, images, links, and content preview

### Nerd Scrape Mode
- Enter any website URL
- Click "Nerd Scrape"
- Receive AI-powered analysis including:
  - Main topic and purpose
  - Key insights
  - Content quality assessment
  - Structured data extraction (headings, images, links)
  - Sentiment analysis

### Statistics Page
- View comprehensive scraping statistics
- Toggle between Basic and Nerd view modes
- Track success rates, performance metrics, and recent activity

## API Routes

- \`POST /api/scrape\` - Scrape a website
  - Body: \`{ url: string, mode: 'basic' | 'nerd', customPrompt?: string }\`
  
- \`GET /api/stats\` - Get scraping statistics

## Project Structure

\`\`\`
web-scraper/
├── app/
│   ├── api/
│   │   ├── scrape/
│   │   │   └── route.ts       # Scraping endpoint
│   │   └── stats/
│   │       └── route.ts       # Statistics endpoint
│   ├── stats/
│   │   └── page.tsx          # Statistics page
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   ├── firebase.ts           # Firebase configuration
│   └── gemini.ts             # Gemini AI integration
├── types/
│   └── index.ts              # TypeScript types
└── .env.local                # Environment variables
\`\`\`

## Features in Detail

### Error Handling
- URL validation
- Network error handling
- Firebase fallback
- User-friendly error messages
- Graceful degradation

### Performance
- Optimized scraping with timeout limits
- Content size limitations
- Efficient data storage
- Fast page loads with SSR

### UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Loading states
- Interactive mode toggles
- Beautiful gradient backgrounds

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Gemini AI, and Firebase
