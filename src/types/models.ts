export interface ParsedForm<Data> {
  data: Data | null;
  errors: Partial<Record<keyof Data, string[]>>;
  values: Partial<Record<string, string>>;
}
