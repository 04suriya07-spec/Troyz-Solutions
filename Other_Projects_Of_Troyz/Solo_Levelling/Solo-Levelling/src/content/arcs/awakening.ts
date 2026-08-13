export interface LifeArc {
    id: string;
    title: string;
    realm: 'Education' | 'Career' | 'Physical' | 'Exploration' | 'Universal';
    description: string;
    unlockConditions: { type: 'level' | 'stat_reach' | 'campaign_complete', target?: string, amount: number }[];
    campaigns: string[];
}

export const ARC_AWAKENING: LifeArc = {
    id: 'arc_awakening',
    title: 'The Awakening Era',
    realm: 'Universal',
    description: 'The beginning of the journey. Establishing the baseline physical and mental systems.',
    unlockConditions: [
        { type: 'level', amount: 1 } // Unlocked by default
    ],
    campaigns: [
        'camp_iron_body'
    ]
};
