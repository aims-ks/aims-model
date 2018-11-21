/**
 * A Model that fires an event when the underlying data is changed.
 */
import EventEmitter from 'events';

export default class BasicModel extends EventEmitter {
  /**
   * Constructor to define the cached data and the event(s) that can be fired by this class.
   */
  constructor() {
    super();
    this._cachedData = [];
    this.EVENT_DATA_CHANGED = 'aims.model.data.changed';
  }

  /**
   * Utility method to clear the {@link #_cachedData} array via the {@link #setData()} method.
   */
  clear() {
    this.setData([]);
  }

  /**
   * Setter method to update the cached data and fire the event with a reference to the model
   * instance and emit a change event. This update is performed only if either the existing or new
   * array is not empty.
   */
  setData(data) {
    if (this._cachedData.length > 0 || data.length > 0) {
      this._cachedData = data;
      this.emit(this.EVENT_DATA_CHANGED, this);
    }
  }

  /**
   * Getter method to retrieve the cached data.
   */
  getData() {
    return this._cachedData;
  }
}
