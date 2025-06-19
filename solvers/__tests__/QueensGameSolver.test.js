import QueensGameSolver from "../QueensGameSolver";
import { QueensGridCell } from "../../utils/grid/QueensGridCell";

const STATE_CHAR_MAP = {
  empty: "○",
  queen: "♛",
  cross: "×",
};

describe("QueensGameSolver", () => {
  it("Should Solve Game 1", () => {
    const rawGrid = [
      [
        {
          col: 0,
          row: 0,
          color: 0,
          cellState: "empty",
        },
        {
          col: 1,
          row: 0,
          color: 1,
          cellState: "empty",
        },
        {
          col: 2,
          row: 0,
          color: 1,
          cellState: "empty",
        },
        {
          col: 3,
          row: 0,
          color: 1,
          cellState: "empty",
        },
        {
          col: 4,
          row: 0,
          color: 1,
          cellState: "empty",
        },
        {
          col: 5,
          row: 0,
          color: 1,
          cellState: "empty",
        },
        {
          col: 6,
          row: 0,
          color: 1,
          cellState: "empty",
        },
        {
          col: 7,
          row: 0,
          color: 1,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 1,
          color: 0,
          cellState: "empty",
        },
        {
          col: 1,
          row: 1,
          color: 2,
          cellState: "empty",
        },
        {
          col: 2,
          row: 1,
          color: 2,
          cellState: "empty",
        },
        {
          col: 3,
          row: 1,
          color: 2,
          cellState: "empty",
        },
        {
          col: 4,
          row: 1,
          color: 2,
          cellState: "empty",
        },
        {
          col: 5,
          row: 1,
          color: 2,
          cellState: "empty",
        },
        {
          col: 6,
          row: 1,
          color: 2,
          cellState: "empty",
        },
        {
          col: 7,
          row: 1,
          color: 1,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 2,
          color: 0,
          cellState: "empty",
        },
        {
          col: 1,
          row: 2,
          color: 2,
          cellState: "empty",
        },
        {
          col: 2,
          row: 2,
          color: 3,
          cellState: "empty",
        },
        {
          col: 3,
          row: 2,
          color: 3,
          cellState: "empty",
        },
        {
          col: 4,
          row: 2,
          color: 3,
          cellState: "empty",
        },
        {
          col: 5,
          row: 2,
          color: 3,
          cellState: "empty",
        },
        {
          col: 6,
          row: 2,
          color: 2,
          cellState: "empty",
        },
        {
          col: 7,
          row: 2,
          color: 1,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 3,
          color: 4,
          cellState: "empty",
        },
        {
          col: 1,
          row: 3,
          color: 2,
          cellState: "empty",
        },
        {
          col: 2,
          row: 3,
          color: 5,
          cellState: "empty",
        },
        {
          col: 3,
          row: 3,
          color: 3,
          cellState: "empty",
        },
        {
          col: 4,
          row: 3,
          color: 6,
          cellState: "empty",
        },
        {
          col: 5,
          row: 3,
          color: 6,
          cellState: "empty",
        },
        {
          col: 6,
          row: 3,
          color: 1,
          cellState: "empty",
        },
        {
          col: 7,
          row: 3,
          color: 1,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 4,
          color: 4,
          cellState: "empty",
        },
        {
          col: 1,
          row: 4,
          color: 2,
          cellState: "empty",
        },
        {
          col: 2,
          row: 4,
          color: 5,
          cellState: "empty",
        },
        {
          col: 3,
          row: 4,
          color: 5,
          cellState: "empty",
        },
        {
          col: 4,
          row: 4,
          color: 2,
          cellState: "empty",
        },
        {
          col: 5,
          row: 4,
          color: 2,
          cellState: "empty",
        },
        {
          col: 6,
          row: 4,
          color: 2,
          cellState: "empty",
        },
        {
          col: 7,
          row: 4,
          color: 1,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 5,
          color: 4,
          cellState: "empty",
        },
        {
          col: 1,
          row: 5,
          color: 2,
          cellState: "empty",
        },
        {
          col: 2,
          row: 5,
          color: 5,
          cellState: "empty",
        },
        {
          col: 3,
          row: 5,
          color: 5,
          cellState: "empty",
        },
        {
          col: 4,
          row: 5,
          color: 5,
          cellState: "empty",
        },
        {
          col: 5,
          row: 5,
          color: 5,
          cellState: "empty",
        },
        {
          col: 6,
          row: 5,
          color: 2,
          cellState: "empty",
        },
        {
          col: 7,
          row: 5,
          color: 1,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 6,
          color: 4,
          cellState: "empty",
        },
        {
          col: 1,
          row: 6,
          color: 2,
          cellState: "empty",
        },
        {
          col: 2,
          row: 6,
          color: 2,
          cellState: "empty",
        },
        {
          col: 3,
          row: 6,
          color: 2,
          cellState: "empty",
        },
        {
          col: 4,
          row: 6,
          color: 2,
          cellState: "empty",
        },
        {
          col: 5,
          row: 6,
          color: 2,
          cellState: "empty",
        },
        {
          col: 6,
          row: 6,
          color: 2,
          cellState: "empty",
        },
        {
          col: 7,
          row: 6,
          color: 7,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 7,
          color: 4,
          cellState: "empty",
        },
        {
          col: 1,
          row: 7,
          color: 4,
          cellState: "empty",
        },
        {
          col: 2,
          row: 7,
          color: 7,
          cellState: "empty",
        },
        {
          col: 3,
          row: 7,
          color: 7,
          cellState: "empty",
        },
        {
          col: 4,
          row: 7,
          color: 7,
          cellState: "empty",
        },
        {
          col: 5,
          row: 7,
          color: 7,
          cellState: "empty",
        },
        {
          col: 6,
          row: 7,
          color: 7,
          cellState: "empty",
        },
        {
          col: 7,
          row: 7,
          color: 7,
          cellState: "empty",
        },
      ],
    ];

    const processedGrid = rawGrid.map((row) =>
      row.map(
        (cell) =>
          new QueensGridCell(cell.col, cell.row, cell.color, cell.cellState)
      )
    );
    const realSolvedGrid = structuredClone(processedGrid);

    const solver = new QueensGameSolver();
    /**
     * @type {QueensGridCell[][]}
     */
    const solvedGrid = solver.getSolvedGrid(processedGrid);

    // 0, 5
    realSolvedGrid[0][5] = new QueensGridCell(
      5,
      0,
      realSolvedGrid[0][5].color,
      "queen"
    );
    // 1, 0
    realSolvedGrid[1][0] = new QueensGridCell(
      0,
      1,
      realSolvedGrid[1][0].color,
      "queen"
    );
    // 2, 2
    realSolvedGrid[2][2] = new QueensGridCell(
      2,
      2,
      realSolvedGrid[2][2].color,
      "queen"
    );
    // 3, 4
    realSolvedGrid[3][4] = new QueensGridCell(
      4,
      3,
      realSolvedGrid[3][4].color,
      "queen"
    );
    // 4, 6
    realSolvedGrid[4][6] = new QueensGridCell(
      6,
      4,
      realSolvedGrid[4][6].color,
      "queen"
    );
    // 5, 3
    realSolvedGrid[5][3] = new QueensGridCell(
      3,
      5,
      realSolvedGrid[5][3].color,
      "queen"
    );
    // 6, 7
    realSolvedGrid[6][7] = new QueensGridCell(
      7,
      6,
      realSolvedGrid[6][7].color,
      "queen"
    );
    // 7, 1
    realSolvedGrid[7][1] = new QueensGridCell(
      1,
      7,
      realSolvedGrid[7][1].color,
      "queen"
    );
    expect(solvedGrid).toEqual(realSolvedGrid);
  });
});
