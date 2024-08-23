import { defineStore } from "pinia";
import UserInfo from "../model/UserInfo";
import { getUserInfo } from "../api/user";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("meInfo", () => {
  const userInfo = ref<UserInfo>();

  function setUserInfo(newUserInfo: UserInfo | undefined) {
    userInfo.value = newUserInfo;
  }

  async function fetchUser() {
    return getUserInfo().then((res) => {
      if (res.code == 0) {
        setUserInfo(res.data);
      } else {
        setUserInfo(undefined);
      }
      return res.data;
    });
  }

  return { userInfo, fetchUser };
});

export default useUserStore;
