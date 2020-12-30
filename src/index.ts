import glob from "glob-promise";
import matter from "gray-matter";
import { getFileName, parseWikiLinks, readFile } from "./files";
import { VaultPage, ReadVaultOptions, Vault } from "./types";

export * from "./types";

export const connectLinks = (vault: Vault) => {
  for (const file of Object.values(vault.files)) {
    const links = parseWikiLinks(file.content).filter(
      name => vault.files[name] != null,
    );

    file.links = links;
  }
};

const findFilesThatLinkTo = (vault: Vault, name: string): string[] => {
  const files = Object.values(vault.files).filter(
    f => f.name !== name && f.links.includes(name),
  );

  return files.map(f => f.name);
};

export const connectBackLinks = (vault: Vault) => {
  for (const file of Object.values(vault.files)) {
    file.backLinks = findFilesThatLinkTo(vault, file.name);
  }
};

export const removeUnpublished = (
  vault: Vault,
  isPublished: (f: VaultPage) => boolean,
) => {
  for (const file of Object.values(vault.files)) {
    if (!isPublished(file)) {
      delete vault.files[file.name];
    }
  }
};

export const parseFile = async (path: string): Promise<VaultPage> => {
  const rawContent = await readFile(path);
  const name = getFileName(path);
  const { data: frontMatter, content } = matter(rawContent);

  return {
    path,
    name,
    links: [],
    backLinks: [],
    tags: [],
    frontMatter,
    content,
  };
};

export const emptyVault = (path: string): Vault => ({
  path,
  files: {},
});

export const readVault = async (
  path: string,
  options?: ReadVaultOptions,
): Promise<Vault> => {
  const files = await glob(`${path}/**/*.md`);

  const vault = emptyVault(path);

  for (const filePath of files) {
    const file = await parseFile(filePath);
    vault.files[file.name] = file;
  }

  if (options?.isPublished != null) {
    removeUnpublished(vault, options.isPublished);
  }

  connectLinks(vault);
  connectBackLinks(vault);

  return vault;
};
