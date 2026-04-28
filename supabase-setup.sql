-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site Config Table
CREATE TABLE IF NOT EXISTS site_config (
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
CREATE TABLE IF NOT EXISTS teachers (
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
CREATE TABLE IF NOT EXISTS principal (
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
CREATE TABLE IF NOT EXISTS inquiries (
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
CREATE TABLE IF NOT EXISTS admission_inquiries (
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
CREATE TABLE IF NOT EXISTS news (
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
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  role TEXT,
  photo TEXT,
  content TEXT,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Photos Table
CREATE TABLE IF NOT EXISTS photos (
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

-- Insert default site config
INSERT INTO site_config (id, school_name, tagline, hero_video_url, hero_video_poster, hero_badge, hero_title, hero_subtitle, address, phone, email, map_embed_url, about_text, about_image, mission, vision, values, student_count, courses_count, success_rate, years_experience)
VALUES (
  'main',
  'Excellence Academy',
  'Shaping Future Leaders',
  'https://assets.mixkit.co/videos/preview/mixkit-students-walking-through-a-university-campus-4807-large.mp4',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop',
  'Admissions Open 2024-25',
  'Shaping Future Leaders',
  'Through Excellence in Education',
  '123 Education Lane, Knowledge City',
  '+1 (234) 567-890',
  'info@excellenceacademy.edu',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986652089301!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1703000000000!5m2!1sen!2s',
  'Excellence Academy has been a beacon of quality education since 1995.',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
  'To provide world-class education that nurtures critical thinking.',
  'To be the leading educational institution shaping future leaders.',
  'Excellence • Integrity • Innovation',
  '2,500+',
  '150+',
  '98%',
  '29+'
) ON CONFLICT (id) DO NOTHING;

-- Insert default principal
INSERT INTO principal (id, name, photo, message, qualification, experience, email, phone, social_links)
VALUES (
  'main',
  'Dr. Sarah Johnson',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  'Welcome to Excellence Academy! We are dedicated to nurturing young minds.',
  'Ph.D. in Education, Harvard University',
  '25+ years in educational leadership',
  'principal@excellenceacademy.edu',
  '+1 (234) 567-891',
  '[{"platform": "LinkedIn", "url": "#"}, {"platform": "Twitter", "url": "#"}]'
) ON CONFLICT (id) DO NOTHING;
