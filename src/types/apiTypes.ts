export type ApiMode = "local" | "prod" | "staging";

export type RequestTokenType = {
  request_token: string;
  status_code: number;
  status_message: string;
  success: boolean;
};

export type AccessTokenType = {
  access_token: string;
  account_id: string;
  status_code: number;
  status_message: string;
  success: boolean;
};

export type AccessTokenResultType = {
  access_token: string;
  account_id: string;
  status_code: number;
  status_message: string;
  success: boolean;
};

export type AccessTokenDeleteResultType = {
  status_code: number;
  status_message: string;
  success: boolean;
};

// Get movies

export type MoviesResponseType = {
  page: number;
  results: MoviesResultType[];
  total_pages: number;
  total_results: number;
};

export type MoviesResultType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export enum OriginalLanguage {
  En = "en",
  Es = "es",
  Hi = "hi",
  Ko = "ko",
}
