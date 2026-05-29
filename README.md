# 🎓 Next-Gen Learning Dashboard

A high-fidelity, animated student learning dashboard built with **Next.js 16**, **Supabase**, **Framer Motion**, and **Tailwind CSS**. Features hardware-accelerated animations, zero layout shifts, and real-time data integration.

## ✨ Features

### **Dark Mode Design**
- Deep background tones (black → slate-900)
- Subtle glowing gradients with blue, purple, and pink accents
- Animated background grid pattern
- Custom dark theme scrollbars

### **Bento Grid Layout**
- Responsive 1-4 column grid (mobile → desktop)
- Hero tile (2-column span on desktop)
- Dynamic course cards (1-column each)
- Activity tile (2-column span on desktop)
- Zero layout shifts with CSS transforms only

### **Navigation**
- **Desktop**: Fixed left sidebar (collapsible)
- **Tablet**: Sidebar icons only
- **Mobile**: Bottom navigation bar
- Active state indicators with layout animations
- Smooth transitions between states

### **Animated Components**
- ✅ **Entrance animations**: Staggered fade-in with upward translation
- ✅ **Hover states**: 1-2% scale with spring physics (stiffness: 300, damping: 20)
- ✅ **Border glow**: Subtle gradient shift on hover
- ✅ **Progress bars**: Animated from 0% to target value
- ✅ **Activity chart**: Staggered bar entrance animations
- ✅ **Streak indicator**: Rotating flame icon animation

### **Hero Tile**
- Dynamic greeting with student name
- Daily learning streak counter with animated flame icon
- Gradient background with animated mesh effect
- Fully responsive on all screen sizes

### **Course Tiles**
- Dynamic icon rendering based on Lucide React library
- Course title and progress percentage
- Animated progress bars with color coding:
  - 🟢 Green (75%+): Nearly complete
  - 🔵 Blue (50-75%): In progress
  - 🟠 Orange (<50%): Just started
- Hover effects with icon scale animation
- Subtle grain texture background

### **Activity Tile**
- Weekly activity chart with mock data
- Animated bar chart with staggered entrance
- Average and total hours statistics
- Hover effects on individual bars
- Chart icon animation on hover

### **Data Integration**
- ✅ Server-side data fetching with Next.js App Router
- ✅ Supabase PostgreSQL integration
- ✅ Fallback mock data when Supabase unavailable
- ✅ Graceful error handling with console logging
- ✅ Loading states with pulsing skeleton loaders
- ✅ Suspense boundaries for progressive rendering

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | Framework & Server Components |
| **React 19** | UI Library |
| **Supabase** | PostgreSQL Database & BaaS |
| **Framer Motion** | Animations with spring physics |
| **Tailwind CSS 4** | Styling & responsive design |
| **Lucide React** | Icon library (50+ icons) |
| **TypeScript** | Type safety |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Sidebar & responsive main
│   ├── page.tsx                # Dashboard with server-side data fetching
│   ├── globals.css             # Dark theme & global styles
│   └── loading.tsx             # Page-level loading skeleton
│
├── components/
│   ├── Sidebar.tsx             # Navigation with layout animations
│   ├── HeroTile.tsx            # Welcome tile with streak counter
│   ├── CourseTile.tsx          # Dynamic course cards with progress
│   ├── ActivityTile.tsx        # Weekly activity chart
│   ├── DashboardGrid.tsx       # Bento grid orchestrator
│   └── Skeleton.tsx            # Pulsing skeleton loaders
│
└── lib/
    ├── types/
    │   └── index.ts            # TypeScript interfaces
    ├── supabase/
    │   ├── client.ts           # Client-side Supabase
    │   └── server.ts           # Server-side Supabase with cookies
    └── services.ts             # Data fetching functions
