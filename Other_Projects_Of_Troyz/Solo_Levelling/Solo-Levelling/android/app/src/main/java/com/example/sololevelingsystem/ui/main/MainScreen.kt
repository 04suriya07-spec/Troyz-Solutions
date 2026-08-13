package com.example.sololevelingsystem.ui.main

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation3.runtime.NavKey
import com.example.sololevelingsystem.data.PlayerStats
import com.example.sololevelingsystem.data.Quest
import com.example.sololevelingsystem.data.ShopItem
import com.example.sololevelingsystem.data.SystemLog
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import androidx.compose.ui.platform.LocalContext
import com.example.sololevelingsystem.OrbService

// Core Colors
val CyberDeepBlue = Color(0xFF060913)
val CyberDarkCard = Color(0xFF0C1225)
val CyberNeonBlue = Color(0xFF00E5FF)
val CyberDimBlue = Color(0xFF0084FF)
val CyberGold = Color(0xFFFFD700)
val CyberRed = Color(0xFFFF2A5F)
val CyberTextBright = Color(0xFFE2F1FF)
val CyberTextDim = Color(0xFF7F99B8)

@Composable
fun MainScreen(
  onItemClick: (NavKey) -> Unit,
  modifier: Modifier = Modifier,
  viewModel: MainScreenViewModel = viewModel()
) {
  val stats = viewModel.playerStats
  val quests = viewModel.quests
  val shopItems = viewModel.shopItems
  val logs = viewModel.logs

  Box(
    modifier = Modifier
      .fillMaxSize()
      .background(CyberDeepBlue)
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(12.dp)
    ) {
      // 1. Header Profile Banner
      HeaderBanner(
        stats = stats,
        onReset = { viewModel.triggerDailyReset() }
      )

      Spacer(modifier = Modifier.height(10.dp))

      // 2. Navigation Tab selector
      val tabs = listOf("Status", "Quests", "Store", "Console")
      var selectedTab by remember { mutableStateOf("Status") }
      
      TabRow(
        selectedTabIndex = tabs.indexOf(selectedTab),
        containerColor = Color.Transparent,
        contentColor = CyberNeonBlue,
        indicator = { tabPositions ->
          TabRowDefaults.SecondaryIndicator(
            modifier = Modifier.tabIndicatorOffset(tabPositions[tabs.indexOf(selectedTab)]),
            color = CyberNeonBlue
          )
        },
        modifier = Modifier.border(1.dp, Color(0xFF00E5FF).copy(alpha = 0.2f), RoundedCornerShape(4.dp))
      ) {
        tabs.forEach { tab ->
          Tab(
            selected = selectedTab == tab,
            onClick = { selectedTab = tab },
            text = { 
              Text(
                text = tab.uppercase(),
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Monospace,
                color = if (selectedTab == tab) CyberNeonBlue else CyberTextDim
              )
            }
          )
        }
      }

      Spacer(modifier = Modifier.height(10.dp))

      // 3. Tab Contents
      Box(modifier = Modifier.weight(1f)) {
        when (selectedTab) {
          "Status" -> StatusTab(stats = stats, onAllocate = { viewModel.distributeStatPoint(it) })
          "Quests" -> QuestsTab(
            quests = quests,
            activeSubTab = viewModel.activeTab,
            onSubTabChange = { viewModel.activeTab = it },
            onComplete = { viewModel.completeQuest(it) },
            onDelete = { id, title -> viewModel.deleteQuest(id, title) },
            onAdd = { t, d, type, s, x, g -> viewModel.addQuest(t, d, type, s, x, g) }
          )
          "Store" -> StoreTab(
            items = shopItems,
            gold = stats.gold,
            onBuy = { viewModel.purchaseReward(it) },
            onAdd = { t, d, c -> viewModel.addShopItem(t, d, c) }
          )
          "Console" -> ConsoleTab(logs = logs)
        }
      }
    }

    // 4. Level Up Dialog Overlay
    if (viewModel.showLevelUp) {
      LevelUpOverlay(
        lvl = viewModel.levelUpVal,
        onDismiss = { viewModel.showLevelUp = false }
      )
    }
  }
}

