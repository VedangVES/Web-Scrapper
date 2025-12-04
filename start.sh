#!/bin/bash

echo "🚀 WebScraper AI - Quick Start Script"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << 'EOF'
# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
EOF
    echo "✅ Template .env.local created"
    echo "⚠️  Please edit .env.local with your API keys before running"
    echo ""
    echo "Get Gemini API key: https://makersuite.google.com/app/apikey"
    echo "Setup Firebase: https://console.firebase.google.com/"
    echo ""
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Start the development server
echo "🎉 Starting development server..."
echo "📱 Open http://localhost:3000 in your browser"
echo ""
npm run dev
