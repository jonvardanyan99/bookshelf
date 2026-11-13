declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    OPEN_LIBRARY_URL: string;
    SESSION_SECRET: string;
  }
}
