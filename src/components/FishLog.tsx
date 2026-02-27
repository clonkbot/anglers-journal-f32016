import { useState } from 'react';
import type { Catch } from '../App';

interface FishLogProps {
  catches: Catch[];
  onDelete: (id: string) => void;
}

const fishIcons: Record<string, string> = {
  'Largemouth Bass': 'M8 16 C14 8 28 6 42 12 C50 16 54 20 50 26 C46 34 30 38 20 34 C14 32 8 34 8 24 Z',
  'Rainbow Trout': 'M6 20 C12 12 26 8 44 16 C52 20 56 24 52 28 C48 36 32 40 18 36 C10 34 6 32 6 24 Z',
  'Bluegill': 'M16 20 C20 12 32 10 42 16 C48 20 50 26 46 30 C42 36 30 38 22 34 C16 32 14 28 16 24 Z',
  default: 'M8 20 C16 10 32 8 48 16 C56 20 60 26 56 30 C52 38 36 42 24 38 C16 36 8 36 8 26 Z'
};

function FishLog({ catches, onDelete }: FishLogProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${minutes} ${ampm}`;
  };

  const getFishPath = (species: string) => {
    return fishIcons[species] || fishIcons.default;
  };

  if (catches.length === 0) {
    return (
      <div className="bg-[#243d4d]/50 backdrop-blur-sm rounded-sm border border-[#3a5a6d] p-8 md:p-16 text-center">
        <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 text-[#4a6a7d]" viewBox="0 0 64 64" fill="none">
          <path d="M8 32 C16 20 32 16 48 24 C56 28 60 32 56 36 C52 44 36 48 24 44 C16 42 8 44 8 32 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M4 28 L8 32 L4 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
        </svg>
        <h3 className="font-display text-xl md:text-2xl text-[#8aa0ad] mb-2">No catches yet</h3>
        <p className="font-body text-[#5a7a8d] italic text-sm md:text-base">Cast your line and log your first catch</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <h2 className="font-display text-xl md:text-2xl text-[#f5f1e8] mb-4 md:mb-6 flex items-center gap-3">
        <span className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-[#d4a054]" />
        Catch Log
        <span className="font-body text-sm md:text-base text-[#6b8f71] ml-2">({catches.length} entries)</span>
      </h2>

      {catches.map((fish, index) => (
        <div
          key={fish.id}
          className="group bg-[#243d4d]/60 backdrop-blur-sm rounded-sm border border-[#3a5a6d] overflow-hidden transition-all duration-300 hover:border-[#d4a054]/50 hover:bg-[#2a4a5d]/60"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <button
            onClick={() => setExpandedId(expandedId === fish.id ? null : fish.id)}
            className="w-full text-left p-4 md:p-6 focus:outline-none focus:ring-2 focus:ring-[#d4a054]/50 focus:ring-inset"
          >
            <div className="flex items-start gap-3 md:gap-6">
              {/* Fish illustration */}
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1a2f3d] border border-[#3a5a6d] flex items-center justify-center group-hover:border-[#d4a054]/50 transition-colors">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-[#d4a054]" viewBox="0 0 64 64" fill="none">
                  <path d={getFishPath(fish.species)} stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <circle cx="44" cy="18" r="1.5" fill="currentColor" />
                </svg>
              </div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-2">
                  <h3 className="font-display text-lg md:text-xl text-[#f5f1e8] truncate">{fish.species}</h3>
                  <span className="font-body text-xs md:text-sm text-[#6b8f71] italic">{fish.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                  <span className="text-[#d4a054] font-display">{fish.weight} lbs</span>
                  <span className="text-[#5a7a8d]">·</span>
                  <span className="text-[#8aa0ad]">{fish.length}"</span>
                  <span className="text-[#5a7a8d]">·</span>
                  <span className="text-[#8aa0ad] font-body">{formatDate(fish.date)}</span>
                  <span className="text-[#5a7a8d] hidden md:inline">·</span>
                  <span className="text-[#6b8f71] hidden md:inline">{formatTime(fish.time)}</span>
                </div>
              </div>

              {/* Expand indicator */}
              <svg
                className={`w-5 h-5 md:w-6 md:h-6 text-[#5a7a8d] transition-transform duration-300 ${expandedId === fish.id ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Expanded content */}
          <div className={`overflow-hidden transition-all duration-300 ${expandedId === fish.id ? 'max-h-48' : 'max-h-0'}`}>
            <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 border-t border-[#3a5a6d]">
              <div className="pt-4">
                <p className="font-body text-[#c0d0da] italic text-sm md:text-base mb-4 md:hidden">
                  <span className="text-[#6b8f71]">{formatTime(fish.time)}</span>
                </p>
                {fish.notes && (
                  <p className="font-body text-[#c0d0da] italic text-sm md:text-base mb-4">"{fish.notes}"</p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(fish.id);
                  }}
                  className="font-body text-xs md:text-sm text-[#8a6054] hover:text-[#d4a054] transition-colors flex items-center gap-2 py-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove entry
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FishLog;
