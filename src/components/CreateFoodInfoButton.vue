<template  >

    <v-dialog width="500" :model-value="open" @animateClick="oncancel" persistent>


        <v-card title="创建食物信息">
                <v-card-text>
                    <v-form v-model="createForm" @submit.prevent="onSubmitCreate">
                        <v-text-field class="mb-2" v-model="foodInfo.data.name" clearable label="Food" placeholder="食物名称"
                            color="primary" :rules="titleRules" variant="outlined"></v-text-field>

                        <v-text-field class="mb-2" color="primary" v-model="foodInfo.data.description" clearable
                            label="Description" variant="outlined" placeholder="简介"
                            :rules="descriptionRules"></v-text-field>

                        <v-text-field class="mb-2" color="primary" v-model="foodInfo.data.price" clearable label="Price"
                            variant="outlined" placeholder="价格" type="number" :rules="priceRules"></v-text-field>

                        <v-file-input variant="outlined" :loading="uploadCoverLoading" @change="uploadCover" class="mb-2"
                            color="primary" accept="image/*" label="封面图片"></v-file-input>

                        <v-img v-show="foodInfo.data.cover" :src="foodInfo.data.cover" aspect-ratio="1" cover
                            class=" h-52 mb-2 rounded-lg">

                        </v-img>


                        <v-btn :loading="createLoading" type="submit" :disabled="!createForm" block class="mb-2"
                            color="primary" size="large" variant="tonal">
                            创建食物
                        </v-btn>
                        <v-btn @click="oncancel" block class="mb-2"
                             size="large" variant="tonal">
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
import { newFood } from "../api/foodInfo"
import { uploadCoverImage } from "../api/file"
import FoodInfo from '../model/FoodInfo';

const props = defineProps({
    //子组件接收父组件传递过来的值
    open: Boolean,
    cardId: Number,

});
const createLoading = ref(false)
const createForm = ref(false)
const uploadCoverLoading = ref(false)
const foodInfo = reactive({
    data: {
    } as FoodInfo 
})
const snackbar = ref(false)
const snackbarTip = ref("")
const emit = defineEmits<{
    (e: 'oncancel'): void,
    (e: 'oncreatesuccess', obj: object): void,
}>()



function onSubmitCreate() {
    foodInfo.data.cardId = props.cardId!!
    newFood(foodInfo.data).then(res => {
        snackbar.value = true
        if (res.code === 0) {
            initValue()
            emit("oncreatesuccess", res)
            emit("oncancel")
        }
        snackbarTip.value = res.msg

    })
    createLoading.value = false
}

function uploadCover(event: any) {

    uploadCoverLoading.value = true

    uploadCoverImage(event.target.files[0]).then((res: any) => {
        if (res.code === 0) {
            foodInfo.data.cover = "/static/files/" + res.data.fileName
        }
        console.log(res);
        uploadCoverLoading.value = false


    })


}

function initValue(){
    foodInfo.data.cover = ""
    foodInfo.data.description = ""
    foodInfo.data.name = ""
    foodInfo.data.price = 0
}


function oncancel() {
    initValue()
    emit("oncancel")
    console.log("oncancel");
    
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

const priceRules = [
    (value: any) => {
        if (value < 1000) return true
        return '必须是数字哦'
    }
]
</script>