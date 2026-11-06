import LandingHero from "../components/LandingHero";

// Landing page at "/". The archive browse page lives at "/archive".
export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <LandingHero />
    </main>
  );
}
