import React, { useEffect, useState } from 'react';
import { Theme } from './themes';

export interface LeaderboardEntry {
  id: string;
  username: string;
  wpm: number;
  accuracy: number;
  language: string;
  tier: string;
  timestamp: number;
}

const STORAGE_KEY = 'shadow_coder_leaderboard';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', username: 'ShadowMaster', wpm: 120, accuracy: 99, language: 'Python', tier: 'shadow', timestamp: Date.now() },
  { id: '2', username: 'NeonCoder', wpm: 115, accuracy: 98, language: 'JavaScript', tier: 'legend', timestamp: Date.now() },
  { id: '3', username: 'CyberNinja', wpm: 105, accuracy: 97, language: 'C++', tier: 'master', timestamp: Date.now() },
  { id: '4', username: 'GlitchHunter', wpm: 95, accuracy: 96, language: 'Rust', tier: 'intermediate', timestamp: Date.now() },
  { id: '5', username: 'PixelDev', wpm: 85, accuracy: 95, language: 'Go', tier: 'beginner', timestamp: Date.now() },
];

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Initialize with mock data if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_LEADERBOARD));
      return MOCK_LEADERBOARD;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to load leaderboard", e);
    return MOCK_LEADERBOARD;
  }
};

export const addLeaderboardEntry = (entry: Omit<LeaderboardEntry, 'id' | 'timestamp'>) => {
  try {
    const current = getLeaderboard();
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    // Sort by WPM descending and keep top 50
    const updated = [newEntry, ...current]
      .sort((a, b) => b.wpm - a.wpm)
      .slice(0, 50);
      
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save leaderboard entry", e);
  }
};

interface LeaderboardProps {
  theme: Theme;
  onClose: () => void;
}

export function Leaderboard({ theme, onClose }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(getLeaderboard());
    
    // Listen for storage changes to update in real-time if multiple tabs
    const handleStorageChange = () => {
        setEntries(getLeaderboard());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: theme.colors.cardBg,
        border: `1px solid ${theme.colors.cardBorder}`,
        borderRadius: '16px',
        padding: '30px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `0 0 50px ${theme.colors.primary}20`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: theme.colors.primary, margin: 0, fontFamily: 'sans-serif' }}>Global Leaderboard</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.colors.subtext,
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.colors.cardBorder}`, textAlign: 'left' }}>
                <th style={{ padding: '10px', color: theme.colors.subtext, fontFamily: 'monospace' }}>RANK</th>
                <th style={{ padding: '10px', color: theme.colors.subtext, fontFamily: 'monospace' }}>OPERATOR</th>
                <th style={{ padding: '10px', color: theme.colors.subtext, fontFamily: 'monospace' }}>LANG</th>
                <th style={{ padding: '10px', color: theme.colors.subtext, fontFamily: 'monospace' }}>TIER</th>
                <th style={{ padding: '10px', color: theme.colors.subtext, fontFamily: 'monospace' }}>WPM</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id} style={{ 
                  borderBottom: `1px solid ${theme.colors.cardBorder}40`,
                  background: index === 0 ? `${theme.colors.primary}10` : 'transparent'
                }}>
                  <td style={{ padding: '15px 10px', color: theme.colors.text, fontFamily: 'monospace', fontWeight: 'bold' }}>
                    #{index + 1}
                  </td>
                  <td style={{ padding: '15px 10px', color: theme.colors.text, fontFamily: 'sans-serif' }}>
                    {entry.username}
                  </td>
                  <td style={{ padding: '15px 10px', color: theme.colors.subtext, fontFamily: 'monospace' }}>
                    {entry.language}
                  </td>
                  <td style={{ padding: '15px 10px', color: theme.colors.subtext, fontFamily: 'monospace', textTransform: 'uppercase' }}>
                    {entry.tier}
                  </td>
                  <td style={{ padding: '15px 10px', color: theme.colors.primary, fontFamily: 'monospace', fontWeight: 'bold' }}>
                    {entry.wpm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {entries.length === 0 && (
             <div style={{ padding: '20px', textAlign: 'center', color: theme.colors.subtext }}>
                 No records yet. Be the first!
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
