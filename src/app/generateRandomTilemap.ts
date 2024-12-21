import { TileMap, Tile, BaseTerrainType, TerrainFeature } from "./types";

const genDefaultTile = ({ x, y }: { x: number; y: number }): Tile => {
  return {
    baseTerrain: {
      type: BaseTerrainType.PLAINS,
      isHills: false,
      isMountain: false,
      baseYields: {
        food: 2,
        production: 1,
        gold: 0,
        science: 0,
        culture: 0,
        faith: 0,
      },
      validFeatures: [TerrainFeature.WOODS],
      validResources: [],
      movementCost: 1,
      defenseBonus: 0,
      appeal: 0,
    },
    continent: "North America",
    position: { x, y },
    totalYields: {
      food: 2,
      production: 1,
      gold: 0,
      science: 0,
      culture: 0,
      faith: 0,
    },
    appeal: 0,
    freshWater: false,
    coastline: false,
  };
};

export default function generateRandomTileMap({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}): TileMap {
  console.log("we are generating a random tilemap here", {
    rows,
    cols,
  });
  const tileMap: TileMap = [];
  for (let i = 0; i < rows; i++) {
    tileMap[i] = [];
    for (let j = 0; j < cols; j++) {
      tileMap[i].push(genDefaultTile({ x: i, y: j }));
    }
  }
  return tileMap;
}
