package com.example.sololevelingsystem.ui

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun OrbOverlay(
    onDrag: (Float, Float) -> Unit,
    onTap: () -> Unit,
    onDoubleTap: () -> Unit,
    onLongPress: () -> Unit
) {
    var isExpanded by remember { mutableStateOf(false) }

    val infiniteTransition = rememberInfiniteTransition(label = "orb_pulse")
    val pulse by infiniteTransition.animateFloat(
        initialValue = 0.8f,
        targetValue = 1.2f,
        animationSpec = infiniteRepeatable(
            animation = tween(1500, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulse_anim"
    )

    Row(
        modifier = Modifier
            .wrapContentSize()
            .pointerInput(Unit) {
                detectDragGestures { change, dragAmount ->
                    change.consume()
                    onDrag(dragAmount.x, dragAmount.y)
                }
            }
            .pointerInput(Unit) {
                detectTapGestures(
                    onTap = { 
                        isExpanded = !isExpanded
                        onTap()
                    },
                    onDoubleTap = { onDoubleTap() },
                    onLongPress = { onLongPress() }
                )
            },
        verticalAlignment = Alignment.CenterVertically
    ) {
        // The Orb
        Box(
            modifier = Modifier
                .size(60.dp)
                .padding(8.dp)
                .shadow(12.dp, CircleShape, ambientColor = Color(0xFF00E5FF), spotColor = Color(0xFF9C27B0)),
            contentAlignment = Alignment.Center
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val center = Offset(size.width / 2, size.height / 2)
                val radius = size.width / 2 * pulse

                // Core glow - Cyberpunk Purple/Cyan
                drawCircle(
                    brush = Brush.radialGradient(
                        colors = listOf(Color(0xFF00E5FF), Color(0xFF7B1FA2), Color.Transparent),
                        center = center,
                        radius = radius
                    ),
                    radius = radius
                )
                
                // Inner energy ring
                drawCircle(
                    color = Color(0xFF00E5FF).copy(alpha = 0.6f),
                    radius = radius * 0.8f,
                    style = Stroke(width = 2.dp.toPx())
                )
            }
        }

        // Expanded Mission Panel
        if (isExpanded) {
            Box(
                modifier = Modifier
                    .padding(start = 8.dp)
                    .clip(androidx.compose.foundation.shape.RoundedCornerShape(12.dp))
                    .background(Color(0xCC060913))
                    .border(1.dp, Color(0xFF00E5FF).copy(alpha = 0.3f), androidx.compose.foundation.shape.RoundedCornerShape(12.dp))
                    .padding(12.dp)
            ) {
                Column {
                    Text(
                        text = "SYSTEM ACTIVE",
                        color = Color(0xFF00E5FF),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Double Tap to open HUD",
                        color = Color(0xFFE2F1FF),
                        fontSize = 12.sp
                    )
                }
            }
        }
    }
}
