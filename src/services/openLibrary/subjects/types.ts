export interface GetSubjectVariables {
  limit?: number;
  subject: string;
}

export interface GetSubjectResponse {
  works: {
    authors: {
      name: string;
    }[];
    cover_id: number | null;
    key: string;
    title: string;
  }[];
}
