# ASCENSION Transition Guide

In ASCENSION, the user never "jumps" between screens. They travel between them. Transitions are the glue that holds the world together, preventing it from feeling like disjointed web pages.

## Core Principles
1. **Object Permanence:** If an element exists on both screens (like the Companion Orb), it should not disappear and reappear. It should move smoothly to its new location.
2. **Context Retention:** The user should always know where they came from.
3. **No Hard Cuts:** A sudden cut breaks immersion. Every transition must have a designated motion profile.

---

## The Transition Lexicon

### 1. The Crossfade (Time Shift)
**Visual:** The current screen gently dissolves as the next screen fades in.
**Duration:** 1500ms
**Used For:**
- Time of Day changes (e.g., Active Day fading into Evening Reflection)
- Waking up

### 2. The Expansion (Drilling Down)
**Visual:** The user taps an element (e.g., a Mission). That element scales up to fill the screen, pushing everything else out of frame.
**Used For:**
- Opening a Mission detail view
- Entering a Campaign log

### 3. The Slide (Horizontal Navigation)
**Visual:** The current view slides out to the left or right, bringing in the new view.
**Used For:**
- Swiping from Mission Control to the Journey (Chronicle)
- Navigating between days

### 4. The Deep Dive (The Mirror Moment Transition)
**Visual:** The camera pulls way back, scaling the entire UI down until it becomes a single node in the Reality Graph.
**Duration:** 3000ms
**Used For:**
- Transitioning from the daily loop to the massive Reality Graph view.
