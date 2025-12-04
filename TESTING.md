# Testing Guide

## Local Testing

### Start Development Server

\`\`\`bash
cd /tmp/web-scraper
npm run dev
\`\`\`

Visit http://localhost:3000

### Test Cases

#### 1. Basic Scrape Test
- **URL**: https://example.com
- **Mode**: Basic Scrape
- **Expected**: Title, description, word count, images, links

#### 2. Nerd Scrape Test (with Gemini API)
- **URL**: https://news.ycombinator.com
- **Mode**: Nerd Scrape
- **Expected**: AI analysis + structured data extraction

#### 3. Error Handling Test
- **Invalid URL**: "not-a-url"
- **Expected**: Error message displayed

#### 4. Stats Page Test
- Navigate to /stats
- **Expected**: Statistics dashboard with recent scrapes

## Production Testing

After deploying to Vercel:

1. **Basic Functionality**
   - Test scraping various websites
   - Verify both Basic and Nerd modes work
   - Check error handling

2. **Stats Page**
   - Toggle between Basic and Nerd stats
   - Verify data persistence in Firebase
   - Check real-time updates

3. **Performance**
   - Test with large websites
   - Verify timeout handling
   - Check loading states

4. **Responsive Design**
   - Test on mobile devices
   - Test on tablets
   - Test on desktop

## API Endpoint Testing

### Using curl

\`\`\`bash
# Test scrape endpoint
curl -X POST http://localhost:3000/api/scrape \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com","mode":"basic"}'

# Test stats endpoint
curl http://localhost:3000/api/stats
\`\`\`

### Using Postman

1. **Scrape Endpoint**
   - Method: POST
   - URL: http://localhost:3000/api/scrape
   - Body (JSON):
   \`\`\`json
   {
     "url": "https://example.com",
     "mode": "basic"
   }
   \`\`\`

2. **Stats Endpoint**
   - Method: GET
   - URL: http://localhost:3000/api/stats

## Checklist

- [ ] Home page loads correctly
- [ ] Mode toggle works (Basic ↔ Nerd)
- [ ] URL input validation works
- [ ] Scraping works for valid URLs
- [ ] Error messages display for invalid URLs
- [ ] Loading states show during scraping
- [ ] Results display correctly
- [ ] Stats page loads
- [ ] Stats mode toggle works
- [ ] Firebase data persists
- [ ] Animations are smooth
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Deployed to Vercel successfully

## Known Limitations

1. **Timeout**: Scraping has 60s timeout
2. **Content Size**: Large pages are truncated
3. **Rate Limits**: No built-in rate limiting (add if needed)
4. **CORS**: Some websites may block scraping
5. **Dynamic Content**: JavaScript-rendered content not captured

## Troubleshooting

### "Failed to scrape website"
- Website may be blocking requests
- Check network connectivity
- Verify URL is accessible

### "AI analysis unavailable"
- Check Gemini API key
- Verify API quota not exceeded
- Check API key permissions

### Firebase errors
- Verify Firebase configuration
- Check Firestore is enabled
- Ensure security rules allow writes

## Performance Benchmarks

Expected performance:
- **Small pages** (<100KB): 2-5 seconds
- **Medium pages** (100KB-500KB): 5-10 seconds
- **Large pages** (>500KB): 10-30 seconds
- **With AI analysis**: +2-5 seconds

## Sample Test URLs

Good for testing:
- https://example.com (simple)
- https://news.ycombinator.com (tech news)
- https://wikipedia.org (complex)
- https://github.com (dynamic)

## Success Criteria

✅ All test cases pass
✅ No errors in console
✅ Build succeeds
✅ Deployed successfully
✅ All features work in production
✅ Performance is acceptable
✅ UI is responsive and polished
