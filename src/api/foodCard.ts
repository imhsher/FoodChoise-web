import FoodCard from "../model/FoodCard";
import request from "../utils/request";
import ResponseResult from "../model/ResponseResult";
import PageResult from "../model/PageResult";
import FoodInfo from "../model/FoodInfo";
import CanteenCard from "../model/CanteenCard";
import Result, { PageData } from "../model/Result";
import UserCollection from "../model/UserCollection";
import LikesCollection from "../model/LikesCollection";

export async function getShareFoodCardInfo(cardId: number) {
  const res = await request<ResponseResult<FoodCard>>({
    url: "v1/client/food/getShareFoodCardInfo",
    method: "get",
    params: { cardId: cardId },
  });
  return res.data;
}
export async function getShareCardFood(
  cardId: number,
  pn: number = 1,
  ps: number = 10,
) {
  const res = await request<PageResult<FoodInfo>>({
    url: "v1/client/food/getShareCardFood",
    method: "get",
    params: {
      cardId: cardId,
      pn: pn,
      ps: ps,
    },
  });
  return res.data;
}

export async function getUserFoodCards(
  userId: string,
  pn: number = 1,
  ps: number = 20
) {
  const res = await request<PageResult<FoodCard>>({
    url: "v1/client/food/getUserFoodCards",
    method: "get",
    params: {
      userId: userId,
      pn: pn,
      ps: ps,
    },
  });
  return res.data;
}

export async function newCard(foodCard: FoodCard) {
  const res = await request<ResponseResult<any>>({
    url: "v1/client/food/newCard",
    method: "post",
    data: foodCard,
  });
  return res.data;
}

export async function getUserFoodCardInfo(cardId: number) {
  const res = await request<ResponseResult<FoodCard>>({
    url: "v1/client/food/getUserFoodCardInfo",
    method: "get",
    params: { cardId: cardId },
  });
  return res.data;
}

export async function updateFoodCard(foodCard: FoodCard) {
  const res = await request<ResponseResult<any>>({
    url: "v1/client/food/updateFoodCardInfo",
    method: "post",
    data: foodCard,
  });
  return res.data;
}

export async function deleteFoodCard(cardId: number) {
  const res = await request<ResponseResult<any>>({
    url: "v1/client/food/deleteFoodCard",
    method: "delete",
    params: { cardId: cardId },
  });
  return res.data;
}

export async function getRecentlyShareCard(pn:any,ps:any) {
  const res = await request<PageResult<FoodCard>>({
      url: "/v1/client/food/getRecentlyShareCard",
      method: "get",
      params: { pn: pn, ps: ps },
  });

  return res.data
}

export async function getCanteenFoodCard(canteenId:number){
  const res = await request<PageData<CanteenCard>>({
    url: "/v1/client/food/getCanteenWindowInfo",
    method: "get",
    params: {canteen: canteenId}
  })

  return res.data
}

export async function getCanteenInfo(windowId:number){
  const res = await request<ResponseResult<CanteenCard>>({
    url: "/v1/client/food/getWindowInfoByWindowId",
    method: "get",
    params: {windowId: windowId}
  })

  return res.data
}

export async function addCollectionCard(collectionCard:UserCollection) {
  const res = await request<ResponseResult<UserCollection>>({
    url: "/v1/client/food/collectionCard",
    method: "post",
    data: collectionCard,
  })
  return res.data
}

export async function getCollectionCard(cardId:number, userId:number) {
  const res = await request<ResponseResult<UserCollection>>({
    url: "/v1/client/food/getCollectionCardInfo",
    method: "get",
    params: {cardId: cardId, userId: userId}
  })
  return res.data
}

export async function updateState(cardId:number, userId:number, collectionState:number) {
  const res = await request<ResponseResult<UserCollection>>({
    url: "/v1/client/food/updateCardCollectionState",
    method: "post",
    params: {cardId: cardId, userId: userId,collectionState: collectionState}
  })
  return res.data
}

export async function shareLikesCollection(cardId:number, userId:number) {
  const res = await request<ResponseResult<LikesCollection>>({
    url: "/v1/client/food/getLikesCollection",
    method: "get",
    params: {cardId: cardId, userId: userId}
  })
  return res.data
}

export async function updateLikes(cardId:number, userId:number, likes:number) {
  const res = await request<ResponseResult<LikesCollection>>({
    url: "/v1/client/food/updateLikes",
    method: "post",
    params: {cardId: cardId, userId: userId, likes: likes}
  })
  return res.data
}

export async function updateCollection(cardId:number, userId:number, collection:number) {
  const res = await request<ResponseResult<LikesCollection>>({
    url: "/v1/client/food/updateCollection",
    method: "post",
    params: {cardId: cardId, userId: userId, collection: collection}
  })
  return res.data
}

export async function updateLikesState(cardId:number, userId:number, likesState:number) {
  const res = await request<ResponseResult<LikesCollection>>({
    url: "/v1/client/food/updateLikesState",
    method: "post",
    params: {cardId: cardId, userId: userId,likesState: likesState}
  })
  return res.data
}

export async function getAllCollection() {
  const res = await request<PageData<UserCollection>>({
    url: "/v1/client/food/getAllCollectionCard",
    method: "get",
  })
  return res.data
}