@Composable
fun HeaderBanner(
  stats: PlayerStats,
  onReset: () -> Unit
) {
  val context = LocalContext.current
  val rank = when {
    stats.level >= 25 -> "S"
    stats.level >= 20 -> "A"
    stats.level >= 15 -> "B"
    stats.level >= 10 -> "C"
    stats.level >= 5 -> "D"
    else -> "E"
  }
  
  val rankColor = when (rank) {
    "S" -> CyberRed
    "A" -> CyberGold
    "B" -> Color(0xFFC084FC)
    "C" -> CyberNeonBlue
    "D" -> CyberDimBlue
    else -> CyberTextDim
  }

  Card(
    colors = CardDefaults.cardColors(containerColor = CyberDarkCard),
    border = CardDefaults.outlinedCardBorder().copy(
      brush = Brush.horizontalGradient(listOf(CyberNeonBlue.copy(alpha = 0.2f), Color.Transparent))
    ),
    modifier = Modifier.fillMaxWidth()
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(12.dp),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
          modifier = Modifier
            .size(45.dp)
            .border(2.dp, CyberNeonBlue, CircleShape)
            .padding(2.dp)
            .clip(CircleShape)
            .background(Color.Black.copy(alpha = 0.4f)),
          contentAlignment = Alignment.Center
        ) {
          Icon(Icons.Default.Person, contentDescription = "Avatar", tint = CyberNeonBlue, modifier = Modifier.size(24.dp))
        }
        
        Spacer(modifier = Modifier.width(10.dp))
        
        Column {
          Row(verticalAlignment = Alignment.CenterVertically) {
            Text("SURIYA", color = CyberTextBright, fontWeight = FontWeight.Bold, fontSize = 15.sp)
            Spacer(modifier = Modifier.width(6.dp))
            Box(
              modifier = Modifier
                .border(1.dp, rankColor, RoundedCornerShape(2.dp))
                .background(rankColor.copy(alpha = 0.1f))
                .padding(horizontal = 4.dp, vertical = 1.dp)
            ) {
              Text(
                "RANK $rank",
                color = rankColor,
                fontSize = 8.sp,
                fontWeight = FontWeight.Black,
                fontFamily = FontFamily.Monospace
              )
            }
          }
          Text(
            "LVL ${stats.level} | ${if (stats.level >= 10) "The Shadow Monarch" else "The Awakened"}",
            color = CyberTextDim,
            fontSize = 11.sp,
            fontFamily = FontFamily.Monospace
          )
        }
      }

      Column(horizontalAlignment = Alignment.End) {
        Text("GOLD BALANCE", color = CyberTextDim, fontSize = 9.sp, fontFamily = FontFamily.Monospace)
        Text("${stats.gold} GLD", color = CyberGold, fontWeight = FontWeight.Black, fontSize = 16.sp, fontFamily = FontFamily.Monospace)
        Spacer(modifier = Modifier.height(4.dp))
        Button(
          onClick = {
            if (Settings.canDrawOverlays(context)) {
               val intent = Intent(context, OrbService::class.java)
               if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                   context.startForegroundService(intent)
               } else {
                   context.startService(intent)
               }
            } else {
               val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:${context.packageName}"))
               context.startActivity(intent)
            }
          },
          colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF9C27B0).copy(alpha = 0.1f), contentColor = Color(0xFFE040FB)),
          border = ButtonDefaults.outlinedButtonBorder().copy(brush = Brush.horizontalGradient(listOf(Color(0xFF9C27B0), Color(0xFFE040FB)))),
          contentPadding = PaddingValues(horizontal = 8.dp, vertical = 2.dp),
          shape = RoundedCornerShape(4.dp),
          modifier = Modifier.height(24.dp)
        ) {
          Icon(Icons.Default.Adjust, contentDescription = "Orb", modifier = Modifier.size(12.dp))
          Spacer(modifier = Modifier.width(4.dp))
          Text("ACTIVATE ORB", fontSize = 9.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
        }
        Spacer(modifier = Modifier.height(4.dp))
        Button(
          onClick = onReset,
          colors = ButtonDefaults.buttonColors(containerColor = CyberNeonBlue.copy(alpha = 0.1f), contentColor = CyberNeonBlue),
          border = ButtonDefaults.outlinedButtonBorder().copy(brush = Brush.horizontalGradient(listOf(CyberNeonBlue, CyberDimBlue))),
          contentPadding = PaddingValues(horizontal = 8.dp, vertical = 2.dp),
          shape = RoundedCornerShape(4.dp),
          modifier = Modifier.height(24.dp)
        ) {
          Icon(Icons.Default.Refresh, contentDescription = "Reset", modifier = Modifier.size(12.dp))
          Spacer(modifier = Modifier.width(4.dp))
          Text("RESET CYCLE", fontSize = 9.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
        }
      }
    }
  }
}

