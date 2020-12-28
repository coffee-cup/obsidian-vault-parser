export interface File {
  path: string;
  name: string;
  tags: string[];
  links: Set<string>;
  backLinks: Set<string>;
  frontMatter: Record<string, any>;
  content: string;
}

export interface Vault {
  path: string;
  files: Record<string, File>;
}

export interface ReadVaultOptions {
  isPublished: (f: File) => boolean;
}
