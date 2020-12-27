import path from "path";
import fs from "fs";

export const getFileName = (filepath: string): string =>
  path.parse(filepath).name;

export const readFile = async (path: string): Promise<string> =>
  fs.promises.readFile(path, "utf-8");

export const parseWikiLinks = (contents: string): string[] => {
  const linkRegex = /\[\[([a-zA-Z0-9\-]+)\]\]/g;

  const matches = [...contents.matchAll(linkRegex)];
  return matches.map((m) => m[1]);
};
