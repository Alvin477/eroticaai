'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-400 mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 