const LibraryConfig = require("./config");

class Library {

  /**
   * @param {Object} [opts] options to control how the library is run.
  */
  constructor(opts) {
    this.opts = LibraryConfig.use(opts);
  }

}

module.exports = Library;
