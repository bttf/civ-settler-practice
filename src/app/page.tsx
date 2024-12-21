import HexMap from "./HexMap";
import generateRandomTileMap from "./generateRandomTilemap";
export default function Home() {
  const tileMap = generateRandomTileMap({
    rows: 8,
    cols: 16,
  });
  return (
    <div className="h-full flex flex-col p-4 gap-y-4">
      <div className="text-4xl">Civ settler practice</div>
      <div className="flex-1 border min-h-0 flex justify-center">
        <HexMap tileMap={tileMap} />
      </div>
    </div>
  );
}
