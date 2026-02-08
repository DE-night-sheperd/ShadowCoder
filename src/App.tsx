import { useState, useEffect } from "react";
import React from "react";
import { LANGUAGES, TIERS, LanguageKey, TierKey, LanguageLevel } from "./languages";
import WallpaperGenerator from "./WallpaperGenerator";
import { soundManager } from "./SoundManager";
import { THEMES, ThemeKey, Theme } from "./themes";
import { Leaderboard, addLeaderboardEntry } from "./Leaderboard";

// --- Components ---

function ThemeSelector({ currentTheme, onSelectTheme, unlockedTiers }: { currentTheme: ThemeKey, onSelectTheme: (key: ThemeKey) => void, unlockedTiers: string[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: "relative" }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: "transparent",
                    border: `1px solid ${THEMES[currentTheme].colors.cardBorder}`,
                    color: THEMES[currentTheme].colors.subtext,
                    padding: "8px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontFamily: "sans-serif",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}
            >
                <span style={{ 
                    width: "12px", 
                    height: "12px", 
                    borderRadius: "50%", 
                    background: THEMES[currentTheme].colors.primary 
                }}></span>
                {THEMES[currentTheme].label}
            </button>

            {isOpen && (
                <div style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    background: THEMES[currentTheme].colors.cardBg,
                    border: `1px solid ${THEMES[currentTheme].colors.cardBorder}`,
                    borderRadius: "8px",
                    padding: "8px",
                    zIndex: 100,
                    minWidth: "150px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }}>
                    {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
                        const theme = THEMES[key];
                        const isUnlocked = !theme.requiredTier || unlockedTiers.includes(theme.requiredTier);
                        
                        return (
                            <button
                                key={key}
                                onClick={() => {
                                    if (isUnlocked) {
                                        onSelectTheme(key);
                                        setIsOpen(false);
                                    }
                                }}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: isUnlocked 
                                        ? (currentTheme === key ? theme.colors.primary : THEMES[currentTheme].colors.subtext)
                                        : THEMES[currentTheme].colors.cardBorder,
                                    padding: "8px",
                                    textAlign: "left",
                                    cursor: isUnlocked ? "pointer" : "not-allowed",
                                    fontFamily: "sans-serif",
                                    fontSize: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    opacity: isUnlocked ? 1 : 0.5
                                }}
                            >
                                <span style={{ 
                                    width: "8px", 
                                    height: "8px", 
                                    borderRadius: "50%", 
                                    background: isUnlocked ? theme.colors.primary : THEMES[currentTheme].colors.cardBorder
                                }}></span>
                                {theme.label}
                                {!isUnlocked && <span style={{ marginLeft: "auto" }}>🔒</span>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function Header({ username, soundEnabled, onToggleSound, theme, onSelectTheme, currentThemeKey, onShowLeaderboard, unlockedTiers }: { 
    username?: string | null, 
    soundEnabled: boolean, 
    onToggleSound: () => void,
    theme: Theme,
    onSelectTheme: (key: ThemeKey) => void,
    currentThemeKey: ThemeKey,
    onShowLeaderboard: () => void,
    unlockedTiers: string[]
}) {
    return (
        <div style={{ marginBottom: "60px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ textAlign: "left" }}>
                <h1 style={{ fontSize: "28px", margin: 0, fontFamily: "sans-serif", fontWeight: 700 }}>
                    <span style={{ color: theme.colors.primary }}>Shadow</span> <span style={{ color: theme.colors.text }}>Code</span>
                </h1>
                <p style={{ color: theme.colors.subtext, marginTop: "8px", fontSize: "14px", fontFamily: "sans-serif" }}>
                    Muscle Memory Gym for Coders
                </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <button
                    onClick={onShowLeaderboard}
                    style={{
                        background: "transparent",
                        border: `1px solid ${theme.colors.cardBorder}`,
                        color: theme.colors.subtext,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontFamily: "sans-serif",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <span>🏆</span> Leaderboard
                </button>

                <ThemeSelector currentTheme={currentThemeKey} onSelectTheme={onSelectTheme} unlockedTiers={unlockedTiers} />
                
                <button
                    onClick={onToggleSound}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: soundEnabled ? theme.colors.primary : theme.colors.subtext,
                        cursor: "pointer",
                        fontFamily: "monospace",
                        fontSize: "20px",
                        padding: "0 10px"
                    }}
                    title={soundEnabled ? "Mute Sound" : "Enable Sound"}
                >
                    {soundEnabled ? "🔊" : "🔇"}
                </button>
                {username && (
                    <div style={{ textAlign: "right" }}>
                        <div style={{ color: theme.colors.subtext, fontSize: "12px", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px" }}>
                            OPERATOR
                        </div>
                        <div style={{ color: theme.colors.primary, fontSize: "16px", fontFamily: "monospace", fontWeight: "bold" }}>
                            {username}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function LanguageGrid({ onSelect, theme }: { onSelect: (lang: LanguageKey) => void, theme: Theme }) {
    return (
        <div style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", color: theme.colors.primary, marginBottom: "10px", fontFamily: "sans-serif" }}>
                Choose Your Path
            </h2>
            <p style={{ color: theme.colors.subtext, marginBottom: "50px", fontFamily: "sans-serif" }}>
                Select a language to start your shadow training
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "20px",
                }}
            >
                {(Object.keys(LANGUAGES) as LanguageKey[]).map((key) => (
                    <div
                        key={key}
                        onClick={() => onSelect(key)}
                        style={{
                            background: theme.colors.cardBg,
                            border: `1px solid ${theme.colors.cardBorder}`,
                            borderRadius: "12px",
                            padding: "30px 20px",
                            cursor: "pointer",
                            transition: "transform 0.2s, border-color 0.2s",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = theme.colors.primary;
                            e.currentTarget.style.transform = "translateY(-4px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = theme.colors.cardBorder;
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <span style={{ color: theme.colors.text, fontWeight: "bold", fontSize: "18px", fontFamily: "sans-serif" }}>
                            {LANGUAGES[key].name}
                        </span>
                        <span style={{ color: theme.colors.subtext, fontSize: "12px", fontFamily: "sans-serif" }}>
                            5 Tiers Available
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DifficultySelection({ langKey, onSelectTier, onBack, unlockedTiers, theme }: { langKey: LanguageKey, onSelectTier: (tier: TierKey) => void, onBack: () => void, unlockedTiers: string[], theme: Theme }) {
    const lang = LANGUAGES[langKey];

    return (
        <div style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                 <button
                    onClick={onBack}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: theme.colors.subtext,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        fontSize: "14px",
                    }}
                >
                    &lt; Back
                </button>
                <h2 style={{ fontSize: "32px", color: theme.colors.primary, margin: 0, fontFamily: "sans-serif" }}>
                    Select Difficulty
                </h2>
                <div style={{ width: "60px" }}></div> {/* Spacer */}
            </div>
           
            <p style={{ color: theme.colors.subtext, marginBottom: "50px", fontFamily: "sans-serif" }}>
                Choose your challenge level for {lang.name}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                {TIERS.map((tier) => {
                    const isUnlocked = unlockedTiers.includes(tier.key);
                    return (
                        <div
                            key={tier.key}
                            onClick={() => isUnlocked && onSelectTier(tier.key)}
                            style={{
                                width: "200px",
                                height: "300px",
                                background: theme.colors.cardBg,
                                border: `1px solid ${isUnlocked ? tier.color : theme.colors.cardBorder}`,
                                borderRadius: "16px",
                                padding: "20px",
                                cursor: isUnlocked ? "pointer" : "not-allowed",
                                opacity: isUnlocked ? 1 : 0.5,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s",
                                position: "relative"
                            }}
                            onMouseEnter={(e) => {
                                if (isUnlocked) {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = `0 0 20px ${tier.color}40`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (isUnlocked) {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }
                            }}
                        >
                            {!isUnlocked && (
                                <div style={{ fontSize: "40px", marginBottom: "20px" }}>🔒</div>
                            )}
                            {isUnlocked && (
                                <div style={{ fontSize: "40px", marginBottom: "20px", color: tier.color }}>🔓</div>
                            )}
                            
                            <h3 style={{ color: theme.colors.text, margin: "10px 0", fontSize: "20px", fontFamily: "sans-serif" }}>
                                {tier.label}
                            </h3>
                            <div style={{ color: theme.colors.subtext, fontSize: "12px", textTransform: "uppercase", fontFamily: "sans-serif" }}>
                                {isUnlocked ? "AVAILABLE" : "LOCKED"}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function TerminalOutput({ output, theme, onNext, onRetry, level }: { 
    output: React.ReactNode, 
    theme: Theme, 
    onNext: () => void, 
    onRetry: () => void,
    level?: LanguageLevel
}) {
    const [logs, setLogs] = useState<string[]>([]);
    const [status, setStatus] = useState<"init" | "input" | "done">("init");
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [userInputs, setUserInputs] = useState<string[]>([]);
    const [finalOutput, setFinalOutput] = useState<React.ReactNode>(null);

    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Reset state when level changes
        setLogs([]);
        setStatus("init");
        setCurrentPromptIndex(0);
        setInputValue("");
        setUserInputs([]);
        setFinalOutput(null);

        // Initial build simulation
        let timeouts: ReturnType<typeof setTimeout>[] = [];
        
        timeouts.push(setTimeout(() => setLogs(l => [...l, "> Compiling..."]), 500));
        timeouts.push(setTimeout(() => setLogs(l => [...l, "> Linking..."]), 1000));
        timeouts.push(setTimeout(() => {
            setLogs(l => [...l, "> Running..."]);
            
            if (level?.input) {
                setStatus("input");
            } else {
                setFinalOutput(output);
                setStatus("done");
            }
        }, 1500));

        return () => timeouts.forEach(clearTimeout);
    }, [level, output]);

    useEffect(() => {
        if (status === "input" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [status, currentPromptIndex]);

    const handleInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!level?.input) return;

        const newInputs = [...userInputs, inputValue];
        setUserInputs(newInputs);
        setLogs(l => [...l, `${level.input!.prompts[currentPromptIndex]} ${inputValue}`]);
        setInputValue("");

        if (currentPromptIndex + 1 < level.input.prompts.length) {
            setCurrentPromptIndex(prev => prev + 1);
        } else {
            // All inputs collected
            const result = level.input.handler(newInputs);
            setFinalOutput(result);
            setStatus("done");
        }
    };

    return (
        <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "40%",
            background: "#1e1e1e",
            borderTop: `1px solid ${theme.colors.cardBorder}`,
            padding: "20px",
            boxSizing: "border-box",
            color: "#ccc",
            fontFamily: "monospace",
            fontSize: "14px",
            overflowY: "auto",
            animation: "slideUp 0.3s ease-out",
            zIndex: 10,
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{ marginBottom: "10px", color: theme.colors.subtext }}>
                Terminal
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
                {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                ))}

                {status === "input" && level?.input && (
                    <form onSubmit={handleInputSubmit} style={{ display: "flex", gap: "8px" }}>
                        <span style={{ color: theme.colors.primary }}>
                            {level.input.prompts[currentPromptIndex]}
                        </span>
                        <input
                            ref={inputRef}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#fff",
                                outline: "none",
                                flex: 1,
                                fontFamily: "monospace",
                                fontSize: "14px"
                            }}
                            autoFocus
                        />
                    </form>
                )}

                {status === "done" && (
                    <>
                        <div style={{ color: theme.colors.primary, marginTop: "10px", whiteSpace: "pre-wrap" }}>
                            {finalOutput}
                        </div>
                        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                            <button
                                onClick={onNext}
                                style={{
                                    background: theme.colors.primary,
                                    color: "#000",
                                    border: "none",
                                    padding: "8px 20px",
                                    borderRadius: "4px",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                }}
                            >
                                Next Level
                            </button>
                            <button
                                onClick={onRetry}
                                style={{
                                    background: "transparent",
                                    border: `1px solid ${theme.colors.subtext}`,
                                    color: theme.colors.subtext,
                                    padding: "8px 20px",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Retry
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function GameView({ langKey, tier, onBack, onCompleteTier, soundEnabled, onToggleSound, theme, zenMode, onToggleZenMode, username }: { 
    langKey: LanguageKey; 
    tier: TierKey; 
    onBack: () => void; 
    onCompleteTier: () => void; 
    soundEnabled: boolean; 
    onToggleSound: () => void;
    theme: Theme;
    zenMode: boolean;
    onToggleZenMode: () => void;
    username: string;
}) {
    const lang = LANGUAGES[langKey];
    if (!lang) return <div style={{ color: theme.colors.error, padding: "20px" }}>Error: Language '{langKey}' not found.</div>;

    const levels = lang.tiers[tier];
    if (!levels || levels.length === 0) return <div style={{ color: theme.colors.error, padding: "20px" }}>Error: Tier '{tier}' content missing.</div>;
    
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [input, setInput] = useState("");
    const [stats, setStats] = useState({ wpm: 0, acc: 100, progress: 0 });
    const [gameState, setGameState] = useState<"typing" | "completed" | "running" | "success">("typing");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [shake, setShake] = useState(false);

    const currentLevel = levels[currentLevelIndex % levels.length];

    // Reset game when language changes
    useEffect(() => {
        setInput("");
        setStats({ wpm: 0, acc: 100, progress: 0 });
        setGameState("typing");
        setStartTime(null);
        setCurrentLevelIndex(0);
        setShowExplanation(false);
        setShake(false);
    }, [langKey, tier]);

    // Handle typing and completion
    useEffect(() => {
        if (gameState !== "typing" && gameState !== "completed") return;

        const correctChars = input.split("").filter((char, i) => char === currentLevel.ghost[i]).length;
        const progress = Math.floor((correctChars / currentLevel.ghost.length) * 100);
        
        // Calculate Accuracy
        let accuracy = 100;
        if (input.length > 0) {
            const mistakes = input.split("").reduce((acc, char, i) => {
                return char !== currentLevel.ghost[i] ? acc + 1 : acc;
            }, 0);
            accuracy = Math.max(0, Math.floor(((input.length - mistakes) / input.length) * 100));
        }

        // Calculate WPM
        let currentWpm = 0;
        if (startTime && input.length > 0) {
            const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
            const words = input.length / 5;
            currentWpm = Math.floor(words / timeElapsed);
        }

        setStats({ wpm: currentWpm, acc: accuracy, progress });

        if (gameState === "typing" && input === currentLevel.ghost) {
            setGameState("running");
            soundManager.playSuccess();
            
            // Add to leaderboard
            addLeaderboardEntry({
                username: username,
                wpm: currentWpm,
                accuracy: accuracy,
                language: lang.name,
                tier: tier
            });
        }
    }, [input, currentLevel.ghost, startTime, gameState]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!startTime) setStartTime(Date.now());
        if (gameState === "typing") {
            const val = e.target.value;
            
            // Sound & Shake Logic
            if (val.length > input.length) {
                // Typing forward
                const char = val[val.length - 1];
                const expected = currentLevel.ghost[val.length - 1];
                if (char === expected) {
                    soundManager.playClick();
                } else {
                    soundManager.playError();
                    setShake(true);
                    setTimeout(() => setShake(false), 200);
                }
            } else {
                // Backspace
                soundManager.playClick();
            }

            setInput(val);
        }
    };

    const handleRetry = () => {
        setInput("");
        setGameState("typing");
        setStats({ wpm: 0, acc: 100, progress: 0 });
        setStartTime(null);
    };

    const handleNextLevel = () => {
        if (currentLevelIndex + 1 >= levels.length) {
            // Tier completed!
            soundManager.playLevelUp();
            alert(`Congratulations! You have completed the ${tier} tier for ${lang.name}!`);
            onCompleteTier();
            onBack(); // Go back to difficulty selection
        } else {
            setCurrentLevelIndex(prev => prev + 1);
            handleRetry();
        }
    };

    // Render highlighted code
    const renderCode = () => {
        if (!currentLevel || !currentLevel.ghost) return null;

        const elements = currentLevel.ghost.split("").map((char, i) => {
            const inputChar = input[i];
            let color = "#444"; // Default ghost color
            if (inputChar) {
                color = inputChar === char ? theme.colors.primary : theme.colors.error;
            }
            
            const isCursor = i === input.length;
            
            return (
                <React.Fragment key={i}>
                    {isCursor && (
                         <span style={{ 
                            borderLeft: `2px solid ${theme.colors.primary}`, 
                            animation: "blink 1s step-end infinite",
                            display: "inline-block",
                            height: "1.2em",
                            verticalAlign: "text-bottom",
                            width: "0px",
                            marginLeft: "-1px"
                        }}></span>
                    )}
                    <span style={{ color }}>{char}</span>
                </React.Fragment>
            );
        });

        // Cursor at the end if needed
        if (input.length >= currentLevel.ghost.length) {
             elements.push(
                <span key="cursor-end" style={{ 
                    borderLeft: `2px solid ${theme.colors.primary}`, 
                    animation: "blink 1s step-end infinite",
                    display: "inline-block",
                    height: "1.2em",
                    verticalAlign: "text-bottom",
                    width: "0px",
                    marginLeft: "-1px"
                }}></span>
             );
        }
        
        return elements;
    };

    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Nav */}
            {!zenMode && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button
                            onClick={onBack}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: theme.colors.subtext,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                            }}
                        >
                            &lt; Back
                        </button>
                        <div>
                            <h1 style={{ fontSize: "24px", margin: 0, fontFamily: "sans-serif", fontWeight: 700, lineHeight: 1 }}>
                                <span style={{ color: theme.colors.primary }}>Shadow</span> <span style={{ color: theme.colors.text }}>Code</span>
                            </h1>
                            <p style={{ color: theme.colors.subtext, margin: 0, fontSize: "12px", fontFamily: "sans-serif" }}>
                                Muscle Memory Gym for Coders
                            </p>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <button
                            onClick={onToggleSound}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: soundEnabled ? theme.colors.primary : theme.colors.subtext,
                                cursor: "pointer",
                                fontFamily: "monospace",
                                fontSize: "20px",
                                padding: "0 10px",
                            }}
                            title={soundEnabled ? "Mute Sound" : "Enable Sound"}
                        >
                            {soundEnabled ? "🔊" : "🔇"}
                        </button>
                        
                        <button
                            onClick={onToggleZenMode}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: zenMode ? theme.colors.primary : theme.colors.subtext,
                                cursor: "pointer",
                                fontFamily: "monospace",
                                fontSize: "20px",
                                padding: "0 10px",
                                marginRight: "10px"
                            }}
                            title="Zen Mode"
                        >
                            👁️
                        </button>

                        {[lang.name, `Level ${currentLevelIndex + 1} / ${levels.length}`, `Tier ${tier}`].map((text) => (
                            <div
                                key={text}
                                style={{
                                    padding: "6px 16px",
                                    borderRadius: "20px",
                                    border: `1px solid ${theme.colors.cardBorder}`,
                                    color: theme.colors.subtext,
                                    fontSize: "12px",
                                    fontFamily: "sans-serif",
                                    textTransform: "capitalize"
                                }}
                            >
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Zen Mode Escape Button */}
            {zenMode && (
                <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 100 }}>
                    <button
                        onClick={onToggleZenMode}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: theme.colors.subtext,
                            cursor: "pointer",
                            fontSize: "24px",
                            opacity: 0.5
                        }}
                        title="Exit Zen Mode"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Game Card */}
            <div
                style={{
                    background: theme.colors.cardBg,
                    borderRadius: zenMode ? "0" : "16px",
                    padding: "40px",
                    border: zenMode ? "none" : `1px solid ${theme.colors.cardBorder}`,
                    minHeight: zenMode ? "100vh" : "400px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: zenMode ? "center" : "flex-start",
                    transform: shake ? "translate(5px, 0)" : "none",
                    transition: "all 0.3s ease"
                }}
            >
                {/* Explain / Help Button */}
                <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    style={{
                        position: "absolute",
                        top: "24px",
                        right: "24px",
                        background: showExplanation ? theme.colors.primary : "transparent",
                        border: showExplanation ? "none" : `1px solid ${theme.colors.cardBorder}`,
                        color: showExplanation ? theme.colors.cardBg : theme.colors.subtext,
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontFamily: "sans-serif",
                        transition: "all 0.2s",
                        zIndex: 30 // Higher than everything
                    }}
                    title="Explain Code"
                >
                    ?
                </button>

                {/* Explanation Sidebar */}
                {showExplanation && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "350px", // Wider for better reading
                            height: "100%",
                            background: theme.colors.background,
                            borderLeft: `1px solid ${theme.colors.cardBorder}`,
                            borderTopRightRadius: "16px",
                            borderBottomRightRadius: "16px",
                            padding: "30px",
                            zIndex: 20,
                            overflowY: "auto",
                            boxShadow: "-10px 0 30px rgba(0,0,0,0.8)",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <div style={{ marginBottom: "20px", borderBottom: `1px solid ${theme.colors.cardBorder}`, paddingBottom: "15px" }}>
                            <h3 style={{ margin: "0 0 5px 0", color: theme.colors.primary, fontFamily: "sans-serif", fontSize: "18px" }}>
                                Code Logic
                            </h3>
                            <p style={{ margin: 0, color: theme.colors.subtext, fontSize: "12px", fontFamily: "sans-serif" }}>
                                Line-by-line breakdown
                            </p>
                        </div>
                        <div style={{ 
                            fontFamily: "sans-serif", 
                            fontSize: "14px", 
                            lineHeight: "1.8", 
                            color: theme.colors.text, 
                            whiteSpace: "pre-wrap" 
                        }}>
                            {currentLevel.explanation || "No explanation available for this level."}
                        </div>
                    </div>
                )}

                {/* Stats */}
                {!zenMode && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
                        <div style={{ display: "flex", gap: "30px" }}>
                            <div>
                                <div style={{ color: theme.colors.subtext, fontSize: "12px", textTransform: "uppercase", fontFamily: "sans-serif" }}>WPM</div>
                                <div style={{ color: theme.colors.text, fontSize: "24px", fontFamily: "monospace", fontWeight: "bold" }}>{stats.wpm}</div>
                            </div>
                            <div>
                                <div style={{ color: theme.colors.subtext, fontSize: "12px", textTransform: "uppercase", fontFamily: "sans-serif" }}>Accuracy</div>
                                <div style={{ color: theme.colors.text, fontSize: "24px", fontFamily: "monospace", fontWeight: "bold" }}>{stats.acc}%</div>
                            </div>
                        </div>
                        <div style={{ width: "200px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                <span style={{ color: theme.colors.subtext, fontSize: "12px" }}>Progress</span>
                                <span style={{ color: theme.colors.primary, fontSize: "12px" }}>{stats.progress}%</span>
                            </div>
                            <div style={{ height: "4px", background: theme.colors.cardBorder, borderRadius: "2px", overflow: "hidden" }}>
                                <div style={{ width: `${stats.progress}%`, height: "100%", background: theme.colors.primary, transition: "width 0.2s" }}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Code Area */}
                <div 
                    style={{ 
                        position: "relative", 
                        flex: 1, 
                        background: theme.colors.background, 
                        borderRadius: "8px", 
                        padding: "20px", 
                        overflow: "hidden", 
                        border: `1px solid ${theme.colors.cardBorder}`,
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: zenMode ? "center" : "flex-start",
                        justifyContent: zenMode ? "center" : "flex-start"
                    }}
                    onClick={() => document.getElementById("code-input")?.focus()}
                >
                    <pre style={{ 
                        margin: 0, 
                        fontFamily: "'Fira Code', 'Consolas', monospace", 
                        fontSize: zenMode ? "24px" : "18px", // Larger font in Zen Mode
                        lineHeight: "1.6",
                        whiteSpace: "pre-wrap",
                        pointerEvents: "none",
                        width: zenMode ? "80%" : "100%", // Limit width in Zen Mode
                        maxWidth: "800px"
                    }}>
                        {renderCode()}
                    </pre>
                    <textarea
                        id="code-input"
                        value={input}
                        onChange={handleInputChange}
                        autoFocus
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0,
                            cursor: "default",
                            resize: "none"
                        }}
                        spellCheck={false}
                        disabled={gameState !== "typing"}
                    />
                </div>

                {/* Terminal / Status Message */}
                {(gameState === "running" || gameState === "completed" || gameState === "success") && (
                    <TerminalOutput 
                        output={currentLevel.output || "Program executed successfully."} 
                        theme={theme}
                        onNext={handleNextLevel}
                        onRetry={handleRetry}
                        level={currentLevel}
                    />
                )}
            </div>
            
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

function App() {
    const [view, setView] = useState<"home" | "difficulty" | "game" | "wallpaper">("home");
    const [selectedLang, setSelectedLang] = useState<LanguageKey>("javascript");
    const [selectedTier, setSelectedTier] = useState<TierKey>("beginner");
    
    // Persistence for unlockedTiers
    const [unlockedTiers, setUnlockedTiers] = useState<string[]>(() => {
        const saved = localStorage.getItem("shadowcoder_unlocked_tiers");
        return saved ? JSON.parse(saved) : ["beginner"];
    });

    useEffect(() => {
        localStorage.setItem("shadowcoder_unlocked_tiers", JSON.stringify(unlockedTiers));
    }, [unlockedTiers]);

    const [username] = useState<string | null>("GUEST_USER");
    const [soundEnabled, setSoundEnabled] = useState(true);
    
    // Theme State
    const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>("shadow");
    const theme = THEMES[currentThemeKey];

    // Zen Mode State (Global to persist across levels)
    const [zenMode, setZenMode] = useState(false);
    
    // Leaderboard State
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const handleCompleteTier = () => {
        const tiers: TierKey[] = ["beginner", "intermediate", "master", "legend", "shadow"];
        const currentIndex = tiers.indexOf(selectedTier);
        if (currentIndex < tiers.length - 1) {
            const nextTier = tiers[currentIndex + 1];
            if (!unlockedTiers.includes(nextTier)) {
                setUnlockedTiers(prev => [...prev, nextTier]);
            }
        }
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            background: theme.colors.background, 
            color: theme.colors.text, 
            padding: (view === "game" && zenMode) ? "0" : "40px",
            transition: "background 0.5s ease, color 0.5s ease, padding 0.5s ease" 
        }}>
            {view === "home" && (
                <>
                    <Header 
                        username={username} 
                        soundEnabled={soundEnabled}
                        onToggleSound={() => {
                            const newState = !soundEnabled;
                            setSoundEnabled(newState);
                            soundManager.setEnabled(newState);
                        }}
                        theme={theme}
                        currentThemeKey={currentThemeKey}
                        onSelectTheme={setCurrentThemeKey}
                        onShowLeaderboard={() => setShowLeaderboard(true)}
                        unlockedTiers={unlockedTiers}
                    />
                    <LanguageGrid
                        onSelect={(lang) => {
                            setSelectedLang(lang);
                            setView("difficulty");
                        }}
                        theme={theme}
                    />
                    
                    {/* Wallpaper Generator Entry */}
                    <div style={{ textAlign: "center", marginTop: "80px" }}>
                        <button
                            onClick={() => setView("wallpaper")}
                            style={{
                                background: "transparent",
                                border: `1px solid ${theme.colors.cardBorder}`,
                                color: theme.colors.subtext,
                                padding: "10px 20px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontFamily: "sans-serif",
                                fontSize: "12px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            <span>🖼️</span> Generate Certificate / Wallpaper
                        </button>
                    </div>
                </>
            )}

            {view === "difficulty" && (
                <DifficultySelection
                    langKey={selectedLang}
                    onSelectTier={(tier) => {
                        setSelectedTier(tier);
                        setView("game");
                    }}
                    onBack={() => setView("home")}
                    unlockedTiers={unlockedTiers}
                    theme={theme}
                />
            )}

            {view === "game" && (
                <GameView
                    langKey={selectedLang}
                    tier={selectedTier}
                    soundEnabled={soundEnabled}
                    onToggleSound={() => {
                        const newState = !soundEnabled;
                        setSoundEnabled(newState);
                        soundManager.setEnabled(newState);
                    }}
                    onBack={() => {
                        setView("difficulty");
                    }}
                    onCompleteTier={handleCompleteTier}
                    theme={theme}
                    zenMode={zenMode}
                    onToggleZenMode={() => setZenMode(!zenMode)}
                    username={username || "Guest"}
                />
            )}

            {view === "wallpaper" && (
                <WallpaperGenerator
                    username={username || "User"}
                    language={selectedLang}
                    tier={selectedTier}
                    unlockedTiers={unlockedTiers}
                    theme={theme}
                    onBack={() => setView("home")}
                />
            )}

            {showLeaderboard && (
                <Leaderboard
                    theme={theme}
                    onClose={() => setShowLeaderboard(false)}
                />
            )}
        </div>
    );
}

export default App;
