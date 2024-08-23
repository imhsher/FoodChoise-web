<template>
  <v-app>

    <v-main>
      <!-- 顶部导航栏部分 -->
      <v-app-bar flat>
        <!-- logo部分 -->
        <div class="flex  align-center ml-5 w-32">
          <v-avatar size="32">
            <img src="https://picss.sunbangyan.cn/2023/11/24/dc0f2244b425f7a69d236e7c2e37af08.jpeg" alt="John"
              width="30" />
          </v-avatar>
          <div class="ml-2">食选Lite</div>
        </div>
        <!-- 空白部分 -->
        <v-container class="mx-auto d-flex align-center justify-center flex space-x-5">


          <!-- 导航项 -->
          <v-btn class="text-primary">首页</v-btn>

          <v-btn>活动</v-btn>

          <v-btn>APP</v-btn>
          <v-spacer></v-spacer>
        </v-container>

        <!-- 登陆或注册按钮 -->
        <div v-if="userData?.data?.userId == null" style="margin-right: 20px;">
          <UserLoginButton :open="showLoginDialogState" @oncancel="showLoginDialogState = false"
            @onregister="showRegDialogState = true"
            @onloginsuccess="(res: any) => { userData.data = res.data; showLoginDialogState = false }">
          </UserLoginButton>
        </div>

        <v-menu>
          <template v-slot:activator="{ props }">
            <button v-bind="props">
              <v-avatar v-if="userData?.data?.userId != null" class="mr-4" style="overflow: hidden;">
                <v-img :src="userData?.data?.headPic" alt="John"></v-img>
              </v-avatar>
            </button>
          </template>
          <v-btn class="mt-1" @click="outlogin()">退出登录<v-icon icon="mdi-login" color="red"
              class="ml-3"></v-icon></v-btn>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer permanent>
        <!-- 用户登录后显示用户基本信息 -->
        <template v-slot:prepend>
          <v-list-item v-if="userData?.data?.userId != null"
            :href="userData.data ? '/user/' + userData.data.userId : ''" lines="two"
            :prepend-avatar="userData.data?.headPic ?? ''" :title="userData.data?.nickname ?? '请先登录'"
            subtitle="神秘人"></v-list-item>
        </template>

        <v-divider></v-divider>

        <!-- 侧边导航 -->
        <v-list density="compact" nav color="primary">
          <div class="text-xs font-bold m-2">导航</div>
          <v-list-item color="primary" v-for="link in links.data" :key="link.title" router :to="link.route"
            :prepend-icon="link.icon" :title="link.title">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>



      <!-- 加入测试 -->
      <v-banner :sticky="true" lines="one">
        <template v-slot:text>
          食选Lite鸿蒙APP正在内测中！
        </template>

        <template v-slot:actions>
          <v-btn color="primary">
            参加
          </v-btn>
        </template>
      </v-banner>

      <!-- 显示登录或注册页面 -->
      <RegUserDialog :open="showRegDialogState" @oncancel="showRegDialogState = false" @onconfirm="regFinish">

      </RegUserDialog>


      <v-container fluid :class="[$route.meta.cmmonPadding ? '' : 'p-0']">

        <router-view></router-view>

      </v-container>

      <v-footer dark padless>

      </v-footer>



    </v-main>




  </v-app>
</template>

<script setup lang="ts">
import { reactive, provide, nextTick, ref } from "vue";
import { useDate, useTheme } from "vuetify";
import RegUserDialog from "./components/RegUserDialog.vue";
import UserLoginButton from "./components/UserLoginButton.vue";
import { getUserInfo, loginOut } from "./api/user";
import { onMounted } from "vue";
import { useStore } from "vuex";
import useUserStore from "./store/user"
import UserInfo from "./model/UserInfo";
import { pushScopeId } from "vue";
import router from "./router";
const store = useStore();
// 接收用于刷新页面的变量
const isRouterActive = ref(true)
const userStore = useUserStore()
const theme = useTheme();
// theme.global.name.value = "dark";
const links = reactive({
  data: [
    { title: "首页", icon: "mdi:mdi-home-city", route: "/" },
    { title: "校园美食", icon: "mdi:mdi-home-city", route: "/foodInfo" },
    { title: "美食分享", icon: "mdi:mdi-home-city", route: "/shareFoodInfo" },
    { title: "我的收藏", icon: "mdi:mdi-home-city", route: "/foodCollect" },
    { title: "我的关注", icon: "mdi:mdi-home-city", route: "/myAttention" },
  ],
});

const showRegDialogState = ref(false)
const showLoginDialogState = ref(false)
const snackbar = ref(false)
const snackbarTip = ref("")
const userData = reactive({
  data: {} as UserInfo | undefined
})

const userInfo = reactive({
  data: {} as UserInfo | undefined
})

onMounted(() => {
  updateUserInfo()
  getUserId()
})

function updateUserInfo() {
  userStore.fetchUser().then(data => {
    userData.data = data
  })
}

function regFinish(userInfo: any) {
  console.log(userInfo);
}
//获得用户信息
function getUserId() {
  getUserInfo().then(data => {
    userInfo.data = data.data
  })
}

function outlogin() {
  loginOut(userInfo.data?.userId).then((res: any) => {
    console.log(res.code);

    router.push("/")
    window.location.href = window.location.href
  })

}
// 用于刷新页面
provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>
