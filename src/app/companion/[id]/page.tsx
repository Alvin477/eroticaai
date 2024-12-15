'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { companions } from '@/data/companions';

export default function CompanionProfile() {
  const router = useRouter();
  const params = useParams();
  const companionId = params.id as string;

  const companion = companions.find(c => c.id === companionId);

  if (!companion) {
    return <div>Companion not found</div>;
  }

  const physicalAttributes = [
    { label: 'Age', value: companion.age },
    { label: 'Ethnicity', value: companion.ethnicity },
    { label: 'Hair Color', value: companion.hairColor },
    { label: 'Eye Color', value: companion.eyeColor },
    { label: 'Height', value: companion.height },
    { label: 'Weight', value: companion.weight },
  ];

  const handleStartChat = () => {
    try {
      sessionStorage.setItem('selectedCompanionId', companion.id);
      router.push('/chat');
    } catch (error) {
      console.error('Error starting chat:', error);
      window.location.href = '/chat';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black/95 to-black/90 pt-20">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40">
        <button 
          onClick={() => router.back()}
          className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center space-x-2 hover:bg-black/70 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Banner Section */}
      <div className="relative h-[45vh] mt-4">
        <Image
          src={companion.image}
          alt={companion.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/95" />
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 -mt-32 pb-20">
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
            <div className="relative w-48 h-48 rounded-full border-4 border-red-600/30 overflow-hidden shrink-0 shadow-xl shadow-red-900/20">
              <Image
                src={companion.image}
                alt={companion.name}
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
            <div className="flex-1 mt-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl md:text-6xl font-light text-white mb-2">
                    {companion.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm text-green-400">Available Now</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-yellow-400">4.9</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                    {companion.description}
                  </p>
                </div>
                <button 
                  onClick={handleStartChat}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-red-900/20"
                >
                  Start Private Chat
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {Object.entries(companion.stats).map(([key, value]) => (
              <div key={key} className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-red-900/10 text-center">
                <div className="text-3xl text-white mb-2">{value}</div>
                <div className="text-red-400 text-sm uppercase tracking-wider">{key}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Languages & Interests */}
            <div className="space-y-8">
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-red-900/10">
                <h3 className="text-red-400 text-2xl mb-6 font-light">Languages</h3>
                <div className="flex flex-col gap-3">
                  {companion.languages.map(lang => (
                    <div key={lang} className="bg-red-500/5 text-white px-4 py-3 rounded-xl text-center">
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column - Physical Attributes */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-red-900/10 h-fit">
              <h3 className="text-red-400 text-2xl mb-6 font-light">Physical Attributes</h3>
              <div className="grid grid-cols-2 gap-y-6">
                {physicalAttributes.map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-red-400 text-sm uppercase tracking-wider mb-1">{label}</span>
                    <span className="text-white text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Interests */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-red-900/10">
              <h3 className="text-red-400 text-2xl mb-6 font-light">Interests</h3>
              <div className="flex flex-col gap-3">
                {companion.interests.map(interest => (
                  <div key={interest} className="bg-red-500/5 text-white px-4 py-3 rounded-xl text-center">
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 