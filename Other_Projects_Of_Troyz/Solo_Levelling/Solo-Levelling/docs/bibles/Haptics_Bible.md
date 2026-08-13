# ASCENSION Haptics Bible

Haptics bridge the digital and physical worlds. They provide tactile feedback that makes the application feel like a physical artifact in the user's hand.

## Core Principles
1. **Never Vibrate Everything:** If every button tap vibrates, the haptics lose all meaning.
2. **Subtlety is Key:** Tiny, almost imperceptible taps are more effective than long, buzzing vibrations.
3. **Emotional Resonance:** Haptics should match the emotional weight of the action.

---

## The Haptic Lexicon

### 1. The Tiny Tap
**Feel:** A very short, crisp, light vibration (e.g., `UIImpactFeedbackGenerator(style: .light)` in iOS).
**Used For:**
- Mission Accepted
- Scrolling through Chronicle dates
- Minor UI interactions

### 2. The Warm Pulse
**Feel:** A smooth, slightly longer, medium-intensity vibration that fades in and out.
**Used For:**
- Memory Created
- Companion speaking a profound truth
- Evening Reflection initiated

### 3. The Double Pulse
**Feel:** Two distinct, sharp taps in quick succession.
**Used For:**
- Level Up
- Major Milestone reached

### 4. The Strong Vibration
**Feel:** A heavy, sustained vibration (e.g., `UIImpactFeedbackGenerator(style: .heavy)`).
**Used For:**
- Defeating a "Boss" (Massive real-life obstacle overcome)
- Major Narrative Shift
- Critical System Warnings (Use extremely sparingly)
