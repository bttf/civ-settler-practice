"use client";
import { ReactNode } from "react";
import { TileMap } from "./types";
import Hex, { HEX_SIZE, HEX_HEIGHT, HEX_HORIZ_SPACING } from "./Hex";

const generateHexMap = (tileMap: TileMap): ReactNode[] => {
  const hexes = [];
  for (let row = 0; row < tileMap.length; row++) {
    for (let col = 0; col < tileMap[row].length; col++) {
      hexes.push(
        <Hex
          key={`${row}-${col}`}
          row={row}
          col={col}
          tile={tileMap[row][col]}
        />
      );
    }
  }
  return hexes;
};

export default function HexMap({ tileMap }: { tileMap: TileMap }) {
  const ROWS = tileMap.length;
  const COLS = tileMap[0].length;
  const svgWidth = COLS * HEX_HORIZ_SPACING + HEX_SIZE;
  const svgHeight = ROWS * HEX_HEIGHT + HEX_HEIGHT / 2 + HEX_SIZE;
  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="bg-gray-100 block min-h-0 h-full"
    >
      {generateHexMap(tileMap)}
    </svg>
  );
}
