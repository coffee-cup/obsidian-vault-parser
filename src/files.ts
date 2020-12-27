import path from "path";

export const getFileName = (filepath: string): string =>
  path.parse(filepath).name;
