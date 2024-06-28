import request from "../utils/request";
import ResponseResult from "../model/ResponseResult";


export function uploadCoverImage(file: Blob) {
  return request<ResponseResult<any>>({
    url: "v1/client/file/uploadCoverImage",
    method: "post",
    headers:{
        'Content-Type': 'multipart/form-data',
    },
    data: { file: file },
  }).then(res=>res.data);
}
