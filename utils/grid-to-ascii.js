/**
 *
 * @param {GridCell[][]} grid
 * @param {Record} stateCharMap
 * @returns
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
