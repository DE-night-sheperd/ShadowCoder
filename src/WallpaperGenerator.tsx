import React, { useEffect, useRef, useState } from "react";
import { Theme } from "./themes";

interface WallpaperGeneratorProps {
    username: string;
    language: string;
    tier: string;
    width?: number;
    height?: number;
    theme: Theme;
    unlockedTiers?: string[];
    onBack?: () => void;
}

// --- Helper Functions ---
const renderWallpaper = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    tier: string,
    language: string,
    theme: Theme,
    username: string,
    signature: {x: number, y: number}[][]
) => {
    // --- Configuration ---
    const colors: Record<string, string> = {
        beginner: "#00ff9c",
        intermediate: "#00b8ff",
        master: "#ffbd2e",
        legend: "#ff5f56",
        shadow: "#bd00ff",
        omni: "#ffffff"
    };
    
    const isDefaultTheme = theme.id === 'shadow';
    const primaryColor = isDefaultTheme ? (colors[tier] || theme.colors.primary) : theme.colors.primary;

    // --- Helpers ---
    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    
    const drawHexagon = (x: number, y: number, r: number, stroke: boolean = true) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + r * Math.cos(angle);
            const hy = y + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        if (stroke) ctx.stroke();
        else ctx.fill();
    };

    const drawCircuit = (startX: number, startY: number, length: number) => {
        let x = startX;
        let y = startY;
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        for(let i=0; i<length; i++) {
            if (Math.random() > 0.5) {
                x += (Math.random() > 0.5 ? 20 : -20);
            } else {
                y += (Math.random() > 0.5 ? 20 : -20);
            }
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    };

    const drawMatrixRain = () => {
        ctx.fillStyle = primaryColor;
        ctx.font = "14px monospace";
        ctx.globalAlpha = 0.1;
        for(let i=0; i<100; i++) {
            ctx.fillText(
                String.fromCharCode(0x30A0 + Math.random() * 96), 
                Math.random() * width, 
                Math.random() * height
            );
        }
        ctx.globalAlpha = 1.0;
    };

    // --- Render Steps ---

    // 1. Background
    const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    grad.addColorStop(0, theme.colors.background); 
    grad.addColorStop(1, "#000000"); 
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Pattern Layer
    ctx.strokeStyle = primaryColor;
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 1;

    if (tier === "beginner") {
        // Matrix Rain Style
        drawMatrixRain();
        drawMatrixRain();
        drawMatrixRain();
    } 
    else if (tier === "intermediate" || tier === "master") {
        // Tech Hex Grid
        ctx.globalAlpha = 0.05;
        const hexSize = 60;
        for(let y=0; y<height + hexSize; y+=hexSize*1.5) {
            for(let x=0; x<width + hexSize; x+=hexSize*1.732) {
                const offset = (Math.floor(y/(hexSize*1.5)) % 2 === 0) ? 0 : hexSize*0.866;
                drawHexagon(x + offset, y, hexSize/2);
            }
        }
        ctx.globalAlpha = 1.0;
    }
    else if (tier === "omni") {
        // OMNI GOD MODE: Combined Effects
        
        // 1. Subtle Matrix
        drawMatrixRain();

        // 2. Hex Grid
        ctx.globalAlpha = 0.05;
        const hexSize = 60;
        for(let y=0; y<height + hexSize; y+=hexSize*1.5) {
            for(let x=0; x<width + hexSize; x+=hexSize*1.732) {
                const offset = (Math.floor(y/(hexSize*1.5)) % 2 === 0) ? 0 : hexSize*0.866;
                drawHexagon(x + offset, y, hexSize/2);
            }
        }
        ctx.globalAlpha = 1.0;

        // 3. Golden Glow
        const goldGrad = ctx.createLinearGradient(0, 0, width, height);
        goldGrad.addColorStop(0, "#ffd700");
        goldGrad.addColorStop(0.5, "#ffffff");
        goldGrad.addColorStop(1, "#ffd700");
        ctx.strokeStyle = goldGrad;
        ctx.fillStyle = goldGrad;
    }

    // 3. Circuitry / Decoration
    ctx.strokeStyle = tier === "omni" ? "#ffd700" : primaryColor;
    ctx.fillStyle = tier === "omni" ? "#ffd700" : primaryColor;
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 2;
    for(let i=0; i<15; i++) {
        drawCircuit(random(0, width), random(0, height), 10);
    }
    ctx.globalAlpha = 1.0;

    // 4. Center Graphics (The "Chip")
    ctx.shadowColor = tier === "omni" ? "#ffffff" : primaryColor;
    ctx.shadowBlur = 50;
    
    // Center Ring
    ctx.strokeStyle = tier === "omni" ? "#ffffff" : primaryColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(width/2, height/2, 250, 0, Math.PI*2);
    ctx.stroke();

    // Inner Ring
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width/2, height/2, 230, 0, Math.PI*2);
    ctx.stroke();

    // Tier Specific Shapes
    if (tier === "legend" || tier === "shadow" || tier === "omni") {
            // Spikes
            ctx.beginPath();
            for(let i=0; i<12; i++) {
                const angle = (i/12) * Math.PI * 2;
                ctx.moveTo(width/2 + Math.cos(angle)*250, height/2 + Math.sin(angle)*250);
                ctx.lineTo(width/2 + Math.cos(angle)*300, height/2 + Math.sin(angle)*300);
            }
            ctx.stroke();
    }
    
    // Omni Halo
    if (tier === "omni") {
        ctx.beginPath();
        ctx.arc(width/2, height/2, 320, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // 5. Typography
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Language
    ctx.fillStyle = "#fff";
    // Scale font based on width (assuming standard is 1920)
    const fontScale = width / 1920;
    ctx.font = `900 ${180 * fontScale}px sans-serif`;
    ctx.shadowBlur = 30;
    const displayText = language === "OMNI" ? "MASTER" : language.toUpperCase();
    ctx.fillText(displayText, width/2, height/2 - 20 * fontScale);
    
    // Tier
    ctx.fillStyle = tier === "omni" ? "#ffd700" : primaryColor;
    ctx.font = `bold ${50 * fontScale}px monospace`;
    ctx.shadowBlur = 10;
    const subText = language === "OMNI" ? "FULL STACK AUTHORITY" : `${tier.toUpperCase()} // CERTIFIED`;
    ctx.fillText(subText, width/2, height/2 + 100 * fontScale);

    // 6. User Identity (Corner Badge)
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    // Adjust coordinates based on width/height
    ctx.fillRect(width - 600 * fontScale, height - 150 * fontScale, 550 * fontScale, 100 * fontScale);
    
    ctx.fillStyle = "#fff";
    ctx.font = `${30 * fontScale}px monospace`;
    ctx.textAlign = "right";
    ctx.fillText(`OPERATOR: ${username}`, width - 80 * fontScale, height - 100 * fontScale);
    
    ctx.fillStyle = primaryColor;
    ctx.font = `${20 * fontScale}px monospace`;
    ctx.fillText(`ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()} // ${new Date().toLocaleDateString()}`, width - 80 * fontScale, height - 70 * fontScale);

    // 6.5. User Signature
    if (signature.length > 0) {
        ctx.save();
        // Position signature above the ID card area
        const sigScale = 1.0 * fontScale;
        const sigX = width - 650 * fontScale;
        const sigY = height - 400 * fontScale;

        ctx.translate(sigX, sigY);
        ctx.scale(sigScale, sigScale);

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.9;

        signature.forEach(stroke => {
            ctx.beginPath();
            stroke.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();
        });

        ctx.restore();
    }

    // 7. Overlay Effects
    // Vignette
    const gradient = ctx.createRadialGradient(width/2, height/2, height/2, width/2, height/2, height);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.8)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,width,height);

    // Scanlines
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 2);
    }
};

