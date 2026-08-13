export interface NarrativeTheme {
    id: string;
    name: string;
    description: string;
    triggerStats: string[]; // Stats that push the story towards this theme
}

export const LORE_THEMES: Record<string, NarrativeTheme> = {
    theme_discipline: {
        id: 'theme_discipline',
        name: 'Discipline',
        description: 'A chapter defined by rigorous routine and physical mastery.',
        triggerStats: ['STR', 'END', 'VIT', 'DIS']
    },
    theme_growth: {
        id: 'theme_growth',
        name: 'Growth',
        description: 'A chapter of intellectual expansion and learning.',
        triggerStats: ['INT', 'WIS', 'CRE']
    },
    theme_adventure: {
        id: 'theme_adventure',
        name: 'Adventure',
        description: 'A chapter of movement, travel, and new horizons.',
        triggerStats: ['AGI', 'LUK']
    },
    theme_connection: {
        id: 'theme_connection',
        name: 'Connection',
        description: 'A chapter focused on building relationships and community.',
        triggerStats: ['CHA']
    },
    theme_balance: {
        id: 'theme_balance',
        name: 'Balance',
        description: 'A tranquil chapter, maintaining the status quo and finding peace.',
        triggerStats: [] // Default/fallback
    }
};
