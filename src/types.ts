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
  config: VaultConfig;
}

export interface VaultConfig {
  theme?: string;
  vimMode?: boolean;
  attachmentFolderPath?: string;
  pluginEnabledStatus?: any;
}

export interface ReadVaultOptions {
  isPublished?: (f: VaultPage) => boolean;
}
