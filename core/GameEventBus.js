import { Singleton } from "../utils/Singleton.js";

/**
 * Event bus for communication between components
 */
export class GameEventBus {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    const eventListeners = this.listeners.get(event);
    eventListeners.add(callback);

    return () => {
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  /**
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  publish(event, data) {
    if (!this.listeners.has(event)) {
      return;
    }

    const eventListeners = this.listeners.get(event);
    for (const callback of eventListeners) {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    }
  }
}
