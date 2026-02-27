import { useState, useEffect } from 'react';
import FishLog from './components/FishLog';
import AddCatchModal from './components/AddCatchModal';
import WeatherWidget from './components/WeatherWidget';
import Stats from './components/Stats';

export interface Catch {
  id: string;
  species: string;
  weight: number;
  length: number;
  location: string;
  date: string;
  notes: string;
  time: string;
}

const defaultCatches: Catch[] = [
  {
    id: '1',
    species: 'Largemouth Bass',
    weight: 4.2,
    length: 18,
    location: 'Lake Serenity',
    date: '2024-06-15',
    time: '06:30',
    notes: 'Caught on a topwater frog near the lily pads'
  },
  {
    id: '2',
    species: 'Rainbow Trout',
    weight: 2.8,
    length: 14,
    location: 'Silver Creek',
    date: '2024-06-10',
    time: '07:15',
    notes: 'Dry fly fishing at dawn'
  },
  {
    id: '3',
    species: 'Bluegill',
    weight: 0.8,
    length: 8,
    location: 'Miller Pond',
    date: '2024-06-08',
    time: '16:45',
    notes: 'Kids loved watching this one'
  }
];

function App() {
  const [catches, setCatches] = useState<Catch[]>(() => {
    const saved = localStorage.getItem('fishingCatches');
    return saved ? JSON.parse(saved) : defaultCatches;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem('fishingCatches', JSON.stringify(catches));
  }, [catches]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const addCatch = (newCatch: Omit<Catch, 'id'>) => {
    setCatches([{ ...newCatch, id: Date.now().toString() }, ...catches]);
    setIsModalOpen(false);
  };

  const deleteCatch = (id: string) => {
    setCatches(catches.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#1a2f3d] relative overflow-hidden">
      {/* Animated water ripple background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2f3d] via-[#243d4d] to-[#1a2f3d]" />
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <pattern id="water" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q25 45 50 50 T100 50" fill="none" stroke="#d4a054" strokeWidth="0.5">
                <animate attributeName="d" values="M0 50 Q25 45 50 50 T100 50;M0 50 Q25 55 50 50 T100 50;M0 50 Q25 45 50 50 T100 50" dur="4s" repeatCount="indefinite" />
              </path>
              <path d="M0 70 Q25 65 50 70 T100 70" fill="none" stroke="#6b8f71" strokeWidth="0.5">
                <animate attributeName="d" values="M0 70 Q25 65 50 70 T100 70;M0 70 Q25 75 50 70 T100 70;M0 70 Q25 65 50 70 T100 70" dur="5s" repeatCount="indefinite" />
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#water)" />
        </svg>
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className={`pt-8 md:pt-16 pb-6 md:pb-12 px-4 md:px-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              {/* Hand-drawn fish icon */}
              <svg className="w-10 h-10 md:w-14 md:h-14 text-[#d4a054]" viewBox="0 0 64 64" fill="none">
                <path d="M8 32 C16 20 32 16 48 24 C56 28 60 32 56 36 C52 44 36 48 24 44 C16 42 8 44 8 32 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M4 28 L8 32 L4 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="48" cy="30" r="2" fill="currentColor" />
                <path d="M24 28 Q28 32 24 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M32 26 Q36 32 32 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div>
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-[#f5f1e8] tracking-tight">
                  The Angler's Journal
                </h1>
                <p className="font-body text-[#d4a054] text-sm md:text-lg italic mt-1">
                  Chronicle your catches, cherish your memories
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 md:px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Top row: Weather & Stats */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <WeatherWidget />
              <div className="lg:col-span-2">
                <Stats catches={catches} />
              </div>
            </div>

            {/* Add catch button */}
            <div className={`mb-6 md:mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto group relative px-6 md:px-8 py-4 bg-[#d4a054] text-[#1a2f3d] font-display text-lg md:text-xl rounded-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-[#d4a054]/20 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center md:justify-start gap-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Log a New Catch
                </span>
                <div className="absolute inset-0 bg-[#e8b668] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </div>

            {/* Fish log */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <FishLog catches={catches} onDelete={deleteCatch} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 md:py-6 px-4 md:px-8 border-t border-[#2a4a5d]">
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-body text-[#5a7a8d] text-xs md:text-sm">
              Requested by @trustnoneisakey · Built by @clonkbot
            </p>
          </div>
        </footer>
      </div>

      {/* Add catch modal */}
      <AddCatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addCatch}
      />
    </div>
  );
}

export default App;
