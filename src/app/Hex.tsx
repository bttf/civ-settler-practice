"use client";
import { MouseEventHandler, useState } from "react";
import { createPortal } from "react-dom";
import { Tile } from "./types";
import HexTooltip from "./HexTooltip";

// Hex dimensions - these ensure proper tessellation
export const HEX_SIZE = 30; // radius of circumscribed circle
export const HEX_HEIGHT = Math.sqrt(3) * HEX_SIZE;
export const HEX_HORIZ_SPACING = (3 / 2) * HEX_SIZE; // distance between column centers

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
  const x = col * HEX_HORIZ_SPACING;
  const y = row * HEX_HEIGHT + (col % 2) * (HEX_HEIGHT / 2);
  return { x: x + HEX_SIZE, y: y + HEX_SIZE }; // Add offset to ensure hexes don't get cut off
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
    <>
      <polygon
        points={points}
        fill="#fff"
        stroke="#000"
        strokeWidth="1"
        className="cursor-pointer hover:fill-blue-200 transition-colors duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseMove={handleMouseMove}
      />
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
    </>
  );
}
