import { TileMap, BaseTerrainType } from "../types";
export default function createEmptyTileGrid(size: number) {
  const rows = size;
  const cols = size * 2;
  const tileMap: TileMap = [];

  for (let i = 0; i < rows; i++) {
    tileMap[i] = [];
    for (let j = 0; j < cols; j++) {
      // Center tile is at (radius, radius)
      tileMap[i][j] = {
        baseTerrain: {
          type: BaseTerrainType.PLAINS, // default terrain
          isHills: false,
          isMountain: false,
          baseYields: {
            food: 1,
            production: 1,
            gold: 0,
            science: 0,
            culture: 0,
            faith: 0,
          },
          validFeatures: [],
          validResources: [],
          movementCost: 1,
          defenseBonus: 0,
          appeal: 0,
        },
        position: { x: i, y: j },
        totalYields: {
          food: 1,
          production: 1,
          gold: 0,
          science: 0,
          culture: 0,
          faith: 0,
        },
        appeal: 0,
        freshWater: false,
        coastline: false,
        continent: "start_continent",
        riverEdges: {
          E: false,
          NE: false,
          NW: false,
          SE: false,
          SW: false,
          W: false,
        },
      };
    }
  }

  return tileMap;
}
