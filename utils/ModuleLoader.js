import { Singleton } from "./Singleton.js";

/**
 * Module loader for dynamic imports
 * This utility handles lazy loading of modules
 */
export class ModuleLoader {
  constructor() {
    this.loadedModules = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * @param {string} modulePath - Path to the module
   * @returns {Promise<object>} The loaded module
   */
  async loadModule(modulePath) {
    if (this.loadedModules.has(modulePath)) {
      return this.loadedModules.get(modulePath);
    }

    if (this.loadingPromises.has(modulePath)) {
      return this.loadingPromises.get(modulePath);
    }

    const loadPromise = (async () => {
      try {
        const src = chrome.runtime.getURL(modulePath);
        const module = await import(src);
        this.loadedModules.set(modulePath, module);
        return module;
      } catch (error) {
        console.error(`Error loading module ${modulePath}:`, error);
        throw error;
      } finally {
        this.loadingPromises.delete(modulePath);
      }
    })();

    this.loadingPromises.set(modulePath, loadPromise);
    return loadPromise;
  }
}
