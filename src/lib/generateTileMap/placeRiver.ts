import { TileMap } from "../types";

type RiverDirection = "S" | "E" | "W" | "SW" | "SE";

interface HexEdge {
  row: number;
  col: number;
  edge: "NE" | "E" | "SE" | "SW" | "W" | "NW"; // clockwise from top-right
  direction: RiverDirection;
}

export default function placeRiver(tileMap: TileMap) {
  const cols = tileMap[0].length;

  // Pick river entry point (usually top of map)
  const entryCol = Math.floor(cols * (0.3 + Math.random() * 0.4)); // middle 40% of top edge
  const entryEdges: HexEdge["edge"][] =
    Math.floor(Math.random() * 2) === 1 ? ["NW", "W"] : ["NE", "E"];
  const riverEdges: HexEdge[] = entryEdges.map((edge) => ({
    row: 0,
    col: entryCol,
    edge,
    direction: "S",
  }));

  let recentEdge = riverEdges.slice(-1)[0];
  let nextDirection = getNextDirection(tileMap, recentEdge);

  while (nextDirection) {
    recentEdge = riverEdges.slice(-1)[0];
    nextDirection = getNextDirection(tileMap, recentEdge);

    const prevRow = recentEdge.row;
    const prevCol = recentEdge.col;

    if (nextDirection === "S") {
      riverEdges.push({
        row: prevRow + 1,
        col: prevRow % 2 === 0 ? prevCol : prevCol + 1,
        edge: "W",
        direction: nextDirection,
      });
    } else if (nextDirection === "SW") {
      riverEdges.push({
        row: prevRow,
        col: recentEdge.edge === "E" ? prevCol : prevCol - 1,
        edge: "SE",
        direction: nextDirection,
      });
    } else if (nextDirection === "SE") {
      riverEdges.push({
        row: prevRow,
        col: recentEdge.edge === "E" ? prevCol + 1 : prevCol,
        edge: "SW",
        direction: nextDirection,
      });
    } else if (nextDirection === "E") {
      riverEdges.push(
        {
          row: prevRow,
          col: prevCol + 1,
          edge: "SW",
          direction: nextDirection,
        },
        {
          row: prevRow,
          col: prevCol + 1,
          edge: "SE",
          direction: nextDirection,
        }
      );
    } else if (nextDirection === "W") {
      riverEdges.push(
        {
          row: prevRow,
          col: prevCol - 1,
          edge: "SE",
          direction: nextDirection,
        },
        {
          row: prevRow,
          col: prevCol - 1,
          edge: "SW",
          direction: nextDirection,
        }
      );
    }
  }

  // apply river edges to tile map
  riverEdges.forEach((re) => {
    tileMap[re.row][re.col].riverEdges[re.edge] = true;
  });

  return riverEdges; // Return the path in case we need it later
}

function getNextDirection(
  tileMap: TileMap,
  recent: HexEdge
): RiverDirection | null {
  console.log("getNextDirection", {
    recentEdge: recent.edge,
    recentRow: recent.row,
    recentCol: recent.col,
  });

  // 'exit conditions'
  if (recent.row === tileMap.length - 1) return null;
  if (recent.col === 0 && recent.edge === "SW") return null;
  if (recent.col === tileMap[0].length - 1 && recent.edge === "SE") return null;

  const possible: RiverDirection[] = [];

  // notes
  //   - might need to coerce this to move east/west ward when ocean is nearby
  if (["W", "E"].includes(recent.edge)) {
    if (recent.col === 0) possible.push("SE");
    else if (recent.col === tileMap[0].length - 1) possible.push("SW");
    else possible.push("SW", "SE");
  } else if (recent.edge === "SW") {
    if (recent.direction === "W") possible.push("W");
    else possible.push("S", "E");
  } else if (recent.edge === "SE") {
    if (recent.direction === "E") possible.push("E");
    else possible.push("S", "W");
  }

  console.log("getNextDirection - possible", { possible });
  return possible[Math.floor(Math.random() * possible.length)];
}
