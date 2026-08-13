export interface Campaign {
    id: string;
    title: string;
    description: string;
    category: 'fitness' | 'intellect' | 'career' | 'social';
    acts: Act[];
}

export interface Act {
    id: string;
    title: string;
    description: string;
    chapters: Chapter[];
}

export interface Chapter {
    id: string;
    title: string;
    description: string;
    objectives: {
        type: 'stat_reach' | 'quest_complete' | 'boss_defeat';
        target: string;
        amount: number;
    }[];
    rewards: {
        xp: number;
        titles: string[];
    };
}

export const CAMPAIGN_IRON_BODY: Campaign = {
    id: 'camp_iron_body',
    title: 'The Iron Body',
    description: 'A 6-month campaign to forge an unbreakable physical foundation.',
    category: 'fitness',
    acts: [
        {
            id: 'act_1_foundation',
            title: 'Act 1: The Foundation',
            description: 'Establish the core habits of physical training.',
            chapters: [
                {
                    id: 'chap_1_awakening',
                    title: 'Chapter 1: The Awakening',
                    description: 'Prove your consistency by completing daily physical training.',
                    objectives: [
                        { type: 'quest_complete', target: 'fitness', amount: 5 }
                    ],
                    rewards: { xp: 500, titles: ['The Awakened'] }
                },
                {
                    id: 'chap_2_strength',
                    title: 'Chapter 2: Rising Strength',
                    description: 'Push your physical attributes to the next tier.',
                    objectives: [
                        { type: 'stat_reach', target: 'STR', amount: 15 },
                        { type: 'stat_reach', target: 'END', amount: 15 }
                    ],
                    rewards: { xp: 1000, titles: ['Iron Novice'] }
                }
            ]
        },
        {
            id: 'act_2_discipline',
            title: 'Act 2: The Discipline',
            description: 'Break through your limits.',
            chapters: [
                {
                    id: 'chap_3_boss',
                    title: 'Chapter 3: The First Wall',
                    description: 'Face a massive physical challenge.',
                    objectives: [
                        { type: 'boss_defeat', target: 'boss_5k_run', amount: 1 }
                    ],
                    rewards: { xp: 2000, titles: ['Wall Breaker'] }
                }
            ]
        }
    ]
};
