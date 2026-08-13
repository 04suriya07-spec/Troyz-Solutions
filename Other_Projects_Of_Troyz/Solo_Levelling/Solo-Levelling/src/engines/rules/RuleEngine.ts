import { EventBus } from '../event/EventEngine';

export interface GlobalState {
  stats: Record<string, number>;
  questHistoryStats: Record<string, number>;
  unlockedSkills: string[];
  // We can add more targets here as the app grows (e.g. inventory, location)
}

export type ConditionTarget = 'stat' | 'questHistory' | 'unlockedSkill';
export type ConditionOperator = '>=' | '<=' | '==' | '!=' | 'includes' | 'not_includes';

export interface Condition {
  target: ConditionTarget;
  key: string; 
  operator: ConditionOperator;
  value: any;
}

export interface Action {
  type: 'unlock_skill' | 'give_title' | 'spawn_quest' | 'add_log';
  payload: any;
}

export interface Rule {
  id: string;
  triggerEvent?: string; // Optional: Evaluate only when a specific EventType is fired
  conditions: Condition[];
  actions: Action[];
  repeatable?: boolean;
}

class RuleEngineClass {
  private executedRules = new Set<string>();

  public evaluateRules(rules: Rule[], state: GlobalState, triggerEvent?: string) {
    for (const rule of rules) {
      if (!rule.repeatable && this.executedRules.has(rule.id)) {
        continue;
      }

      if (rule.triggerEvent && rule.triggerEvent !== triggerEvent) {
        continue;
      }

      const passed = this.checkConditions(rule.conditions, state);
      if (passed) {
        this.executeActions(rule.actions);
        if (!rule.repeatable) {
          this.executedRules.add(rule.id);
        }
      }
    }
  }

  private checkConditions(conditions: Condition[], state: GlobalState): boolean {
    for (const cond of conditions) {
      let stateValue: any = null;

      switch (cond.target) {
        case 'stat':
          stateValue = state.stats[cond.key] || 0;
          break;
        case 'questHistory':
          stateValue = state.questHistoryStats[cond.key] || 0;
          break;
        case 'unlockedSkill':
          stateValue = state.unlockedSkills;
          break;
      }

      let conditionPassed = false;
      switch (cond.operator) {
        case '>=': conditionPassed = stateValue >= cond.value; break;
        case '<=': conditionPassed = stateValue <= cond.value; break;
        case '==': conditionPassed = stateValue === cond.value; break;
        case '!=': conditionPassed = stateValue !== cond.value; break;
        case 'includes': conditionPassed = Array.isArray(stateValue) && stateValue.includes(cond.value); break;
        case 'not_includes': conditionPassed = Array.isArray(stateValue) && !stateValue.includes(cond.value); break;
      }

      if (!conditionPassed) {
        return false;
      }
    }
    return true; // All conditions passed (Implicit AND)
  }

  private executeActions(actions: Action[]) {
    for (const action of actions) {
      // Instead of hardcoding logic, the Rule Engine simply maps Actions to EventBus events!
      switch (action.type) {
        case 'unlock_skill':
          EventBus.publish('CUSTOM', { action: 'unlock_skill', skillId: action.payload });
          break;
        case 'add_log':
          EventBus.publish('CUSTOM', { action: 'add_log', message: action.payload.msg, logType: action.payload.type });
          break;
        default:
          console.warn(`Unknown action type: ${action.type}`);
      }
    }
  }

  // To hydrate saved state (if we want to persist which rules have already fired)
  public loadExecutedRules(ruleIds: string[]) {
    this.executedRules = new Set(ruleIds);
  }

  public getExecutedRules(): string[] {
    return Array.from(this.executedRules);
  }
}

export const RuleEngine = new RuleEngineClass();
