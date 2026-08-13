export interface FactionLore {
    id: string;
    name: string;
    description: string;
    coreStats: string[];
}

export const LORE_FACTIONS: Record<string, FactionLore> = {
    'faction_explorers': {
        id: 'faction_explorers',
        name: 'The Explorers Guild',
        description: 'Dedicated to discovering the unknown and mapping the world.',
        coreStats: ['AGI', 'LUK']
    },
    'faction_scholars': {
        id: 'faction_scholars',
        name: 'The Scholars Guild',
        description: 'Preserving knowledge, science, and history.',
        coreStats: ['INT', 'WIS']
    },
    'faction_builders': {
        id: 'faction_builders',
        name: 'The Builders Guild',
        description: 'Constructing the future through engineering and creativity.',
        coreStats: ['CRE', 'INT']
    },
    'faction_guardians': {
        id: 'faction_guardians',
        name: 'The Guardians Guild',
        description: 'Protectors who value physical resilience and discipline.',
        coreStats: ['STR', 'END', 'VIT']
    }
};
