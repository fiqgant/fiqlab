import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-10 text-center max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center">
          <Ghost className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-5xl font-bold gradient-text mb-2">404</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mb-8">
          This page seems to have wandered off into the latent space.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold text-sm hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
