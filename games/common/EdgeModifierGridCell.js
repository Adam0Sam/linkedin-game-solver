export class EdgeModifierGridCell {
  /**
   * @param {"left"|"right"|"top"|"bottom"} position
   * @param {string|null} content
   */
  constructor(position, content = null) {
    this.position = position;
    this.content = content;
  }
}
