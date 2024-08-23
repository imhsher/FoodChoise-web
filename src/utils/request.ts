import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const service = axios.create({
  //打包后修改为正式地址
  baseURL: "/api",
  timeout: 60000,
});

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    return Promise.resolve(res);
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default service;
