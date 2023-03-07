export interface ApiResponse<R> {
  isSuccess: boolean;
  type: string;
  data: R;
}

export interface QueryParams {
  [key: string]: any;
}

export interface ApiError{
  message: string,
  type: string,
}

export interface Token {
  token: string;
}

export interface User {
  username: string;
  password: string;
}

export interface Point {
  id?: number,
  x: number,
  y: number,
  r: number,
  res?: boolean,
  executionTime?: number,
  message?: string,
  dateTime?: string,
  username?: string
}

