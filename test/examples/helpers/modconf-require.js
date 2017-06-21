require("ModConf");
const cached = require.cache["ModConf"];
require.cache["modconf"] = cached;

const Module = require("module");
const resolve = Module._resolveFilename;
Module._resolveFilename = (req, parent) => req === "modconf" ? resolve("ModConf", parent) : resolve(req, parent);
