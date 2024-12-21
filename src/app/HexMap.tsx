"use client";
import { ReactNode } from "react";
import { TileMap } from "./types";

// Hex dimensions - these ensure proper tessellation
const HEX_SIZE = 30; // radius of circumscribed circle
const HEIGHT = Math.sqrt(3) * HEX_SIZE;
const HORIZ_SPACING = (3 / 2) * HEX_SIZE; // distance between column centers

const getHexPoints = (centerX: number, centerY: number) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i;
    const angleRad = (Math.PI / 180) * angleDeg;
    points.push(
      centerX + HEX_SIZE * Math.cos(angleRad),
      centerY + HEX_SIZE * Math.sin(angleRad)
    );
  }
  return points.join(" ");
};

const getHexPosition = (row: number, col: number) => {
  const x = col * HORIZ_SPACING;
  const y = row * HEIGHT + (col % 2) * (HEIGHT / 2);
  return { x: x + HEX_SIZE, y: y + HEX_SIZE }; // Add offset to ensure hexes don't get cut off
};

const generateHexMapFromTileMap = ({
  tileMap,
}: {
  tileMap: TileMap;
}): ReactNode[] => {
  console.log("generateHexMapFromTileMap", { tileMap });
  const hexes = [];
  for (let row = 0; row < tileMap.length; row++) {
    for (let col = 0; col < tileMap[row].length; col++) {
      const { x, y } = getHexPosition(row, col);
      const points = getHexPoints(x, y);

      hexes.push(
        <polygon
          key={`${row}-${col}`}
          points={points}
          fill="#fff"
          stroke="#000"
          strokeWidth="1"
          className="cursor-pointer hover:fill-blue-200 transition-colors duration-200"
        />
      );

      // Add coordinates text
      hexes.push(
        <text
          key={`text-${row}-${col}`}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          className="select-none pointer-events-none"
        >
          {`${row},${col}`}
        </text>
      );
    }
  }
  return hexes;
};

export default function HexMap({ tileMap }: { tileMap: TileMap }) {
  console.log("debug tileMap", tileMap);

  const ROWS = tileMap.length;
  const COLS = tileMap[0].length;
  const svgWidth = COLS * HORIZ_SPACING + HEX_SIZE;
  const svgHeight = ROWS * HEIGHT + HEIGHT / 2 + HEX_SIZE;

  const hexes = generateHexMapFromTileMap({ tileMap });

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="bg-gray-100 block min-h-0 h-full"
    >
      {hexes}
    </svg>
  );
}
