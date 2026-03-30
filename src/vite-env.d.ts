/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Analytics 4 Measurement ID (public; safe to expose in client bundle) */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