// Simple Signature Pad Component
function SignaturePad({ onSave, onClose, theme }: { onSave: (strokes: {x: number, y: number}[][]) => void, onClose: () => void, theme: Theme }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokes, setStrokes] = useState<{x: number, y: number}[][]>([]);
    const [currentStroke, setCurrentStroke] = useState<{x: number, y: number}[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = theme.colors.cardBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Grid lines for guidance
        ctx.strokeStyle = theme.colors.cardBorder;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i<canvas.width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i, canvas.height); }
        for(let i=0; i<canvas.height; i+=40) { ctx.moveTo(0,i); ctx.lineTo(canvas.width, i); }
        ctx.stroke();

        // Draw saved strokes
        ctx.strokeStyle = theme.colors.text;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = theme.colors.primary;
        ctx.shadowBlur = 5;

        strokes.forEach(stroke => {
            ctx.beginPath();
            stroke.forEach((p, i) => {
                if (i===0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();
        });

        // Draw current stroke
        if (currentStroke.length > 0) {
            ctx.beginPath();
            currentStroke.forEach((p, i) => {
                if (i===0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();
        }

    }, [strokes, currentStroke, theme]);

    const getPoint = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const start = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        setCurrentStroke([getPoint(e)]);
    };

    const move = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        setCurrentStroke(prev => [...prev, getPoint(e)]);
    };

    const end = () => {
        setIsDrawing(false);
        if (currentStroke.length > 0) {
            setStrokes(prev => [...prev, currentStroke]);
            setCurrentStroke([]);
        }
    };

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.8)", zIndex: 2000,
            display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{
                background: theme.colors.cardBg, border: `1px solid ${theme.colors.cardBorder}`,
                padding: "20px", borderRadius: "12px",
                display: "flex", flexDirection: "column", gap: "20px"
            }}>
                <h3 style={{ color: theme.colors.text, margin: 0, fontFamily: "sans-serif" }}>Sign Your Work</h3>
                <div style={{ border: `1px solid ${theme.colors.cardBorder}`, borderRadius: "8px", overflow: "hidden", cursor: "crosshair" }}>
                    <canvas
                        ref={canvasRef}
                        width={600}
                        height={300}
                        onMouseDown={start}
                        onMouseMove={move}
                        onMouseUp={end}
                        onMouseLeave={end}
                        onTouchStart={start}
                        onTouchMove={move}
                        onTouchEnd={end}
                    />
                </div>
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button onClick={() => setStrokes([])} style={{ padding: "8px 16px", background: theme.colors.cardBorder, border: "none", color: theme.colors.text, borderRadius: "4px", cursor: "pointer" }}>Clear</button>
                    <button onClick={onClose} style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${theme.colors.cardBorder}`, color: theme.colors.subtext, borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                    <button onClick={() => onSave(strokes)} style={{ padding: "8px 16px", background: theme.colors.primary, border: "none", color: theme.colors.background, borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Apply Signature</button>
                </div>
            </div>
        </div>
    );
}

function WallpaperThumbnail({ tier, language, theme, username, onClick, isActive }: { tier: string, language: string, theme: Theme, username: string, onClick: () => void, isActive: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        // Render a small version (Thumbnail size)
        renderWallpaper(ctx, 200, 112, tier, language, theme, username, []);
    }, [tier, language, theme, username]);

    return (
        <div 
            onClick={onClick} 
            style={{ 
                cursor: "pointer", 
                border: isActive ? `2px solid ${theme.colors.primary}` : `1px solid ${theme.colors.cardBorder}`, 
                borderRadius: "8px", 
                overflow: "hidden", 
                transition: "all 0.2s",
                opacity: isActive ? 1 : 0.6,
                transform: isActive ? "scale(1.05)" : "scale(1)",
                minWidth: "180px",
                flexShrink: 0,
                boxShadow: isActive ? `0 0 15px ${theme.colors.primary}40` : "none"
            }}
            onMouseEnter={(e) => {
                 e.currentTarget.style.opacity = "1";
                 e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
                 if (!isActive) {
                     e.currentTarget.style.opacity = "0.6";
                     e.currentTarget.style.transform = "scale(1)";
                 }
            }}
        >
            <canvas ref={canvasRef} width={200} height={112} style={{ display: "block", width: "100%", height: "auto" }} />
            <div style={{ textAlign: "center", padding: "8px", background: theme.colors.cardBg, borderTop: `1px solid ${theme.colors.cardBorder}` }}>
                <span style={{ color: isActive ? theme.colors.primary : theme.colors.text, fontSize: "11px", fontFamily: "monospace", fontWeight: "bold" }}>
                    {tier.toUpperCase()}
                </span>
            </div>
        </div>
    );
}

export default function WallpaperGenerator({ username, language, tier, width = 1920, height = 1080, theme, onBack, unlockedTiers = [] }: WallpaperGeneratorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [signature, setSignature] = useState<{x: number, y: number}[][]>([]);
    const [activeTier, setActiveTier] = useState(tier);

    // Sync activeTier if prop changes (though mainly we want user to control it)
    useEffect(() => {
        setActiveTier(tier);
    }, [tier]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        renderWallpaper(ctx, width, height, activeTier, language, theme, username, signature);

    }, [username, language, activeTier, width, height, signature, theme]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = `ShadowCoder_${language}_${activeTier}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease-out", position: "relative", paddingBottom: "100px" }}>
            {onBack && (
                <button
                    onClick={onBack}
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "20px",
                        background: "transparent",
                        border: "none",
                        color: theme.colors.subtext,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        fontSize: "14px",
                        zIndex: 10
                    }}
                >
                    &lt; Back
                </button>
            )}

            {showSignaturePad && (
                <SignaturePad 
                    onSave={(strokes) => {
                        setSignature(strokes);
                        setShowSignaturePad(false);
                    }} 
                    onClose={() => setShowSignaturePad(false)} 
                    theme={theme}
                />
            )}

            <h2 style={{ color: theme.colors.text, fontFamily: "sans-serif", marginBottom: "20px" }}>
                Reward Unlocked: <span style={{ color: theme.colors.primary }}>Protocol Wallpaper</span>
            </h2>
            <div style={{ 
                border: `1px solid ${theme.colors.cardBorder}`, 
                borderRadius: "8px", 
                overflow: "hidden", 
                display: "inline-block",
                boxShadow: "0 0 50px rgba(0,0,0,0.5)",
                background: "#000",
                position: "relative"
            }}>
                <canvas 
                    ref={canvasRef} 
                    width={width} 
                    height={height} 
                    style={{ width: "100%", maxWidth: "800px", height: "auto", display: "block" }} 
                />
            </div>
            
            {/* Collection List */}
            {unlockedTiers && unlockedTiers.length > 0 && (
                <div style={{ 
                    marginTop: "30px", 
                    maxWidth: "800px", 
                    margin: "30px auto 0", 
                    textAlign: "left" 
                }}>
                    <h3 style={{ color: theme.colors.subtext, fontSize: "14px", fontFamily: "sans-serif", marginBottom: "15px" }}>YOUR COLLECTION</h3>
                    <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "20px" }}>
                        {unlockedTiers.map(t => (
                            <WallpaperThumbnail
                                key={t}
                                tier={t}
                                language={language}
                                theme={theme}
                                username={username}
                                isActive={activeTier === t}
                                onClick={() => setActiveTier(t)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "20px" }}>
                <button 
                    onClick={() => setShowSignaturePad(true)}
                    style={{
                        background: "transparent",
                        color: theme.colors.text,
                        border: `1px solid ${theme.colors.text}`,
                        padding: "16px 30px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontFamily: "sans-serif",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <span>✍️</span> {signature.length > 0 ? "EDIT SIGNATURE" : "SIGN WALLPAPER"}
                </button>

                <button 
                    onClick={handleDownload}
                    style={{
                        background: theme.colors.primary,
                        color: theme.colors.background,
                        border: "none",
                        padding: "16px 40px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontFamily: "sans-serif",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    <span>⬇</span> DOWNLOAD TO LOCAL SYSTEM
                </button>
            </div>
             <p style={{ color: theme.colors.subtext, marginTop: "15px", fontSize: "12px", fontFamily: "monospace" }}>
                    FILE_TYPE: PNG // RES: 1920x1080 // GENERATED: {new Date().toLocaleTimeString()}
            </p>
        </div>
    );
}
