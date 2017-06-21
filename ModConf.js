const ModuleConfiguration = require("./ModuleConfiguration");

/**
 * Manages configuration for libraries.
*/
class ModConf {

  /**
   * Get a module configuration for the given module.  Returns an existing module if one has already been started with
   * the same name.
   *
   * Users of libraries should *not* use this method to access configuration sections setup by other libraries.  Users
   * should instead `require` the file that sets up the custom configuration object.
   * @param {String} identifier a unique identifier for the module.
   * @throws {TypeError} if not given a non-empty string for `id`.
   * @return {ModuleConfiguration} the requested configuration object.
  */
  static module(identifier) {
    if(!this._modules) { this._modules = {}; }
    if(this._modules[identifier]) { return this._modules[identifier]; }
    const conf = new ModuleConfiguration(identifier);
    this._modules[identifier] = conf;
    return conf;
  }

}

module.exports = ModConf;
