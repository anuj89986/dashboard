# Learning Dashboard - Setup Guide

This is a Next-Gen Student Learning Dashboard built with Next.js, Supabase, Framer Motion, and Tailwind CSS.

## Features ✨

- **Dark Mode UI**: Deep backgrounds with subtle glowing gradients
- **Bento Grid Layout**: Dynamic, responsive tile-based design
- **Collapsible Sidebar**: Navigation with active state indicators
- **Animated Components**: Spring physics animations, staggered entrance effects
- **Live Data Integration**: Fetches courses from Supabase
- **Responsive Design**: Desktop, tablet, and mobile optimized
- **Zero Layout Shifts**: GPU-accelerated animations using transform/opacity

## Quick Start

### 1. **Environment Setup**

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then fill in your Supabase credentials (see Supabase setup below).

### 2. **Install Dependencies**

All dependencies are already installed. To verify:

```bash
npm install
```

### 3. **Run Development Server**

```bash
npm run build
npm run dev
```

The dashboard will be available at `http://localhost:3000`

---

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to initialize (a few minutes)

### Step 2: Create the Courses Table

In the Supabase dashboard:

1. Go to **SQL Editor** → **New Query**
2. Run this SQL:

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Step 3: Add Sample Data

Run this in the SQL Editor:

```sql
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Book'),
  ('TypeScript Mastery', 60, 'Code'),
  ('Web Performance', 45, 'Zap'),
  ('Next.js Deep Dive', 90, 'Rocket');
```

### Step 4: Get Your API Keys

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. Restart the dev server:

```bash
npm run dev
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Sidebar
│   ├── page.tsx            # Dashboard page with data fetching
│   └── globals.css         # Dark theme styles
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── HeroTile.tsx        # Welcome greeting tile
│   ├── CourseTile.tsx      # Individual course card
│   ├── ActivityTile.tsx    # Weekly activity chart
│   ├── DashboardGrid.tsx   # Bento grid layout orchestrator
│   └── Skeleton.tsx        # Loading skeletons
└── lib/
    ├── types/
    │   └── index.ts        # TypeScript interfaces
    ├── supabase/
    │   ├── client.ts       # Client-side Supabase setup
    │   └── server.ts       # Server-side Supabase setup
    └── services.ts         # Data fetching logic
```

---

## Customization

### Available Lucide Icons

The `CourseTile` component dynamically renders icons based on the `icon_name` field. Supported icons include:

- `Book`, `Code`, `Zap`, `Rocket`
- `Heart`, `Star`, `Flame`, `Target`
- `Cpu`, `Database`, `GitBranch`, `BarChart3`
- [Full icon list](https://lucide.dev/)

Add more courses with different icons in Supabase!

### Customize Colors

Edit the gradient colors in:

- **HeroTile.tsx**: Change `from-blue-300` / `to-pink-300`
- **CourseTile.tsx**: Modify progress bar colors based on completion %
- **ActivityTile.tsx**: Update chart colors

### Adjust Animation Timing

In any component, modify:

```typescript
transition={{
  duration: 0.6,        // Duration in seconds
  delay: index * 0.1,   // Stagger delay
  type: 'spring',
  stiffness: 300,       // Higher = faster spring
  damping: 20,          // Lower = more bouncy
}}
```

---

## Responsive Breakpoints

The dashboard responds to these breakpoints:

- **Mobile** (`< 768px`): Bottom navigation, single-column grid
- **Tablet** (`768px - 1024px`): Collapsed sidebar, 2-column grid
- **Desktop** (`> 1024px`): Full sidebar, 4-column grid

---

## Building for Production

```bash
npm run build
npm run start
```

---

## Troubleshooting

### Issue: "Missing Supabase credentials"

- Ensure `.env.local` has both variables
- Variables must start with `NEXT_PUBLIC_` to be accessible in browser
- Restart dev server after changes

### Issue: Animations not smooth

- Ensure GPU acceleration is enabled in your browser
- Use `transform` and `opacity` only (not `width`, `height`, `top`, etc.)
- Check DevTools Performance tab

### Issue: Icons not rendering

- Verify `icon_name` matches Lucide icon names exactly
- Icon names are case-sensitive (e.g., `BookOpen` not `bookopen`)
- Missing icons fall back to `BookOpen` icon

---

## Performance Tips

1. **Lazy Load Data**: Use `Suspense` boundaries for above-fold content
2. **Optimize Images**: Store course icons as SVGs
3. **Cache Frequently**: Use Supabase realtime subscriptions for live updates
4. **Monitor Network**: Check DevTools Network tab for slow Supabase queries

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)

---

## Architecture & Server/Client Notes

- This project uses Next.js App Router and Server Components by default. Pages and data fetching live in server components to minimize client JS.
- Client-only functionality (animations, icons, charts) uses Client Components with the `"use client"` directive; these components hydrate on the client and are lazy-loaded where possible.
- Server-side Supabase is set up in `src/lib/supabase/server.ts`. Client-side interactions (real-time updates) use `src/lib/supabase/client.ts`.

---

## Developer checklist

- Ensure `.env.local` contains:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- When adding interactive UI, add `"use client"` at the top of the component and lazy-load heavy libs.
- Restart dev server after changing environment variables.

---

## Troubleshooting (architecture-specific)

- If you see hydration warnings: verify the component is correctly marked `use client` (if it uses DOM-only APIs) and ensure server-rendered markup is deterministic.
- If icons or framer-motion effects fail server-side: move them to client components and lazy-load.
