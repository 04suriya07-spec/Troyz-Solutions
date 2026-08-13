export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' | 'deepNight';
export type ParticleMode = 'rain' | 'energy' | 'stars' | 'snow' | 'embers';

export interface WorldContext {
  timeOfDay: TimeOfDay;
  hour: number;
  minute: number;
  greeting: string;
  subGreeting: string;
  atmosphere: string;
  particleMode: ParticleMode;
  primaryColor: string;
  secondaryColor: string;
  bgClass: string;
}

interface ThemeConfig {
  greeting: string;
  subGreeting: string;
  atmosphere: string;
  particleMode: ParticleMode;
  primaryColor: string;
  secondaryColor: string;
  bgClass: string;
}

const TIME_THEMES: Record<TimeOfDay, ThemeConfig> = {
  dawn: {
    greeting: 'RISE',
    subGreeting: 'Dawn has broken. The System awaits your command.',
    atmosphere: 'The city stirs. A new cycle begins.',
    particleMode: 'embers',
    primaryColor: '#ff9f43',
    secondaryColor: '#ffd32a',
    bgClass: 'bg-dawn',
  },
  morning: {
    greeting: 'GOOD MORNING',
    subGreeting: 'Your challenges have been prepared. Begin your ascension.',
    atmosphere: 'High energy. Maximum potential unlocked.',
    particleMode: 'energy',
    primaryColor: '#00e5ff',
    secondaryColor: '#7b2ff7',
    bgClass: 'bg-morning',
  },
  afternoon: {
    greeting: 'AFTERNOON PROTOCOL',
    subGreeting: 'The grind continues. Your progress has been noted.',
    atmosphere: 'Productivity window active. All systems operational.',
    particleMode: 'energy',
    primaryColor: '#00e5ff',
    secondaryColor: '#0078ff',
    bgClass: 'bg-afternoon',
  },
  evening: {
    greeting: 'GOOD EVENING',
    subGreeting: 'The day draws to its final phase. What remains unfinished?',
    atmosphere: 'The city lights turn on. Final missions active.',
    particleMode: 'embers',
    primaryColor: '#ff6b35',
    secondaryColor: '#7b2ff7',
    bgClass: 'bg-evening',
  },
  night: {
    greeting: 'GOOD EVENING',
    subGreeting: 'The shadows grow. Only the disciplined remain.',
    atmosphere: 'Night city active. Rain detected. You do not sleep.',
    particleMode: 'rain',
    primaryColor: '#7b2ff7',
    secondaryColor: '#00e5ff',
    bgClass: 'bg-night',
  },
  deepNight: {
    greeting: 'MIDNIGHT PROTOCOL',
    subGreeting: 'The System watches. Even now, you push forward.',
    atmosphere: 'Stars aligned. Midnight cycle active. Rest soon, Hunter.',
    particleMode: 'stars',
    primaryColor: '#4a00e0',
    secondaryColor: '#00e5ff',
    bgClass: 'bg-deepNight',
  },
};

export function getWorldContext(): WorldContext {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  let timeOfDay: TimeOfDay;
  if (hour >= 5 && hour < 8) timeOfDay = 'dawn';
  else if (hour >= 8 && hour < 12) timeOfDay = 'morning';
  else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
  else if (hour >= 17 && hour < 20) timeOfDay = 'evening';
  else if (hour >= 20 && hour < 24) timeOfDay = 'night';
  else timeOfDay = 'deepNight';

  return { timeOfDay, hour, minute, ...TIME_THEMES[timeOfDay] };
}

export function getTimeString(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function getDateString(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function getDayProgress(): number {
  const now = new Date();
  const totalMinutes = 24 * 60;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return (currentMinutes / totalMinutes) * 100;
}
