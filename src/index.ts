import glob from "glob-promise";
import matter from "gray-matter";
import { getFileName, parseWikiLinks, readFile } from "./files";
import { File, Vault } from "./types";

export const connectLinks = (vault: Vault) => {
  for (const file of Object.values(vault.files)) {
    const links = parseWikiLinks(file.content).filter(
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

export const parseFile = async (path: string): Promise<File> => {
  const rawContent = await readFile(path);
  const name = getFileName(path);
  const { data: frontMatter, content } = matter(rawContent);

  return {
    path,
    name,
    links: new Set(),
    backLinks: new Set(),
    tags: [],
    frontMatter,
    content,
  };
};

export const emptyVault = (path: string): Vault => ({
  path,
  files: {},
});

export const readVault = async (path: string): Promise<Vault> => {
  const files = await glob(`${path}/**/*.md`);

  const vault = emptyVault(path);

  for (const filePath of files) {
    const file = await parseFile(filePath);
    vault.files[file.name] = file;
  }

  connectLinks(vault);
  connectBackLinks(vault);

  return vault;
};

export default readVault;
