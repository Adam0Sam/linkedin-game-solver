/**
 * Utility for creating abstract classes in JavaScript.
 * This class helps enforce that abstract classes cannot be instantiated directly
 * and that required methods are implemented by subclasses.
 *
 * Usage:
 * ```
 * class MyAbstractClass extends AbstractClass {
 *   constructor() {
 *     // Define which methods must be implemented by subclasses
 *     super(['requiredMethod1', 'requiredMethod2']);
 *
 *     // Your constructor logic
 *   }
 *
 *   // Shared method implementations
 *   sharedMethod() {
 *     // Implementation available to all subclasses
 *   }
 *
 *   // Method stub that must be implemented by subclasses
 *   requiredMethod1() {
 *     this.abstractMethodError('requiredMethod1');
 *   }
 * }
 * ```
 */
export class AbstractClass {
  /**
   * Constructor for the AbstractClass.
   * Makes sure the class cannot be instantiated directly and checks that
   * subclasses properly implement required methods.
   *
   * @param {string[]} requiredMethods - Names of methods that must be implemented by subclasses
   */
  constructor(requiredMethods = []) {
    // Prevent direct instantiation of this class
    if (this.constructor === AbstractClass) {
      throw new TypeError("Cannot instantiate abstract class AbstractClass");
    }

    // Prevent direct instantiation of subclasses that are themselves abstract
    if (this.constructor.isAbstract === true) {
      throw new TypeError(
        `Cannot instantiate abstract class ${this.constructor.name}`
      );
    }

    // Store the list of required methods
    this._requiredMethods = requiredMethods;

    // Check that all required methods are properly implemented by the concrete class
    this._checkRequiredMethods();
  }

  /**
   * Helper method to throw an appropriate error when an abstract method is called
   *
   * @param {string} methodName - Name of the method that was called
   * @throws {Error} Always throws to indicate abstract method was called
   */
  abstractMethodError(methodName) {
    throw new Error(
      `Abstract method '${methodName}' must be implemented by class ${this.constructor.name}`
    );
  }

  /**
   * Checks if all required methods are implemented by the concrete class
   *
   * @private
   * @throws {Error} If a required method is not implemented
   */
  _checkRequiredMethods() {
    for (const methodName of this._requiredMethods) {
      const method = this[methodName];

      // Check if the method exists and is properly overridden
      if (
        typeof method !== "function" ||
        method.toString().includes("this.abstractMethodError")
      ) {
        throw new Error(
          `Class ${this.constructor.name} must implement abstract method '${methodName}'`
        );
      }
    }
  }

  /**
   * Class decorator to mark a class as abstract
   *
   * @static
   * @param {Function} target - The class to mark as abstract
   * @returns {Function} The modified class
   */
  static markAsAbstract(target) {
    target.isAbstract = true;
    return target;
  }
}
