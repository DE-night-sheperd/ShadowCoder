import { useState } from "react";
import React from "react";

const GHOST_CODE = `print("Hello ShadowCoders, this is my first code")`;

function App() {
    const [input, setInput] = useState("");

    return (
        <div
            style={{
                padding: "40px",
                fontFamily: "monospace",
                background: "#0b0b0f",
                color: "#e5e5e5",
                minHeight: "100vh",
            }}
        >
            <h1>ShadowCode �</h1>
            <p>Level 1 — Type the Python shadow</p>

            {/* Code Arena */}
            <div style={{ position: "relative", marginTop: "30px" }}>
                {/* Ghost Code */}
                <pre
                    style={{
                        opacity: 0.35,
                        whiteSpace: "pre-wrap",
                        fontSize: "16px",
                        lineHeight: "1.6",
                    }}
                >
                    {GHOST_CODE}
                </pre>

                {/* Input Layer */}
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    spellCheck={false}
                    autoFocus
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "transparent",
                        color: "#00ff9c",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        fontFamily: "monospace",
                        fontSize: "16px",
                        lineHeight: "1.6",
                    }}
                />
            </div>
        </div>
    );
}

export default App;