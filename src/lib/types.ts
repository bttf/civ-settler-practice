// Basic types for yields
interface Yields {
  food: number;
  production: number;
  gold: number;
  science: number;
  culture: number;
  faith: number;
}

// Base terrain types
export enum BaseTerrainType {
  PLAINS = "plains",
  GRASSLAND = "grassland",
  DESERT = "desert",
  TUNDRA = "tundra",
  SNOW = "snow",
  COAST = "coast",
  LAKE = "lake",
  OCEAN = "ocean",
}

// Features that can appear on tiles
export enum TerrainFeature {
  WOODS = "woods",
  RAINFOREST = "rainforest",
  MARSH = "marsh",
  FLOODPLAINS = "floodplains",
  OASIS = "oasis",
  REEF = "reef",
  ICE = "ice",
  GEOTHERMAL_FISSURE = "geothermal_fissure",
  VOLCANIC_SOIL = "volcanic_soil",
}

// Resource categories
enum ResourceType {
  BONUS = "bonus",
  LUXURY = "luxury",
  STRATEGIC = "strategic",
}

// Interface for resources
interface Resource {
  type: ResourceType;
  name: string;
  yields: Yields;
  validTerrains: BaseTerrainType[];
  validFeatures: TerrainFeature[];
}

// Terrain configuration
interface BaseTerrain {
  type: BaseTerrainType;
  isHills: boolean;
  isMountain: boolean;
  baseYields: Yields;
  validFeatures: TerrainFeature[];
  validResources: string[]; // Resource names
  movementCost: number;
  defenseBonus: number;
  appeal: number;
}

// Features configuration
interface TerrainFeatureConfig {
  type: TerrainFeature;
  yields: Yields;
  validTerrains: BaseTerrainType[];
  removable: boolean;
  movementCost: number;
  defenseBonus: number;
  appeal: number;
}

// River configuration
interface River {
  providesWater: boolean;
  crossingMovementCost: number;
  defenseBonus: number;
}

// Complete tile representation
export interface Tile {
  baseTerrain: BaseTerrain;
  feature?: TerrainFeatureConfig;
  resource?: Resource;
  river?: River;
  continent: string;
  position: {
    x: number;
    y: number;
  };

  // Computed properties
  totalYields: Yields;
  appeal: number;
  freshWater: boolean;
  coastline: boolean;

  // for rendering rivers
  riverEdges: {
    NE: boolean;
    E: boolean;
    SE: boolean;
    SW: boolean;
    W: boolean;
    NW: boolean;
  };
}

export type TileMap = Tile[][];

// Score weights configuration for city placement
// interface ScoreWeights {
//   yields: {
//     food: number;
//     production: number;
//     gold: number;
//     science: number;
//     culture: number;
//     faith: number;
//   };
//   freshWater: number;
//   coastline: number;
//   luxuryResources: number;
//   strategicResources: number;
//   appeal: number;
// }

// City placement evaluator
// interface CityPlacementEvaluator {
//   // Evaluate a single tile for city placement
//   evaluateTile(
//     tile: Tile,
//     surroundingTiles: Tile[],
//     weights: ScoreWeights
//   ): number;

//   // Get workable tiles that would be available to a city
//   getWorkableTiles(centerTile: Tile, mapTiles: Tile[][]): Tile[];

//   // Calculate total score for a potential city placement
//   calculateCityScore(
//     centerTile: Tile,
//     workableTiles: Tile[],
//     weights: ScoreWeights
//   ): {
//     total: number;
//     breakdown: {
//       yieldsScore: number;
//       waterScore: number;
//       resourceScore: number;
//       appealScore: number;
//     };
//   };
// }
