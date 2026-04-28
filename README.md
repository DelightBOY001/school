# School Website - Next.js + LocalStorage

A modern school website built with Next.js, Tailwind CSS, and localStorage for data persistence. **No database setup required!**

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Vercel Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/school-website.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. **Build Settings:**
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Click **Deploy**

**No environment variables needed!** Everything works with localStorage.

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
- **LocalStorage** - Data persistence (no database needed)
- **Lucide React** - Icons
- **Framer Motion** - Animations

---

## 🐛 Troubleshooting

### Admin Panel Changes Not Saving?

1. **Check Browser Console:**
   - Open browser console (F12)
   - Look for error messages

2. **Clear Browser Cache:**
   - Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or clear browser cache manually

3. **LocalStorage Limit:**
   - localStorage has ~5MB limit
   - If you have many large images, it might fill up
   - Clear site data if needed

### Data Persistence:

- **Note:** Data is stored in browser localStorage
- Changes are **per-browser** (not shared between different devices)
- For multi-device sync, you would need a backend database

---

## 📝 License

MIT
