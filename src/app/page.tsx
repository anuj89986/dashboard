import { Suspense } from 'react';
import { DashboardGrid } from '@/components/DashboardGrid';
import { fetchCourses } from '@/lib/services';
import { DashboardSkeleton } from '@/components/Skeleton';
import { DashboardDataError } from "@/lib/services";

async function DashboardData() {
  try {
    const courses = await fetchCourses();
    return <DashboardGrid courses={courses} />;
  } catch (error) {
    const message =
      error instanceof DashboardDataError && error.code === "SUPABASE_CONFIG"
        ? "Supabase credentials are missing or invalid."
        : error instanceof DashboardDataError && error.code === "SUPABASE_QUERY"
          ? "The dashboard data could not be loaded from Supabase."
          : "An unexpected error occurred while loading the dashboard.";

    return (
      <article
        role="alert"
        className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200"
      >
        <h2 className="text-lg font-semibold">Unable to load dashboard</h2>
        <p className="text-sm text-red-300/90 mt-1">{message}</p>
      </article>
    );
  }
}

export default function Home() {
  return (
    <section className="min-h-screen bg-linear-to-br from-[#000000] via-[#210735] to-[#000000]">
      <div className="relative z-10 px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ffffff] mb-2">Dashboard</h1>
          <p className="text-slate-400">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardData />
        </Suspense>
      </div>
    </section>
  );
}
