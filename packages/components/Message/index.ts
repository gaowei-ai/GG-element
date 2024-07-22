import { withInstallFunction } from "@GG-element/utils";
import Message from "./methods";

export const GgMessage = withInstallFunction(Message, "$message");
export * from "./types.ts";
