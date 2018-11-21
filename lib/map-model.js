/**
 * A map-based Model that fires an event when the underlying data is changed. This model expects
 * each entry to have a unique `id`.
 */
import EventEmitter from 'events';

export default class MapModel extends EventEmitter {
  /**
   * Constructor to define the cached data and the event(s) that can be fired by this class.
   */
  constructor() {
    super();
    this._cachedData = {};
    this.EVENT_DATA_CHANGED = 'aims.model.data.changed';
  }

  /**
   * Utility method to clear the {@link #_cachedData}.
   */
  clear() {
    this._cachedData = {};
    this.emit(this.EVENT_DATA_CHANGED, this);
  }

  /**
   * Setter method to append the specified data to the {@link #_cachedData}. Each entry in the
   * specified data must contain the property `id` to determine uniqueness. Where the `id` already
   * exists, the mapped value will be updated to contain the most recently specified entry. If the
   * {@link #_cachedData} is modified, a change event will be emitted.
   */
  add(data, forceEmit) {
    // Flag to determine if cachedData is updated.
    let isUpdated = false;

    if (Array.isArray(data)) {
      // data is an array.
      data.forEach((entry) => {
        this._cachedData[entry.id] = entry;
        isUpdated = true;
      });
    } else {
      // Treat data as an object.
      Object.keys(data).forEach((key) => {
        this._cachedData[key] = data[key];
        isUpdated = true;
      });
    }

    // Emit a change event.
    if (isUpdated || forceEmit) {
      this.emit(this.EVENT_DATA_CHANGED, this);
    }
  }

  /**
   * Getter method to retrieve the cached data.
   */
  getData() {
    return this._cachedData;
  }

  /**
   * Removes the specified data from the {@link #_cachedData}. Each entry in the specified data
   * must contain the property `id` to determine uniqueness. If the {@link #_cachedData} is
   * modified, a change event will be emitted.
   */
  remove(data) {
    // Flag to determine if cachedData is updated.
    let isUpdated = false;

    if (Array.isArray(data)) {
      // data is an array.
      data.forEach((entry) => {
        delete this._cachedData[entry.id];
        isUpdated = true;
      });
    }

    // Check if data is a string that identifies a valid id.
    if ((typeof data === 'string') && this._cachedData[data]) {
      delete this._cachedData[data];
      isUpdated = true;
    }

    // Emit a change event.
    if (isUpdated) {
      this.emit(this.EVENT_DATA_CHANGED, this);
    }
  }

  /**
   * Setter method to replace the cached data and emit a change event with a reference to the model
   * instance
   */
  setData(data) {
    // Handle situation where this is clearing existing data, by ensuring the change event is
    // emitted.
    const forceEmit = (Object.keys(this._cachedData).length > 0);
    this._cachedData = {};
    this.add(data, forceEmit);
  }
}
