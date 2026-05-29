export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`rounded-2xl bg-[#2a2727] animate-pulse ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
      <SkeletonBlock className="md:col-span-2 h-48 rounded-3xl" />
      {[0, 1, 2].map((i) => (
        <SkeletonBlock key={i} className="h-32" />
      ))}
      <SkeletonBlock className="md:col-span-2 h-40" />
    </section>
  );
}
