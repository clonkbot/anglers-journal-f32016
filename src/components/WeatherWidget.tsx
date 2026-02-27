import { useState, useEffect } from 'react';

const conditions = [
  { name: 'Clear Skies', icon: 'sun', temp: 72, quality: 'excellent' },
  { name: 'Partly Cloudy', icon: 'cloud-sun', temp: 68, quality: 'good' },
  { name: 'Overcast', icon: 'cloud', temp: 65, quality: 'great' },
  { name: 'Light Rain', icon: 'rain', temp: 62, quality: 'fair' },
];

function WeatherWidget() {
  const [condition, setCondition] = useState(conditions[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate weather changing occasionally
    const weatherIndex = Math.floor(Math.random() * conditions.length);
    setCondition(conditions[weatherIndex]);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 9) return 'Prime Time';
    if (hour >= 9 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Midday';
    if (hour >= 17 && hour < 20) return 'Golden Hour';
    return 'Night';
  };

  const renderIcon = () => {
    switch (condition.icon) {
      case 'sun':
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12 text-[#d4a054]" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M24 4V10M24 38V44M44 24H38M10 24H4M38.6 9.4L34.2 13.8M13.8 34.2L9.4 38.6M38.6 38.6L34.2 34.2M13.8 13.8L9.4 9.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'cloud-sun':
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12 text-[#d4a054]" viewBox="0 0 48 48" fill="none">
            <circle cx="32" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M32 4V8M44 16H40M38.2 9.8L35.4 12.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 36C8.7 36 6 33.3 6 30C6 27.2 7.9 24.9 10.5 24.2C10.2 23.5 10 22.8 10 22C10 18.7 12.7 16 16 16C17.4 16 18.7 16.5 19.7 17.3C21.3 14.7 24.2 13 27.5 13C32.7 13 37 17.3 37 22.5C37 22.7 37 22.8 37 23C39.8 23.5 42 25.9 42 29C42 32.3 39.3 35 36 35L12 36Z" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'cloud':
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12 text-[#8aa0ad]" viewBox="0 0 48 48" fill="none">
            <path d="M12 34C8.7 34 6 31.3 6 28C6 25.2 7.9 22.9 10.5 22.2C10.2 21.5 10 20.8 10 20C10 16.7 12.7 14 16 14C17.4 14 18.7 14.5 19.7 15.3C21.3 12.7 24.2 11 27.5 11C32.7 11 37 15.3 37 20.5C37 20.7 37 20.8 37 21C39.8 21.5 42 23.9 42 27C42 30.3 39.3 33 36 33L12 34Z" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'rain':
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12 text-[#6b8f71]" viewBox="0 0 48 48" fill="none">
            <path d="M12 28C8.7 28 6 25.3 6 22C6 19.2 7.9 16.9 10.5 16.2C10.2 15.5 10 14.8 10 14C10 10.7 12.7 8 16 8C17.4 8 18.7 8.5 19.7 9.3C21.3 6.7 24.2 5 27.5 5C32.7 5 37 9.3 37 14.5C37 14.7 37 14.8 37 15C39.8 15.5 42 17.9 42 21C42 24.3 39.3 27 36 27L12 28Z" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M16 34L14 40M24 32L22 38M32 34L30 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const qualityColors: Record<string, string> = {
    excellent: 'text-[#6b8f71]',
    great: 'text-[#6b8f71]',
    good: 'text-[#d4a054]',
    fair: 'text-[#8aa0ad]',
  };

  return (
    <div className="bg-[#243d4d]/60 backdrop-blur-sm rounded-sm border border-[#3a5a6d] p-4 md:p-6">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div>
          <p className="font-body text-xs text-[#8aa0ad] uppercase tracking-wider mb-1">Current Conditions</p>
          <p className="font-display text-2xl md:text-3xl text-[#f5f1e8]">{condition.temp}°F</p>
        </div>
        {renderIcon()}
      </div>

      <p className="font-body text-[#c0d0da] mb-3 md:mb-4 text-sm md:text-base">{condition.name}</p>

      <div className="pt-3 md:pt-4 border-t border-[#3a5a6d]">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-body text-xs text-[#8aa0ad] uppercase tracking-wider">Fishing</p>
            <p className={`font-display text-base md:text-lg capitalize ${qualityColors[condition.quality]}`}>
              {condition.quality}
            </p>
          </div>
          <div className="text-right">
            <p className="font-body text-xs text-[#8aa0ad] uppercase tracking-wider">{getTimeOfDay()}</p>
            <p className="font-display text-base md:text-lg text-[#d4a054]">{formatTime(currentTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
