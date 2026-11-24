export interface GetWorkVariables {
  workId: string;
}

export interface Work {
  authors?: {
    author: {
      key: string;
    };
  }[];
  covers?: number[];
  description?:
    | string
    | {
        type: string;
        value: string;
      };
  first_publish_date?: string;
  subjects?: string[];
  title: string;
  type: {
    key: '/type/work';
  };
}

export interface WorkRedirect {
  location: string;
  type: {
    key: '/type/redirect';
  };
}

export interface DeletedWork {
  type: {
    key: '/type/delete';
  };
}

export type GetWorkResponse = DeletedWork | Work | WorkRedirect;

export interface GetWorkRatingsResponse {
  summary: {
    average: number | null;
    count: number;
  };
}

export interface GetWorkBookshelvesResponse {
  counts: {
    already_read: number;
    currently_reading: number;
    want_to_read: number;
  };
}
