import { useState, useEffect, useRef } from 'react';
import type { Catch } from '../App';

interface AddCatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (catch_: Omit<Catch, 'id'>) => void;
}

const commonSpecies = [
  'Largemouth Bass',
  'Smallmouth Bass',
  'Rainbow Trout',
  'Brown Trout',
  'Bluegill',
  'Crappie',
  'Catfish',
  'Northern Pike',
  'Walleye',
  'Perch',
  'Salmon',
  'Carp'
];

function AddCatchModal({ isOpen, onClose, onAdd }: AddCatchModalProps) {
  const [species, setSpecies] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('06:00');
  const [notes, setNotes] = useState('');
  const [showSpeciesList, setShowSpeciesList] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!species || !weight || !length || !location) return;

    onAdd({
      species,
      weight: parseFloat(weight),
      length: parseFloat(length),
      location,
      date,
      time,
      notes
    });

    // Reset form
    setSpecies('');
    setWeight('');
    setLength('');
    setLocation('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('06:00');
    setNotes('');
  };

  const filteredSpecies = commonSpecies.filter(s =>
    s.toLowerCase().includes(species.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a1a24]/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full md:max-w-lg bg-gradient-to-b from-[#243d4d] to-[#1a2f3d] rounded-t-2xl md:rounded-sm border-t md:border border-[#3a5a6d] shadow-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#243d4d] border-b border-[#3a5a6d] p-4 md:p-6 flex items-center justify-between z-10">
          <h2 className="font-display text-xl md:text-2xl text-[#f5f1e8]">Log Your Catch</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#8aa0ad] hover:text-[#f5f1e8] transition-colors rounded-full hover:bg-[#3a5a6d]/50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-5">
          {/* Species */}
          <div className="relative">
            <label className="block font-body text-sm text-[#d4a054] mb-2">Species *</label>
            <input
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              onFocus={() => setShowSpeciesList(true)}
              onBlur={() => setTimeout(() => setShowSpeciesList(false), 200)}
              placeholder="What did you catch?"
              className="w-full bg-[#1a2f3d] border border-[#3a5a6d] rounded-sm px-4 py-3 font-body text-[#f5f1e8] placeholder-[#5a7a8d] focus:outline-none focus:border-[#d4a054] transition-colors text-base"
              required
            />
            {showSpeciesList && filteredSpecies.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-[#1a2f3d] border border-[#3a5a6d] rounded-sm shadow-lg max-h-40 overflow-y-auto">
                {filteredSpecies.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSpecies(s);
                      setShowSpeciesList(false);
                    }}
                    className="w-full text-left px-4 py-3 font-body text-[#c0d0da] hover:bg-[#2a4a5d] transition-colors text-base"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Weight & Length */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm text-[#d4a054] mb-2">Weight (lbs) *</label>
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.0"
                className="w-full bg-[#1a2f3d] border border-[#3a5a6d] rounded-sm px-4 py-3 font-body text-[#f5f1e8] placeholder-[#5a7a8d] focus:outline-none focus:border-[#d4a054] transition-colors text-base"
                required
              />
            </div>
            <div>
              <label className="block font-body text-sm text-[#d4a054] mb-2">Length (in) *</label>
              <input
                type="number"
                inputMode="decimal"
                step="0.5"
                min="0"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="0"
                className="w-full bg-[#1a2f3d] border border-[#3a5a6d] rounded-sm px-4 py-3 font-body text-[#f5f1e8] placeholder-[#5a7a8d] focus:outline-none focus:border-[#d4a054] transition-colors text-base"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block font-body text-sm text-[#d4a054] mb-2">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where did you catch it?"
              className="w-full bg-[#1a2f3d] border border-[#3a5a6d] rounded-sm px-4 py-3 font-body text-[#f5f1e8] placeholder-[#5a7a8d] focus:outline-none focus:border-[#d4a054] transition-colors text-base"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm text-[#d4a054] mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1a2f3d] border border-[#3a5a6d] rounded-sm px-4 py-3 font-body text-[#f5f1e8] focus:outline-none focus:border-[#d4a054] transition-colors text-base"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-[#d4a054] mb-2">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#1a2f3d] border border-[#3a5a6d] rounded-sm px-4 py-3 font-body text-[#f5f1e8] focus:outline-none focus:border-[#d4a054] transition-colors text-base"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-body text-sm text-[#d4a054] mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Lure used, weather conditions, memorable moments..."
              rows={3}
              className="w-full bg-[#1a2f3d] border border-[#3a5a6d] rounded-sm px-4 py-3 font-body text-[#f5f1e8] placeholder-[#5a7a8d] focus:outline-none focus:border-[#d4a054] transition-colors resize-none text-base"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-[#d4a054] text-[#1a2f3d] font-display text-lg rounded-sm hover:bg-[#e8b668] transition-colors active:scale-[0.98]"
          >
            Add to Journal
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCatchModal;
