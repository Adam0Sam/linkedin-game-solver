import { AbstractClass, NotImplementedError } from "../utils/AbstractClass.js";
import { AbstractGridParser } from "../parsers/AbstractGridParser.js";

export class AbstractSolutionExecutor extends AbstractClass {
  /**
   * @type {AbstractGridParser}
   * @private
   */
  #gridParser;

  /**
   * @param {AbstractGridParser} gridParser
   */
  constructor(gridParser) {
    super();
    this.#gridParser = gridParser;
  }

  /**
   * @param {GridCell[][]} solutionGrid
   * @returns {number[][]}
   */
  getSolutionClickSequence(solutionGrid) {
    throw new NotImplementedError("getGridClickIndices");
  }

  /**
   * Simulates a real click on the element by dispatching mousedown, mouseup, and click events.
   * This is useful for ensuring that the click behaves like a user interaction.
   * @param {HTMLElement} element
   */
  #simulateRealClick(element) {
    const mouseDownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: element.getBoundingClientRect().left + 5,
      clientY: element.getBoundingClientRect().top + 5,
      button: 0,
    });

    const mouseUpEvent = new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: element.getBoundingClientRect().left + 5,
      clientY: element.getBoundingClientRect().top + 5,
      button: 0,
    });

    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    element.dispatchEvent(mouseDownEvent);
    element.dispatchEvent(mouseUpEvent);
    element.dispatchEvent(clickEvent);
  }

  /**
   * @param {Document} doc
   * @param {GridCell[][]} solutionGrid
   * @throws {Error}
   */
  execute(doc, solutionGrid) {
    const gridElements = this.#gridParser.parseToDomElements(doc);
    const clickSequence = this.getSolutionClickSequence(solutionGrid);
    for (const [rowIndex, colIndex] of clickSequence) {
      const cell = gridElements[rowIndex][colIndex];
      if (cell) {
        this.#simulateRealClick(cell);
        this.#simulateRealClick(cell);
      } else {
        throw new Error(`Cell at (${rowIndex}, ${colIndex}) does not exist.`);
      }
    }
  }
}
