"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const lodashEs = require("lodash-es");
const shelljs = require("shelljs");
function hooksPlugin({
  rmFiles = [],
  buildStart,
  afterBuild
}) {
  return {
    name: "hooksPlugin",
    // this name will show up in warnings and errors
    buildStart() {
      lodashEs.each(rmFiles, (file) => shelljs.rm("-rf", file));
      lodashEs.isFunction(buildStart) && buildStart();
    },
    buildEnd(err) {
      !err && lodashEs.isFunction(afterBuild) && afterBuild();
    }
  };
}
exports.hooksPlugin = hooksPlugin;
