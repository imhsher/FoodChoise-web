<template  >
    <v-dialog width="500" persistent :model-value="open">

        <v-card title="创建食物卡片">
            <v-card-text>
                <v-form v-model="updateForm" @submit.prevent="onSubmitupdate">

                    <v-text-field class="mb-2" v-model="foodInfo.name" clearable label="Food" placeholder="食物名称"
                        color="primary" :rules="titleRules" variant="outlined"></v-text-field>

                    <v-text-field class="mb-2" color="primary" v-model="foodInfo.description" clearable label="Description"
                        variant="outlined" placeholder="简介" :rules="descriptionRules"></v-text-field>

                    <v-text-field class="mb-2" color="primary" v-model="foodInfo.price" clearable label="Price"
                        variant="outlined" placeholder="价格" type="number"></v-text-field>

                    <v-file-input variant="outlined" :loading="uploadCoverLoading" @change="uploadCover" class="mb-2"
                        color="primary" accept="image/*" label="封面图片"></v-file-input>

                    <v-img v-show="foodInfo.cover" :src="foodInfo.cover" aspect-ratio="1" cover
                        class=" h-52 mb-2 rounded-lg">

                    </v-img>


                    <v-btn :loading="updateLoading" type="submit" :disabled="!updateForm" block class="mb-2" color="primary"
                        size="large" variant="tonal">
                        修改食物
                    </v-btn>

                    <v-btn block class="mb-2" @click="oncancel" size="large" variant="tonal">
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
import { reactive, ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import { uploadCoverImage } from "../api/file"
import { updateFoodInfo } from "../api/foodInfo"
import FoodInfo from '../model/FoodInfo';

const props = defineProps({
    //子组件接收父组件传递过来的值
    open: Boolean,
    foodInfo: {
        type: Object,
        required: true
    }
});
const updateLoading = ref(false)
const updateForm = ref(false)
const uploadCoverLoading = ref(false)
const shareState = ref(false)
const snackbar = ref(false)
const snackbarTip = ref("")
const emit = defineEmits<{
    (e: 'oncancel'): void,
    (e: 'onupdatesuccess', obj: object): void,
}>()


// 监听 props.myProp 的变化
watch(() => props.foodInfo, (newValue, oldValue) => {

    if (oldValue.shareState == null || oldValue.shareState == undefined) {

        shareState.value = props.foodInfo.shareState == 1;
    }
});

function onSubmitupdate() {


    if (shareState) { props.foodInfo.shareState = 1 } else { props.foodInfo.shareState = 0 }

    updateFoodInfo((props.foodInfo as FoodInfo)).then((res: any) => {
        if (res.code === 0) {
            emit("onupdatesuccess", props.foodInfo)
            snackbarTip.value = "修改成功"

        } else {
            snackbarTip.value = "修改失败"

        }
        updateLoading.value = false
        snackbar.value = true

    })
}

function uploadCover(event: any) {

    uploadCoverLoading.value = true

    uploadCoverImage(event.target.files[0]).then(res => {
        if (res.code === 0) {
            props.foodInfo.cover = "/static/files/" + res.data.fileName
        }
        console.log(res);
        uploadCoverLoading.value = false
    })
}

function oncancel() {
    emit("oncancel")
}

const titleRules = [
    (value: any) => {
        if (value?.length >= 1 && value?.length <= 15) return true
        return '名称必须在1至15位'
    }
]

const descriptionRules = [
    (value: any) => {
        if (value?.length <= 100) return true
        return '简介必须在100字以内'
    }
] 
</script>