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
