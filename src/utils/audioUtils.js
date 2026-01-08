// src/utils/audioUtils.js
export const playBeepSound = () => {
  try {
    // Method 1: Create audio element
    const audio = new Audio();

    // Use a beep sound URL or generate one
    // Option A: Use online beep sound
    audio.src =
      "https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3";

    // Option B: Use local file (place beep.mp3 in public/assets/ folder)
    // audio.src = "/assets/beep.mp3";

    // Option C: Generate beep sound programmatically
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = "sine"; // Type of wave

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);

    return true;
  } catch (error) {
    console.error("Error playing beep sound:", error);

    // Fallback: Use simple beep
    try {
      const audio = new Audio();
      audio.src =
        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
      audio.play();
    } catch (e) {
      console.error("Fallback also failed:", e);
    }
    return false;
  }
};
