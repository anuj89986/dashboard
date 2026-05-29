# 🎨 Customization Guide

This guide shows how to customize the Learning Dashboard to fit your needs.

## Customizing Colors

### Change Theme Colors

Edit the color values in each component file:

#### **Hero Tile Colors**
File: `src/components/HeroTile.tsx`

```typescript
// Change the gradient colors
bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300

// To:
bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300
```

#### **Course Tile Progress Colors**
File: `src/components/CourseTile.tsx`

```typescript
// Current colors for different progress ranges:
const progressColor = 
  course.progress >= 75 ? 'from-green-500 to-emerald-500' :  // High progress
  course.progress >= 50 ? 'from-blue-500 to-cyan-500' :      // Medium progress
  'from-orange-500 to-yellow-500';                           // Low progress

// Customize to your brand:
const progressColor = 
  course.progress >= 75 ? 'from-violet-500 to-purple-500' :
  course.progress >= 50 ? 'from-indigo-500 to-blue-500' :
  'from-rose-500 to-pink-500';
```

#### **Global Dark Theme**
File: `src/app/globals.css`

```css
:root {
  --background: #0a0a0a;    /* Main background */
  --foreground: #ffffff;    /* Text color */
}
```

### Dark Mode Implementation Details

The dashboard uses these Tailwind classes for dark theme:

```typescript
// Container backgrounds
bg-black
bg-slate-950
bg-slate-900
bg-slate-800/80

// Text colors
text-white
text-slate-300
text-slate-400

// Borders
border-slate-800
border-slate-700/50
```

## Customizing Components

### Add a New Course Programmatically

File: `src/app/page.tsx`

```typescript
const mockCourses: Course[] = [
  // ... existing courses
  {
    id: '5',
    title: 'Machine Learning 101',
    progress: 30,
    icon_name: 'Brain',  // Any Lucide icon name
    created_at: new Date().toISOString(),
  },
];
```

### Change Student Name and Streak

File: `src/components/HeroTile.tsx`

```typescript
// In the page.tsx, update the HeroTile props:
<HeroTile name="Your Name" streak={15} index={0} />
```

### Customize Navigation Items

File: `src/components/Sidebar.tsx`

```typescript
const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
  { id: 'courses', label: 'Courses', icon: <Book size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  // Add new item:
  { id: 'projects', label: 'Projects', icon: <FolderOpen size={20} /> },
];
```

### Change Activity Chart Data

File: `src/components/ActivityTile.tsx`

```typescript
const activities = [4, 8, 6, 9, 7, 10, 5];  // Hours per day

// Change to:
const activities = [2, 3, 5, 8, 6, 7, 4];   // Your data
```

## Customizing Animations

### Adjust Entrance Animation Speed

File: Any component with `transition` (e.g., `HeroTile.tsx`)

```typescript
// Current: 600ms duration
transition={{
  duration: 0.6,    // ← Change this to 0.3 for faster
  delay: index * 0.1,
  type: 'spring',
  stiffness: 300,
  damping: 25,
}}

// Faster entrance (300ms):
duration: 0.3

// Slower, more dramatic (1000ms):
duration: 1.0
```

### Change Hover Scale Effect

File: Any component with `whileHover`

```typescript
// Current: scales to 1.05 (5% larger)
whileHover={{ scale: 1.05, transition: { ... } }}

// More subtle (2% larger):
whileHover={{ scale: 1.02, transition: { ... } }}

// More dramatic (10% larger):
whileHover={{ scale: 1.1, transition: { ... } }}
```

### Adjust Spring Physics

```typescript
// Current spring config
type: 'spring',
stiffness: 300,   // Higher = snappier
damping: 20,      // Lower = bouncier

// More bouncy:
type: 'spring',
stiffness: 200,
damping: 10,

// More controlled:
type: 'spring',
stiffness: 400,
damping: 40,
```

### Disable Animations

To remove animations, change `whileHover` to `whileHover={{}}`

```typescript
// Before:
whileHover={{
  scale: 1.05,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
}}

// After (disabled):
whileHover={{}}
```

## Customizing Data Integration

### Connect to Real Supabase Database

1. Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. Create `courses` table in Supabase:
   ```sql
   CREATE TABLE courses (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title TEXT NOT NULL,
     progress INTEGER NOT NULL,
     icon_name TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. The app will automatically fetch from Supabase instead of using mock data.

### Add More Database Fields

File: `src/lib/types/index.ts`

```typescript
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
  // Add new fields:
  description?: string;
  instructor?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}
```

Then update the SQL schema and update components to display the new fields.

### Add Real-Time Updates with Supabase

File: `src/components/DashboardGrid.tsx`

```typescript
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function DashboardGrid() {
  const [courses, setCourses] = useState<Course[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // Subscribe to changes
    const subscription = supabase
      .from('courses')
      .on('*', (payload) => {
        console.log('Change received!', payload);
        // Update courses when database changes
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  // ... rest of component
}
```

## Customizing Layout

### Change Grid Columns

File: `src/components/DashboardGrid.tsx`

```typescript
// Current: 1 column on mobile, 2 on tablet, 4 on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

// Change to 3 columns on desktop:
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Adjust Gap Between Tiles

```typescript
// Current: gap-6 (1.5rem / 24px)
gap-6

// Larger gaps:
gap-8  // 2rem / 32px

// Smaller gaps:
gap-4  // 1rem / 16px
```

### Change Sidebar Width

File: `src/components/Sidebar.tsx`

```typescript
// Current widths
width: isCollapsed ? 80 : 256  // 80px when collapsed, 256px when open

// Change to 300px expanded:
width: isCollapsed ? 80 : 300
```

## Customizing Typography

### Change Heading Sizes

File: `src/app/page.tsx`

```typescript
// Current
<h1 className="text-4xl md:text-5xl font-bold">Dashboard</h1>

// Smaller headings
<h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>

// Larger headings
<h1 className="text-5xl md:text-6xl font-bold">Dashboard</h1>
```

### Font Family

Edit in `src/app/globals.css`:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
}
```

## Adding New Features

### Add a Settings Page

1. Create `src/app/settings/page.tsx`:
   ```typescript
   export default function SettingsPage() {
     return (
       <div className="p-8">
         <h1 className="text-3xl font-bold text-white">Settings</h1>
         {/* Settings content */}
       </div>
     );
   }
   ```

2. Update `Sidebar.tsx` to navigate to settings

### Add Search Functionality

```typescript
// In DashboardGrid.tsx
const [searchTerm, setSearchTerm] = useState('');
const filteredCourses = courses.filter(course =>
  course.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Add Filters

```typescript
const [difficulty, setDifficulty] = useState('all');
const filteredCourses = courses.filter(course =>
  difficulty === 'all' ? true : course.difficulty === difficulty
);
```

## Best Practices

1. **Colors**: Use Tailwind color palette (100-900)
2. **Spacing**: Use gap and p/m utilities (4, 6, 8, etc.)
3. **Typography**: Use text-sm, text-base, text-lg, etc.
4. **Animations**: Keep spring stiffness 200-400 for natural feel
5. **Performance**: Use Suspense for data loading
6. **Accessibility**: Use semantic HTML (`<nav>`, `<article>`, etc.)

---

Need help? Check the main [README.md](README.md) or [SETUP.md](SETUP.md).
