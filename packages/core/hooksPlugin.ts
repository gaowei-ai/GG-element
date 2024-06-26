import { each, isFunction } from "lodash-es";
import shelljs from "shelljs";

export function hooksPlugin({
	rmFiles = [],
	buildStart,
	afterBuild,
}: {
	rmFiles?: string[];
	buildStart?: Function;
	afterBuild?: Function;
}) {
	return {
		name: "hooksPlugin", // this name will show up in warnings and errors
		buildStart() {
			each(rmFiles, (file) => shelljs.rm("-rf", file));
			isFunction(buildStart) && buildStart();
		},

		buildEnd(err?: Error) {
			!err && isFunction(afterBuild) && afterBuild();
		},
	};
}
