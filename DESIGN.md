---
# Design Tokens
colors:
  primary:
    main: "#8c5cff"       # Morado intenso
    light: "#d7b3ff"      # Morado claro
    dark: "#5728a1"       # Morado oscuro
  secondary:
    main: "#bf88ff"       # Púrpura caldero
    light: "#edd7ff"      # Púrpura suave
    dark: "#8f54c8"       # Púrpura medio
  background:
    deep: "#090814"       # Noche profunda
    panel: "#120f1f"      # Panel oscuro
    accent: "#1f1632"     # Acento oscuro
  text:
    main: "#f4efff"       # Niebla lunar
    muted: "#c7c0db"      # Texto atenuado
  special:
    gold: "#f0c86e"       # Oro alquimista
    glass:
      bg: "rgba(20, 12, 35, 0.88)"
      border: "rgba(191, 136, 255, 0.18)"

typography:
  headings:
    family: "'Almendra', serif"
    weight: 700
    letter_spacing: "0.08em"
  body:
    family: "'Inter', sans-serif"
    weight: 400
    line_height: 1.7

radii:
  hero: "32px"
  panel: "22px"
  card: "18px"
  button: "999px"
  input: "6px"

shadows:
  main: "0 12px 40px rgba(15, 7, 40, 0.45)"
  hero_image: "0 32px 90px rgba(10, 5, 30, 0.45)"
  glow_purple: "0 0 50px rgba(171, 71, 188, 0.4)"

motion:
  standard: "180ms ease"
  dramatic: "0.8s ease"
  loop: "4s ease-in-out infinite"
---

# Design System: La Choza de la Bruja

## Vision & Atmosphere
The design system for **Calbru Games** (themed as "La Choza de la Bruja") is crafted to evoke a sense of **Dark Fantasy, Alchemy, and Magic**. It balances a professional e-commerce layout with a strong, immersive narrative aesthetic. The interface feels like an ancient workshop illuminated by glowing potions and lunar light.

## Visual Pillars

### 1. The Alchemist's Palette
The primary color is a deep, vibrant purple (`#8c5cff`), representing arcane energy. The backgrounds use "Noche Profunda" (`#090814`), a near-black with blue/purple undertones that provides the perfect canvas for glows and gold accents. The "Niebla Lunar" (`#f4efff`) text color ensures high legibility while maintaining the cool, mystical tone.

### 2. Arcane Typography
The system uses a dual-font approach:
- **Almendra**: A serif font with medieval/gothic influences, used for titles and special buttons to reinforce the magical theme.
- **Inter**: A modern, highly legible sans-serif for body text and functional UI elements, ensuring the "pro" feel of the platform is not lost.

### 3. Glassmorphism & Depth
To simulate magical surfaces, the design heavily employs glassmorphism. Panels have high-blur backgrounds and thin, glowing borders. Deep shadows and layered radial gradients in the background create a sense of infinite space behind the interface.

### 4. Ritualistic Interactions
Interactions are designed to feel like "casting a spell":
- **Particles**: Selecting items releases bursts of energy (particles) that fall into the central cauldron.
- **Glows**: Interactive elements pulse with soft light (`majorGlow` animation).
- **Tactile Details**: Small details like "wooden nails" on corner panels and double-line borders add a handcrafted, medieval feel.

## Key Components

### The Grand Cauldron
The centerpiece of the experience. A circular dashboard that acts as the primary feedback loop, glowing and reacting as the user "mixes" their game ingredients.

### Corner Shelves
The configuration panels are positioned in the four corners of the screen, mimicking shelves in an alchemist's hut, surrounding the central work area.

### CTA Buttons
Action buttons use intense gradients and high border-radii (`999px`), making them feel like polished gemstones or physical objects within the world.
