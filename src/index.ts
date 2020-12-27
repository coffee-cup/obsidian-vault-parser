import glob from "glob-promise";
import fs from "fs";
import path from "path";
import { File, Vault } from "./types";
import { getFileName } from "./files";

export const readFile = async (path: string): Promise<string> =>
  fs.promises.readFile(path, "utf-8");

export const parseFile = async (filepath: string): Promise<File> => {
  const contents = await readFile(filepath);
  const name = getFileName(filepath);

  return {
    filepath,
    name,
    links: [],
    tags: [],
    contents,
  };
};

export const emptyVault = (): Vault => ({
  files: {},
});

export const readVault = async (path: string): Promise<Vault> => {
  const files = await glob(`${path}/**/*.md`);

  const vault = emptyVault();

  for (const filepath of files) {
    const file = await parseFile(filepath);
    vault.files[file.name] = file;
  }

  return vault;
};
