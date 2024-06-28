<!-- 用户注册模块 -->
<template>
    <v-dialog persistent :modelValue="open" width="500">
        <v-card>
            <v-card-title>注册用户</v-card-title>
            <v-card-text>

                <v-form v-model="regForm" @submit.prevent="onSubmitReg">


                    <v-text-field class="mb-2" v-model="regUserInfo.username" clearable label="Email" placeholder="用户名"
                        color="primary" :rules="usernameRules" variant="outlined"></v-text-field>

                    <v-text-field class="mb-2" color="primary" v-model="regUserInfo.password" clearable label="Password"
                        variant="outlined" placeholder="密码" :rules="passwordRules"></v-text-field>

                    <v-text-field class="mb-2" color="primary" v-model="regUserInfo.email" clearable label="邮箱"
                        variant="outlined" placeholder="邮箱" :rules="emailRules"></v-text-field>

                    <div class="flex items-center justify-center mb-5 space-x-7">
                        <v-text-field :hide-details="true" color="primary" v-model="regUserInfo.emailCode" clearable
                            label="邮箱验证码" variant="outlined" placeholder="邮箱验证码" :rules="emailCodeRules"></v-text-field>

                        <v-btn elevation="0" color="primary" size="x-large" @click="postRegEmailCode">发送验证码</v-btn>
                    </div>

                    <div class="flex items-center justify-center mb-5 space-x-7">
                        <v-text-field :hide-details="true" color="primary" v-model="regUserInfo.captchaCode" clearable
                            label="验证码" variant="outlined" placeholder="验证码" :rules="captchaCodeRules"></v-text-field>

                        <img :src="'/api/v1/client/captcha/getCaptchaImage?' + time" style="height: 42px;"
                            @click="() => { time = new Date().getTime() }" />  

                    </div>

                    <v-btn type="submit" :loading="regLoading" @click="onconfirm()" :disabled="!regForm" block class="mb-3"
                        color="primary" size="large" variant="tonal">
                        注册
                    </v-btn>

                    <v-btn block class="mb-2" color="primary" size="large" @click="oncancel" variant="outlined">
                        取消
                    </v-btn>
                  
                </v-form>
            </v-card-text>
        </v-card>
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
import { toRef, defineProps, ref } from "vue";
import RegUserInfo from "../model/RegUserInfo";
import { reactive } from "vue";
import { getRegEmailCode, regUser } from '../api/user'
import ResponseResult from '../model/ResponseResult'

var time = ref(new Date().getTime())

const regLoading = ref(false)

const regUserInfo: RegUserInfo = reactive({
    username: "",
    password: "",
    email: "",
    emailCode: "",
    captchaCode: ""
})

const props = defineProps({
    //子组件接收父组件传递过来的值
    open: Boolean,
});

const emit = defineEmits<{
    (e: 'oncancel'): void,
    (e: 'onconfirm', res: any): void
}>()


const usernameRules = [
(value:any)  => {
        if (value?.length >= 3) return true
        return '用户名必须大于3位'
    }
]

const passwordRules = [
(value:any)  => {
        if (value?.length >= 6 && value?.length <= 15) return true
        return '密码必须在6至15位'
    }
]

const emailRules = [
(value:any)  => {
        if (value?.includes("@")) return true
        return '请确保输入了邮箱'
    }
]


const emailCodeRules = [
(value:any)  => {
        if (value?.length == 4) return true
        return '请输入正确验证码'
    }
]

const captchaCodeRules = [
(value:any)  => {
        if (value?.length == 4) return true
        return '请输入正确验证码'
    }
]

const snackbar = ref(false)

const snackbarTip = ref("")



function postRegEmailCode() {

    getRegEmailCode(regUserInfo.email).then(res => {
        if (res.code == 0) {
            snackbarTip.value = "发送成功"
        } else {
            snackbarTip.value = "发送失败"
        }
        snackbar.value = true

    })
}


function onconfirm() {
    regLoading.value = true

    regUser(regUserInfo).then(res => {

        if (res.code === 0) {
            snackbarTip.value = "注册成功"
            emit('onconfirm', res)
        } else {
            snackbarTip.value = "注册失败:" + res.msg
        }
        regLoading.value = false
        snackbar.value = true
    })

}

function oncancel() {
    emit('oncancel')
}


function onSubmitReg() {

}

var regForm = ref(false)

</script>