import QueensGameSolver from "../QueensGameSolver";
import { QueensGridCell } from "../../utils/grid/QueensGridCell";
import { queensGridToAsciiWithColors } from "../../utils/queens-grid-to-ascii";

describe("QueensGameSolver", () => {
  it("Should Solve Game 1", () => {
    const solver = new QueensGameSolver();

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
      row.map((cell) => solver.toGameCell(cell))
    );

    const realSolvedGrid = structuredClone(processedGrid).map((row) =>
      row.map(
        (cell) => new QueensGridCell(cell.col, cell.row, cell.color, "cross")
      )
    );

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

    /**
     * @type {QueensGridCell[][]}
     */
    const solvedGrid = solver.getSolvedGrid(processedGrid);

    expect(solvedGrid).toEqual(realSolvedGrid);
  });
  it.skip("Should Solve Game 2", () => {
    const solver = new QueensGameSolver();
    const rawGrid = [
      [
        {
          col: 0,
          row: 0,
          color: 8,
          cellState: "empty",
        },
        {
          col: 1,
          row: 0,
          color: 8,
          cellState: "empty",
        },
        {
          col: 2,
          row: 0,
          color: 8,
          cellState: "empty",
        },
        {
          col: 3,
          row: 0,
          color: 8,
          cellState: "empty",
        },
        {
          col: 4,
          row: 0,
          color: 8,
          cellState: "empty",
        },
        {
          col: 5,
          row: 0,
          color: 8,
          cellState: "empty",
        },
        {
          col: 6,
          row: 0,
          color: 8,
          cellState: "empty",
        },
        {
          col: 7,
          row: 0,
          color: 3,
          cellState: "empty",
        },
        {
          col: 8,
          row: 0,
          color: 3,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 1,
          color: 8,
          cellState: "empty",
        },
        {
          col: 1,
          row: 1,
          color: 5,
          cellState: "empty",
        },
        {
          col: 2,
          row: 1,
          color: 5,
          cellState: "empty",
        },
        {
          col: 3,
          row: 1,
          color: 5,
          cellState: "empty",
        },
        {
          col: 4,
          row: 1,
          color: 5,
          cellState: "empty",
        },
        {
          col: 5,
          row: 1,
          color: 8,
          cellState: "empty",
        },
        {
          col: 6,
          row: 1,
          color: 8,
          cellState: "empty",
        },
        {
          col: 7,
          row: 1,
          color: 3,
          cellState: "empty",
        },
        {
          col: 8,
          row: 1,
          color: 3,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 2,
          color: 8,
          cellState: "empty",
        },
        {
          col: 1,
          row: 2,
          color: 5,
          cellState: "empty",
        },
        {
          col: 2,
          row: 2,
          color: 5,
          cellState: "empty",
        },
        {
          col: 3,
          row: 2,
          color: 5,
          cellState: "empty",
        },
        {
          col: 4,
          row: 2,
          color: 5,
          cellState: "empty",
        },
        {
          col: 5,
          row: 2,
          color: 7,
          cellState: "empty",
        },
        {
          col: 6,
          row: 2,
          color: 8,
          cellState: "empty",
        },
        {
          col: 7,
          row: 2,
          color: 8,
          cellState: "empty",
        },
        {
          col: 8,
          row: 2,
          color: 8,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 3,
          color: 8,
          cellState: "empty",
        },
        {
          col: 1,
          row: 3,
          color: 5,
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
          color: 5,
          cellState: "empty",
        },
        {
          col: 4,
          row: 3,
          color: 5,
          cellState: "empty",
        },
        {
          col: 5,
          row: 3,
          color: 2,
          cellState: "empty",
        },
        {
          col: 6,
          row: 3,
          color: 2,
          cellState: "empty",
        },
        {
          col: 7,
          row: 3,
          color: 8,
          cellState: "empty",
        },
        {
          col: 8,
          row: 3,
          color: 8,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 4,
          color: 8,
          cellState: "empty",
        },
        {
          col: 1,
          row: 4,
          color: 5,
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
          color: 5,
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
          color: 8,
          cellState: "empty",
        },
        {
          col: 8,
          row: 4,
          color: 8,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 5,
          color: 8,
          cellState: "empty",
        },
        {
          col: 1,
          row: 5,
          color: 8,
          cellState: "empty",
        },
        {
          col: 2,
          row: 5,
          color: 6,
          cellState: "empty",
        },
        {
          col: 3,
          row: 5,
          color: 6,
          cellState: "empty",
        },
        {
          col: 4,
          row: 5,
          color: 8,
          cellState: "empty",
        },
        {
          col: 5,
          row: 5,
          color: 8,
          cellState: "empty",
        },
        {
          col: 6,
          row: 5,
          color: 8,
          cellState: "empty",
        },
        {
          col: 7,
          row: 5,
          color: 8,
          cellState: "empty",
        },
        {
          col: 8,
          row: 5,
          color: 8,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 6,
          color: 8,
          cellState: "empty",
        },
        {
          col: 1,
          row: 6,
          color: 8,
          cellState: "empty",
        },
        {
          col: 2,
          row: 6,
          color: 6,
          cellState: "empty",
        },
        {
          col: 3,
          row: 6,
          color: 6,
          cellState: "empty",
        },
        {
          col: 4,
          row: 6,
          color: 1,
          cellState: "empty",
        },
        {
          col: 5,
          row: 6,
          color: 1,
          cellState: "empty",
        },
        {
          col: 6,
          row: 6,
          color: 1,
          cellState: "empty",
        },
        {
          col: 7,
          row: 6,
          color: 8,
          cellState: "empty",
        },
        {
          col: 8,
          row: 6,
          color: 8,
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
          color: 0,
          cellState: "empty",
        },
        {
          col: 3,
          row: 7,
          color: 0,
          cellState: "empty",
        },
        {
          col: 4,
          row: 7,
          color: 1,
          cellState: "empty",
        },
        {
          col: 5,
          row: 7,
          color: 1,
          cellState: "empty",
        },
        {
          col: 6,
          row: 7,
          color: 1,
          cellState: "empty",
        },
        {
          col: 7,
          row: 7,
          color: 8,
          cellState: "empty",
        },
        {
          col: 8,
          row: 7,
          color: 8,
          cellState: "empty",
        },
      ],
      [
        {
          col: 0,
          row: 8,
          color: 4,
          cellState: "empty",
        },
        {
          col: 1,
          row: 8,
          color: 4,
          cellState: "empty",
        },
        {
          col: 2,
          row: 8,
          color: 0,
          cellState: "empty",
        },
        {
          col: 3,
          row: 8,
          color: 0,
          cellState: "empty",
        },
        {
          col: 4,
          row: 8,
          color: 1,
          cellState: "empty",
        },
        {
          col: 5,
          row: 8,
          color: 1,
          cellState: "empty",
        },
        {
          col: 6,
          row: 8,
          color: 1,
          cellState: "empty",
        },
        {
          col: 7,
          row: 8,
          color: 8,
          cellState: "empty",
        },
        {
          col: 8,
          row: 8,
          color: 8,
          cellState: "empty",
        },
      ],
    ];

    const processedGrid = rawGrid.map((row) =>
      row.map((cell) => solver.toGameCell(cell))
    );

    const realSolvedGrid = structuredClone(processedGrid).map((row) =>
      row.map(
        (cell) => new QueensGridCell(cell.col, cell.row, cell.color, "cross")
      )
    );

    // 0, 7
    realSolvedGrid[0][6] = new QueensGridCell(
      7,
      0,
      realSolvedGrid[0][7].color,
      "queen"
    );
    // 1, 1
    realSolvedGrid[1][1] = new QueensGridCell(
      1,
      1,
      realSolvedGrid[1][1].color,
      "queen"
    );
    // 2, 5
    realSolvedGrid[2][5] = new QueensGridCell(
      5,
      2,
      realSolvedGrid[2][5].color,
      "queen"
    );
    // 3, 8
    realSolvedGrid[3][8] = new QueensGridCell(
      8,
      3,
      realSolvedGrid[3][8].color,
      "queen"
    );
    // 4, 6
    realSolvedGrid[4][6] = new QueensGridCell(
      6,
      4,
      realSolvedGrid[4][6].color,
      "queen"
    );
    // 5, 2
    realSolvedGrid[5][2] = new QueensGridCell(
      2,
      5,
      realSolvedGrid[5][2].color,
      "queen"
    );
    // 6, 4
    realSolvedGrid[6][4] = new QueensGridCell(
      4,
      6,
      realSolvedGrid[6][4].color,
      "queen"
    );
    // 7, 0
    realSolvedGrid[7][0] = new QueensGridCell(
      0,
      7,
      realSolvedGrid[7][0].color,
      "queen"
    );
    // 8, 3
    realSolvedGrid[8][3] = new QueensGridCell(
      3,
      8,
      realSolvedGrid[8][3].color,
      "queen"
    );

    /**
     * @type {QueensGridCell[][]}
     */
    const solvedGrid = solver.getSolvedGrid(processedGrid);
    console.log("solvedGrid", queensGridToAsciiWithColors(solvedGrid));
    console.log("realSolvedGrid", queensGridToAsciiWithColors(realSolvedGrid));
    expect(false).toEqual(true);
  });
});
