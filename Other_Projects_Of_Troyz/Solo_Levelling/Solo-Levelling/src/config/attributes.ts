export interface AttributeConfig {
  id: string;
  name: string;
  icon: string;
  maxLevel: number;
  color: string;
  description: string;
}

export const PRIMARY_ATTRIBUTES: Record<string, AttributeConfig> = {
  STR: { id: 'STR', name: 'Strength', icon: 'Dumbbell', maxLevel: 999, color: '#ff2a5f', description: 'Physical power and raw force.' },
  AGI: { id: 'AGI', name: 'Agility', icon: 'Wind', maxLevel: 999, color: '#00e5ff', description: 'Speed, reflexes, and flexibility.' },
  INT: { id: 'INT', name: 'Intelligence', icon: 'Brain', maxLevel: 999, color: '#7b2ff7', description: 'Cognitive processing and memory.' },
  VIT: { id: 'VIT', name: 'Vitality', icon: 'Heart', maxLevel: 999, color: '#ff2a5f', description: 'Health, recovery, and immune system.' },
  CHA: { id: 'CHA', name: 'Charisma', icon: 'Smile', maxLevel: 999, color: '#f59e0b', description: 'Social influence and charm.' },
  WIS: { id: 'WIS', name: 'Wisdom', icon: 'BookOpen', maxLevel: 999, color: '#3b82f6', description: 'Intuition, life experience, and decision-making.' },
  LUK: { id: 'LUK', name: 'Luck', icon: 'Clover', maxLevel: 99, color: '#10b981', description: 'Probability manipulation and fortune.' },
  END: { id: 'END', name: 'Endurance', icon: 'Shield', maxLevel: 999, color: '#eab308', description: 'Stamina and physical resilience.' },
  DEX: { id: 'DEX', name: 'Dexterity', icon: 'Crosshair', maxLevel: 999, color: '#f97316', description: 'Fine motor skills and precision.' },
  CRE: { id: 'CRE', name: 'Creativity', icon: 'Palette', maxLevel: 999, color: '#ec4899', description: 'Innovation and out-of-the-box thinking.' },
  DIS: { id: 'DIS', name: 'Discipline', icon: 'Lock', maxLevel: 999, color: '#64748b', description: 'Consistency and willpower.' },
};

export type PrimaryStatKey = keyof typeof PRIMARY_ATTRIBUTES;

export interface DerivedStatConfig {
  id: string;
  name: string;
  calculate: (stats: Record<string, number>) => number;
  format: (val: number) => string;
  description: string;
}

export const DERIVED_STATS: Record<string, DerivedStatConfig> = {
  powerLevel: {
    id: 'powerLevel',
    name: 'Power Level',
    description: 'Overall combat and life capability.',
    calculate: (s) => Math.floor((s.STR + s.AGI + s.INT + s.VIT + s.WIS + s.END) * 1.5 + s.DIS * 2),
    format: (v) => v.toString(),
  },
  leadership: {
    id: 'leadership',
    name: 'Leadership',
    description: 'Ability to guide and inspire others.',
    calculate: (s) => Math.floor((s.CHA * 1.5) + (s.WIS * 1.2) + (s.DIS * 0.8)),
    format: (v) => v.toString(),
  },
  focus: {
    id: 'focus',
    name: 'Focus',
    description: 'Deep work capacity and attention span.',
    calculate: (s) => Math.floor((s.INT * 1.2) + (s.DIS * 1.5)),
    format: (v) => v.toString(),
  },
  mentalStability: {
    id: 'mentalStability',
    name: 'Mental Stability',
    description: 'Resistance to stress and burnout.',
    calculate: (s) => Math.floor((s.WIS * 1.2) + (s.VIT * 0.8) + (s.DIS * 1.0)),
    format: (v) => v.toString(),
  },
  businessSense: {
    id: 'businessSense',
    name: 'Business Sense',
    description: 'Strategic planning and resource management.',
    calculate: (s) => Math.floor((s.INT * 1.0) + (s.CHA * 1.0) + (s.WIS * 1.2)),
    format: (v) => v.toString(),
  },
  learningSpeed: {
    id: 'learningSpeed',
    name: 'Learning Speed',
    description: 'Rate of acquiring new skills.',
    calculate: (s) => Math.floor((s.INT * 1.5) + (s.CRE * 0.5)),
    format: (v) => `+${v}%`,
  },
  reactionTime: {
    id: 'reactionTime',
    name: 'Reaction Time',
    description: 'Physical and mental quickness.',
    calculate: (s) => Math.floor((s.AGI * 1.5) + (s.DEX * 1.0)),
    format: (v) => `${Math.max(100, 250 - v)}ms`, // Example format
  },
  resilience: {
    id: 'resilience',
    name: 'Resilience',
    description: 'Ability to bounce back from failure.',
    calculate: (s) => Math.floor((s.END * 1.2) + (s.VIT * 1.0) + (s.DIS * 1.0)),
    format: (v) => v.toString(),
  },
  confidence: {
    id: 'confidence',
    name: 'Confidence',
    description: 'Self-assurance and presence.',
    calculate: (s) => Math.floor((s.CHA * 1.5) + (s.STR * 0.5) + (s.DIS * 0.5)),
    format: (v) => v.toString(),
  },
  socialInfluence: {
    id: 'socialInfluence',
    name: 'Social Influence',
    description: 'Impact on social networks and communities.',
    calculate: (s) => Math.floor((s.CHA * 2.0) + (s.CRE * 0.5)),
    format: (v) => v.toString(),
  },
  productivity: {
    id: 'productivity',
    name: 'Productivity',
    description: 'Task completion efficiency.',
    calculate: (s) => Math.floor((s.DIS * 1.5) + (s.END * 0.8) + (s.INT * 0.5)),
    format: (v) => `+${Math.floor(v/2)}%`,
  }
};
