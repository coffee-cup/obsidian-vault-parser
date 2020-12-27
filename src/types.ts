export interface File {
  filepath: string;
  name: string;
  tags: string[];
  links: File[];
  contents: string;
}

export interface Vault {
  files: Record<string, File>;
}
