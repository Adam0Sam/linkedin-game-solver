import { AbstractGameSolver } from '../common/abstract-helpers/AbstractGameSolver.js';
import { TangoGridCell } from './TangoGridCell.js';

export class TangoGameSolver extends AbstractGameSolver {
    constructor() {
        super(TangoGridCell);
    }

    /**
     * @param TangoGridCell[][] grid
     */
    getSolvedGrid(grid) {
        // Barebones solve method
        return [];
    }
}
