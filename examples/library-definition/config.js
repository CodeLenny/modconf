const modconf = require("modconf");

module.exports = modconf
  .module("modconf/example-library-definition")
  .option(String, "name", {
    description: "The user's name",
    example: "bob",
  })
  .option(String, "root", {
    description: "The path to the file-system root.",
    default: "/",
  });
