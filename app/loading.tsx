export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 animate-pulse" />
        </div>
        <p className="text-sm text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
