import { SKILL_NODES, UnlockCondition } from '../../config/skills';

export interface PlayerSkills {
  unlocked: string[];
}

// The evaluateSkillUnlocks function was deprecated in Phase 2.5.
// Skill unlocking logic is now handled globally by the generic RuleEngine (src/engines/rules/RuleEngine.ts)
// which evaluates config/rules.ts.

export function calculatePassiveMultipliers(unlockedSkills: string[]): Record<string, number> {
  const multipliers: Record<string, number> = {};

  for (const skillId of unlockedSkills) {
    const config = SKILL_NODES[skillId];
    if (config && config.passiveEffects) {
      for (const [effect, value] of Object.entries(config.passiveEffects)) {
        multipliers[effect] = (multipliers[effect] || 1) * (value as number);
      }
    }
  }

  return multipliers;
}
