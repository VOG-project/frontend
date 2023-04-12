import { ParsedUrlQuery } from "querystring";

export interface SignUpValue {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export interface NaverLoginQuery extends ParsedUrlQuery {
  code: string;
  state: string;
}