@Composable
fun StatusTab(
  stats: PlayerStats,
  onAllocate: (String) -> Unit
) {
  val xpNeeded = stats.level * 100
  val progress = stats.xp.toFloat() / xpNeeded.toFloat()

  LazyColumn(
    modifier = Modifier.fillMaxSize(),
    verticalArrangement = Arrangement.spacedBy(8.dp)
  ) {
    item {
      Card(
        colors = CardDefaults.cardColors(containerColor = CyberDarkCard),
        border = CardDefaults.outlinedCardBorder().copy(
          brush = Brush.verticalGradient(listOf(CyberNeonBlue.copy(alpha = 0.1f), Color.Transparent))
        )
      ) {
        Column(modifier = Modifier.padding(12.dp)) {
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Text("EXPERIENCE POOL", color = CyberTextDim, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
            Text("${stats.xp} / $xpNeeded XP", color = CyberNeonBlue, fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
          }
          Spacer(modifier = Modifier.height(6.dp))
          LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp)
                .clip(RoundedCornerShape(3.dp)),
            color = CyberNeonBlue,
            trackColor = Color.Black.copy(alpha = 0.6f)
          )
        }
      }
    }

    if (stats.statPoints > 0) {
      item {
        Box(
          modifier = Modifier
              .fillMaxWidth()
              .border(1.dp, CyberGold.copy(alpha = 0.3f), RoundedCornerShape(4.dp))
              .background(CyberGold.copy(alpha = 0.05f))
              .padding(8.dp),
          contentAlignment = Alignment.Center
        ) {
          Text(
            "★ UNALLOCATED POINTS: ${stats.statPoints} ★",
            color = CyberGold,
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Monospace
          )
        }
      }
    }

    val statsList = listOf(
      Triple("STR", "Strength (STR)", stats.str),
      Triple("INT", "Intellect (INT)", stats.intel),
      Triple("VIT", "Vitality (VIT)", stats.vit),
      Triple("WIS", "Wisdom / Spirit (WIS)", stats.wis),
      Triple("CHA", "Charisma (CHA)", stats.cha),
      Triple("GLD", "Wealth / Gold (GLD)", stats.gld)
    )

    items(statsList) { (key, label, valNum) ->
      Card(
        colors = CardDefaults.cardColors(containerColor = CyberDarkCard),
        border = CardDefaults.outlinedCardBorder().copy(
          brush = Brush.horizontalGradient(listOf(Color.Transparent, Color(0xFF00E5FF).copy(alpha = 0.05f)))
        )
      ) {
        Row(
          modifier = Modifier
              .fillMaxWidth()
              .padding(10.dp),
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
              modifier = Modifier
                  .size(32.dp)
                  .background(Color.Black.copy(alpha = 0.3f), RoundedCornerShape(4.dp))
                  .border(1.dp, CyberNeonBlue.copy(alpha = 0.15f), RoundedCornerShape(4.dp)),
              contentAlignment = Alignment.Center
            ) {
              val icon = when (key) {
                "STR" -> Icons.Default.FitnessCenter
                "INT" -> Icons.Default.Psychology
                "VIT" -> Icons.Default.Favorite
                "WIS" -> Icons.Default.Explore
                "CHA" -> Icons.Default.Group
                else -> Icons.Default.MonetizationOn
              }
              val color = when (key) {
                "STR" -> CyberRed
                "INT" -> CyberNeonBlue
                "VIT" -> Color(0xFF10B981)
                "WIS" -> Color(0xFFA78BFA)
                "CHA" -> Color(0xFFF472B6)
                else -> CyberGold
              }
              Icon(icon, contentDescription = key, tint = color, modifier = Modifier.size(16.dp))
            }
            Spacer(modifier = Modifier.width(10.dp))
            Column {
              Text(label, color = CyberTextBright, fontSize = 12.sp, fontWeight = FontWeight.Bold)
              Text("Level ${valNum - 9}", color = CyberTextDim, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
            }
          }

          Row(verticalAlignment = Alignment.CenterVertically) {
            Text("$valNum", color = CyberNeonBlue, fontWeight = FontWeight.Black, fontSize = 16.sp, fontFamily = FontFamily.Monospace)
            if (stats.statPoints > 0) {
              Spacer(modifier = Modifier.width(10.dp))
              Box(
                modifier = Modifier
                    .size(24.dp)
                    .clip(CircleShape)
                    .background(CyberNeonBlue)
                    .clickable { onAllocate(key) },
                contentAlignment = Alignment.Center
              ) {
                Text("+", color = Color.Black, fontSize = 14.sp, fontWeight = FontWeight.Black)
              }
            }
          }
        }
      }
    }
  }
}

