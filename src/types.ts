export interface VaultPage {
  path: string;
  name: string;
  tags: string[];
  links: string[];
  backLinks: string[];
  frontMatter: Record<string, any>;
  content: string;
}

export interface Vault {
  path: string;
  files: Record<string, VaultPage>;
}

export interface ReadVaultOptions {
  isPublished?: (f: VaultPage) => boolean;
}
