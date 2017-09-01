/**
 * A Model that fires an event when the underlying data is changed.
 */
const EventEmitter = require('events').EventEmitter;

module.exports = class BasicModel extends EventEmitter {

  /**
   * Constructor to define the cached data and the event(s) that can be fired by this class.
   */
  constructor() {
    super();
    this._cachedData = [];
    this.EVENT_DATA_CHANGED = 'aims.model.data.changed';
  }

  /**
   * Setter method to update the cached data and fire the event with a reference to the model
   * instance.
   */
  setData(data) {
    this._cachedData = data;
    this.emit(this.EVENT_DATA_CHANGED, this);
  }

  /**
   * Getter method to retrieve the cached data.
   */
  getData() {
    return this._cachedData;
  }

};
