export const scaryErrorMessages = [
  "You've been spooked! 🎃👻",
  "One mistake, endless regret.... 💀🪦",
  "Boo! 👻🎃",
  "You've been tricked! 🎃👻",
  "Spooky scary skeletons 🎃💀",
  "Halloween is coming 🎃👻",
  "Once you enter, there's no escape... ⚰️",
  "Fear the whispers in the log.... 💀",
  "Your code is haunted... 👻",
  "Silent errors behind you... 👻",
  "Some functions should never be called 🪦💀"
] as const;

export const scaryLogger = () => {
  const randomMessage = scaryErrorMessages[Math.floor(Math.random() * scaryErrorMessages.length)];

  return `\n\n\n\n🎃 ${randomMessage}`;
}
