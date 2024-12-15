import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: true
});

const CompanionsSection = dynamic(() => import('@/components/CompanionsSection'), {
  ssr: true
});

const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), {
  ssr: true
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CompanionsSection />
      <FeaturesSection />
    </main>
  );
}
