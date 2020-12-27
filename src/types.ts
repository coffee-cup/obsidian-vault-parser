export interface File {
  filePath: string;
  name: string;
  published: boolean;
  tags: string[];
  links: Set<string>;
  backLinks: Set<string>;
  contents: string;
  frontMatter: Record<string, any>;
}

export interface Vault {
  files: Record<string, File>;
}
