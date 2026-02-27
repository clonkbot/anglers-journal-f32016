import type { Catch } from '../App';

interface StatsProps {
  catches: Catch[];
}

function Stats({ catches }: StatsProps) {
  const totalCatches = catches.length;

  const totalWeight = catches.reduce((sum, c) => sum + c.weight, 0);

  const biggestCatch = catches.length > 0
    ? catches.reduce((max, c) => c.weight > max.weight ? c : max, catches[0])
    : null;

  const uniqueSpecies = new Set(catches.map(c => c.species)).size;

  const uniqueLocations = new Set(catches.map(c => c.location)).size;

  return (
    <div className="bg-[#243d4d]/60 backdrop-blur-sm rounded-sm border border-[#3a5a6d] p-4 md:p-6 h-full">
      <p className="font-body text-xs text-[#8aa0ad] uppercase tracking-wider mb-4 md:mb-6">Season Statistics</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div>
          <p className="font-display text-2xl md:text-4xl text-[#d4a054]">{totalCatches}</p>
          <p className="font-body text-xs md:text-sm text-[#8aa0ad]">Total Catches</p>
        </div>

        <div>
          <p className="font-display text-2xl md:text-4xl text-[#6b8f71]">{totalWeight.toFixed(1)}</p>
          <p className="font-body text-xs md:text-sm text-[#8aa0ad]">Pounds Caught</p>
        </div>

        <div>
          <p className="font-display text-2xl md:text-4xl text-[#f5f1e8]">{uniqueSpecies}</p>
          <p className="font-body text-xs md:text-sm text-[#8aa0ad]">Species</p>
        </div>

        <div>
          <p className="font-display text-2xl md:text-4xl text-[#8aa0ad]">{uniqueLocations}</p>
          <p className="font-body text-xs md:text-sm text-[#8aa0ad]">Locations</p>
        </div>
      </div>

      {biggestCatch && (
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#3a5a6d]">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-[#d4a054] flex-shrink-0" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L18.5 12H28L20.5 17L23 26L16 21L9 26L11.5 17L4 12H13.5L16 4Z" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <div className="min-w-0">
              <p className="font-body text-xs text-[#8aa0ad] uppercase tracking-wider">Personal Best</p>
              <p className="font-display text-base md:text-lg text-[#f5f1e8] truncate">
                {biggestCatch.species} — {biggestCatch.weight} lbs
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;
