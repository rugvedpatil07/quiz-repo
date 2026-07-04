/**
 * Gamification Utility
 * Handles XP multipliers, Level calculations, and Ranks
 */

export const XP_MULTIPLIER = 100; // E.g., 3 raw score points = 300 XP
export const XP_PER_LEVEL = 500; // Amount of XP needed per level

export function calculateXP(rawScore: number): number {
  return rawScore * XP_MULTIPLIER;
}

export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / XP_PER_LEVEL) + 1;
}

export function getRankTitle(level: number): string {
  if (level >= 50) return "Grandmaster";
  if (level >= 40) return "Master";
  if (level >= 30) return "Expert";
  if (level >= 20) return "QuizMaster";
  if (level >= 10) return "Scholar";
  if (level >= 5) return "Apprentice";
  return "Novice";
}

export function getRankColor(level: number): string {
  if (level >= 50) return "#fbbf24"; // Gold
  if (level >= 40) return "#f43f5e"; // Rose
  if (level >= 30) return "#8b5cf6"; // Violet
  if (level >= 20) return "#3b82f6"; // Blue
  if (level >= 10) return "#10b981"; // Emerald
  if (level >= 5) return "#f97316"; // Orange
  return "#94a3b8"; // Slate
}

export function getXPProgress(totalXP: number): { currentLevelXP: number; nextLevelXP: number; percentage: number } {
  const currentLevelXP = totalXP % XP_PER_LEVEL;
  const percentage = Math.round((currentLevelXP / XP_PER_LEVEL) * 100);
  return {
    currentLevelXP,
    nextLevelXP: XP_PER_LEVEL,
    percentage,
  };
}
