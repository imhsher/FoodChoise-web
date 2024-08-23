import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../view/index.vue"),
    meta: {
      // 页面标题title
      title: "食选Lite",
      page_title: "食选Lite",
      cmmonPadding:true,
    },
  },
  {
    path: "/foodCard/card:cardId(\\d+)",
    name: "foodCard",
    component: () => import("../view/food/foodCard/index.vue"),
    meta: {
      title: "食选卡片",
      page_title: "食选卡片",
      cmmonPadding:false,
    },
  },
  {
    path: "/canteenfoodCard/window:windowId(\\d+)",
    name: "canteenfoodCard",
    component: () => import("../view/food/canteenFoodCard/index.vue"),
    meta: {
      title: "食堂食物卡片",
      page_title: "食堂食物卡片",
      cmmonPadding:false,
    },
  },
  {
    path: "/sharePublicCard/card:cardId(\\d+)",
    name: "sharePublicCard",
    component: () => import("../view/food/sharePublicCard/index.vue"),
    meta: {
      title: "食堂食物卡片",
      page_title: "食堂食物卡片",
      cmmonPadding:false,
    },
  },
  {
    path: "/user/:userId(\\d+)",
    name: "userInfo",
    component: () => import("../view/user/index.vue"),
    meta: {
      title: "用户空间",
      page_title: "用户空间",
      cmmonPadding:true,
    },
  },
  {
    path: "/foodInfo",
    name: "foodCardInfo",
    component: () => import("../view/food/info/index.vue"),
    meta: {
      title: "食物信息",
      page_title: "食物信息",
      cmmonPadding:true,
    },
  },
  {
    path: "/foodCollect",
    name: "foodCollect",
    component: () => import("../view/food/foodCollect/index.vue"),
    meta: {
      title: "个人收藏",
      page_title: "个人收藏",
      cmmonPadding:true,
    },
  },
  {
    path: "/myAttention",
    name: "myAttention",
    component: () => import("../view/user/attention/index.vue"),
    meta: {
      title: "我的关注",
      page_title: "我的关注",
      cmmonPadding:true,
    },
  },
  {
    path: "/upUserInfo",
    name: "upUserInfo",
    component: () => import("../view/user/upUserInfo/index.vue"),
    meta: {
      title: "修改个人信息",
      page_title: "修改个人信息",
      cmmonPadding:true,
    },
  },
  {
    path: "/shareFoodInfo",
    name: "shareFoodInfo",
    component: () => import("../view/food/foodShare/index.vue"),
    meta: {
      title: "展示的食物信息",
      page_title: "展示的食物信息",
      cmmonPadding:true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
