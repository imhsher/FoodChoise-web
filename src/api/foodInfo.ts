import request from "../utils/request";
import ResponseResult from "../model/ResponseResult";
import PageResult from "../model/PageResult";
import FoodInfo from "../model/FoodInfo";
import { AnyMxRecord } from "dns";
import { PageData } from "../model/Result";
import CanteenFood from "../model/CanteenFoodInfo";
import UserInfo from "../model/UserInfo";

export async function newFood(foodinfo: FoodInfo) {
  const res = await request<ResponseResult<any>>({
    url: "v1/client/food/newFood",
    method: "post",
    data: foodinfo,
  });
  return res.data;
}

export async function getUserFoodInfo(foodId: number) {
  const res = await request<ResponseResult<any>>({
    url: "v1/client/food/getUserFoodInfo",
    method: "get",
    params: { foodId: foodId },
  });
  return res.data;
}

export async function updateFoodInfo(foodinfo: FoodInfo) {
  const res = await request<ResponseResult<any>>({
    url: "v1/client/food/updateFoodInfo",
    method: "post",
    data: foodinfo,
  });
  return res.data;
}

export async function deleteFoodInfo(foodId: number) {
  const res = await request<ResponseResult<any>>({
    url: "v1/client/food/deleteFoodInfo",
    method: "delete",
    params: { foodId: foodId },
  });
  return res.data;
}

export async function getCanteenWindowFoodInfo(windowId: number){
  const res = await request<PageData<CanteenFood>>({
    url: "v1/client/food/getCanteenWindowFoodInfo",
    method: "get",
    params: {windowId : windowId},
  })
  return res.data
}