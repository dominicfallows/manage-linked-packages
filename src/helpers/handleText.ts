import colors from "colors";

export const successText = (text: string): string => colors.green("success: ") + text;

export const foundText = (text: string): string => colors.green("found: ") + text;

export const errorText = (text: string): string => colors.red("error: ") + text;

export const notFoundText = (text: string): string => colors.red("not found: ") + text;
