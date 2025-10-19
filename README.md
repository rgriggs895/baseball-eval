# Midland Baseball TN - Player Evaluation System

A comprehensive baseball player evaluation application built for tryouts and player assessments. Features a modern, mobile-responsive interface with Midland Baseball TN branding.

## Features

### Evaluation System
- **12 Evaluation Categories** with 1-5 scoring system:
  - Outfield: Fundamentals, Arm Strength
  - Infield: Fundamentals, Arm Strength
  - Hitting: Fundamentals, Power
  - Pitching: Fundamentals, Velocity, Command
  - Catching: Fundamentals, Arm Strength, Blocking

### Player Information
- Player Number (required)
- Age Group (required)
- Primary Position
- Secondary Position

### Notes System
- Type text notes
- Delete individual notes
- All notes saved with player evaluation

### Functionality
- **Save**: Store evaluations to Supabase database
- **Clear**: Reset all form fields
- **View Data**: Export evaluation as PDF in landscape format
- **Auto-calculation**: Total points calculated automatically (max 60 points)

### Design
- Midland Baseball TN branding
- Navy (#0A2342), Gold (#D4AF37), and White colors
- Fully responsive design (mobile, tablet, desktop)
- Baseball-themed interface

## Tech Stack

- **Frontend Framework**: Next.js 15 with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **PDF Generation**: jsPDF

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to the SQL Editor in your Supabase dashboard
4. Run the SQL from `supabase-schema.sql` file to create the database table
5. Get your API credentials from Project Settings > API

### 3. Configure Environment Variables

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Detailed Setup Guide

See [SETUP.md](./SETUP.md) for comprehensive setup instructions including:
- Step-by-step Supabase configuration
- Deployment instructions
- Troubleshooting guide
- Mobile usage tips

## Usage

### Evaluating a Player

1. **Enter Player Info**: Fill in Player Number and Age Group (required)
2. **Rate Skills**: Click checkboxes to rate each skill category from 1-5
3. **Add Notes**: Type notes about the player
4. **Review Total**: Check the auto-calculated total points (out of 60)
5. **Save**: Click Save to store evaluation in database
6. **Clear**: Start fresh evaluation for next player

### Exporting Data

Click "View Data" to generate a PDF report containing:
- Player information
- All evaluation scores
- Notes
- Total points
- Timestamp

PDF is generated in landscape format for easy printing and sharing.

## Project Structure

```
baseball-eval/
├── app/
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── EvaluationForm.tsx    # Main form component
│   ├── Rating.tsx            # Rating checkbox component
│   └── VoiceNotes.tsx        # Notes component
├── lib/
│   └── supabase.ts           # Supabase client configuration
├── types/
│   └── evaluation.ts         # TypeScript type definitions
├── .env.local                # Environment variables
├── supabase-schema.sql       # Database schema
└── SETUP.md                  # Detailed setup guide
```

## Database Schema

The application uses a single `player_evaluations` table with:
- Player information fields
- 12 evaluation score fields (1-5 ratings)
- Total points
- Notes array
- Timestamps

See `supabase-schema.sql` for complete schema.

## Browser Compatibility

### Desktop
- Chrome/Edge (recommended)
- Firefox
- Safari

### Mobile
- iOS Safari
- Chrome Mobile
- Samsung Internet

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Customization

#### Colors
Update colors in `app/globals.css`:
```css
:root {
  --navy: #0A2342;
  --gold: #D4AF37;
}
```

#### Evaluation Categories
Modify categories in `types/evaluation.ts` and update UI in `components/EvaluationForm.tsx`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting

**Important**: Always set environment variables on your hosting platform.

## Troubleshooting

### Database Errors
- Verify Supabase credentials in `.env.local`
- Confirm database table was created with `supabase-schema.sql`
- Check browser console for error details
- Verify Row Level Security policies in Supabase

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors
- Verify environment variables are set

## Security Notes

- Environment variables with `NEXT_PUBLIC_` prefix are exposed to the browser
- Use Supabase Row Level Security (RLS) policies for data protection
- The provided schema includes a basic RLS policy allowing all operations
- Customize security policies based on your needs in the Supabase dashboard

---

Built with ⚾ for Midland Baseball TN
