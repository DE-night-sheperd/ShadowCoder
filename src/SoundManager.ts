export class SoundManager {
    private ctx: AudioContext | null = null;
    private enabled: boolean = true;

    constructor() {
        try {
            // Initialize AudioContext on first user interaction usually, but we'll try here
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        } catch (e) {
            console.error("Web Audio API not supported", e);
        }
    }

    public setEnabled(enabled: boolean) {
        this.enabled = enabled;
        if (enabled && this.ctx?.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public isEnabled() {
        return this.enabled;
    }

    private playTone(freq: number, type: OscillatorType, duration: number, volume: number) {
        if (!this.enabled || !this.ctx) return;
        
        // Resume context if suspended (browser policy)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    public playClick() {
        // Mechanical switch sound simulation
        // High frequency click + low thud
        this.playTone(800, 'square', 0.05, 0.03);
        this.playTone(150, 'sine', 0.05, 0.05);
    }

    public playError() {
        // Low buzz/thud
        this.playTone(100, 'sawtooth', 0.15, 0.05);
    }

    public playSuccess() {
        // Ascending Arpeggio
        if (!this.enabled || !this.ctx) return;
        const now = this.ctx.currentTime;
        
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => { // C Major
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0.05, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
            
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.3);
        });
    }

    public playLevelUp() {
        // Longer success sound
        this.playSuccess();
        setTimeout(() => this.playSuccess(), 200);
    }
}

export const soundManager = new SoundManager();
