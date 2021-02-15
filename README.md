# obsidian-vault-parser

![CI](https://github.com/coffee-cup/obsidian-vault-parser/workflows/CI/badge.svg)
[![](https://img.shields.io/npm/v/obsidian-vault-parser?style=flat-square)](https://www.npmjs.com/package/obsidian-vault-parser)
[![](https://img.shields.io/github/license/coffee-cup/obsidian-vault-parser?style=flat-square&color=brightgreen)](https://github.com/coffee-cup/obsidian-vault-parser/blob/main/LICENSE)

Vault parser for the [Obsidian](https://obsidian.md/) note taking app.

## Usage

Read an Obsidian vault from a path

```ts
import { readVault } from "obsidian-vault-parser"

const vault = readVault("./path/to/vault")
console.log(vault)
```

`obsidian-vault-parser` also has the ability to only include files that are
_published_. You can pass an `isPublished` predicate in as an option. Files that
do not pass this predicate will not be included in the vault.

```ts
import { readVault } from "obsidian-vault-parser"

const vault = readVault("./path/to/vault", {
  isPublished: file => file.frontMatter.published != null
})
```

## Documentation

### `Vault`

Represents an entire Obsidian vault.

```ts
export interface Vault {
  path: string;
  files: Record<string, VaultPage>;
  config: VaultConfig;
}
```

### `VaultConfig`

Parsed contents of `.obsidian/config`.

```ts
export interface VaultConfig {
  theme?: string;
  vimMode?: boolean;
  attachmentFolderPath?: string;
  pluginEnabledStatus?: any;
}
```

### `VaultFile`

Represents an individual file inside of a vault.

```ts
export interface VaultPage {
  path: string;
  name: string;
  tags: string[];
  links: string[];
  backLinks: string[];
  frontMatter: Record<string, any>;
  content: string;
  createdAt: number;
  updatedAt: number;
}
```

**`path`**

Absolute path to the file.

**`name`**

Name of the file that can be referenced by other files in the vault. This must
be unique across the vault.

e.g. file with path `./foo/bar.md` is `bar`.

**`tags`**

A list of `#tags` found in the file

**`links`**

Names of other files that this file [[links]] to with.

**`backLinks`**

Names of other files that link to this file.

**`frontMatter`**

[Front matter](https://jekyllrb.com/docs/front-matter/) parsed from the top of the file.

**`content`**

String content of the document with front matter removed.

**`createdAt`**

Birthtime of file in milliseconds.

**`updatedAt`**

Last modified date of file in milliseconds.

### `readVault(path: string) => Vault`

Read an Obsidian Vault from a file path.

## TypeScript

TypeScript types are included with this library.

## Test

Run all tests

```
yarn test
```

---

This project was bootstrapped with [tsdx](https://github.com/formium/tsdx).
