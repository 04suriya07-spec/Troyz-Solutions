import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EventBus } from '../event/EventEngine';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'side' | 'main' | 'penalty' | 'epic' | 'campaign';
  stat: string;
  xpReward: number;
  goldReward: number;
  completed: boolean;
  createdAt: string;
  participants?: string[];
}

export interface ShopItem {
  id: string;
  title: string;
  cost: number;
  icon: string;
}

export interface SystemLog {
  id: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'levelUp';
}


export interface Memory {
  id: string;
  title: string;
  summary: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  score: number;
  timestamp: string;
  context: {
    location?: string;
    weather?: string;
    emotion?: string;
  };
  progression: {
    questId?: string;
    campaignId?: string;
    lifeArcId?: string;
    xpEarned: number;
    statImproved?: string;
  };
  participants?: string[];
}

export interface Chronicle {
  id: string;
  type: 'Weekly' | 'Monthly' | 'Yearly' | 'Lifetime';
  title: string;
  summary: string;
  memoryIds: string[];
  timestamp: string;
}

export interface Story {
  id: string;
  scale: 'Moment' | 'Chapter' | 'Campaign' | 'LifeArc' | 'Lifetime';
  title: string;
  content: string;
  theme: string;
  genre: 'Adventure' | 'Drama' | 'Mystery' | 'Documentary' | 'Epic';
  tone: 'Triumphant' | 'Reflective' | 'Intense' | 'Calm';
  memoryIds: string[];
  npcIds: string[];
  campaignId?: string;
  timestamp: string;
}

export interface NarrativeState {
  currentTheme: string;
  currentIdentity: string;
  momentum: 'struggling' | 'steady' | 'unstoppable';
  activeConflicts: string[];
}

export interface WorldState {
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  weather: string;
  activeEvents: string[]; // IDs from LORE_WORLD_EVENTS
}

export interface RelationshipStats {
  trust: number;
  respect: number;
  affinity: number;
  lastInteraction: string;
}

export interface NPC {
  id: string;
  name: string;
  role: 'Mentor' | 'Friend' | 'Trainer' | 'Investor' | 'Rival';
  factionId?: string;
  stats: RelationshipStats;
  sharedMemoryIds: string[];
}

export interface CompanionState {
  mood: 'Celebrating' | 'Focused' | 'Curious' | 'Reflective' | 'Concerned' | 'Adventurous';
  trustLevel: number;
  dailyReflections: string[];
  activeCouncil: string[];
}

export interface ExperienceState {
  theme: 'Morning' | 'Neon' | 'Crimson' | 'Gold' | 'Glass' | 'Default';
  hudMode: 'Default' | 'Scholar' | 'Explorer' | 'IronBody';
  activeCinematic: string | null;
  orbState: 'Idle' | 'Breathing' | 'Thinking' | 'Pulse' | 'RedAura' | 'GoldenExplosion';
  dailyPhase: 'Wake' | 'MorningBrief' | 'ActiveDay' | 'EveningReflection' | 'Sleep';
  hasOnboarded: boolean;
}

export interface GameState {
  player: {
    level: number;
    xp: number;
    gold: number;
    statPoints: number;
    stats: Record<string, number>;
    statXp: Record<string, number>;
    unlockedSkills: string[];
    inventory: string[];
  };
  history: {
    questStats: Record<string, number>;
    executedRules: string[];
  };
  campaigns: {
    active: string[];
    progress: Record<string, any>; // stores state for each campaign
  };
  arcs: {
    active: string[];
    progress: Record<string, any>;
  };
  graph: {
    nodes: Record<string, any>; // id -> node data
    edges: { source: string; target: string; relation: string }[];
  };
  world: WorldState;
  narrative: NarrativeState;
  memories: Memory[];
  chronicles: Chronicle[];
  stories: Story[];
  quests: Quest[];
  shop: ShopItem[];
  logs: SystemLog[];
  npcs: Record<string, NPC>;
  companion: CompanionState;
  experience: ExperienceState;

  // ─── Actions ────────────────────────────────────────────────────────────
  gainXp: (amount: number) => void;
  gainGold: (amount: number) => void;
  addLog: (msg: string, type?: SystemLog['type']) => void;
  allocateStat: (stat: string, amount: number) => void;
  completeQuest: (id: string) => void;
  deleteQuest: (id: string, title: string) => void;
  addQuest: (q: Quest) => void;
  purchaseItem: (id: string) => void;
  unlockSkill: (skillId: string) => void;
  setExecutedRules: (rules: string[]) => void;
  startCampaign: (campaignId: string) => void;
  updateCampaignProgress: (campaignId: string, progress: any) => void;
  startArc: (arcId: string) => void;
  addGraphNode: (id: string, type: string, data: any) => void;
  addGraphEdge: (source: string, target: string, relation: string) => void;
  addMemory: (memory: Memory) => void;
  addChronicle: (chronicle: Chronicle) => void;
  addStory: (story: Story) => void;
  updateNarrativeState: (updates: Partial<NarrativeState>) => void;
  updateWorldState: (updates: Partial<WorldState>) => void;
  updateNPCStats: (npcId: string, updates: Partial<RelationshipStats>) => void;
  addNPCSharedMemory: (npcId: string, memoryId: string) => void;
  updateCompanionState: (updates: Partial<CompanionState>) => void;
  updateExperienceState: (updates: Partial<ExperienceState>) => void;
}

