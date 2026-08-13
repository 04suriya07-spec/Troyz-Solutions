import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';

class RealityGraphEngineClass {

    constructor() {
        EventBus.subscribe('QUEST_COMPLETED', this.onQuestCompleted.bind(this));
    }

    private onQuestCompleted(event: WorldEvent) {
        const quest = event.payload.quest;
        const state = useGameState.getState();
        
        // 1. Create a node for the Quest
        const questNodeId = `node_quest_${quest.id}_${Date.now()}`;
        state.addGraphNode(questNodeId, 'quest', {
            title: quest.title,
            stat: quest.stat,
            xpReward: quest.xpReward
        });

        // 2. Link it to the Player's Life Arc (if any)
        const activeArcs = state.arcs.active;
        if (activeArcs.length > 0) {
            const arcId = `node_arc_${activeArcs[0]}`; // Using the first active arc for simplicity
            
            // Ensure the Arc node exists (we could do this on Arc Start, but we do it lazily here)
            if (!state.graph.nodes[arcId]) {
                state.addGraphNode(arcId, 'arc', { arcId: activeArcs[0] });
            }

            state.addGraphEdge(questNodeId, arcId, 'happened_during');
        }

        // 3. Link it to the Stat it improved
        const statNodeId = `node_stat_${quest.stat}`;
        if (!state.graph.nodes[statNodeId]) {
            state.addGraphNode(statNodeId, 'stat', { stat: quest.stat });
        }
        state.addGraphEdge(questNodeId, statNodeId, 'improved');

        // Note: In a fully fleshed out system, we would link this to the Weather Node, Location Node, and NPC Nodes.
    }

    public start() {
        console.log('[RealityGraphEngine] Online. Weaving the web of reality...');
    }
}

export const RealityGraphEngine = new RealityGraphEngineClass();
