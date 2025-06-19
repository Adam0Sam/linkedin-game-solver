export class Singleton {
  constructor() {
    const topLevelConstructor = this.constructor;
    if (topLevelConstructor._instance) {
      return topLevelConstructor._instance;
    }
    topLevelConstructor._instance = this;
  }

  /**
   * @returns {Singleton} The singleton instance of the class
   */
  static getInstance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }
}
