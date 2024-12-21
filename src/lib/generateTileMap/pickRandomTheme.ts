type StartTheme =
  | "river_valley"
  | "coastal"
  | "plains"
  | "mountain"
  | "desert_oasis";

const THEME_WEIGHTS: Record<StartTheme, number> = {
  river_valley: 0.35,
  coastal: 0.25,
  plains: 0.2,
  mountain: 0.15,
  desert_oasis: 0.05,
};

export default function pickRandomTheme(): StartTheme {
  const rand = Math.random();
  let cumulativeWeight = 0;

  for (const [theme, weight] of Object.entries(THEME_WEIGHTS)) {
    cumulativeWeight += weight;
    if (rand < cumulativeWeight) {
      return theme as StartTheme;
    }
  }

  return "plains"; // fallback
}
