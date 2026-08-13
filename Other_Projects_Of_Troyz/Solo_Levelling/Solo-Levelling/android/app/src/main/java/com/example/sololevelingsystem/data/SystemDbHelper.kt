package com.example.sololevelingsystem.data

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.UUID

data class PlayerStats(
    val level: Int,
    val xp: Int,
    val gold: Int,
    val statPoints: Int,
    val str: Int,
    val intel: Int, // 'int' is a reserved keyword
    val vit: Int,
    val wis: Int,
    val cha: Int,
    val gld: Int
)

data class Quest(
    val id: String,
    val title: String,
    val description: String,
    val type: String, // daily, side, main, penalty
    val stat: String, // STR, INT, VIT, WIS, CHA, GLD
    val xpReward: Int,
    val goldReward: Int,
    val completed: Boolean,
    val createdAt: String
)

data class ShopItem(
    val id: String,
    val title: String,
    val description: String,
    val cost: Int
)

data class SystemLog(
    val id: String,
    val timestamp: String,
    val message: String,
    val type: String // info, success, warning, levelUp
)

class SystemDbHelper(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {

    companion object {
        private const val DATABASE_NAME = "solo_leveling_system.db"
        private const val DATABASE_VERSION = 1
    }

    override fun onCreate(db: SQLiteDatabase) {
        // 1. Create tables
        db.execSQL("""
            CREATE TABLE player_stats (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                level INTEGER DEFAULT 1,
                xp INTEGER DEFAULT 0,
                gold INTEGER DEFAULT 50,
                stat_points INTEGER DEFAULT 5,
                str INTEGER DEFAULT 10,
                intel INTEGER DEFAULT 10,
                vit INTEGER DEFAULT 10,
                wis INTEGER DEFAULT 10,
                cha INTEGER DEFAULT 10,
                gld INTEGER DEFAULT 10
            )
        """)

        db.execSQL("""
            CREATE TABLE quests (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                type TEXT,
                stat TEXT,
                xp_reward INTEGER,
                gold_reward INTEGER,
                completed INTEGER,
                created_at TEXT
            )
        """)

        db.execSQL("""
            CREATE TABLE shop_items (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                cost INTEGER
            )
        """)

        db.execSQL("""
            CREATE TABLE system_logs (
                id TEXT PRIMARY KEY,
                timestamp TEXT,
                message TEXT,
                type TEXT
            )
        """)

        // 2. Seed default values
        db.execSQL("""
            INSERT INTO player_stats (id, level, xp, gold, stat_points, str, intel, vit, wis, cha, gld) 
            VALUES (1, 1, 0, 50, 5, 10, 10, 10, 10, 10, 10)
        """)

        // Default Quests
        val defaultQuests = listOf(
            Quest("q-1", "Daily Training: Physical Body", "Complete 30 push-ups, 30 sit-ups, 30 squats, and a 2km run.", "daily", "STR", 20, 10, false, Date().toString()),
            Quest("q-2", "Daily Training: Intellect", "Read a book or study a technical topic for 25 minutes.", "daily", "INT", 20, 10, false, Date().toString()),
            Quest("q-3", "Vitality Recovery Protocol", "Drink 3 liters of water and eat clean meals with no junk food today.", "daily", "VIT", 15, 5, false, Date().toString()),
            Quest("q-4", "Mind Calibration", "10 minutes of meditation, breathing exercises, or reflective journaling.", "daily", "WIS", 15, 5, false, Date().toString()),
            Quest("q-5", "Awaken the Founder", "Complete a main milestone for your entrepreneurship or career project.", "main", "GLD", 100, 50, false, Date().toString())
        )
        for (q in defaultQuests) {
            val cv = ContentValues().apply {
                put("id", q.id)
                put("title", q.title)
                put("description", q.description)
                put("type", q.type)
                put("stat", q.stat)
                put("xp_reward", q.xpReward)
                put("gold_reward", q.goldReward)
                put("completed", if (q.completed) 1 else 0)
                put("created_at", q.createdAt)
            }
            db.insert("quests", null, cv)
        }

        // Default Shop items
        val defaultShop = listOf(
            ShopItem("s-1", "1-Hour Video Game Session", "Unlock 1 hour of guilt-free video game time.", 30),
            ShopItem("s-2", "Cheat Meal Protocol", "Redeem for a delicious treat or cheat meal of your choice.", 60),
            ShopItem("s-3", "1-Hour Entertainment Scroll", "Unlock 1 hour of streaming or social media.", 25),
            ShopItem("s-4", "Rest & Recovery Day", "Pardon all daily quests for a single day without penalty.", 100)
        )
        for (s in defaultShop) {
            val cv = ContentValues().apply {
                put("id", s.id)
                put("title", s.title)
                put("description", s.description)
                put("cost", s.cost)
            }
            db.insert("shop_items", null, cv)
        }

        // Initial system log
        val logTime = SimpleDateFormat("hh:mm:ss a", Locale.getDefault()).format(Date())
        val logCv = ContentValues().apply {
            put("id", UUID.randomUUID().toString())
            put("timestamp", logTime)
            put("message", "System initiated on Android device. Welcome, Hunter.")
            put("type", "info")
        }
        db.insert("system_logs", null, logCv)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        db.execSQL("DROP TABLE IF EXISTS player_stats")
        db.execSQL("DROP TABLE IF EXISTS quests")
        db.execSQL("DROP TABLE IF EXISTS shop_items")
        db.execSQL("DROP TABLE IF EXISTS system_logs")
        onCreate(db)
    }

    // --- Database Read/Write Functions ---

    fun getPlayerStats(): PlayerStats {
        val db = this.readableDatabase
        val cursor = db.rawQuery("SELECT * FROM player_stats WHERE id = 1", null)
        var stats = PlayerStats(1, 0, 50, 5, 10, 10, 10, 10, 10, 10)
        if (cursor.moveToFirst()) {
            stats = PlayerStats(
                level = cursor.getInt(cursor.getColumnIndexOrThrow("level")),
                xp = cursor.getInt(cursor.getColumnIndexOrThrow("xp")),
                gold = cursor.getInt(cursor.getColumnIndexOrThrow("gold")),
                statPoints = cursor.getInt(cursor.getColumnIndexOrThrow("stat_points")),
                str = cursor.getInt(cursor.getColumnIndexOrThrow("str")),
                intel = cursor.getInt(cursor.getColumnIndexOrThrow("intel")),
                vit = cursor.getInt(cursor.getColumnIndexOrThrow("vit")),
                wis = cursor.getInt(cursor.getColumnIndexOrThrow("wis")),
                cha = cursor.getInt(cursor.getColumnIndexOrThrow("cha")),
                gld = cursor.getInt(cursor.getColumnIndexOrThrow("gld"))
            )
        }
        cursor.close()
        return stats
    }

    fun updatePlayerStats(stats: PlayerStats) {
        val db = this.writableDatabase
        val cv = ContentValues().apply {
            put("level", stats.level)
            put("xp", stats.xp)
            put("gold", stats.gold)
            put("stat_points", stats.statPoints)
            put("str", stats.str)
            put("intel", stats.intel)
            put("vit", stats.vit)
            put("wis", stats.wis)
            put("cha", stats.cha)
            put("gld", stats.gld)
        }
        db.update("player_stats", cv, "id = 1", null)
    }

    fun getAllQuests(): List<Quest> {
        val db = this.readableDatabase
        val cursor = db.rawQuery("SELECT * FROM quests", null)
        val list = mutableListOf<Quest>()
        while (cursor.moveToNext()) {
            list.add(
                Quest(
                    id = cursor.getString(cursor.getColumnIndexOrThrow("id")),
                    title = cursor.getString(cursor.getColumnIndexOrThrow("title")),
                    description = cursor.getString(cursor.getColumnIndexOrThrow("description")),
                    type = cursor.getString(cursor.getColumnIndexOrThrow("type")),
                    stat = cursor.getString(cursor.getColumnIndexOrThrow("stat")),
                    xpReward = cursor.getInt(cursor.getColumnIndexOrThrow("xp_reward")),
                    goldReward = cursor.getInt(cursor.getColumnIndexOrThrow("gold_reward")),
                    completed = cursor.getInt(cursor.getColumnIndexOrThrow("completed")) == 1,
                    createdAt = cursor.getString(cursor.getColumnIndexOrThrow("created_at"))
                )
            )
        }
        cursor.close()
        return list
    }

    fun insertQuest(q: Quest) {
        val db = this.writableDatabase
        val cv = ContentValues().apply {
            put("id", q.id)
            put("title", q.title)
            put("description", q.description)
            put("type", q.type)
            put("stat", q.stat)
            put("xp_reward", q.xpReward)
            put("gold_reward", q.goldReward)
            put("completed", if (q.completed) 1 else 0)
            put("created_at", q.createdAt)
        }
        db.insert("quests", null, cv)
    }

    fun updateQuestCompleted(id: String, completed: Boolean) {
        val db = this.writableDatabase
        val cv = ContentValues().apply {
            put("completed", if (completed) 1 else 0)
        }
        db.update("quests", cv, "id = ?", arrayOf(id))
    }

    fun deleteQuest(id: String) {
        val db = this.writableDatabase
        db.delete("quests", "id = ?", arrayOf(id))
    }

    fun getAllShopItems(): List<ShopItem> {
        val db = this.readableDatabase
        val cursor = db.rawQuery("SELECT * FROM shop_items", null)
        val list = mutableListOf<ShopItem>()
        while (cursor.moveToNext()) {
            list.add(
                ShopItem(
                    id = cursor.getString(cursor.getColumnIndexOrThrow("id")),
                    title = cursor.getString(cursor.getColumnIndexOrThrow("title")),
                    description = cursor.getString(cursor.getColumnIndexOrThrow("description")),
                    cost = cursor.getInt(cursor.getColumnIndexOrThrow("cost"))
                )
            )
        }
        cursor.close()
        return list
    }

    fun insertShopItem(item: ShopItem) {
        val db = this.writableDatabase
        val cv = ContentValues().apply {
            put("id", item.id)
            put("title", item.title)
            put("description", item.description)
            put("cost", item.cost)
        }
        db.insert("shop_items", null, cv)
    }

    fun deleteShopItem(id: String) {
        val db = this.writableDatabase
        db.delete("shop_items", "id = ?", arrayOf(id))
    }

    fun getAllLogs(): List<SystemLog> {
        val db = this.readableDatabase
        val cursor = db.rawQuery("SELECT * FROM system_logs ORDER BY rowid DESC LIMIT 50", null)
        val list = mutableListOf<SystemLog>()
        while (cursor.moveToNext()) {
            list.add(
                SystemLog(
                    id = cursor.getString(cursor.getColumnIndexOrThrow("id")),
                    timestamp = cursor.getString(cursor.getColumnIndexOrThrow("timestamp")),
                    message = cursor.getString(cursor.getColumnIndexOrThrow("message")),
                    type = cursor.getString(cursor.getColumnIndexOrThrow("type"))
                )
            )
        }
        cursor.close()
        return list
    }

    fun insertLog(message: String, type: String = "info") {
        val db = this.writableDatabase
        val logTime = SimpleDateFormat("hh:mm:ss a", Locale.getDefault()).format(Date())
        val cv = ContentValues().apply {
            put("id", UUID.randomUUID().toString())
            put("timestamp", logTime)
            put("message", message)
            put("type", type)
        }
        db.insert("system_logs", null, cv)
    }
}
