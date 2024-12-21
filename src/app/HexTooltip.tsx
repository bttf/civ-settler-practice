import { Tile } from "./types";

export default function HexTooltip({
  tile,
  tooltipPos,
}: {
  tile: Tile;
  tooltipPos: { x: number; y: number };
}) {
  return (
    <div
      className="absolute bg-black text-white px-4 py-2 rounded pointer-events-none"
      style={{
        left: `${tooltipPos.x + 10}px`,
        top: `${tooltipPos.y + 10}px`,
      }}
    >
      <div>{tile.baseTerrain.type}</div>
      <div>{tile.totalYields.food} food</div>
      <div>{tile.totalYields.production} production</div>
      <div>
        ({tile.position.x}, {tile.position.y})
      </div>
    </div>
  );
}
