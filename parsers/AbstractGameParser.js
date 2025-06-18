/**
 * @abstract
 */
export class AbstractGameParser {
  /**
   * @param {string} gameType - Type identifier for the game
   */
  constructor(gameType) {
    if (this.constructor === AbstractGameParser) {
      throw new Error("AbstractGameParser cannot be instantiated directly");
    }
    this.gameType = gameType;
  }

  /**
   * @param {string} htmlContent
   * @returns {object}
   */
  parseHtml(htmlContent) {
    try {
      const doc = this._parseHtmlToDocument(htmlContent);
      const metadata = this.extractGameMetadata(doc);
      const gameState = this.extractGameState(doc, metadata);

      return {
        type: this.gameType,
        ...metadata,
        ...gameState,
      };
    } catch (error) {
      throw new Error(
        `Failed to parse ${this.gameType} game: ${error.message}`
      );
    }
  }

  /**
   * @abstract
   * @param {Document} doc
   * @throws {Error}
   */
  validateDocument(doc) {
    throw new Error(
      "Method 'validateDocument' must be implemented by derived classes"
    );
  }

  /**
   * @abstract
   * @param {Document} doc
   * @returns {object}
   */
  extractGameMetadata(doc) {
    throw new Error(
      "Method 'extractGameMetadata' must be implemented by derived classes"
    );
  }

  /**
   * @abstract
   * @param {Document} doc
   * @returns {object}
   */
  extractGameState(doc) {
    throw new Error(
      "Method 'extractGameState' must be implemented by derived classes"
    );
  }

  /**
   * @private
   * @param {string} htmlContent
   * @returns {Document}
   * @throws {Error}
   */
  _parseHtmlToDocument(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    this.validateDocument(doc);
    return doc;
  }
}
