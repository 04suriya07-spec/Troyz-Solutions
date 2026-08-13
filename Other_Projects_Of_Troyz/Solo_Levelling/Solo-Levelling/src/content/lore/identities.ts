export interface CharacterIdentity {
    id: string;
    title: string;
    description: string;
    requiredDominantStats: string[];
}

export const LORE_IDENTITIES: Record<string, CharacterIdentity> = {
    identity_seeker: {
        id: 'identity_seeker',
        title: 'The Seeker',
        description: 'Searching for purpose and establishing the foundation.',
        requiredDominantStats: [] // Default starting identity
    },
    identity_explorer: {
        id: 'identity_explorer',
        title: 'The Explorer',
        description: 'Always on the move, finding new experiences and horizons.',
        requiredDominantStats: ['AGI', 'LUK']
    },
    identity_scholar: {
        id: 'identity_scholar',
        title: 'The Scholar',
        description: 'Dedicated to the pursuit of knowledge and intellectual growth.',
        requiredDominantStats: ['INT', 'WIS']
    },
    identity_guardian: {
        id: 'identity_guardian',
        title: 'The Guardian',
        description: 'A disciplined protector, building unshakeable physical resilience.',
        requiredDominantStats: ['STR', 'END', 'VIT', 'DIS']
    },
    identity_leader: {
        id: 'identity_leader',
        title: 'The Leader',
        description: 'A charismatic force that connects and guides others.',
        requiredDominantStats: ['CHA']
    }
};
