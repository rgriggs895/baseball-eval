# Midland Baseball TN - Player Evaluation System

## Setup Instructions

### 1. Supabase Database Setup

#### Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

#### Set Up the Database
1. Once your project is created, go to the SQL Editor in your Supabase dashboard
2. Open the `supabase-schema.sql` file in this project
3. Copy the entire contents of that file
4. Paste it into the SQL Editor in Supabase
5. Click "Run" to create the database table

#### Get Your API Credentials
1. In your Supabase dashboard, go to Project Settings (gear icon)
2. Click on "API" in the left sidebar
3. You'll see:
   - **Project URL** (this is your NEXT_PUBLIC_SUPABASE_URL)
   - **Project API keys** - copy the `anon` `public` key (this is your NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 2. Configure Environment Variables

1. Open the `.env.local` file in the root of the project
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 3. Install Dependencies and Run

```bash
npm install
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Features

### Player Information
- Player Number (required)
- Age Group (required)
- Primary Position
- Secondary Position

### Evaluation Categories (1-5 scoring)
- **Outfield**: Fundamentals, Arm Strength
- **Infield**: Fundamentals, Arm Strength
- **Hitting**: Fundamentals, Power
- **Pitching**: Fundamentals, Velocity, Command
- **Catching**: Fundamentals, Arm Strength, Blocking

### Notes Section
- Type text notes
- Delete individual notes

### Actions
- **Save**: Saves evaluation to Supabase database
- **Clear**: Clears all form fields
- **View Data**: Exports evaluation as PDF in landscape format

### Design
- Midland Baseball TN branding
- Navy (#0A2342), Gold (#D4AF37), and White colors
- Fully responsive - works on mobile, tablet, and desktop
- Baseball-themed interface

## Tech Stack

- **Frontend**: Next.js 15 with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **PDF Generation**: jsPDF

## Mobile Usage

The application is fully responsive and works great on mobile devices:
- Touch-friendly interface
- Optimized layouts for small screens

## Troubleshooting

### Database Save Errors
- Double-check your Supabase credentials in `.env.local`
- Ensure the database table was created using the `supabase-schema.sql` file
- Check the browser console for specific error messages

### PDF Export Issues
- If PDF export fails, check browser console for errors
- Ensure jsPDF is properly installed: `npm install jspdf`

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
5. Deploy!

### Other Hosting Options

The app can be deployed to any hosting platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Just make sure to set the environment variables on your hosting platform.

## Support

For issues or questions, please check:
- Browser console for error messages
- Supabase dashboard for database issues
- Network tab for API call problems
