<template>
    <div>
        <v-btn @click="goBack" class="rounded-full" variant="plain" size="40px">
            <v-icon icon="mdi-arrow-left" size="25px" color="#696969"></v-icon>
        </v-btn>
    </div>

    <div>
        <div style="font-size: 30px; margin: 15px 0 30px 10px">修改个人信息</div>

    </div>

    <div class="mx-auto">
        <v-form style="margin-top: 30px;" class="px-10 py-10">
            <div class="flex" style=" justify-content: center;">
                <div style="height: 200px; overflow: hidden; border-radius: 100px;" class="shadow-md">

                    <!-- 头像展示及修改区域 -->
                    <v-img v-if="userinfo.data.headPic" @click="dialongPic = true" :src="userinfo.data.headPic"
                        aspect-ratio="1" cover class=" rounded-lg " style="width: 200px; height: 200px;"></v-img>


                    <v-btn v-else size="200px" @click="dialongPic = true">
                        <div style="position: absolute; justify-content: center; ">
                            <v-icon icon="mdi-plus" color="#808080" size="40px"></v-icon>
                            <p class="mt-2">修改头像</p>
                        </div>
                    </v-btn>
                </div>

                <!-- 上传图片表单 -->
                <v-dialog v-model="dialongPic" width="auto">
                        <v-card min-width="250" max-width="400">
                            <template v-slot:actions>
                                <div style="width: 300px; text-align: center; padding: 20px;" >
                                    <!-- 图片预览 -->
                                    <div v-show="PicUrl" style=" height: 200px; width: 200px; margin: 0 auto; margin-bottom: 20px; overflow: hidden; border-radius: 50%;" class="shadow-md">
                                        <v-img  :src="PicUrl" aspect-ratio="1" cover
                                        class=" h-52 mb-4 rounded-lg">
                                        </v-img>
                                    </div>

                                    <v-file-input class="mb-0" variant="outlined" :loading="uploadCoverLoading"
                                        @change="uploadCover" color="primary" accept="image/*" v-model="picStr"
                                        label="选择图片">
                                    </v-file-input>

                                    <v-btn @click="oncancel" block class="mb-2" size="large" variant="tonal">
                                        取消
                                    </v-btn>
                                    <v-btn  type="submit" block @click="upPic" class="mb-2"
                                        color="primary" size="large" variant="tonal" style="margin: 0;">
                                        上传图片
                                    </v-btn>
                                </div>
                            </template>
                        </v-card>
                    </v-dialog>
                <!--展示用户信息及修改区域 -->
                <div class=" w-50 ">
                    <div style="justify-content: center;">
                        <div class="flex justify-between" style="align-items: center; text-align: right;">
                            <p class="mr-5 w-40" style="font-size: 18px;">真实姓名: </p>
                            <v-text-field class="" disabled :label="userinfo.data?.name" color="primary"></v-text-field>
                        </div>

                        <div class="flex justify-between" style="align-items: center; text-align: right;">
                            <p class="mr-5 w-40" style="font-size: 18px;">学校: </p>
                            <v-text-field class="" disabled :label=userinfo.data?.schoolInfo?.name
                                color="primary"></v-text-field>
                        </div>

                        <div class="flex justify-between" style="align-items: center; text-align: right;">
                            <p class="mr-5 w-40" style="font-size: 18px;">昵称: </p>

                            <v-text-field :label="userinfo.data?.nickname" :rules="nikeNameRules" v-model="nikeName"
                                color="primary"></v-text-field>

                        </div>

                        <div class="flex justify-between" style="align-items: center; text-align: right;">
                            <p class="mr-5 w-40" style="font-size: 18px;">性别: </p>

                            <v-text-field :label="userGender" :rules="genderRules" v-model="newGender"
                                color="primary"></v-text-field>

                        </div>

                        <div class="flex justify-between" style="align-items: center; text-align: right;">
                            <p class="mr-5 w-40" style="font-size: 18px;">手机号: </p>

                            <v-text-field :label="userinfo.data?.phone" :rules="phoneRules" v-model="phone"
                                color="primary"></v-text-field>

                        </div>

                    </div>
                    <div style="display: flex; justify-content: center; align-items: center; height: 40px;">
                        <v-btn @click="updatainfo" class="w-40" rounded color="primary"
                            style="margin-left: 150px; margin-top: 30px;">
                            保存
                        </v-btn>

                        <!-- 成功提示 -->
                        <v-dialog v-if="dialogInfo" v-model="dialog" width="auto">
                            <v-card min-width="250" max-width="400">
                                <template v-slot:actions>
                                    <div style="width: 100%; text-align: center; justify-content: center;">
                                        <div>
                                            <v-icon icon="mdi-check-circle" color="green"
                                                style="position: absolute;top: 8px; left: 8px;"></v-icon>
                                            <p
                                                style="color: green; font-size: 20px; font-weight: 600; margin-left: 10px;">
                                                修改成功</p>
                                        </div>
                                        <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
                                    </div>
                                </template>
                            </v-card>
                        </v-dialog>

                        <!-- 警告框 -->
                        <v-dialog v-else v-model="dialog" width="auto">
                            <v-card min-width="250" max-width="400">
                                <template v-slot:actions>
                                    <div style="width: 100%; text-align: center;">
                                        <div>
                                            <v-icon icon="mdi-information" color="red"
                                                style="position: absolute;top: 8px; left: 8px;"></v-icon>
                                            <p
                                                style="color: red; font-size: 20px; font-weight: 600; margin-left: 10px;">
                                                WARNING</p>
                                        </div>
                                        <p style="display: block; padding: 10px 0;">请输入正确的个人信息</p>
                                        <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
                                    </div>
                                </template>
                            </v-card>
                        </v-dialog>
                    </div>
                </div>
            </div>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import router from '../../../router';
