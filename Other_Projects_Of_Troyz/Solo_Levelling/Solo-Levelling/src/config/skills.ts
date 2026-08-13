export interface UnlockCondition {
  stat?: string;
  minLevel?: number;
  questTags?: Record<string, number>; // e.g. { 'books': 30 }
  dependencies?: string[]; // IDs of other skills that must be unlocked
}

export interface SkillNodeConfig {
  id: string;
  treeId: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  maxLevel: number;
  unlockConditions: UnlockCondition;
  passiveEffects?: Record<string, number>; // e.g. { 'xp_multiplier_workout': 1.15 }
  activeEffects?: string[]; 
}

export interface SkillTreeConfig {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  nodes: string[]; // IDs of SkillNodeConfigs
}

export const SKILL_NODES: Record<string, SkillNodeConfig> = {
  // ─── Fitness Tree ───
  iron_body: {
    id: 'iron_body',
    treeId: 'fitness',
    name: 'Iron Body',
    description: 'Increases workout XP by 15%.',
    icon: 'Shield',
    color: '#ff2a5f',
    maxLevel: 5,
    unlockConditions: { stat: 'STR', minLevel: 30, questTags: { 'workout': 50 } },
    passiveEffects: { 'xp_multiplier_workout': 1.15 }
  },
  workout_burst: {
    id: 'workout_burst',
    treeId: 'fitness',
    name: 'Workout Burst',
    description: 'Active: Starts Gym Session with timer and music.',
    icon: 'Zap',
    color: '#ff2a5f',
    maxLevel: 1,
    unlockConditions: { stat: 'STR', minLevel: 15, dependencies: [] },
    activeEffects: ['trigger_gym_session']
  },

  // ─── Learning Tree ───
  focused_reader: {
    id: 'focused_reader',
    treeId: 'learning',
    name: 'Focused Reader',
    description: 'Reading grants more INT XP.',
    icon: 'BookOpen',
    color: '#7b2ff7',
    maxLevel: 5,
    unlockConditions: { stat: 'INT', minLevel: 15, questTags: { 'reading': 10 } },
    passiveEffects: { 'xp_multiplier_reading': 1.2 }
  },
  fast_learner: {
    id: 'fast_learner',
    treeId: 'learning',
    name: 'Fast Learner',
    description: 'Books give 2x XP.',
    icon: 'Brain',
    color: '#7b2ff7',
    maxLevel: 3,
    unlockConditions: { stat: 'INT', minLevel: 40, dependencies: ['focused_reader'] },
    passiveEffects: { 'xp_multiplier_reading': 2.0 }
  },
  deep_focus: {
    id: 'deep_focus',
    treeId: 'learning',
    name: 'Deep Focus',
    description: 'Pomodoro timer gives +25% XP.',
    icon: 'Timer',
    color: '#7b2ff7',
    maxLevel: 5,
    unlockConditions: { stat: 'DIS', minLevel: 25 },
    passiveEffects: { 'xp_multiplier_pomodoro': 1.25 }
  },
  scholar: {
    id: 'scholar',
    treeId: 'learning',
    name: 'Scholar',
    description: 'Mastery of knowledge.',
    icon: 'GraduationCap',
    color: '#7b2ff7',
    maxLevel: 1,
    unlockConditions: { stat: 'INT', minLevel: 50, questTags: { 'reading': 30 }, dependencies: ['fast_learner'] }
  },

  // ─── Exploration Tree ───
  explorer: {
    id: 'explorer',
    treeId: 'travel',
    name: 'Explorer',
    description: 'Travel gives +40% Discovery XP.',
    icon: 'Map',
    color: '#10b981',
    maxLevel: 3,
    unlockConditions: { stat: 'VIT', minLevel: 20, questTags: { 'travel': 5 } },
    passiveEffects: { 'xp_multiplier_discovery': 1.4 }
  }
};

export const SKILL_TREES: Record<string, SkillTreeConfig> = {
  fitness: {
    id: 'fitness',
    name: 'Fitness',
    description: 'Physical mastery and bodily perfection.',
    color: '#ff2a5f',
    icon: 'Dumbbell',
    nodes: ['workout_burst', 'iron_body']
  },
  learning: {
    id: 'learning',
    name: 'Learning',
    description: 'Cognitive enhancement and knowledge acquisition.',
    color: '#7b2ff7',
    icon: 'Brain',
    nodes: ['focused_reader', 'deep_focus', 'fast_learner', 'scholar']
  },
  travel: {
    id: 'travel',
    name: 'Exploration',
    description: 'Discovering the world and expanding horizons.',
    color: '#10b981',
    icon: 'Globe',
    nodes: ['explorer']
  }
};
