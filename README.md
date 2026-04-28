# School Website - Next.js + Supabase

A modern school website built with Next.js, Tailwind CSS, and Supabase for backend. **Changes sync across all devices!**

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://logqrqbcxfchgzbyxaem.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_j2F5AbV-jzMGP9HhwtPCTg_hoFr4a0T
```

3. **Run development server:**
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Vercel Deployment

### Step 1: Set up Supabase Tables

Go to **SQL Editor** in Supabase Dashboard and run this:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site Config Table
CREATE TABLE site_config (
  id TEXT PRIMARY KEY,
  school_name TEXT,
  tagline TEXT,
  logo TEXT,
  hero_video_url TEXT,
  hero_video_poster TEXT,
  hero_badge TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  map_embed_url TEXT,
  about_text TEXT,
  about_image TEXT,
  mission TEXT,
  vision TEXT,
  values TEXT,
  student_count TEXT,
  courses_count TEXT,
  success_rate TEXT,
  years_experience TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Teachers Table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subject TEXT,
  qualification TEXT,
  experience TEXT,
  photo TEXT,
  bio TEXT,
  email TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Principal Table
CREATE TABLE principal (
  id TEXT PRIMARY KEY,
  name TEXT,
  photo TEXT,
  message TEXT,
  qualification TEXT,
  experience TEXT,
  email TEXT,
  phone TEXT,
  social_links JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admission Inquiries Table
CREATE TABLE admission_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT,
  parent_name TEXT,
  email TEXT,
  phone TEXT,
  grade_applying TEXT,
  previous_school TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- News Table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  date TEXT,
  category TEXT,
  author TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  role TEXT,
  photo TEXT,
  content TEXT,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Photos Table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT,
  caption TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Disable RLS for easy access
ALTER TABLE site_config DISABLE ROW LEVEL SECURITY;
ALTER TABLE teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE principal DISABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE admission_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE photos DISABLE ROW LEVEL SECURITY;
```

### Step 2: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. **Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://logqrqbcxfchgzbyxaem.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_j2F5AbV-jzMGP9HhwtPCTg_hoFr4a0T
   ```
6. Click **Deploy**

---

## 🔑 Admin Panel

Access the admin panel at `/admin`

**Default Password:** `admin123`

### Features:
- Edit school information
- Manage teachers
- Manage news
- Manage testimonials
- View and manage inquiries
- View and manage admission inquiries

---

## 📦 Project Structure

```
/
├── app/
│   ├── admin/          # Admin panel
│   ├── components/     # Reusable components
│   ├── context/        # React Context for state
│   └── lib/           # Supabase client & functions
├── public/            # Static assets
└── package.json
```

---

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend & Database (multi-device sync)
- **Lucide React** - Icons
- **Framer Motion** - Animations

---

## 🐛 Troubleshooting

### Admin Panel Changes Not Syncing?

1. **Check Environment Variables:**
   - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Vercel
   - Values must start with `NEXT_PUBLIC_` prefix

2. **Check Supabase Tables:**
   - Ensure all tables exist in Supabase
   - Check if RLS is disabled (run the SQL from Step 1)

3. **Check Console Logs:**
   - Open browser console (F12)
   - Look for error messages starting with `❌` or `⚠️`

4. **Refresh the page:**
   - Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

### Data Persistence:

- **Note:** Data is stored in Supabase database
- Changes sync **across all devices**
- Everyone sees the same updates in real-time

---

## 📝 License

MIT