@Composable
fun QuestsTab(
  quests: List<Quest>,
  activeSubTab: String,
  onSubTabChange: (String) -> Unit,
  onComplete: (String) -> Unit,
  onDelete: (String, String) -> Unit,
  onAdd: (String, String, String, String, Int, Int) -> Unit
) {
  var showAddQuestDialog by remember { mutableStateOf(false) }

  Column(modifier = Modifier.fillMaxSize()) {
    // Sub-Tabs Filter
    val subTabs = listOf("daily", "side", "main", "penalty")
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
      subTabs.forEach { tab ->
        val active = activeSubTab == tab
        val isPenalty = tab == "penalty"
        
        Button(
          onClick = { onSubTabChange(tab) },
          colors = ButtonDefaults.buttonColors(
            containerColor = if (active) {
              if (isPenalty) CyberRed.copy(alpha = 0.2f) else CyberNeonBlue.copy(alpha = 0.2f)
            } else CyberDarkCard,
            contentColor = if (active) {
              if (isPenalty) CyberRed else CyberNeonBlue
            } else CyberTextDim
          ),
          border = ButtonDefaults.outlinedButtonBorder().copy(
            brush = Brush.verticalGradient(
              listOf(
                if (active) (if (isPenalty) CyberRed else CyberNeonBlue) else Color.Transparent,
                Color.Transparent
              )
            )
          ),
          shape = RoundedCornerShape(4.dp),
          contentPadding = PaddingValues(horizontal = 6.dp),
          modifier = Modifier
              .weight(1f)
              .height(28.dp)
        ) {
          Text(tab.uppercase(), fontSize = 9.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
        }
      }
    }

    Spacer(modifier = Modifier.height(10.dp))

    // List of active quests
    val filtered = quests.filter { it.type == activeSubTab }
    
    Box(modifier = Modifier.weight(1f)) {
      if (filtered.isEmpty()) {
        Box(
          modifier = Modifier
              .fillMaxSize()
              .border(1.dp, Color.White.copy(alpha = 0.05f), RoundedCornerShape(4.dp))
              .background(Color.Black.copy(alpha = 0.2f)),
          contentAlignment = Alignment.Center
        ) {
          Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Icon(Icons.Default.CheckCircle, contentDescription = "Done", tint = Color.DarkGray, modifier = Modifier.size(36.dp))
            Spacer(modifier = Modifier.height(6.dp))
            Text("No active $activeSubTab quests.", color = CyberTextDim, fontSize = 11.sp)
          }
        }
      } else {
        LazyColumn(
          verticalArrangement = Arrangement.spacedBy(6.dp),
          modifier = Modifier.fillMaxSize()
        ) {
          items(filtered) { q ->
            Card(
              colors = CardDefaults.cardColors(
                containerColor = if (q.completed) CyberDarkCard.copy(alpha = 0.6f) else CyberDarkCard
              ),
              border = CardDefaults.outlinedCardBorder().copy(
                brush = Brush.horizontalGradient(
                  listOf(
                    if (q.type == "penalty") CyberRed.copy(alpha = 0.3f) else CyberNeonBlue.copy(alpha = 0.1f),
                    Color.Transparent
                  )
                )
              ),
              modifier = Modifier.fillMaxWidth()
            ) {
              Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(10.dp),
                verticalAlignment = Alignment.Top,
                horizontalArrangement = Arrangement.SpaceBetween
              ) {
                Row(modifier = Modifier.weight(1f)) {
                  IconButton(
                    onClick = { onComplete(q.id) },
                    modifier = Modifier.size(24.dp)
                  ) {
                    Icon(
                      imageVector = if (q.completed) Icons.Default.CheckBox else Icons.Default.CheckBoxOutlineBlank,
                      contentDescription = "Check",
                      tint = if (q.completed) CyberNeonBlue else CyberTextDim,
                      modifier = Modifier.size(20.dp)
                    )
                  }
                  
                  Spacer(modifier = Modifier.width(8.dp))
                  
                  Column {
                    Text(
                      q.title,
                      color = if (q.completed) CyberTextDim else CyberTextBright,
                      fontWeight = FontWeight.Bold,
                      fontSize = 13.sp,
                      maxLines = 1,
                      overflow = TextOverflow.Ellipsis
                    )
                    Text(
                      q.description,
                      color = CyberTextDim,
                      fontSize = 10.sp,
                      lineHeight = 12.sp,
                      modifier = Modifier.padding(top = 2.dp)
                    )
                    
                    Row(
                      horizontalArrangement = Arrangement.spacedBy(6.dp),
                      modifier = Modifier.padding(top = 6.dp)
                    ) {
                      Box(
                        modifier = Modifier
                            .border(1.dp, CyberNeonBlue.copy(alpha = 0.4f), RoundedCornerShape(2.dp))
                            .background(CyberNeonBlue.copy(alpha = 0.1f))
                            .padding(horizontal = 4.dp, vertical = 1.dp)
                      ) {
                        Text("+${q.xpReward} XP", color = CyberNeonBlue, fontSize = 8.sp, fontWeight = FontWeight.Bold)
                      }
                      Box(
                        modifier = Modifier
                            .border(1.dp, CyberGold.copy(alpha = 0.4f), RoundedCornerShape(2.dp))
                            .background(CyberGold.copy(alpha = 0.1f))
                            .padding(horizontal = 4.dp, vertical = 1.dp)
                      ) {
                        Text("+${q.goldReward} GLD", color = CyberGold, fontSize = 8.sp, fontWeight = FontWeight.Bold)
                      }
                      Box(
                        modifier = Modifier
                            .border(1.dp, CyberTextDim.copy(alpha = 0.2f), RoundedCornerShape(2.dp))
                            .background(Color.Black.copy(alpha = 0.3f))
                            .padding(horizontal = 4.dp, vertical = 1.dp)
                      ) {
                        Text(q.stat, color = CyberTextDim, fontSize = 8.sp, fontFamily = FontFamily.Monospace)
                      }
                    }
                  }
                }
                
                IconButton(
                  onClick = { onDelete(q.id, q.title) },
                  modifier = Modifier.size(24.dp)
                ) {
                  Icon(Icons.Default.Delete, contentDescription = "Delete", tint = Color.DarkGray, modifier = Modifier.size(16.dp))
                }
              }
            }
          }
        }
      }
    }

    Spacer(modifier = Modifier.height(10.dp))

    // Manifest Quest Gateway Button
    Button(
      onClick = { showAddQuestDialog = true },
      colors = ButtonDefaults.buttonColors(containerColor = CyberNeonBlue.copy(alpha = 0.1f), contentColor = CyberNeonBlue),
      border = ButtonDefaults.outlinedButtonBorder().copy(brush = Brush.horizontalGradient(listOf(CyberNeonBlue, CyberDimBlue))),
      shape = RoundedCornerShape(4.dp),
      modifier = Modifier
          .fillMaxWidth()
          .height(36.dp)
    ) {
      Icon(Icons.Default.PlusOne, contentDescription = "Add", modifier = Modifier.size(14.dp))
      Spacer(modifier = Modifier.width(6.dp))
      Text("MANIFEST QUEST", fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
    }
  }

  // Add Quest Dialog
  if (showAddQuestDialog) {
    var title by remember { mutableStateOf("") }
    var desc by remember { mutableStateOf("") }
    var qType by remember { mutableStateOf("side") }
    var qStat by remember { mutableStateOf("STR") }
    var xpRew by remember { mutableStateOf("15") }
    var goldRew by remember { mutableStateOf("5") }

    Dialog(onDismissRequest = { showAddQuestDialog = false }) {
      Card(
        colors = CardDefaults.cardColors(containerColor = CyberDarkCard),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CyberNeonBlue, CyberDimBlue))),
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
      ) {
        Column(
          modifier = Modifier.padding(16.dp),
          verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
          Text(
            "QUEST GATEWAY CREATOR",
            color = CyberNeonBlue,
            fontWeight = FontWeight.Bold,
            fontSize = 14.sp,
            fontFamily = FontFamily.Monospace,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
          )

          OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Quest Objective", fontSize = 11.sp) },
            singleLine = true,
            colors = OutlinedTextFieldDefaults.colors(
              focusedTextColor = CyberTextBright,
              unfocusedTextColor = CyberTextDim,
              focusedBorderColor = CyberNeonBlue,
              unfocusedBorderColor = Color.DarkGray
            ),
            modifier = Modifier.fillMaxWidth()
          )

          OutlinedTextField(
            value = desc,
            onValueChange = { desc = it },
            label = { Text("Details / Logs", fontSize = 11.sp) },
            colors = OutlinedTextFieldDefaults.colors(
              focusedTextColor = CyberTextBright,
              unfocusedTextColor = CyberTextDim,
              focusedBorderColor = CyberNeonBlue,
              unfocusedBorderColor = Color.DarkGray
            ),
            modifier = Modifier.fillMaxWidth()
          )

          // Select Type
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
          ) {
            listOf("daily", "side", "main").forEach { type ->
              val sel = qType == type
              Button(
                onClick = { qType = type },
                colors = ButtonDefaults.buttonColors(
                  containerColor = if (sel) CyberNeonBlue.copy(alpha = 0.2f) else Color.Transparent,
                  contentColor = if (sel) CyberNeonBlue else CyberTextDim
                ),
                shape = RoundedCornerShape(2.dp),
                contentPadding = PaddingValues(horizontal = 4.dp),
                modifier = Modifier
                    .weight(1f)
                    .height(28.dp)
              ) {
                Text(type.uppercase(), fontSize = 9.sp, fontFamily = FontFamily.Monospace)
              }
            }
          }

          // Select Stat
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(2.dp)
          ) {
            listOf("STR", "INT", "VIT", "WIS", "CHA", "GLD").forEach { stat ->
              val sel = qStat == stat
              Button(
                onClick = { qStat = stat },
                colors = ButtonDefaults.buttonColors(
                  containerColor = if (sel) CyberNeonBlue.copy(alpha = 0.2f) else Color.Transparent,
                  contentColor = if (sel) CyberNeonBlue else CyberTextDim
                ),
                shape = RoundedCornerShape(2.dp),
                contentPadding = PaddingValues(0.dp),
                modifier = Modifier
                    .weight(1f)
                    .height(24.dp)
              ) {
                Text(stat, fontSize = 8.sp, fontFamily = FontFamily.Monospace)
              }
            }
          }

          // XP and Gold Inputs
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
          ) {
            OutlinedTextField(
              value = xpRew,
              onValueChange = { xpRew = it },
              label = { Text("XP Reward", fontSize = 10.sp) },
              keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
              colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = CyberTextBright,
                unfocusedTextColor = CyberTextDim,
                focusedBorderColor = CyberNeonBlue,
                unfocusedBorderColor = Color.DarkGray
              ),
              modifier = Modifier.weight(1f)
            )

            OutlinedTextField(
              value = goldRew,
              onValueChange = { goldRew = it },
              label = { Text("Gold Reward", fontSize = 10.sp) },
              keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
              colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = CyberTextBright,
                unfocusedTextColor = CyberTextDim,
                focusedBorderColor = CyberNeonBlue,
                unfocusedBorderColor = Color.DarkGray
              ),
              modifier = Modifier.weight(1f)
            )
          }

          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
          ) {
            Button(
              onClick = { showAddQuestDialog = false },
              colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent, contentColor = CyberTextDim),
              modifier = Modifier.weight(1f)
            ) {
              Text("CANCEL", fontSize = 11.sp, fontFamily = FontFamily.Monospace)
            }

            Button(
              onClick = {
                val xpVal = xpRew.toIntOrNull() ?: 15
                val goldVal = goldRew.toIntOrNull() ?: 5
                onAdd(title, desc, qType, qStat, xpVal, goldVal)
                showAddQuestDialog = false
              },
              colors = ButtonDefaults.buttonColors(containerColor = CyberNeonBlue, contentColor = Color.Black),
              modifier = Modifier.weight(1f)
            ) {
              Text("DEPLOY", fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
            }
          }
        }
      }
    }
  }
}

