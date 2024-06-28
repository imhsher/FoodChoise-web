<template v-slot:append>
    <v-dialog width="500" :model-value="open" @click:outlined="oncancel">

        <template v-slot:activator="{ props }">
            <v-btn @click="showLoginDialog" v-bind="props" variant="outlined" append-icon="mdi-login" color="primary">
                登录
            </v-btn>
        </template>

        <template v-slot:default="{ isActive: showLoginDialogState }">
            <v-card title="登录到食选">
                <v-card-text>
                    <v-form v-model="loginForm" @submit.prevent="onSubmitLogin">
                        <v-text-field class="mb-2" v-model="loginData.username" clearable label="Email/Username"
                            placeholder="用户名或邮箱" color="primary" :rules="usernameRules" variant="outlined"></v-text-field>

                        <v-text-field class="mb-2" color="primary" v-model="loginData.password" clearable label="password"
                            variant="outlined" placeholder="密码" :rules="passwordRules"></v-text-field>


                        <v-card color="surface-variant" variant="tonal" class="mb-2">
                            <v-card-text class="text-medium-emphasis text-caption">
                                警告，因为食选所涉及的食品特殊，您的一言一行都将代表您自己的立场，请谨言慎行。
                            </v-card-text>
                        </v-card>

                        <v-btn :loading="loginLoading" type="submit" :disabled="!loginForm" block class="mb-2"
                            color="primary" size="large" variant="tonal">
                            登录
                        </v-btn>

                        <div class="mb-5 flex">
                            <v-btn class="p-2" color="primary" variant="text"
                                @click="showLoginDialogState.value = false; onregister()">注册</v-btn>
                            <v-btn class="p-2" color="primary" variant="text">忘记密码</v-btn>

                        </div>
                    </v-form>
                </v-card-text>

            </v-card>
        </template>

    </v-dialog>

    <v-snackbar v-model="snackbar">
        {{ snackbarTip }}

        <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
                取消
            </v-btn>
        </template>
    </v-snackbar>
</template>


<script setup lang="ts">
import { reactive, ref } from "vue";
import { LoginUser } from '../model/LoginUser'
import { userLogin } from "../api/user"
import { useRouter } from 'vue-router';

const props = defineProps({
    //子组件接收父组件传递过来的值
    open: Boolean,
});
const router = useRouter()

const loginForm = ref(false)
const showLoginDialogState = ref(false)
const snackbar = ref(false)
const snackbarTip = ref("")
const loginLoading = ref(false)
const emit = defineEmits<{
    (e: 'oncancel'): void,
    (e: 'onregister'): void,
    (e: 'onloginsuccess', obj: object): void,

}>()

const usernameRules = [
(value:any)  => {
        if (value?.length >= 3) return true
        return '用户名必须在3至12位'
    }
]

const passwordRules = [
(value:any)  => {
        if (value?.length >= 6 && value?.length <= 15) return true
        return '密码必须在6至15位'
    }
]

const loginData: LoginUser = reactive({
    username: "",
    password: ""
})


function onSubmitLogin() {

    loginLoading.value = true
    userLogin(loginData).then((res: any) => {
        if (res.code == 0) {
            showLoginDialogState.value = false
            snackbarTip.value = "登录成功"
            emit("onloginsuccess", res)
            router.go(0)
        } else {
            snackbarTip.value = res.msg
        }
        snackbar.value = true
        loginLoading.value = false
    })

}

function showLoginDialog() {
    loginData.password = ""
    loginData.username = ""

}

function onregister() {
    emit("onregister")

}

function oncancel() {
    emit("oncancel")
}


</script>
