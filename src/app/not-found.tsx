import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-colors">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
} 