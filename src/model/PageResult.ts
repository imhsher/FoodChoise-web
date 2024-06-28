import ResponseResult from "./ResponseResult";

export default interface PageResult<T> extends ResponseResult<PageData<T>> {}

export interface PageData<T> {
  item: T[];
  more: boolean;
  size: number;
  current: number;
  pages: number;

}
