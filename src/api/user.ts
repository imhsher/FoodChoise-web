import RegUserInfo from "../model/RegUserInfo";
import request from "../utils/request";
import { LoginUser } from "../model/LoginUser";
import UserInfo from "../model/UserInfo";
import ResponseResult from "../model/ResponseResult";
import internal from "stream";
import { PageData } from "../model/Result";
import UserAttention from "../model/UserAttention";
import UserInfoAttention from "../model/UserInfoAttention";

export async function getRegEmailCode(email: string) {
  const res = await request<ResponseResult<any>>({
    url: "/v1/client/user/getRegEmailCode",
    method: "post",
    data: { email: email },
  });
  return res.data;
}

export async function regUser(regUserInfo: RegUserInfo) {
  const res = await request<ResponseResult<any>>({
    url: "/v1/client/user/regUser",
    method: "post",
    data: regUserInfo,
  });
  return res.data;
}

export async function userLogin(loginUser: LoginUser) {
  const res = await request<ResponseResult<any>>({
    url: "/v1/client/user/login",
    method: "post",
    data: loginUser,
  });
  return res.data;
}

export async function getUserInfo() {
  const res = await request
    .get<ResponseResult<UserInfo>>("/v1/client/user/info");
  return res.data;
}

export async function getUserPublicInfo(userId: string) {
  const res = await request<ResponseResult<UserInfo>>({
    url: "/v1/client/user/publicInfo",
    method: "get",
    params: { userId: userId },
  });
  return res.data;
}

export async function updateUserInfo(newUserInfo: any) {
  const res = await request<ResponseResult<UserInfo>>({
    url: "/v1/client/user/updateUserInfo",
    method: "put",
    data: newUserInfo
  });
  return res.data;
}

export async function upAvatar(url: any) {
  const res = await request<ResponseResult<any>>({
    url: "/v1/client/user/upAvatar",
    method: "put",
    data: {
      headPic: url,
    }
  });
  return res.data;
}

export async function loginOut(userId: any) {
  const res = await request<ResponseResult<any>>({
    url: "/v1/client/user/loginOut",
    method: "delete",
    params: { userId: userId },
  });
  return res.data
}

export async function shareAttentionUser() {
  const res = await request<PageData<UserAttention>>({
    url: "/v1/client/user/getAllAttentionUser",
    method: "get",
  });
  return res.data
}

export async function shareAttentionState(userId: number) {
  const res = await request<ResponseResult<UserAttention>>({
    url: "/v1/client/user/getAttentionInfo",
    method: "get",
    params: { userId: userId },
  });
  return res.data
}

export async function updateAttentionStateAndNum(userId: number, attentionState: number, attentionNum: number) {
  const res = await request<ResponseResult<UserAttention>>({
    url: "/v1/client/user/updateAttentionStateAndNum",
    method: "post",
    params: { userId: userId, attentionState: attentionState, attentionNum: attentionNum },
  });
  return res.data
}


export async function updatePubAttInfo(userId:number, attentionNum: number,attentionState: number) {
  const res = await request<ResponseResult<UserInfoAttention>>({
    url: "/v1/client/user/updatePubAtt",
    method: "post",
    params: {userId: userId, attentionNum:attentionNum,attentionState:attentionState}
  })
  return res.data
}

export async function addPriAttUserInfo(userId:number, attentionNum: number) {
  const res = await request<ResponseResult<UserAttention>>({
    url: "/v1/client/user/addPriAttUserInfo",
    method: "post",
    params: {userId: userId, attentionNum:attentionNum}
  })
  return res.data
}

export async function shareIsAttention(userId:number, attId:number) {
  const res = await request<ResponseResult<UserInfoAttention>>({
    url: "/v1/client/user/shareAttUser",
    method: "get",
    params: {userId: userId, attId:attId}
  })
  return res.data 
}

export async function addAttUser(userId:number, attId:number) {
  const res = await request<ResponseResult<UserInfoAttention>>({
    url: "/v1/client/user/addUserAtt",
    method: "post",
    params: {userId: userId, attId:attId}
  })
  return res.data  
}

export async function delAttUser(userId:number, attId:number) {
  const res = await request<ResponseResult<UserInfoAttention>>({
    url: "/v1/client/user/delUserAtt",
    method: "delete",
    params: {userId: userId, attId:attId}
  })
  return res.data 
}

export async function shareAllAttUserInfo(userId:number) {
  const res = await request<PageData<UserInfoAttention>>({
    url: "/v1/client/user/shareAllAttUserInfo",
    method: "get",
    params: {userId: userId}
  })
  return res.data 
}


export async function upPersonalityTags(tags: string, userId: number) {
  const res = await request<ResponseResult<any>>({
    url: "v1/client/user/upPersonalityTags",
    method: "post",
    params: {tags : tags, userId: userId},
  })
  return res.data
}