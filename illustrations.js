// Beautiful, handcrafted SVG illustrations and icons for "This Town"
// Cohesive cozy aesthetic matching the user's hand-drawn sketch

export const SVG_ILLUSTRATIONS = {
  // Winnie-the-pooh style cute friendly bear with folded arms and warm smile
  poohBear: `
    <svg viewBox="0 0 160 180" width="120" height="135" fill="none" xmlns="http://www.w3.org/2000/svg" class="bear-svg">
      <!-- Bear Ears -->
      <circle cx="48" cy="42" r="14" fill="#F7C04A" stroke="#5D4037" stroke-width="2.5"/>
      <circle cx="48" cy="42" r="7" fill="#F49D1A" opacity="0.6"/>
      <circle cx="112" cy="42" r="14" fill="#F7C04A" stroke="#5D4037" stroke-width="2.5"/>
      <circle cx="112" cy="42" r="7" fill="#F49D1A" opacity="0.6"/>
      
      <!-- Bear Head -->
      <ellipse cx="80" cy="62" rx="36" ry="32" fill="#F7C04A" stroke="#5D4037" stroke-width="2.5"/>
      
      <!-- Cheeks Blush -->
      <ellipse cx="60" cy="74" rx="7" ry="4" fill="#FF8E9E" opacity="0.45"/>
      <ellipse cx="100" cy="74" rx="7" ry="4" fill="#FF8E9E" opacity="0.45"/>
      
      <!-- Friendly Eyes -->
      <ellipse cx="68" cy="60" rx="3.2" ry="4.2" fill="#3E2723"/>
      <ellipse cx="92" cy="60" rx="3.2" ry="4.2" fill="#3E2723"/>
      <circle cx="69.2" cy="58.5" r="1.2" fill="#FFFFFF"/>
      <circle cx="93.2" cy="58.5" r="1.2" fill="#FFFFFF"/>
      
      <!-- Eyebrows -->
      <path d="M63 53 C66 50, 71 51, 73 53" stroke="#5D4037" stroke-width="2" stroke-linecap="round"/>
      <path d="M87 53 C89 51, 94 50, 97 53" stroke="#5D4037" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Snout & Nose -->
      <ellipse cx="80" cy="72" rx="14" ry="10" fill="#FFE599"/>
      <ellipse cx="80" cy="67" rx="5" ry="3.5" fill="#3E2723"/>
      
      <!-- Gentle Smile -->
      <path d="M74 74 Q80 81 86 74" stroke="#5D4037" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      
      <!-- Red Cozy Shirt -->
      <path d="M52 90 Q80 86 108 90 L118 126 Q80 134 42 126 Z" fill="#E65100" stroke="#5D4037" stroke-width="2.5"/>
      <path d="M52 90 Q80 86 108 90 L102 104 Q80 98 58 104 Z" fill="#FF7043" opacity="0.7"/>
      
      <!-- Bear Body & Lower Belly -->
      <path d="M48 122 Q80 132 112 122 Q122 155 106 172 Q80 178 54 172 Q38 155 48 122 Z" fill="#F7C04A" stroke="#5D4037" stroke-width="2.5"/>
      
      <!-- Folded Arms (as in sketch) -->
      <!-- Left Arm & Paw -->
      <path d="M42 98 C35 110 44 128 66 128 C74 128 82 124 88 120" stroke="#5D4037" stroke-width="2.5" fill="#F7C04A" stroke-linecap="round"/>
      <!-- Right Arm folded over left -->
      <path d="M118 98 C125 110 114 128 92 128 C80 128 72 122 66 116" stroke="#5D4037" stroke-width="2.5" fill="#F7C04A" stroke-linecap="round"/>
      <!-- Shirt sleeves -->
      <path d="M44 94 Q40 106 48 114 Q58 110 56 96 Z" fill="#E65100" stroke="#5D4037" stroke-width="2"/>
      <path d="M116 94 Q120 106 112 114 Q102 110 104 96 Z" fill="#E65100" stroke="#5D4037" stroke-width="2"/>
      
      <!-- Sparkle Doodles -->
      <path d="M22 45 L25 50 L30 53 L25 56 L22 61 L19 56 L14 53 L19 50 Z" fill="#FFB74D" opacity="0.8"/>
      <path d="M136 75 L138 78 L142 80 L138 82 L136 86 L134 82 L130 80 L134 78 Z" fill="#FFB74D" opacity="0.8"/>
    </svg>
  `,

  // Ribbon Bow for the "Track Your Progress" Hexagon
  ribbonBow: `
    <svg viewBox="0 0 60 50" width="44" height="38" fill="none" xmlns="http://www.w3.org/2000/svg" class="ribbon-svg">
      <!-- Ribbon Tails -->
      <path d="M24 28 C20 36 12 44 6 48 L12 36 L18 28 Z" fill="#FF8FA3" stroke="#D85A7F" stroke-width="1.5"/>
      <path d="M36 28 C40 36 48 44 54 48 L48 36 L42 28 Z" fill="#FF8FA3" stroke="#D85A7F" stroke-width="1.5"/>
      <!-- Left Loop -->
      <path d="M28 22 C14 8 2 18 16 28 C22 31 28 26 30 22 Z" fill="#FFB3C1" stroke="#D85A7F" stroke-width="2"/>
      <!-- Right Loop -->
      <path d="M32 22 C46 8 58 18 44 28 C38 31 32 26 30 22 Z" fill="#FFB3C1" stroke="#D85A7F" stroke-width="2"/>
      <!-- Center Knot -->
      <circle cx="30" cy="23" r="5.5" fill="#FF758F" stroke="#D85A7F" stroke-width="2"/>
    </svg>
  `,

  // Metronome Icon with ticking pendulum
  metronome: `
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" class="metronome-icon">
      <!-- Metronome Body -->
      <path d="M16 42 L21 8 C21 6.9 21.9 6 23 6 L25 6 C26.1 6 27 6.9 27 8 L32 42 C32.3 43.1 31.4 44 30.3 44 L17.7 44 C16.6 44 15.7 43.1 16 42 Z" fill="#E8D5C4" stroke="#6D4C41" stroke-width="2"/>
      <path d="M20 18 L28 18 M19 26 L29 26 M18 34 L30 34" stroke="#8D6E63" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Ticking Pendulum Rod -->
      <line x1="24" y1="38" x2="19" y2="10" stroke="#D32F2F" stroke-width="2" stroke-linecap="round" class="pendulum-arm"/>
      <!-- Pendulum Weight -->
      <rect x="18" y="18" width="5" height="7" rx="1.5" fill="#C62828" transform="rotate(-12 20.5 21.5)" class="pendulum-weight"/>
      <!-- Base Feet -->
      <circle cx="15" cy="44" r="2" fill="#5D4037"/>
      <circle cx="33" cy="44" r="2" fill="#5D4037"/>
    </svg>
  `
};
