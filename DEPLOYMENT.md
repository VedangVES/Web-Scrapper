# WebScraper AI - Deployment Guide

## Quick Deploy to Vercel

### Step 1: Prepare Your Repository
1. Push your code to GitHub:
\`\`\`bash
git init
git add .
git commit -m "Initial commit: WebScraper AI"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

### Step 2: Get API Keys

#### Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Save the key

#### Firebase Setup
1. Go to https://console.firebase.google.com/
2. Create new project
3. Go to Project Settings
4. Add web app and copy config values
5. Enable Firestore Database

### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   
6. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable from your .env.local:
     * GEMINI_API_KEY
     * NEXT_PUBLIC_FIREBASE_API_KEY
     * NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     * NEXT_PUBLIC_FIREBASE_PROJECT_ID
     * NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     * NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     * NEXT_PUBLIC_FIREBASE_APP_ID

7. Click "Deploy"

### Step 4: Verify Deployment

1. Wait for deployment to complete
2. Visit your deployment URL
3. Test scraping functionality
4. Check stats page

## Environment Variables Reference

\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify Firebase configuration
- Check build logs in Vercel dashboard

### Scraping Not Working
- Verify Gemini API key is valid
- Check API route logs
- Ensure target website allows scraping

### Firebase Errors
- Verify Firestore is enabled
- Check Firebase security rules
- Ensure all config values are correct

## Performance Tips

1. **API Route Optimization**: The scrape endpoint has a 60s timeout
2. **Content Limits**: Large pages are automatically truncated
3. **Rate Limiting**: Consider adding rate limiting for production
4. **Caching**: Add Redis or similar for frequent scrapes

## Security Recommendations

1. Add rate limiting
2. Implement API authentication
3. Add CORS policies
4. Monitor usage and costs
5. Set up Firebase security rules

## Post-Deployment

After successful deployment:
1. Set custom domain (optional)
2. Monitor analytics in Vercel
3. Check Firebase usage
4. Test on different devices
5. Share with users!

---

Your app is now live! 🎉
