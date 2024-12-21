import { TileMap } from "../types";
// import pickRandomTheme from "./pickRandomTheme";
import createEmptyTileGrid from "./createEmptyTileGrid";
// import placeCoastline from "./placeCoastline";
import placeRiver from "./placeRiver";
// import placeMountainRange from "./placeMountainRange";
// import fillSurroundingTerrain from "./fillSurroundingTerrain";
// import addTerrainFeatures from "./addTerrainFeatures";

export default function generateTilemap(size: number): TileMap {
  // 1. Pick a theme (coastal, river valley, mountain pass etc)
  // const theme = pickRandomTheme();

  // 2. Create empty tile grid
  const tileMap = createEmptyTileGrid(size);

  placeRiver(tileMap);

  // 3. Place major fixtures based on theme
  // if (theme === "coastal") {
  //   placeCoastline(tileMap);
  // // } else if (theme === "river_valley") {
  // } else if (theme === "mountain") {
  //   placeMountainRange(tileMap);
  // }

  // 4. Fill in surrounding terrain
  // fillSurroundingTerrain(tileMap, theme);

  // 5. Add features (forests, marsh, etc)
  // addTerrainFeatures(tileMap);

  return tileMap;
}
