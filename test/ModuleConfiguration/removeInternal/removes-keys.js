const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

const objs = {
  empty: {
    obj: () => {
      return {};
    },
    name: "an empty object",
  },

  keys: {
    obj: () => {
      return { _set: {} };
    },
    name: "object with empty internal structures",
  },

  full: {
    obj: () => {
      return { _set: { "foo": 1 } };
    },
    name: "object with internal data",
  },
}

function key(t, name, obj) {
  if(typeof obj !== "object") {
    if(Object.keys(objs).indexOf(obj) < 0) {
      throw new ReferenceError(`'${obj}' is an invalid keyword for a known object.`);
    }
    obj = objs[obj].obj();
  }
  const conf = ModuleConfiguration.removeInternal(obj);
  t.is(typeof conf[`_${name}`], "undefined");
}

key.title = (title, name, obj) => `removes _${name} from ${objs[obj].name}`;

test(key, "set", "empty");
test(key, "set", "keys");
test(key, "set", "full");