@Composable
fun StoreTab(
  items: List<ShopItem>,
  gold: Int,
  onBuy: (String) -> Unit,
  onAdd: (String, String, Int) -> Unit
) {
  var showAddRewardDialog by remember { mutableStateOf(false) }

  Column(modifier = Modifier.fillMaxSize()) {
    Box(modifier = Modifier.weight(1f)) {
      LazyColumn(
        verticalArrangement = Arrangement.spacedBy(6.dp),
        modifier = Modifier.fillMaxSize()
      ) {
        items(items) { item ->
          Card(
            colors = CardDefaults.cardColors(containerColor = CyberDarkCard),
            border = CardDefaults.outlinedCardBorder().copy(
              brush = Brush.horizontalGradient(listOf(Color.Transparent, CyberGold.copy(alpha = 0.15f)))
            )
          ) {
            Row(
              modifier = Modifier
                  .fillMaxWidth()
                  .padding(10.dp),
              verticalAlignment = Alignment.CenterVertically,
              horizontalArrangement = Arrangement.SpaceBetween
            ) {
              Column(modifier = Modifier.weight(1f)) {
                Text(item.title, color = CyberTextBright, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(item.description, color = CyberTextDim, fontSize = 9.sp, modifier = Modifier.padding(top = 1.dp))
              }
              Spacer(modifier = Modifier.width(8.dp))
              Button(
                onClick = { onBuy(item.id) },
                colors = ButtonDefaults.buttonColors(containerColor = CyberGold.copy(alpha = 0.1f), contentColor = CyberGold),
                border = ButtonDefaults.outlinedButtonBorder().copy(brush = Brush.horizontalGradient(listOf(CyberGold, Color.Yellow))),
                contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp),
                shape = RoundedCornerShape(4.dp),
                modifier = Modifier.height(28.dp)
              ) {
                Text("${item.cost} GLD", fontSize = 10.sp, fontWeight = FontWeight.Black, fontFamily = FontFamily.Monospace)
              }
            }
          }
        }
      }
    }

    Spacer(modifier = Modifier.height(10.dp))

    // Build Custom Reward Button
    Button(
      onClick = { showAddRewardDialog = true },
      colors = ButtonDefaults.buttonColors(containerColor = CyberGold.copy(alpha = 0.1f), contentColor = CyberGold),
      border = ButtonDefaults.outlinedButtonBorder().copy(brush = Brush.horizontalGradient(listOf(CyberGold, Color.Yellow))),
      shape = RoundedCornerShape(4.dp),
      modifier = Modifier
          .fillMaxWidth()
          .height(36.dp)
    ) {
      Icon(Icons.Default.AddBusiness, contentDescription = "Add Store", modifier = Modifier.size(14.dp))
      Spacer(modifier = Modifier.width(6.dp))
      Text("ADD CUSTOM REWARD", fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
    }
  }

  // Add Shop Item Dialog
  if (showAddRewardDialog) {
    var title by remember { mutableStateOf("") }
    var desc by remember { mutableStateOf("") }
    var costStr by remember { mutableStateOf("20") }

    Dialog(onDismissRequest = { showAddRewardDialog = false }) {
      Card(
        colors = CardDefaults.cardColors(containerColor = CyberDarkCard),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CyberGold, Color.Yellow))),
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
      ) {
        Column(
          modifier = Modifier.padding(16.dp),
          verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
          Text(
            "NEW CUSTOM REWARD GATEWAY",
            color = CyberGold,
            fontWeight = FontWeight.Bold,
            fontSize = 14.sp,
            fontFamily = FontFamily.Monospace,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
          )

          OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Reward Name", fontSize = 11.sp) },
            singleLine = true,
            colors = OutlinedTextFieldDefaults.colors(
              focusedTextColor = CyberTextBright,
              unfocusedTextColor = CyberTextDim,
              focusedBorderColor = CyberGold,
              unfocusedBorderColor = Color.DarkGray
            ),
            modifier = Modifier.fillMaxWidth()
          )

          OutlinedTextField(
            value = desc,
            onValueChange = { desc = it },
            label = { Text("Reward Description", fontSize = 11.sp) },
            colors = OutlinedTextFieldDefaults.colors(
              focusedTextColor = CyberTextBright,
              unfocusedTextColor = CyberTextDim,
              focusedBorderColor = CyberGold,
              unfocusedBorderColor = Color.DarkGray
            ),
            modifier = Modifier.fillMaxWidth()
          )

          OutlinedTextField(
            value = costStr,
            onValueChange = { costStr = it },
            label = { Text("GLD Cost", fontSize = 11.sp) },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            colors = OutlinedTextFieldDefaults.colors(
              focusedTextColor = CyberTextBright,
              unfocusedTextColor = CyberTextDim,
              focusedBorderColor = CyberGold,
              unfocusedBorderColor = Color.DarkGray
            ),
            modifier = Modifier.fillMaxWidth()
          )

          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
          ) {
            Button(
              onClick = { showAddRewardDialog = false },
              colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent, contentColor = CyberTextDim),
              modifier = Modifier.weight(1f)
            ) {
              Text("CANCEL", fontSize = 11.sp, fontFamily = FontFamily.Monospace)
            }

            Button(
              onClick = {
                val costVal = costStr.toIntOrNull() ?: 20
                onAdd(title, desc, costVal)
                showAddRewardDialog = false
              },
              colors = ButtonDefaults.buttonColors(containerColor = CyberGold, contentColor = Color.Black),
              modifier = Modifier.weight(1f)
            ) {
              Text("INJECT", fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
            }
          }
        }
      }
    }
  }
}

