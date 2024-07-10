export default function hooksPlugin({ rmFiles, buildStart, afterBuild, }: {
    rmFiles?: string[];
    buildStart?: Function;
    afterBuild?: Function;
}): {
    name: string;
    buildStart(): void;
    buildEnd(err?: Error): void;
};
