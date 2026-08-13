import { Rule } from '../engines/rules/RuleEngine';

export const GLOBAL_RULES: Rule[] = [
  // ─── Fitness Rules ───
  {
    id: 'unlock_iron_body',
    conditions: [
      { target: 'stat', key: 'STR', operator: '>=', value: 30 },
      { target: 'questHistory', key: 'STR', operator: '>=', value: 50 },
    ],
    actions: [
      { type: 'unlock_skill', payload: 'iron_body' },
      { type: 'add_log', payload: { msg: 'Passive Unlocked: Iron Body', type: 'success' } }
    ]
  },
  {
    id: 'unlock_workout_burst',
    conditions: [
      { target: 'stat', key: 'STR', operator: '>=', value: 15 },
    ],
    actions: [
      { type: 'unlock_skill', payload: 'workout_burst' },
      { type: 'add_log', payload: { msg: 'Active Unlocked: Workout Burst', type: 'success' } }
    ]
  },

  // ─── Learning Rules ───
  {
    id: 'unlock_focused_reader',
    conditions: [
      { target: 'stat', key: 'INT', operator: '>=', value: 15 },
      { target: 'questHistory', key: 'INT', operator: '>=', value: 10 },
    ],
    actions: [
      { type: 'unlock_skill', payload: 'focused_reader' },
      { type: 'add_log', payload: { msg: 'Passive Unlocked: Focused Reader', type: 'success' } }
    ]
  },
  {
    id: 'unlock_fast_learner',
    conditions: [
      { target: 'stat', key: 'INT', operator: '>=', value: 40 },
      { target: 'unlockedSkill', key: '', operator: 'includes', value: 'focused_reader' },
    ],
    actions: [
      { type: 'unlock_skill', payload: 'fast_learner' },
      { type: 'add_log', payload: { msg: 'Passive Unlocked: Fast Learner', type: 'success' } }
    ]
  },
  {
    id: 'unlock_deep_focus',
    conditions: [
      { target: 'stat', key: 'DIS', operator: '>=', value: 25 },
    ],
    actions: [
      { type: 'unlock_skill', payload: 'deep_focus' },
      { type: 'add_log', payload: { msg: 'Passive Unlocked: Deep Focus', type: 'success' } }
    ]
  },
  {
    id: 'unlock_scholar',
    conditions: [
      { target: 'stat', key: 'INT', operator: '>=', value: 50 },
      { target: 'questHistory', key: 'INT', operator: '>=', value: 30 },
      { target: 'unlockedSkill', key: '', operator: 'includes', value: 'fast_learner' },
    ],
    actions: [
      { type: 'unlock_skill', payload: 'scholar' },
      { type: 'add_log', payload: { msg: 'Title Unlocked: Scholar', type: 'success' } }
    ]
  },

  // ─── Exploration Rules ───
  {
    id: 'unlock_explorer',
    conditions: [
      { target: 'stat', key: 'VIT', operator: '>=', value: 20 },
      { target: 'questHistory', key: 'VIT', operator: '>=', value: 5 },
    ],
    actions: [
      { type: 'unlock_skill', payload: 'explorer' },
      { type: 'add_log', payload: { msg: 'Title Unlocked: Explorer', type: 'success' } }
    ]
  }
];