@Composable
fun ConsoleTab(logs: List<SystemLog>) {
  Card(
    colors = CardDefaults.cardColors(containerColor = Color.Black.copy(alpha = 0.5f)),
    border = CardDefaults.outlinedCardBorder().copy(
      brush = Brush.verticalGradient(listOf(CyberNeonBlue.copy(alpha = 0.2f), Color.Transparent))
    ),
    modifier = Modifier.fillMaxSize()
  ) {
    LazyColumn(
      modifier = Modifier
          .fillMaxSize()
          .padding(8.dp),
      verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
      items(logs) { log ->
        val logColor = when (log.type) {
          "success" -> Color(0xFF10B981)
          "warning" -> CyberRed
          "levelUp" -> CyberGold
          else -> CyberNeonBlue
        }
        
        Row(
          modifier = Modifier.fillMaxWidth(),
          verticalAlignment = Alignment.Top
        ) {
          Text(
            text = "[${log.timestamp}]",
            color = Color.Gray,
            fontSize = 9.sp,
            fontFamily = FontFamily.Monospace,
            modifier = Modifier.padding(end = 6.dp, top = 2.dp)
          )
          Text(
            text = log.message,
            color = logColor,
            fontSize = 10.sp,
            fontFamily = FontFamily.Monospace,
            lineHeight = 12.sp
          )
        }
      }
    }
  }
}

