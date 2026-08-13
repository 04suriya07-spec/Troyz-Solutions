export interface QuestTemplate {
    title: string;
    description: string;
    stat: 'STR' | 'AGI' | 'INT' | 'VIT' | 'CHA' | 'WIS' | 'LUK' | 'END' | 'DEX' | 'CRE' | 'DIS';
    baseXp: number;
    baseGold: number;
}

export const QUEST_TEMPLATES: Record<string, QuestTemplate[]> = {
    fitness: [
        { title: 'The Daily Grind', description: 'Complete 50 pushups and 50 squats.', stat: 'STR', baseXp: 50, baseGold: 10 },
        { title: 'Cardio Protocol', description: 'Run or cycle for 30 minutes.', stat: 'END', baseXp: 60, baseGold: 15 },
        { title: 'Core Awakening', description: 'Complete a 15-minute intense core workout.', stat: 'VIT', baseXp: 45, baseGold: 10 }
    ],
    intellect: [
        { title: 'Scholar of the Ancients', description: 'Read 20 pages of a non-fiction book.', stat: 'INT', baseXp: 40, baseGold: 5 },
        { title: 'Deep Work Session', description: 'Focus on a difficult mental task for 90 minutes.', stat: 'WIS', baseXp: 100, baseGold: 25 },
        { title: 'Skill Acquisition', description: 'Practice a new skill (coding, language, etc.) for 45 minutes.', stat: 'INT', baseXp: 75, baseGold: 20 }
    ],
    recovery: [
        { title: 'Mind Calibration', description: 'Meditate in silence for 15 minutes.', stat: 'WIS', baseXp: 30, baseGold: 5 },
        { title: 'Physical Restoration', description: 'Stretch or do yoga for 20 minutes.', stat: 'AGI', baseXp: 35, baseGold: 5 },
        { title: 'Vitality Recharge', description: 'Ensure 8 hours of sleep tonight.', stat: 'VIT', baseXp: 80, baseGold: 20 }
    ],
    social: [
        { title: 'Guild Maintenance', description: 'Check in with a friend or mentor you haven\'t spoken to in a while.', stat: 'CHA', baseXp: 40, baseGold: 10 },
        { title: 'Public Persona', description: 'Post or share a valuable piece of content/work publicly.', stat: 'CHA', baseXp: 60, baseGold: 15 }
    ],
    travel: [
        { title: 'Explorer\'s Path', description: 'Visit a new location in your city.', stat: 'AGI', baseXp: 90, baseGold: 25 },
        { title: 'Journey Commenced', description: 'Navigate to your travel destination safely.', stat: 'LUK', baseXp: 150, baseGold: 50 }
    ]
};
