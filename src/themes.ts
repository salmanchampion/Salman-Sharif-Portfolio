export interface PortfolioTheme {
  id: string;
  name: string;
  icon: string;
  primary: string;
  secondaryGrad: string;
  accent: string;
  darkBg: string;
  cardBg: string;
}

export const themes: PortfolioTheme[] = [
  {
    id: "classic-oceanic",
    name: "Oceanic Blue (ডিফল্ট)",
    icon: "🌊",
    primary: "#3a86ff",
    secondaryGrad: "#8338ec",
    accent: "#06d6a0",
    darkBg: "#0b0f19",
    cardBg: "rgba(17, 24, 39, 0.75)"
  },
  {
    id: "saudi-royal",
    name: "Saudi Royal Green",
    icon: "🕌",
    primary: "#10b981",
    secondaryGrad: "#d97706",
    accent: "#f59e0b",
    darkBg: "#041510",
    cardBg: "rgba(8, 28, 22, 0.75)"
  },
  {
    id: "sahara-sunset",
    name: "Sahara Sunset",
    icon: "🌅",
    primary: "#f43f5e",
    secondaryGrad: "#d11a2a",
    accent: "#fbbf24",
    darkBg: "#17080d",
    cardBg: "rgba(35, 12, 19, 0.75)"
  },
  {
    id: "tokyo-cyber",
    name: "Tokyo Cybertech",
    icon: "⚡",
    primary: "#00f5ff",
    secondaryGrad: "#ff007f",
    accent: "#39ff14",
    darkBg: "#05050a",
    cardBg: "rgba(15, 15, 25, 0.85)"
  },
  {
    id: "nordic-aurora",
    name: "Nordic Aurora",
    icon: "❄️",
    primary: "#06b6d4",
    secondaryGrad: "#6366f1",
    accent: "#a7f3d0",
    darkBg: "#0a1120",
    cardBg: "rgba(20, 30, 48, 0.75)"
  },
  {
    id: "premium-light",
    name: "Premium Light (হোয়াইট ভার্সন)",
    icon: "☀️",
    primary: "#2563eb",
    secondaryGrad: "#4f46e5",
    accent: "#0ea5e9",
    darkBg: "#f8fafc",
    cardBg: "rgba(255, 255, 255, 0.9)"
  }
];

export function applyTheme(themeId: string) {
  if (typeof window === "undefined") return;
  const theme = themes.find(t => t.id === themeId) || themes[0];
  const root = document.documentElement;
  
  // Set main theme colors
  root.style.setProperty("--primary-color", theme.primary);
  root.style.setProperty("--secondary-grad-color", theme.secondaryGrad);
  root.style.setProperty("--accent-color", theme.accent);
  root.style.setProperty("--dark-bg-color", theme.darkBg);
  root.style.setProperty("--card-bg-color", theme.cardBg);

  // Toggle .theme-light class based on whether it is light theme
  if (themeId === "premium-light") {
    root.classList.add("theme-light");
  } else {
    root.classList.remove("theme-light");
  }

  // Store selection
  localStorage.setItem("salman_active_theme_id", themeId);
}

export function getActiveThemeId(): string {
  if (typeof window === "undefined") return "classic-oceanic";
  return localStorage.getItem("salman_active_theme_id") || "classic-oceanic";
}
