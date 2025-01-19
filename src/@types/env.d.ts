interface ImportMetaEnv {
  readonly PUBLIC_ADMIN_EMAIL: string;
  readonly PUBLIC_ADMIN_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}