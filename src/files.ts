import path from "path";
import fs from "fs";

export const getFileName = (filepath: string): string =>
  path.parse(filepath).name;

export const readFile = async (path: string): Promise<string> =>
  fs.promises.readFile(path, "utf-8");

export const parseWikiLinks = (content: string): string[] => {
  const linkRegex = /\[\[([a-zA-Z0-9\s-]+\|?[a-zA-Z0-9\s]*)\]\]/g;
  const matches = Array.from(content.matchAll(linkRegex));
  return matches.map(m => {
    const splits = m[1].split("|");
    return splits[0];
  });
};
