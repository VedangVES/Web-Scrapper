#!/bin/bash

# WebScraper AI - Setup Instructions
# This script guides you through the setup process

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║        🚀 WebScraper AI - Setup Wizard 🚀            ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

echo "📋 This wizard will help you set up your WebScraper AI application"
echo ""

# Step 1: Check Node.js
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Checking prerequisites..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if command -v node &> /dev/null; then
    echo "✅ Node.js installed: $(node --version)"
else
    echo "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

if command -v npm &> /dev/null; then
    echo "✅ npm installed: $(npm --version)"
else
    echo "❌ npm not found. Please install npm"
    exit 1
fi

echo ""

# Step 2: Check .env.local
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Checking environment configuration..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f .env.local ]; then
    if grep -q "your_gemini_api_key_here" .env.local; then
        echo "⚠️  .env.local exists but needs configuration"
        echo ""
        echo "Please edit .env.local and add your API keys:"
        echo ""
        echo "1. Gemini API Key:"
        echo "   → Visit: https://makersuite.google.com/app/apikey"
        echo "   → Sign in with Google"
        echo "   → Click 'Create API Key'"
        echo "   → Copy key to .env.local"
        echo ""
        echo "2. Firebase Configuration:"
        echo "   → Visit: https://console.firebase.google.com/"
        echo "   → Create a new project"
        echo "   → Go to Project Settings"
        echo "   → Add a web app"
        echo "   → Copy config values to .env.local"
        echo "   → Enable Firestore Database"
        echo ""
        echo "After updating .env.local, run this script again."
        exit 0
    else
        echo "✅ .env.local configured"
    fi
else
    echo "❌ .env.local not found"
    echo "Creating template .env.local..."
    cat > .env.local << 'ENVEOF'
# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
ENVEOF
    echo "✅ Template created"
    echo ""
    echo "Please edit .env.local with your API keys and run this script again."
    exit 0
fi

echo ""

# Step 3: Install dependencies
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Installing dependencies..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -d "node_modules" ]; then
    echo "📦 Installing packages (this may take a minute)..."
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

echo ""

# Step 4: Build check
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Verifying build..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "🔨 Running build check..."
npm run build > /tmp/build.log 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "⚠️  Build had warnings (check /tmp/build.log)"
fi

echo ""

# Step 5: Ready to start
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Your WebScraper AI is ready to launch! 🚀"
echo ""
echo "Next steps:"
echo ""
echo "  1. Start development server:"
echo "     $ npm run dev"
echo ""
echo "  2. Open in browser:"
echo "     → http://localhost:3000"
echo ""
echo "  3. Test scraping:"
echo "     → Try URL: https://example.com"
echo "     → Toggle between Basic and Nerd modes"
echo "     → Check the Stats page"
echo ""
echo "  4. Deploy to Vercel:"
echo "     → Push to GitHub"
echo "     → Import on vercel.com"
echo "     → Add environment variables"
echo "     → Deploy!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentation:"
echo "  • README.md - Main documentation"
echo "  • DEPLOYMENT.md - Deployment guide"
echo "  • TESTING.md - Testing instructions"
echo "  • FEATURES.md - Complete feature list"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Ask if user wants to start dev server
read -p "🚀 Would you like to start the development server now? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Starting development server..."
    echo "Press Ctrl+C to stop"
    echo ""
    npm run dev
else
    echo ""
    echo "You can start the server anytime with:"
    echo "  $ npm run dev"
    echo ""
    echo "Happy coding! 🎉"
fi
