# Getting Started with Your Baseball Evaluation App

## What's Been Built

A complete, production-ready baseball player evaluation system with:

✅ Player information capture (Number, Age Group, Positions)
✅ 12 evaluation categories with 1-5 scoring system
✅ Text notes functionality
✅ Auto-calculating total points (max 60)
✅ Save to Supabase database
✅ Clear form functionality
✅ PDF export in landscape format
✅ Midland Baseball TN branding (Navy, Gold, White)
✅ Fully responsive mobile design
✅ TypeScript + Next.js 15 + Tailwind CSS

## Next Steps to Launch

### 1. Set Up Your Supabase Database (5 minutes)

1. Go to https://supabase.com and create a free account
2. Click "New Project" and create a project
3. Once created, go to the **SQL Editor** (left sidebar)
4. Open the `supabase-schema.sql` file in this project
5. Copy all the SQL code and paste it into the SQL Editor
6. Click "Run" to create your database table

### 2. Get Your API Credentials (2 minutes)

1. In Supabase, click the **Settings** (gear icon)
2. Click **API** in the left sidebar
3. You'll see two important values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public key** (long string starting with "eyJ...")
4. Copy both values

### 3. Update Your Environment File (1 minute)

1. Open the `.env.local` file in this project
2. Replace these lines with your actual values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```

### 4. Run the Application (1 minute)

Open your terminal in the project directory and run:

```bash
# If you haven't installed dependencies yet
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000 in your browser!

## Testing the App

1. **Enter Player Info**: Try adding a player number like "12" and age group "14U"
2. **Rate Skills**: Click the checkboxes to give ratings (1-5) for different skills
3. **Add Notes**: Type notes about the player
4. **Check Total**: Watch the total points calculate automatically
5. **Save**: Click Save to store in your database
6. **View Data**: Click "View Data" to generate a PDF
7. **Clear**: Click Clear to reset and evaluate another player

## Viewing Your Data in Supabase

1. Go to your Supabase dashboard
2. Click **Table Editor** in the left sidebar
3. Select **player_evaluations** table
4. You'll see all saved evaluations with full details

## Deploy to Production (Optional)

When you're ready to make it live:

### Option 1: Vercel (Easiest - FREE)

1. Create account at https://vercel.com
2. Connect your GitHub repository
3. Add your environment variables in Vercel settings
4. Click Deploy!

### Option 2: Other Platforms

- Netlify
- Railway
- Render
- AWS Amplify

All support Next.js apps - just remember to set your environment variables!

## Mobile Usage

The app works great on mobile devices:
- Pull up on phone or tablet during tryouts
- Touch-friendly interface
- PDF export works on all devices

## Common Questions

**Q: Can multiple people use this at the same time?**
A: Yes! Each person can evaluate different players simultaneously. All data saves to the same database.

**Q: How do I customize the evaluation categories?**
A: Edit `types/evaluation.ts` and `components/EvaluationForm.tsx`. See README for details.

**Q: Can I change the colors?**
A: Yes! Edit `app/globals.css` - the Navy and Gold variables are at the top.

**Q: Is the data secure?**
A: Yes! Supabase provides secure database hosting. You can add authentication and Row Level Security policies for additional protection.

**Q: Can I export all evaluations at once?**
A: Currently, each player exports individually. You can query all data from Supabase and create bulk exports using their dashboard or API.

## Need Help?

- **Setup Issues**: Check SETUP.md for detailed instructions
- **Database Problems**: Verify your .env.local file has correct Supabase credentials
- **PDF Export**: If it fails, check browser console for errors

## File Structure Quick Reference

```
baseball-eval/
├── .env.local              ← UPDATE THIS with your Supabase credentials
├── supabase-schema.sql     ← RUN THIS in Supabase SQL Editor
├── README.md               ← Full documentation
├── SETUP.md                ← Detailed setup guide
└── GETTING_STARTED.md      ← This file
```

## Ready to Go!

You're all set! Follow the 4 steps above and you'll have a working baseball evaluation system in less than 10 minutes.

Good luck with your tryouts! ⚾

---

**Support**: Check README.md and SETUP.md for detailed documentation
