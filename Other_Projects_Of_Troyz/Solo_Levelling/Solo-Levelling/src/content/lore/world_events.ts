export interface WorldEventLore {
    id: string;
    title: string;
    description: string;
    type: 'festival' | 'astronomical' | 'news';
    seasonCondition?: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
    timeCondition?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
}

export const LORE_WORLD_EVENTS: Record<string, WorldEventLore> = {
    'event_meteor_shower': {
        id: 'event_meteor_shower',
        title: 'Meteor Shower',
        description: 'A spectacular meteor shower illuminates the night sky.',
        type: 'astronomical',
        timeCondition: 'Night'
    },
    'event_marathon': {
        id: 'event_marathon',
        title: 'City Marathon Announced',
        description: 'The annual city marathon brings athletes from all over.',
        type: 'news'
    },
    'event_festival_lights': {
        id: 'event_festival_lights',
        title: 'Festival of Lights',
        description: 'The city is adorned with beautiful lights and celebrations.',
        type: 'festival',
        seasonCondition: 'Autumn'
    }
};
