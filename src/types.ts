export interface File {
  filePath: string;
  name: string;
  published: boolean;
  tags: string[];
  links: File[];
  contents: string;
  frontMatter: Record<string, any>;
}

export interface Vault {
  files: Record<string, File>;
}
