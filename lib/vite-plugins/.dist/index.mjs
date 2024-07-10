import { each, isFunction } from "lodash-es";
import shelljs from "shelljs";
function hooksPlugin({
  rmFiles = [],
  buildStart,
  afterBuild
}) {
  return {
    name: "hooksPlugin",
    // this name will show up in warnings and errors
    buildStart() {
      each(rmFiles, (file) => shelljs.rm("-rf", file));
      isFunction(buildStart) && buildStart();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}
export {
  hooksPlugin
};
