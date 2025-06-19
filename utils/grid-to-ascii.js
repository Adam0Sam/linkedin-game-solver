/**
 * ANSI color codes for terminal output
 */
const ANSI_COLORS = {
  reset: "\x1b[0m",
  // Background colors
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
  bgGray: "\x1b[100m",
  bgBrightRed: "\x1b[101m",
  bgBrightGreen: "\x1b[102m",
  bgBrightYellow: "\x1b[103m",
  bgBrightBlue: "\x1b[104m",
  bgBrightMagenta: "\x1b[105m",
  bgBrightCyan: "\x1b[106m",
  // Text colors
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

/**
 * Maps color numbers to ANSI background colors
 */
const COLOR_MAP = [
  ANSI_COLORS.bgRed,
  ANSI_COLORS.bgGreen,
  ANSI_COLORS.bgYellow,
  ANSI_COLORS.bgBlue,
  ANSI_COLORS.bgMagenta,
  ANSI_COLORS.bgCyan,
  ANSI_COLORS.bgWhite,
  ANSI_COLORS.bgGray,
  ANSI_COLORS.bgBrightRed,
  ANSI_COLORS.bgBrightGreen,
  ANSI_COLORS.bgBrightYellow,
  ANSI_COLORS.bgBrightBlue,
  ANSI_COLORS.bgBrightMagenta,
  ANSI_COLORS.bgBrightCyan,
];

/**
 * Character patterns to represent different colors (fallback for non-color terminals)
 */
const PATTERN_MAP = [
  "█", // Solid block
  "▓", // Dark shade
  "▒", // Medium shade
  "░", // Light shade
  "▄", // Lower half block
  "▀", // Upper half block
  "▌", // Left half block
  "▐", // Right half block
  "■", // Black square
  "□", // White square
  "▲", // Triangle up
  "▼", // Triangle down
  "◆", // Diamond
  "●", // Circle
];

/**
 * Approach 1: Using ANSI background colors (works in terminals that support colors)
 * @param {GridCell[][]} grid
 * @param {Record} stateCharMap
 * @returns {string}
 */
export function gridToAsciiWithColors(grid, stateCharMap) {
  let ascii = "\n";
  for (const row of grid) {
    for (const cell of row) {
      const colorCode = COLOR_MAP[cell.color % COLOR_MAP.length] || "";
      const stateChar = stateCharMap[cell.cellState];
      ascii += `${colorCode}${stateChar}${ANSI_COLORS.reset}`;
    }
    ascii += "\n";
  }
  return ascii;
}

/**
 * Approach 2: Using different characters/patterns for each color region
 * @param {GridCell[][]} grid
 * @param {Record} stateCharMap
 * @returns {string}
 */
export function gridToAsciiWithPatterns(grid, stateCharMap) {
  let ascii = "\n";
  for (const row of grid) {
    for (const cell of row) {
      const stateChar = stateCharMap[cell.cellState];

      // For empty cells, show the color pattern
      if (cell.cellState === "empty") {
        const pattern = PATTERN_MAP[cell.color % PATTERN_MAP.length] || "?";
        ascii += pattern;
      } else {
        // For queens and crosses, show the state character
        ascii += stateChar;
      }
    }
    ascii += "\n";
  }
  return ascii;
}

/**
 * Approach 3: Hybrid - combines background colors with state characters
 * @param {GridCell[][]} grid
 * @param {Record} stateCharMap
 * @returns {string}
 */
export function gridToAsciiHybrid(grid, stateCharMap) {
  let ascii = "\n";
  for (const row of grid) {
    for (const cell of row) {
      const colorCode = COLOR_MAP[cell.color % COLOR_MAP.length] || "";
      const stateChar = stateCharMap[cell.cellState];

      // Use background color for all cells, with state character on top
      ascii += `${colorCode} ${stateChar} ${ANSI_COLORS.reset}`;
    }
    ascii += "\n";
  }
  return ascii;
}

/**
 * Approach 4: Text-based with color numbers (most compatible)
 * @param {GridCell[][]} grid
 * @param {Record} stateCharMap
 * @returns {string}
 */
export function gridToAsciiWithNumbers(grid, stateCharMap) {
  let ascii = "\n";
  for (const row of grid) {
    for (const cell of row) {
      const stateChar = stateCharMap[cell.cellState];

      // Show color number for empty cells, state for others
      if (cell.cellState === "empty") {
        ascii += cell.color.toString().padStart(2, "0");
      } else {
        ascii += ` ${stateChar}`;
      }
    }
    ascii += "\n";
  }
  return ascii;
}

/**
 * Approach 5: Enhanced version with border detection
 * @param {GridCell[][]} grid
 * @param {Record} stateCharMap
 * @returns {string}
 */
export function gridToAsciiWithBorders(grid, stateCharMap) {
  let ascii = "\n";

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      const stateChar = stateCharMap[cell.cellState];

      // Check if this cell is on the border of its color region
      const isOnBorder = isColorBorder(grid, row, col, cell.color);

      if (cell.cellState === "empty") {
        if (isOnBorder) {
          // Use border character for region boundaries
          ascii += "┃";
        } else {
          // Use color-specific pattern for interior
          ascii += PATTERN_MAP[cell.color % PATTERN_MAP.length] || "?";
        }
      } else {
        ascii += stateChar;
      }
    }
    ascii += "\n";
  }
  return ascii;
}

/**
 * Helper function to detect if a cell is on the border of its color region
 * @param {GridCell[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @returns {boolean}
 */
function isColorBorder(grid, row, col, color) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // up, down, left, right

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    // Check bounds
    if (
      newRow < 0 ||
      newRow >= grid.length ||
      newCol < 0 ||
      newCol >= grid[0].length
    ) {
      return true; // Edge of grid is a border
    }

    // Check if neighbor has different color
    if (grid[newRow][newCol].color !== color) {
      return true;
    }
  }

  return false;
}

/**
 * Original function (maintained for compatibility)
 * @param {GridCell[][]} grid
 * @param {Record} stateCharMap
 * @returns {string}
 */
export function gridToAscii(grid, stateCharMap) {
  let ascii = "\n";
  for (const row of grid) {
    for (const cell of row) {
      ascii += stateCharMap[cell.cellState];
    }
    ascii += "\n";
  }
  return ascii;
}
