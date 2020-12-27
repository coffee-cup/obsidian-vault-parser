import glob from "glob-promise";
import fs from "fs";
import { File, Vault } from "./types";
import { getFileName, parseWikiLinks, readFile } from "./files";
import matter from "gray-matter";

export const connectLinks = (vault: Vault) => {
  for (const file of Object.values(vault.files)) {
    const links = parseWikiLinks(file.contents).filter(
      (name) => vault.files[name] != null
    );

    file.links = new Set(links);
  }
};

const findFilesThatLinkTo = (vault: Vault, name: string): Set<string> => {
  const files = Object.values(vault.files).filter(
    (f) => f.name !== name && f.links.has(name)
  );

  return new Set(files.map((f) => f.name));
};

export const connectBackLinks = (vault: Vault) => {
  for (const file of Object.values(vault.files)) {
    file.backLinks = findFilesThatLinkTo(vault, file.name);
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
    links: new Set(),
    backLinks: new Set(),
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
  connectBackLinks(vault);

  return vault;
};
