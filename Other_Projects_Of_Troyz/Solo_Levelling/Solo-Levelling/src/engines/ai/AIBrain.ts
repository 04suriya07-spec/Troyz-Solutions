import type { WorldContext } from '../world/WorldEngine';

export interface AIMessage {
  id: string;
  text: string;
  type: 'greeting' | 'quest' | 'warning' | 'achievement' | 'system' | 'tip';
  priority: 'low' | 'normal' | 'high' | 'critical';
}

const PLAYER_NAME = 'Suriya';

export class AIBrain {
  private name: string;

  constructor(playerName: string = PLAYER_NAME) {
    this.name = playerName;
  }

  getBootLines(world: WorldContext, level: number, incompleteCount: number): string[] {
    const lines: string[] = [
      'ASCENSION OS v2.0 — INITIALIZING...',
      'LOADING PLAYER IDENTITY...',
      'SYNCING WORLD STATE ENGINE...',
      'CALIBRATING QUEST PARAMETERS...',
      'ALL SYSTEMS OPERATIONAL.',
      '',
      `${world.greeting}, ${this.name}.`,
      '',
    ];

    if (incompleteCount > 0) {
      lines.push(
        `I have detected ${incompleteCount} active mission${incompleteCount > 1 ? 's' : ''} awaiting your execution.`
      );
    } else {
      lines.push(`All previous objectives cleared. New challenges have been prepared.`);
    }

    lines.push(world.atmosphere);
    lines.push(`Level ${level} operative — standing by.`);
    return lines;
  }

  getLiveTicker(world: WorldContext, level: number, gold: number, xpPercent: number): string[] {
    const tickers = [
      `⚡ ${world.greeting}, ${this.name} — ${world.subGreeting}`,
      `📡 HUNTER STATUS — Level ${level} Operative — All Systems Active`,
      `🌐 WORLD ENGINE — ${world.atmosphere}`,
      `💰 GOLD RESERVE: ${gold} GLD — Discipline yields dividends`,
      `🎯 XP PROGRESS: ${Math.round(xpPercent)}% — Stay on course, ${this.name}`,
      `⚔️ Complete your daily quests before the cycle resets`,
      `💠 ASCENSION OS — Monitoring your growth. Every action recorded.`,
      `🔮 The System recognizes your consistency. Keep pushing.`,
    ];

    if (xpPercent >= 90) {
      tickers.unshift(`🔥 CRITICAL: You are ${Math.round(100 - xpPercent)}% from a Level breakthrough — PUSH THROUGH`);
    }

    return tickers;
  }

  getContextualMessage(
    world: WorldContext,
    level: number,
    xp: number,
    xpNeeded: number,
    gold: number
  ): AIMessage {
    const xpPercent = (xp / xpNeeded) * 100;
    const xpRemaining = xpNeeded - xp;

    if (xpPercent >= 90) {
      return {
        id: 'xp-critical',
        text: `${this.name}. You need only ${xpRemaining} XP to break through to Level ${level + 1}. The threshold is close.`,
        type: 'achievement',
        priority: 'high',
      };
    }

    if (gold >= 200) {
      return {
        id: 'gold-rich',
        text: `Your gold reserves are substantial. Consider claiming a reward from the System Store.`,
        type: 'tip',
        priority: 'low',
      };
    }

    const pool: AIMessage[] = [
      {
        id: 'm1',
        text: `Level ${level} operative. ${world.subGreeting}`,
        type: 'system',
        priority: 'normal',
      },
      {
        id: 'm2',
        text: `${world.atmosphere} Stay focused, ${this.name}.`,
        type: 'system',
        priority: 'normal',
      },
      {
        id: 'm3',
        text: `Each completed quest brings you closer to becoming unstoppable. Continue.`,
        type: 'tip',
        priority: 'low',
      },
      {
        id: 'm4',
        text: `The System is always watching. Your consistency has been logged.`,
        type: 'system',
        priority: 'low',
      },
      {
        id: 'm5',
        text: `Gold reserve: ${gold} GLD. Discipline yields dividends. Keep earning.`,
        type: 'tip',
        priority: 'low',
      },
    ];

    return pool[Math.floor(Date.now() / 30000) % pool.length];
  }

  getQuestNarration(title: string, xp: number, gold: number, stat: string): string {
    const lines = [
      `Quest cleared — "${title}". Power acknowledged. +${xp} XP absorbed.`,
      `Objective complete. "${title}" — logged. +${xp} XP, +${gold} GLD transferred.`,
      `Mission success. The System records your growth in ${stat}. Well done, ${this.name}.`,
      `"${title}" — eliminated. Rewards extracted. Ascension continues.`,
      `Acknowledged. +${xp} XP surge detected. Keep this momentum.`,
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  getLevelUpLines(newLevel: number): string[] {
    return [
      '⚡ POWER SURGE DETECTED ⚡',
      '',
      'ASCENSION THRESHOLD BREACHED.',
      '',
      `${this.name} has reached LEVEL ${newLevel}.`,
      '',
      '"Your strength has been acknowledged by the System.',
      'New limits have been unlocked."',
      '',
      '+ 5 ATTRIBUTE POINTS GRANTED',
    ];
  }

  getPenaltyNarration(missedCount: number): string {
    return `Warning, ${this.name}. You have abandoned ${missedCount} mission${missedCount > 1 ? 's' : ''}. The System does not forget. A Penalty Quest has been issued. Complete it to restore your standing.`;
  }

  getWorldEventMessages(world: WorldContext): Array<{ icon: string; title: string; desc: string; color: string }> {
    const hour = world.hour;

    const events = [
      {
        icon: '🌧️',
        title: 'RAIN DETECTED',
        desc: 'Atmospheric conditions: Rain. Indoor training quest active.',
        color: '#7b2ff7',
      },
      {
        icon: '🌙',
        title: 'NIGHT CYCLE',
        desc: `${hour}:00 — The city is quiet. Your rivals sleep. You do not.`,
        color: '#4a00e0',
      },
      {
        icon: '⚡',
        title: 'ENERGY WINDOW',
        desc: 'Peak performance hours. Maximize output now.',
        color: '#00e5ff',
      },
      {
        icon: '🎯',
        title: 'FOCUS MODE',
        desc: 'No distractions permitted. Mission completion priority: HIGH.',
        color: '#ff6b35',
      },
      {
        icon: '🏙️',
        title: 'CITY LIGHTS ON',
        desc: 'Urban environment active. Hidden quests may appear.',
        color: '#ffd32a',
      },
    ];

    // Show relevant events based on time
    if (world.particleMode === 'rain') {
      return [events[0], events[1], events[3]];
    } else if (world.timeOfDay === 'morning') {
      return [events[2], events[3]];
    } else if (world.timeOfDay === 'evening' || world.timeOfDay === 'night') {
      return [events[1], events[4], events[3]];
    }
    return [events[2], events[3], events[4]];
  }
}

export const aiBrain = new AIBrain();
