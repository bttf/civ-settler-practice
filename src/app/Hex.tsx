"use client";
import { MouseEventHandler, useState } from "react";
import { createPortal } from "react-dom";
import { Tile } from "@/lib/types";
import HexTooltip from "./HexTooltip";

export const HEX_SIZE = 30; // radius of circumscribed circle
export const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE; // distance between flat sides
export const HEX_VERT_SPACING = (3 / 2) * HEX_SIZE; // distance between row centers

const getHexPoints = (centerX: number, centerY: number) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = 30 + 60 * i;
    const angleRad = (Math.PI / 180) * angleDeg;
    points.push(
      centerX + HEX_SIZE * Math.cos(angleRad),
      centerY + HEX_SIZE * Math.sin(angleRad)
    );
  }
  return points;
};

const getHexPosition = (row: number, col: number) => {
  const x = col * HEX_WIDTH + (row % 2) * (HEX_WIDTH / 2);
  const y = row * HEX_VERT_SPACING;
  return { x: x + HEX_SIZE, y: y + HEX_SIZE }; // Add offset to ensure hexes don't get cut off
};

export type RiverEdge = "NW" | "NE" | "E" | "SE" | "SW" | "W";

// Get the coordinates for a specific edge of the hexagon
const getEdgeCoordinates = (
  centerX: number,
  centerY: number,
  edge: RiverEdge
) => {
  const points = getHexPoints(centerX, centerY);
  const vertexIndices: Record<RiverEdge, [number, number]> = {
    NW: [3, 4],
    NE: [4, 5],
    E: [5, 0],
    SE: [0, 1],
    SW: [1, 2],
    W: [2, 3],
  };

  const [startIdx, endIdx] = vertexIndices[edge];
  return {
    x1: points[startIdx * 2],
    y1: points[startIdx * 2 + 1],
    x2: points[endIdx * 2],
    y2: points[endIdx * 2 + 1],
  };
};

export default function Hex({
  row,
  col,
  tile,
}: {
  row: number;
  col: number;
  tile: Tile;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const { x, y } = getHexPosition(row, col);
  const points = getHexPoints(x, y);
  const handleMouseMove: MouseEventHandler<SVGPolygonElement> = (e) => {
    // Get position relative to the viewport
    setTooltipPos({
      x: e.clientX,
      y: e.clientY,
    });
  };
  return (
    <g>
      <polygon
        points={points.join(" ")}
        fill="#fff"
        stroke="#000"
        strokeWidth="1"
        className="cursor-pointer hover:fill-blue-200 transition-colors duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseMove={handleMouseMove}
      />
      {/* River edges */}
      {Object.keys(tile.riverEdges)
        // @ts-expect-error stfu
        .filter((k) => tile.riverEdges[k])
        .map((edge) => {
          const coords = getEdgeCoordinates(x, y, edge as RiverEdge);
          return (
            <line
              key={edge}
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke="#4299e1"
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        className="select-none pointer-events-none"
      >
        {`${row},${col}`}
      </text>
      {showTooltip &&
        createPortal(
          <HexTooltip tile={tile} tooltipPos={tooltipPos} />,
          document.body
        )}
    </g>
  );
}
