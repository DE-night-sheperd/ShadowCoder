import { TierKey } from "./languages";

export interface Theme {
    id: string;
    label: string;
    requiredTier?: TierKey;
    colors: {
        primary: string;      // Main accent (buttons, highlights, cursor)
        background: string;   // Main app background
        cardBg: string;       // Card/Panel background
        cardBorder: string;   // Card/Panel border
        text: string;         // Main text
        subtext: string;      // Secondary text
        error: string;        // Error state
    };
}

export const THEMES: Record<string, Theme> = {
    shadow: {
        id: "shadow",
        label: "Shadow (Default)",
        colors: {
            primary: "#00ff9c",
            background: "#000000",
            cardBg: "#0f0f13",
            cardBorder: "#1f1f25",
            text: "#ffffff",
            subtext: "#888888",
            error: "#ff4444"
        }
    },
    cyberpunk: {
        id: "cyberpunk",
        label: "Cyberpunk",
        requiredTier: "intermediate",
        colors: {
            primary: "#ff00ff", // Magenta
            background: "#050510",
            cardBg: "#120518",
            cardBorder: "#2d0a3d",
            text: "#00ccff", // Cyan text
            subtext: "#b366ff",
            error: "#ff3333"
        }
    },
    amber: {
        id: "amber",
        label: "Retro Amber",
        requiredTier: "master",
        colors: {
            primary: "#ffb000", // Amber
            background: "#1a1500",
            cardBg: "#2b2200",
            cardBorder: "#4d3d00",
            text: "#ffcc66",
            subtext: "#997a3d",
            error: "#ff4444"
        }
    },
    ice: {
        id: "ice",
        label: "Glacier",
        requiredTier: "legend",
        colors: {
            primary: "#00e5ff", // Cyan
            background: "#001a1f",
            cardBg: "#002b33",
            cardBorder: "#004d5c",
            text: "#e0ffff",
            subtext: "#669999",
            error: "#ff6b6b"
        }
    },
    dracula: {
        id: "dracula",
        label: "Vampire",
        requiredTier: "shadow",
        colors: {
            primary: "#bd93f9", // Purple
            background: "#282a36",
            cardBg: "#44475a",
            cardBorder: "#6272a4",
            text: "#f8f8f2",
            subtext: "#6272a4",
            error: "#ff5555"
        }
    }
};

export type ThemeKey = keyof typeof THEMES;
