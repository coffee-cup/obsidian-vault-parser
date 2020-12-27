import glob from "glob-promise";
import fs from "fs";
import { File, Vault } from "./types";
import { getFileName } from "./files";
import matter from "gray-matter";

export const readFile = async (path: string): Promise<string> =>
  fs.promises.readFile(path, "utf-8");

export const parseWikiLinks = (contents: string): string[] => {
  const linkRegex = /\[\[([a-zA-Z0-9\-]+)\]\]/g;

  const matches = [...contents.matchAll(linkRegex)];
  return matches.map((m) => m[1]);
};

export const connectLinks = (vault: Vault) => {
  for (const file of Object.values(vault.files)) {
    const links = parseWikiLinks(file.contents)
      .filter((name) => vault.files[name] != null)
      .map((name) => vault.files[name]);
    file.links = links;
  }
};

export const parseFile = async (filePath: string): Promise<File> => {
  const contents = await readFile(filePath);
  const name = getFileName(filePath);
  const frontMatter = matter(contents).data;
  const published = frontMatter.published ?? false;

  return {
    filePath,
    name,
    published,
    links: [],
    tags: [],
    contents,
    frontMatter,
  };
};

export const emptyVault = (): Vault => ({
  files: {},
});

export const readVault = async (path: string): Promise<Vault> => {
  const files = await glob(`${path}/**/*.md`);

  const vault = emptyVault();

  for (const filePath of files) {
    const file = await parseFile(filePath);
    vault.files[file.name] = file;
  }

  connectLinks(vault);

  return vault;
};
