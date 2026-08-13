package com.example.sololevelingsystem.ui.main

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.AndroidViewModel
import com.example.sololevelingsystem.data.PlayerStats
import com.example.sololevelingsystem.data.Quest
import com.example.sololevelingsystem.data.ShopItem
import com.example.sololevelingsystem.data.SystemDbHelper
import com.example.sololevelingsystem.data.SystemLog
import java.util.UUID

class MainScreenViewModel(application: Application) : AndroidViewModel(application) {
    private val db = SystemDbHelper(application)

    var playerStats by mutableStateOf(db.getPlayerStats())
        private set

    var quests by mutableStateOf(db.getAllQuests())
        private set

    var shopItems by mutableStateOf(db.getAllShopItems())
        private set

    var logs by mutableStateOf(db.getAllLogs())
        private set

    var activeTab by mutableStateOf("daily")
    var showLevelUp by mutableStateOf(false)
    var levelUpVal by mutableStateOf(1)

    private fun reloadAll() {
        playerStats = db.getPlayerStats()
        quests = db.getAllQuests()
        shopItems = db.getAllShopItems()
        logs = db.getAllLogs()
    }

    fun completeQuest(id: String) {
        val quest = quests.find { it.id == id } ?: return
        val newCompleted = !quest.completed
        db.updateQuestCompleted(id, newCompleted)

        val stats = playerStats
        val factor = if (newCompleted) 1 else -1

        val goldDiff = quest.goldReward * factor
        val xpDiff = quest.xpReward * factor

        val newStr = stats.str + if (quest.stat == "STR") factor else 0
        val newInt = stats.intel + if (quest.stat == "INT") factor else 0
        val newVit = stats.vit + if (quest.stat == "VIT") factor else 0
        val newWis = stats.wis + if (quest.stat == "WIS") factor else 0
        val newCha = stats.cha + if (quest.stat == "CHA") factor else 0
        val newGld = stats.gld + if (quest.stat == "GLD") factor else 0

        var newXp = stats.xp + xpDiff
        var newLevel = stats.level
        var unspentPoints = stats.statPoints
        var levelUpTriggered = false

        if (newXp < 0) newXp = 0

        if (factor > 0) {
            while (newXp >= newLevel * 100) {
                newXp -= newLevel * 100
                newLevel += 1
                unspentPoints += 5
                levelUpTriggered = true
            }
        }

        val updatedStats = PlayerStats(
            level = newLevel,
            xp = newXp,
            gold = maxOf(0, stats.gold + goldDiff),
            statPoints = unspentPoints,
            str = maxOf(10, newStr),
            intel = maxOf(10, newInt),
            vit = maxOf(10, newVit),
            wis = maxOf(10, newWis),
            cha = maxOf(10, newCha),
            gld = maxOf(10, newGld)
        )

        db.updatePlayerStats(updatedStats)

        if (newCompleted) {
            db.insertLog("Quest cleared: \"${quest.title}\". Gained +${quest.xpReward} XP, +${quest.goldReward} Gold, +1 ${quest.stat}.", "success")
        } else {
            db.insertLog("Quest reset: \"${quest.title}\". Rewards retracted.", "warning")
        }

        if (levelUpTriggered) {
            levelUpVal = newLevel
            showLevelUp = true
            db.insertLog("LEVEL UP! Gained +5 Stat Points. Level $newLevel reached.", "levelUp")
        }

        reloadAll()
    }

    fun distributeStatPoint(stat: String) {
        val stats = playerStats
        if (stats.statPoints <= 0) return

        val newStr = stats.str + if (stat == "STR") 1 else 0
        val newInt = stats.intel + if (stat == "INT") 1 else 0
        val newVit = stats.vit + if (stat == "VIT") 1 else 0
        val newWis = stats.wis + if (stat == "WIS") 1 else 0
        val newCha = stats.cha + if (stat == "CHA") 1 else 0
        val newGld = stats.gld + if (stat == "GLD") 1 else 0

        val updatedStats = PlayerStats(
            level = stats.level,
            xp = stats.xp,
            gold = stats.gold,
            statPoints = stats.statPoints - 1,
            str = newStr,
            intel = newInt,
            vit = newVit,
            wis = newWis,
            cha = newCha,
            gld = newGld
        )

        db.updatePlayerStats(updatedStats)
        db.insertLog("Distributed 1 Stat Point to $stat.", "info")
        reloadAll()
    }

    fun addQuest(title: String, desc: String, type: String, stat: String, xp: Int, gold: Int) {
        val newQ = Quest(
            id = "q-" + UUID.randomUUID().toString().substring(0, 8),
            title = title,
            description = desc.ifBlank { "No additional details." },
            type = type,
            stat = stat,
            xpReward = xp,
            goldReward = gold,
            completed = false,
            createdAt = java.util.Date().toString()
        )
        db.insertQuest(newQ)
        db.insertLog("New quest manifest: [${type.uppercase()}] \"$title\"", "info")
        reloadAll()
    }

    fun deleteQuest(id: String, title: String) {
        db.deleteQuest(id)
        db.insertLog("Quest discarded: \"$title\"", "warning")
        reloadAll()
    }

    fun purchaseReward(id: String) {
        val item = shopItems.find { it.id == id } ?: return
        val stats = playerStats
        if (stats.gold >= item.cost) {
            val updatedStats = stats.copy(gold = stats.gold - item.cost)
            db.updatePlayerStats(updatedStats)
            db.insertLog("Redeemed shop reward: \"${item.title}\" (-${item.cost} GLD).", "success")
            reloadAll()
        } else {
            db.insertLog("Insufficient GLD to purchase: \"${item.title}\" (Cost: ${item.cost} GLD).", "warning")
            reloadAll()
        }
    }

    fun addShopItem(title: String, desc: String, cost: Int) {
        val newItem = ShopItem(
            id = "s-" + UUID.randomUUID().toString().substring(0, 8),
            title = title,
            description = desc.ifBlank { "Custom reward." },
            cost = cost
        )
        db.insertShopItem(newItem)
        db.insertLog("Added custom store reward: \"$title\" (Cost: $cost GLD).", "info")
        reloadAll()
    }

    fun triggerDailyReset() {
        val uncompletedDailies = quests.filter { it.type == "daily" && !it.completed }
        if (uncompletedDailies.isNotEmpty()) {
            val penaltyQuest = Quest(
                id = "p-q-" + UUID.randomUUID().toString().substring(0, 8),
                title = "PENALTY QUEST: Survival Challenge",
                description = "Failed to clear ${uncompletedDailies.size} Daily habits. Complete 100 pushups or draft a recovery strategy.",
                type = "penalty",
                stat = "VIT",
                xpReward = 0,
                goldReward = 0,
                completed = false,
                createdAt = java.util.Date().toString()
            )
            db.insertQuest(penaltyQuest)

            quests.filter { it.type == "daily" }.forEach {
                db.updateQuestCompleted(it.id, false)
            }
            activeTab = "penalty"
            db.insertLog("WARNING: Daily reset failed. Penalty quest initiated!", "warning")
        } else {
            quests.filter { it.type == "daily" }.forEach {
                db.updateQuestCompleted(it.id, false)
            }
            db.insertLog("Daily cycle reset. Excellent work clearing all daily milestones!", "success")
        }
        reloadAll()
    }
}