@Composable
fun LevelUpOverlay(
  lvl: Int,
  onDismiss: () -> Unit
) {
  Dialog(onDismissRequest = onDismiss) {
    Card(
      colors = CardDefaults.cardColors(containerColor = CyberDarkCard),
      border = CardDefaults.outlinedCardBorder().copy(
        brush = Brush.verticalGradient(listOf(CyberGold, CyberNeonBlue))
      ),
      modifier = Modifier
          .fillMaxWidth()
          .padding(16.dp)
    ) {
      Column(
        modifier = Modifier.padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp)
      ) {
        Text(
          "★ LEVEL UP ★",
          color = CyberGold,
          fontWeight = FontWeight.Black,
          fontSize = 24.sp,
          fontFamily = FontFamily.Monospace,
          textAlign = TextAlign.Center
        )

        Text(
          "LEVEL $lvl REACHED",
          color = CyberTextBright,
          fontWeight = FontWeight.Bold,
          fontSize = 18.sp,
          fontFamily = FontFamily.Monospace,
          textAlign = TextAlign.Center
        )

        Text(
          "\"Your strength has been acknowledged by the System. New limits have been unlocked.\"",
          color = CyberTextDim,
          fontSize = 11.sp,
          fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
          textAlign = TextAlign.Center,
          modifier = Modifier.padding(vertical = 4.dp)
        )

        Text(
          "+5 STAT POINTS ALLOCATED TO INVENTORY",
          color = CyberNeonBlue,
          fontSize = 10.sp,
          fontWeight = FontWeight.Bold,
          fontFamily = FontFamily.Monospace,
          textAlign = TextAlign.Center
        )

        Button(
          onClick = onDismiss,
          colors = ButtonDefaults.buttonColors(containerColor = CyberNeonBlue, contentColor = Color.Black),
          shape = RoundedCornerShape(4.dp),
          modifier = Modifier
              .fillMaxWidth()
              .height(36.dp)
        ) {
          Text("ACKNOWLEDGE", fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
        }
      }
    }
  }
}
