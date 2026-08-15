// Web Audio API alarm tone — no external audio asset required, works offline.
let audioContext = null

function getContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    audioContext = new AudioCtx()
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  return audioContext
}

// Call once from a user gesture (e.g. first click anywhere) to satisfy
// browser autoplay policies before an alarm ever needs to fire.
export function primeAudio() {
  try {
    getContext()
  } catch {
    // Web Audio unsupported — alarms will still show a visual banner.
  }
}

function playTone(ctx, startTime, frequency, duration) {
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.value = frequency
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02)
  gain.gain.linearRampToValueAtTime(0, startTime + duration)
  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start(startTime)
  oscillator.stop(startTime + duration)
}

export function playAlarmSound() {
  try {
    const ctx = getContext()
    const now = ctx.currentTime
    // Two-tone beep, repeated three times.
    for (let i = 0; i < 3; i++) {
      const base = now + i * 0.5
      playTone(ctx, base, 880, 0.18)
      playTone(ctx, base + 0.2, 660, 0.18)
    }
  } catch {
    // Ignore — visual banner still communicates the alarm.
  }
}