```

## 🎬 Animation Specs

### **Entrance Animations**
- Duration: 600ms
- Easing: Spring physics (type: "spring", stiffness: 300, damping: 25)
- Stagger delay: 100ms between tiles
- Direction: Fade in + 20px upward translation

```typescript
transition={{
  duration: 0.6,
  delay: index * 0.1,
  type: 'spring',
  stiffness: 300,
  damping: 25,
}}
```

### **Hover Effects**
- Scale: 1.02 - 1.05 (2-5%)
- Duration: Immediate
- Easing: Spring physics
- Z-axis: Subtle elevation with border glow

```typescript
whileHover={{
  scale: 1.05,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
}}
```

### **Progress Bars**
- Initial width: 0%
- Final width: Dynamic (from database)
- Duration: 1.2s with easing curve
- Delay: Staggered with tile entrance

```typescript
initial={{ width: 0 }}
animate={{ width: `${progress}%` }}
transition={{
  duration: 1.2,
  delay: index * 0.1 + 0.3,
  ease: 'easeOut',
}}
```

## 🎨 Color Palette

| Element | Color | RGB |
|---|---|---|
| Background | `#0a0a0a` | Deep black |
| Secondary | `#0f172a` | Slate-900 |
| Border | `rgba(71, 85, 105, 0.5)` | Slate-700/50 |
| Hover Border | `rgba(59, 130, 246, 0.5)` | Blue-500/50 |
| Text Primary | `#ffffff` | White |
| Text Secondary | `#cbd5e1` | Slate-300 |
| Icon Accent | `#93c5fd` | Blue-300 |
| Progress (High) | `#10b981` → `#059669` | Green gradient |
| Progress (Mid) | `#3b82f6` → `#06b6d4` | Blue gradient |
| Progress (Low) | `#f97316` → `#eab308` | Orange gradient |

## 📱 Responsive Breakpoints

### **Mobile** (< 768px)
- Bottom navigation bar (5 nav items)
- Single-column bento grid
- Hero tile: Full width
- Course tiles: 1 per row
- Activity tile: Full width

### **Tablet** (768px - 1024px)
- Collapsed sidebar (icons only, 80px width)
- 2-column bento grid
- Hero tile: 2-column span
- Course tiles: 1 per column
- Activity tile: 2-column span

### **Desktop** (> 1024px)
- Full sidebar (256px width with labels)
- 4-column bento grid
- Hero tile: 2-column span
- Course tiles: 1 per column
- Activity tile: 2-column span

## 🔧 Configuration

### Supabase Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Database Schema

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Icon Names

The `CourseTile` component dynamically renders icons. Supported Lucide icons:

```
Book, Code, Zap, Rocket, Heart, Star, Flame, Target,
Cpu, Database, GitBranch, BarChart3, Beaker, Brain,
Building2, Calendar, CheckCircle, CircleDot, Cloud,
...and 150+ more from lucide-react
```

## 🎯 Key Implementation Details

### **Zero Layout Shifts**
- ✅ Animations use only `transform` and `opacity`
- ✅ No `width`, `height`, `top`, `left` changes
- ✅ Stable containers with fixed heights
- ✅ GPU acceleration for performance

### **Server-Side Data Fetching**
- ✅ Uses Next.js App Router Server Components
- ✅ Fetches data at build time (static) or request time (dynamic)
- ✅ Supabase server-side client with cookie management
- ✅ Graceful fallback to mock data

### **Performance Optimization**
- ✅ Suspense boundaries for progressive rendering
- ✅ Skeleton loaders with pulsing animations
- ✅ Lazy loading icons from Lucide
- ✅ CSS Grid for efficient layout
- ✅ No JavaScript animations for simple states

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] Desktop view (> 1024px)
  - [ ] Sidebar visible and collapsible
  - [ ] 4-column grid layout
  - [ ] Hover effects on tiles
  - [ ] Navigation active state highlights
- [ ] Tablet view (768px - 1024px)
  - [ ] Sidebar icons only (80px)
  - [ ] 2-column grid layout
  - [ ] Responsive typography
- [ ] Mobile view (< 768px)
  - [ ] Bottom navigation bar
  - [ ] Single-column grid
  - [ ] Full-width tiles
  - [ ] Touch-friendly buttons
- [ ] Animations
  - [ ] Entrance stagger on page load
  - [ ] Smooth hover scale effect
  - [ ] Progress bar animation
  - [ ] No layout shifts during animations
- [ ] Data Integration
  - [ ] Mock data displays correctly
  - [ ] Supabase data fetches (with credentials)
  - [ ] Error handling shows gracefully
  - [ ] Loading state appears briefly

## 📚 Learning Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

1. **Clone and install**:
   ```bash
   npm install
   ```

2. **Set up Supabase** (see [SETUP.md](SETUP.md))

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**: http://localhost:3000

See [SETUP.md](SETUP.md) for detailed Supabase configuration instructions.

---

**Built with ❤️ for the next generation of learning platforms.**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
