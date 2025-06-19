export class NotImplementedError extends Error {
  /**
   * @param {string} methodName
   */
  constructor(methodName) {
    super(`Method '${methodName}' is not implemented`);
    this.name = "NotImplementedError";
  }
}

class AbstractClassConstructorError extends Error {
  constructor(abstractClassName) {
    super(`Cannot invoke abstract class '${abstractClassName}' constructor`);
    this.name = "AbstractClassConstructorError";
  }
}

export class AbstractClass {
  constructor() {
    const constructedClass = this.constructor;

    const wasAbstractClassConstructed =
      constructedClass.name.includes("Abstract");

    if (wasAbstractClassConstructed) {
      throw new AbstractClassConstructorError(constructedClass.name);
    }
  }
}
