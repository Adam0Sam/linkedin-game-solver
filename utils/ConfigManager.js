import { Singleton } from "./Singleton.js";

/**
 * Configuration manager for game-specific settings
 */
export class ConfigManager {
  constructor() {
    this.configs = new Map();
    this.defaultConfig = {};
  }

  /**
   * Sets the default configuration
   * @param {object} config - Default configuration object
   */
  setDefaultConfig(config) {
    this.defaultConfig = { ...config };
  }

  /**
   * Sets a game-specific configuration
   * @param {string} gameType - Game type identifier
   * @param {object} config - Configuration object
   */
  setGameConfig(gameType, config) {
    this.configs.set(gameType, {
      ...this.defaultConfig,
      ...config,
    });
  }

  /**
   * Gets a game-specific configuration
   * @param {string} gameType - Game type identifier
   * @returns {object} Game configuration
   */
  getGameConfig(gameType) {
    if (!this.configs.has(gameType)) {
      return { ...this.defaultConfig };
    }
    return { ...this.configs.get(gameType) };
  }

  /**
   * Updates a specific configuration property
   * @param {string} gameType - Game type identifier
   * @param {string} key - Configuration key
   * @param {*} value - Configuration value
   */
  updateGameConfigProperty(gameType, key, value) {
    const config = this.getGameConfig(gameType);
    config[key] = value;
    this.setGameConfig(gameType, config);
  }
}
