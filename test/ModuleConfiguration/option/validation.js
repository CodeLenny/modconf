const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

let i = 1; // increment for module names.

const type = Number;
const types = [ Number, String ];

const name = "opt";

const opts = { default: "Test" };

/**
 * Checks if {@link ModuleConfiguration#option} throws a RangeError when given `args`.  If `str` given, checks that
 * error message includes the text in `str`.
 * @param {Error} type the type of error expected
 * @param {Array} args arguments to give to {@link ModuleConfiguration#option}
 * @param {String} [str] a string to check the results against.
*/
function err(t, type, args, str) {
  const conf = new ModuleConfiguration("" + ++i);
  const err = t.throws(() => conf.option(...args), type);
  if(typeof str === "string") {
    t.true(err.message.indexOf(str) >= 0);
  }
}
err.title = (title, err, args, str) => `throws ${err.type} if ${title}`;

test("more than 3 args provided", err, RangeError, ["a", "b", "c", "d"]);

test("two names are provided", err, RangeError, [type, name, "other name"]);
test("two types are provided", err, RangeError, [type, types, name]);
test("two opts are provided",  err, RangeError, [name, opts, opts]);

test("no name is provided", err, RangeError, [], "name");

test("an unknown type is provided", err, TypeError, [name, 1]);
