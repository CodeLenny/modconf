/**
 * Handles configuration for a module or library.
*/
class ModuleConfiguration {

  /**
   * @param {String} id an internal, unique identifier for this module or library.
   * @throws {TypeError} if not given a non-empty string for `id`.
  */
  constructor(id) {
    if(typeof id !== "string") {
      throw new TypeError(`'id' must be given a non-empty string.  Given ${typeof id}.`);
    }
    if(id.length < 1) {
      throw new TypeError(`'id' must be a non-empty string (${id.length} characters given)`);
    }
    this.id = id;
  }

}

module.exports = ModuleConfiguration;
