import { AbstractGameSolver } from '../common/abstract-helpers/AbstractGameSolver.js';
import { {{cmpNamePascalCase}}GridCell } from './{{cmpNamePascalCase}}GridCell.js';

export class {{cmpNamePascalCase}}GameSolver extends AbstractGameSolver {
    constructor() {
        super({{cmpNamePascalCase}}GridCell);
    }

    /**
     * @param {{cmpNamePascalCase}}GridCell[][] grid
     */
    getSolvedGrid(grid) {
        // Barebones solve method
        return [];
    }
}
