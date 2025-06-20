import { QueensGridCell } from "./grid/QueensGridCell.js";

const ANSI_COLOR_MAP = {
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

const COLORS = [
  ANSI_COLOR_MAP.bgRed,
  ANSI_COLOR_MAP.bgGreen,
  ANSI_COLOR_MAP.bgYellow,
  ANSI_COLOR_MAP.bgBlue,
  ANSI_COLOR_MAP.bgMagenta,
  ANSI_COLOR_MAP.bgCyan,
  ANSI_COLOR_MAP.bgWhite,
  ANSI_COLOR_MAP.bgGray,
  ANSI_COLOR_MAP.bgBrightRed,
  ANSI_COLOR_MAP.bgBrightGreen,
  ANSI_COLOR_MAP.bgBrightYellow,
  ANSI_COLOR_MAP.bgBrightBlue,
  ANSI_COLOR_MAP.bgBrightMagenta,
  ANSI_COLOR_MAP.bgBrightCyan,
];

const STATE_CHAR_MAP = {
  empty: "○",
  queen: "♛",
  cross: "×",
};

/**
 * @param {QueensGridCell[][]} grid
 * @param {Record} stateCharMap
 * @returns {string}
 */
export function queensGridToAsciiWithColors(grid) {
  let ascii = "\n";
  for (const row of grid) {
    for (const cell of row) {
      const colorCode = COLORS[cell.col % COLORS.length] || "";
      const stateChar = STATE_CHAR_MAP[cell.cellState];
      ascii += `${colorCode}${stateChar}${ANSI_COLOR_MAP.reset}`;
    }
    ascii += "\n";
  }
  return ascii;
}