export const useGameState = create<GameState>()(
  persist(
    (set, get) => ({
      player: {
        level: 1,
        xp: 0,
        gold: 50,
        statPoints: 5,
        stats: { STR: 10, AGI: 10, INT: 10, VIT: 10, CHA: 10, WIS: 10, LUK: 10, END: 10, DEX: 10, CRE: 10, DIS: 10 },
        statXp: { STR: 0, AGI: 0, INT: 0, VIT: 0, CHA: 0, WIS: 0, LUK: 0, END: 0, DEX: 0, CRE: 0, DIS: 0 },
        unlockedSkills: [],
        inventory: []
      },
      history: {
        questStats: {},
        executedRules: []
      },
      campaigns: {
        active: [],
        progress: {}
      },
      arcs: {
        active: [],
        progress: {}
      },
      graph: {
        nodes: {},
        edges: []
      },
      world: {
        timeOfDay: 'Morning',
        season: 'Spring',
        weather: 'Clear',
        activeEvents: []
      },
      narrative: {
        currentTheme: 'theme_balance',
        currentIdentity: 'identity_seeker',
        momentum: 'steady',
        activeConflicts: []
      },
      memories: [],
      chronicles: [],
      stories: [],
      quests: [],
      shop: [
        { id: 's1', title: 'New Running Shoes', cost: 100, icon: 'gear' },
        { id: 's2', title: 'Programming Course', cost: 500, icon: 'knowledge' },
      ],
      logs: [],
      npcs: {
        'npc_prof_oak': {
          id: 'npc_prof_oak',
          name: 'Professor Oak',
          role: 'Mentor',
          factionId: 'faction_scholars',
          stats: { trust: 10, respect: 20, affinity: 5, lastInteraction: new Date().toISOString() },
          sharedMemoryIds: []
        }
      },
      companion: {
        mood: 'Curious',
        trustLevel: 10,
        dailyReflections: [],
        activeCouncil: ['Strategist', 'Explorer', 'Guardian']
      },
      experience: {
        theme: 'Default',
        hudMode: 'Default',
        activeCinematic: null,
        orbState: 'Idle',
        dailyPhase: 'Wake',
        hasOnboarded: false
      },

      gainXp: (amount) => set((state) => {
        let { level, xp, statPoints } = state.player;
        let newXp = xp + amount;
        let leveled = false;
        
        while (newXp >= level * 100) {
          newXp -= level * 100;
          level++;
          statPoints += 5;
          leveled = true;
        }
        
        if (leveled) {
          get().addLog(`LEVEL UP! Reached Level ${level}. +5 Attribute Points.`, 'levelUp');
        }
        
        return { player: { ...state.player, level, xp: newXp, statPoints } };
      }),

      gainGold: (amount) => set((state) => ({
        player: { ...state.player, gold: Math.max(0, state.player.gold + amount) }
      })),

      addLog: (message, type = 'info') => set((state) => {
        const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newLog = { id: Math.random().toString(36).substring(2, 9), timestamp: ts, message, type };
        return { logs: [newLog, ...state.logs.slice(0, 49)] };
      }),

      allocateStat: (stat, amount) => set((state) => {
        const { statPoints, stats } = state.player;
        if (amount > 0 && statPoints > 0) {
          return { player: { ...state.player, statPoints: statPoints - 1, stats: { ...stats, [stat]: (stats[stat] || 10) + 1 } } };
        } else if (amount < 0 && (stats[stat] || 10) > 10) {
          return { player: { ...state.player, statPoints: statPoints + 1, stats: { ...stats, [stat]: stats[stat] - 1 } } };
        }
        return state;
      }),

      completeQuest: (id) => set((state) => {
        const qIndex = state.quests.findIndex(q => q.id === id);
        if (qIndex === -1) return state;

        const newQuests = [...state.quests];
        const q = newQuests[qIndex];

        if (!q.completed) {
          newQuests[qIndex] = { ...q, completed: true };
          // We fire the event to EventBus, which then calls gainXp, gainGold, etc (handled below or in EventBus listeners)
          EventBus.publish('QUEST_COMPLETED', { quest: q });
        } else {
          newQuests[qIndex] = { ...q, completed: false };
          // For simplicity, we just undo directly here for now
          get().gainGold(-q.goldReward);
          get().gainXp(-q.xpReward);
          get().addLog(`Quest reset: "${q.title}"`, 'warning');
        }

        return { quests: newQuests };
      }),

      deleteQuest: (id, title) => set((state) => {
        get().addLog(`Quest removed: "${title}"`, 'warning');
        return { quests: state.quests.filter(q => q.id !== id) };
      }),

      addQuest: (q) => set((state) => {
        get().addLog(`New quest: [${q.type.toUpperCase()}] "${q.title}"`, 'info');
        return { quests: [...state.quests, q] };
      }),

      purchaseItem: (id) => set((state) => {
        const item = state.shop.find(s => s.id === id);
        if (!item) return state;
        
        if (state.player.gold >= item.cost) {
          get().addLog(`Reward purchased: "${item.title}" · -${item.cost} GLD`, 'success');
          return { 
            player: { 
              ...state.player, 
              gold: state.player.gold - item.cost,
              inventory: [...(state.player.inventory || []), item.title]
            } 
          };
        } else {
          get().addLog(`Not enough Gold: Need ${item.cost}, have ${state.player.gold}`, 'warning');
          return state;
        }
      }),

      unlockSkill: (skillId) => set((state) => {
        if (!state.player.unlockedSkills.includes(skillId)) {
          return { player: { ...state.player, unlockedSkills: [...state.player.unlockedSkills, skillId] } };
        }
        return state;
      }),

      setExecutedRules: (rules) => set((state) => ({
        history: { ...state.history, executedRules: rules }
      })),

      startCampaign: (campaignId) => set((state) => {
        if (!state.campaigns.active.includes(campaignId)) {
          get().addLog(`Campaign Started: ${campaignId}`, 'success');
          return { 
            campaigns: { 
              ...state.campaigns, 
              active: [...state.campaigns.active, campaignId],
              progress: { ...state.campaigns.progress, [campaignId]: { currentActIndex: 0, currentChapterIndex: 0 } }
            } 
          };
        }
        return state;
      }),

      updateCampaignProgress: (campaignId, progress) => set((state) => ({
        campaigns: {
          ...state.campaigns,
          progress: { ...state.campaigns.progress, [campaignId]: progress }
        }
      })),

      startArc: (arcId) => set((state) => {
        if (!state.arcs.active.includes(arcId)) {
          get().addLog(`Life Arc Unlocked: ${arcId}`, 'levelUp');
          return { 
            arcs: { 
              ...state.arcs, 
              active: [...state.arcs.active, arcId],
              progress: { ...state.arcs.progress, [arcId]: { startedAt: new Date().toISOString() } }
            } 
          };
        }
        return state;
      }),

      addGraphNode: (id, type, data) => set((state) => ({
        graph: {
          ...state.graph,
          nodes: { ...state.graph.nodes, [id]: { type, data, timestamp: new Date().toISOString() } }
        }
      })),

      addGraphEdge: (source, target, relation) => set((state) => ({
        graph: {
          ...state.graph,
          edges: [...state.graph.edges, { source, target, relation }]
        }
      })),

      addMemory: (memory) => set((state) => ({
        memories: [...state.memories, memory]
      })),

      addChronicle: (chronicle) => set((state) => ({
        chronicles: [...state.chronicles, chronicle]
      })),

      addStory: (story) => set((state) => ({
        stories: [...state.stories, story]
      })),

      updateNarrativeState: (updates) => set((state) => ({
        narrative: { ...state.narrative, ...updates }
      })),

      updateWorldState: (updates) => set((state) => ({
        world: { ...state.world, ...updates }
      })),

      updateNPCStats: (npcId, updates) => set((state) => {
        const npc = state.npcs[npcId];
        if (!npc) return state;
        return {
          npcs: {
            ...state.npcs,
            [npcId]: {
              ...npc,
              stats: { ...npc.stats, ...updates }
            }
          }
        };
      }),

      addNPCSharedMemory: (npcId, memoryId) => set((state) => {
        const npc = state.npcs[npcId];
        if (!npc) return state;
        if (npc.sharedMemoryIds.includes(memoryId)) return state;
        return {
          npcs: {
            ...state.npcs,
            [npcId]: {
              ...npc,
              sharedMemoryIds: [...npc.sharedMemoryIds, memoryId]
            }
          }
        };
      }),
      
      updateCompanionState: (updates) => set((state) => ({
        companion: { ...state.companion, ...updates }
      })),

      updateExperienceState: (updates) => set((state) => ({
        experience: { ...state.experience, ...updates }
      }))
    }),
    {
      name: 'ascension-state-storage', // unique name
    }
  )
);
