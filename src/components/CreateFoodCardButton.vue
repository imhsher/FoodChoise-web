<template v-slot:append>
    <v-dialog width="500" :model-value="open" @animateClick="oncancel">

        <template v-slot:activator="{ props }">
            <v-fab-transition>
            <v-btn icon="mdi-plus" v-bind="props" color="primary"  class=" fixed bottom-10 right-10 z-10"></v-btn>
            </v-fab-transition>
        </template>

        <template v-slot:default="{ isActive: showCreateDialogState }">
            <v-card title="创建食物卡片">
                <v-card-text>
                    <v-form v-model="createForm" @submit.prevent="onSubmitCreate">
                        <v-text-field class="mb-2" v-model="foodCardInfo.data.title" clearable label="Food"
                            placeholder="卡片名称" color="primary" :rules="titleRules" variant="outlined"></v-text-field>

                        <v-text-field class="mb-2" color="primary" v-model="foodCardInfo.data.description" clearable
                            label="Description" variant="outlined" placeholder="简介"
                            :rules="descriptionRules"></v-text-field>

                        <v-file-input variant="outlined" :loading="uploadCoverLoading" @change="uploadCover" class="mb-2"
                            color="primary" accept="image/*" label="封面图片"></v-file-input>

                        <v-img v-show="foodCardInfo.data.cover" :src="foodCardInfo.data.cover" aspect-ratio="1" cover
                            class=" h-52 mb-2 rounded-lg">

                        </v-img>

                        <div class="mb-5 flex space-x-5 items-center">
                            <v-switch v-model="shareState" :label="shareState ? '公开卡片' : '不公开卡片'" color="primary"
                                density="compact" hide-details inline inset></v-switch>
                        </div>

                        <v-btn :loading="createLoading" type="submit" :disabled="!createForm" block class="mb-2"
                            color="primary" size="large" variant="tonal">
                            创建卡片
                        </v-btn>


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
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import FoodCard from "../model/FoodCard"
import { newCard } from "../api/foodCard"
import { uploadCoverImage } from "../api/file"

const props = defineProps({
    //子组件接收父组件传递过来的值
    open: Boolean,
});
const createLoading = ref(false)
const createForm = ref(false)
const uploadCoverLoading = ref(false)
const foodCardInfo = reactive({
    data: {
    } as FoodCard
})
const shareState = ref(0)
const snackbar = ref(false)
const snackbarTip = ref("")
const emit = defineEmits<{
    (e: 'oncancel'): void,
    (e: 'oncreatesuccess', obj: object): void,
}>()

function onSubmitCreate() {

    if (shareState) { foodCardInfo.data.shareState = 1 } else { foodCardInfo.data.shareState = 0 }

    createLoading.value = true
    newCard(foodCardInfo.data).then((res: any) => {
        if (res.code === 0) {
            emit("oncreatesuccess", res)
            snackbarTip.value = "创建成功"

        } else {
            snackbarTip.value = "创建失败"

        }
        createLoading.value = false
        snackbar.value = true

    })
}

function uploadCover(event: any) {

    uploadCoverLoading.value = true

    uploadCoverImage(event.target.files[0]).then((res: any) => {
        if (res.code === 0) {
            foodCardInfo.data.cover = "/static/files/" + res.data.fileName
        }
        console.log(res);
        uploadCoverLoading.value = false


    })


}

function oncancel() {

    emit("oncancel")
}

const titleRules = [
    (value:any) => {
        if (value?.length >= 1 && value?.length <= 15) return true
        return '名称必须在1至15位'
    }
]

const descriptionRules = [
(value:any)  => {
        if (value?.length <= 100) return true
        return '简介必须在100字以内'
    }
] 
</script>