import ResponseResult from "./ResponseResult";

export default interface Result<T> extends ResponseResult<PageData<T>> {}

export interface PageData<T> {
  item: T[];
  code: number
}