import { getUserInfo, updateUserInfo, upAvatar } from '../../../api/user';
import { reactive, ref } from 'vue';
import UserInfo from '../../../model/UserInfo';
import { uploadCoverImage } from '../../../api/file';


const userinfo = reactive({
    data: {} as UserInfo
})

//显示性别
const userGender = ref("")

//用于双向绑定的性别 （男/女）
const newGender = ref("")
const nikeName = ref("")
const phone = ref("")

//控制弹窗显示
const dialog = ref(false)

//控制弹窗显示图片上传的开关
const dialongPic = ref()

//控制弹窗内显示修改内容的开关
const dialogInfo = ref()

//是否发起请求
const isRequest = ref()

// const createLoading = ref(false)

//是否显示预览图片
const uploadCoverLoading = ref(false)
//输入内容的初始化
let newUserinfo = reactive({
    userId: userinfo.data?.userId,
    nickname: nikeName.value || userinfo.data?.nickname,
    gender: newGender.value == "男" ? 0 : newGender.value == "女" ? 1 : userinfo.data?.gender,
    phone: phone.value || userinfo.data?.phone
})

//限制输入的内容
function verifyUaerInfo() {

    newUserinfo = {
        userId: userinfo.data?.userId,
        nickname: nikeName.value || userinfo.data?.nickname,
        gender: newGender.value == "男" ? 0 : newGender.value == "女" ? 1 : userinfo.data?.gender,
        phone: phone.value || userinfo.data?.phone
    }


    if (nikeNameRules[0](nikeName.value) == true && genderRules[0](newGender.value) == true) {
        newUserinfo = newUserinfo
        dialogInfo.value = true
        isRequest.value = true
        console.log(1);
    } else if (nikeNameRules[0](nikeName.value) == true && newUserinfo.gender === userinfo.data?.gender && newUserinfo.phone === userinfo.data?.phone) {
        newUserinfo = newUserinfo
        dialogInfo.value = true
        isRequest.value = true
        console.log(2);
    } else if (genderRules[0](newGender.value) == true && newUserinfo.nickname === userinfo.data?.nickname && newUserinfo.phone === userinfo.data?.phone) {
        newUserinfo = newUserinfo
        dialogInfo.value = true
        isRequest.value = true
        console.log(3);
    } else if (phoneRules[0](phone.value) == true && newUserinfo.nickname === userinfo.data?.nickname && newUserinfo.gender === userinfo.data?.gender) {
        newUserinfo = newUserinfo
        dialogInfo.value = true
        isRequest.value = true
        console.log(4);
    }
    else if (nikeNameRules[0](nikeName.value) == true && genderRules[0](newGender.value) == true && newUserinfo.phone === userinfo.data?.phone) {
        newUserinfo = newUserinfo
        dialogInfo.value = true
        isRequest.value = true
        console.log(5);
    } else if (nikeNameRules[0](nikeName.value) == true && phoneRules[0](phone.value) == true && newUserinfo.gender === userinfo.data?.gender) {
        newUserinfo = newUserinfo
        dialogInfo.value = true
        isRequest.value = true
        console.log(6);
    } else if (genderRules[0](newGender.value) == true && phoneRules[0](phone.value) == true && newUserinfo.nickname === userinfo.data?.nickname) {
        newUserinfo = newUserinfo
        dialogInfo.value = true
        isRequest.value = true
        console.log(7);
    }  else {
        dialogInfo.value = false
        isRequest.value = false
        console.log("请输入正确信息");
        console.log(newUserinfo);
    }
}
//修改用户信息
function updatainfo() {

    verifyUaerInfo()
    if (isRequest.value == true) {
        updateUserInfo(newUserinfo)
        console.log(newUserinfo);
    }
    //清空输入框内容
    dialog.value = true
        nikeName.value = ""
        newGender.value = ""
        phone.value = ""
}

//验证部分
const nikeNameRules = [
    (value: any) => {
        if (value && value?.length >= 3 && value?.length <= 12 ) {
            return true
        }
        return '用户名必须在3至12位之间';


    }
]

const genderRules = [
    (value: any) => {
        if (value == "男" || value == "女" ) {
            return true
        }
        return '请输入正确性别'
    }
]

const phoneRules = [
    (value: any) => {
        if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value) ) {
            return true
        }
        return '请输入正确手机号码'
    }
]


//返回上一页
function goBack() {
    router.go(-1)
}

//获取用户信息
getUserInfo().then((res: any) => {
    userinfo.data = res.data
    // 用于显示的性别（男/女）
    userGender.value = userinfo.data?.gender == 0 ? "男" : userinfo.data?.gender == 1 ? "女" : "保密"
})

//清空上传图片的内容及图片
function oncancel() {
    PicUrl.value = ""
    picStr.value = ""
}

function uploadCover(event: any) {
    //显示预览图片
    uploadCoverLoading.value = true
    // 上传图片的方法
    uploadCoverImage(event.target.files[0]).then((res: any) => {
        if (res.code === 0) {
            // userinfo.data.headPic = "/static/files/" + res.data.fileName
            PicUrl.value = "/static/files/" + res.data.fileName
        }
        console.log(res);
        uploadCoverLoading.value = false
        console.log(PicUrl.value);


    })


}
//接受输入框的图片地址
const picStr = ref()
//接受上传的图片地址
const PicUrl = ref()


//将图片地址传入数据库
function upPic() {
    if (PicUrl.value) {
        upAvatar(PicUrl.value)
        dialongPic.value = false
        picStr.value = ""
        PicUrl.value = ""
        uploadCoverLoading.value = false
        console.log(PicUrl.value);
    }
}

</script>