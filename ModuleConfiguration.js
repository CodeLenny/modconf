const merge = require("lodash.merge");
const { NotImplementedError } = require("common-errors");

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
    this._options = {};
    this._defaults = {
      _set: {},
    };
  }

  /**
   * Add a new option to this module's configuration.
   * Parameters can be given in any order.
   * @param {Constructor|Array<Constructor>} [type] Valid types for this option.
   * @param {String} name the name of the option to create.  Required.
   * @param {Object} [opts] additional options to provide the module.
   * @throws {RangeError} if given too many parameters, or too many parameters of one type.
   * @throws {TypeError} if given an unknown parameter type.
   * @return {ModuleConfiguration} the current configuration object.  Useful for chaining.
  */
  option(...args) {
    if(args.length > 3) {
      throw new RangeError(`Method takes at most 3 arguments.  ${args.length} provided.`);
    }
    let types, name, opts;
    for (const arg of args) {
      if(typeof arg === "string") {
        if(typeof name !== "undefined") { throw new RangeError("More than one name provided."); }
        name = arg;
      }
      else if(typeof arg === "function" || Array.isArray(arg)) {
        if(typeof types !== "undefined") { throw new RangeError("More than one set of valid types provided."); }
        types = arg;
      }
      else if(typeof arg === "object") {
        if(typeof opts !== "undefined") { throw new RangeError("More than one set of options provided."); }
        opts = arg;
      }
      else {
        throw new TypeError(`Invalid parameter given, unknown type '${typeof arg}'.`);
      }
    }
    if(typeof name !== "string") { throw new RangeError("'name' field not provided."); }
    if(typeof opts !== "object") { opts = {}; }
    opts.name = opts.name || name;
    if(types) { opts.types = types; }
    this._options[name] = merge({}, this._options[name], opts);
    if(typeof opts.default !== "undefined") { this._defaults[name] = opts.default; }
    return this;
  }

  /**
   * Update this module's default configuration.
   * @param {String} [set] the configuration set these defaults are in.  Currently not supported.
   * @param {Object} data extra configuration data to merge with the current defaults.
   * @throws {TypeError} if given improper arguments
   * @throws {NotImplementedError} if `set` isn't `"default"`.
   * @return {ModuleConfiguration} the current configuration object.  Useful for chaining.
  */
  defaults(set, data) {
    if(!data) { [set, data] = ["default", set]; }
    if(data === null || typeof data !== "object") {
      throw new TypeError(`Must be given an object.  Given ${typeof data}`);
    }
    if(set === "default") {
      this._defaults = merge({}, this._defaults, data);
    }
    else {
      throw NotImplementedError(`'set' must be '"default"'.  Given '${set}'.`);
    }
    return this;
  }

  /**
   * Update this module's overridden options, which are merged into the configuration after applying a runtime object.
   * @param {String} [set] the configuration set these override properties are in.  Currently not supported.
   * @param {Object} data extra configuration data to merge with the current override data.
   * @throws {TypeError} if given improper arguments
   * @throws {NotImplementedError} if `set` isn't `"default"`.
   * @return {ModuleConfiguration} the current configuration object.  Useful for chaining.
  */
  set(set, data) {
    if(!data) { [set, data] = ["default", set]; }
    if(data === null || typeof data !== "object") {
      throw new TypeError(`Must be given an object.  Given ${typeof data}`);
    }
    if(set === "default") {
      this._defaults._set = merge({}, this._defaults._set, data);
    }
    else {
      throw NotImplementedError(`'set' must be '"default"'.  Given '${set}'.`);
    }
    return this;
  }

  /**
   * Produce the final configuration for this module.  Doesn't have side effects, and can be called multiple times.
   * @param {Object} [obj] an optional set of run-time options that can override the defaults.
   * @return {Object} the final configuration, with all defaults and overrides merged in.
  */
  use(obj) {
    return this.constructor.removeInternal(merge(...[
      {},
      this._defaults,
      obj,
      this.constructor.removeInternal(this._defaults._set),
    ]));
  }

  /**
   * Removes keys used by {@link ModuleConfiguration} used to store internal data from module configuration objects.
   * Mutates the given object.
   * @param {Object} conf the configuration object to mutate.
   * @return {Object} the given configuration object after deleting internal keys.
   * @throws {TypeError} if not given an object.
  */
  static removeInternal(obj) {
    if(typeof obj !== "object" || Array.isArray(obj)) {
      throw new TypeError(`Must be given an object.  Given '${typeof obj}'`);
    }
    delete obj._set;
    return obj;
  }

}

module.exports = ModuleConfiguration;
