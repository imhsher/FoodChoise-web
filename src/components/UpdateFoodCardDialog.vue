<template>
    <v-dialog width="500" persistent :model-value="open">

        <v-card title="创建食物卡片">
            <v-card-text>
                <v-form v-model="updateForm" @submit.prevent="onSubmitupdate">
                    <v-text-field class="mb-2" v-model="foodCard.title" clearable label="卡片名称" placeholder="卡片名称"
                        color="primary" :rules="titleRules" variant="outlined"></v-text-field>

                    <v-text-field class="mb-2" color="primary" v-model="foodCard.description" clearable label="简介"
                        variant="outlined" placeholder="简介" :rules="descriptionRules"></v-text-field>

                    <v-file-input variant="outlined" :loading="uploadCoverLoading" @change="uploadCover" class="mb-2"
                        color="primary" accept="image/*" label="封面图片"></v-file-input>

                    <v-img v-show="foodCard.cover" :src="foodCard.cover" aspect-ratio="1" cover
                        class=" h-52 mb-2 rounded-lg">

                    </v-img>

                    <div class="mb-5 flex space-x-5 items-center">
                        <v-switch v-model="shareState" :label="shareState == true ? '公开卡片' : '不公开卡片'"
                            color="primary" density="compact" hide-details inline inset></v-switch>
                    </div>

                    <v-btn :loading="updateLoading" type="submit" :disabled="!updateForm" block class="mb-2"
                        color="primary" size="large" variant="tonal">
                        修改卡片
                    </v-btn>
                    <v-btn block class="mb-2" @click="oncancel" size="large" variant="tonal">
                        取消
                    </v-btn>
                </v-form>
            </v-card-text>

        </v-card>

    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="1000">
        {{ snackbarTip }}
    </v-snackbar>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import { uploadCoverImage } from "../api/file"
import { updateFoodCard } from "../api/foodCard"
import FoodCard from "../model/FoodCard"
import MeFoodCard from './MeFoodCard.vue';

const props = defineProps({
    //子组件接收父组件传递过来的值
    open: Boolean,
    foodCard: {
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
watch(() => props.foodCard, (newValue, oldValue) => {


    if (oldValue.shareState == null || oldValue.shareState == undefined) {

        shareState.value = props.foodCard.shareState == 1;
    }

});

// 修改卡片数据
function onSubmitupdate() {


    if (shareState.value) { props.foodCard.shareState = 1 } else { props.foodCard.shareState = 0 }


    updateFoodCard((props.foodCard as FoodCard)).then((res: any) => {


        if (res.code === 0) {
            emit("onupdatesuccess", props.foodCard)
            snackbarTip.value = "修改成功"

            emit("oncancel")

        } else {
            snackbarTip.value = "修改失败"

        }
        updateLoading.value = false
        snackbar.value = true
    })
}
// 修改图片
function uploadCover(event: any) {

    uploadCoverLoading.value = true

    uploadCoverImage(event.target.files[0]).then(res => {
        if (res.code === 0) {
            props.foodCard.cover = "/static/files/" + res.data.fileName
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