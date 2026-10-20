export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-accent to-accent animate-pulse" />
        </div>
        <p className="text-sm text-ink/40 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
