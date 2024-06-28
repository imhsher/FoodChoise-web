<template>
    <v-card class=" relative rounded-lg p-1 ":href="'/foodCard/card' + foodCardInfo?.cardId">
        <v-img cover class="rounded-lg" :src="foodCardInfo?.cover" height="130"></v-img>
        <div class="absolute top-2 right-2 space-x-2">
          

            <v-btn @click.prevent="showDelete = true" class="backdrop-blur-sm bg-white/20" icon="" size="x-small"
                elevation="0">
                <v-icon icon="mdi-delete" color="#808080" class=""></v-icon>
            </v-btn>

        </div>
        <v-dialog width="500" persistent :model-value="showDelete" style="text-align: center;">
            <v-card title="是否要永久删除这条记录!">
                <div class="flex justify-center mt-5 mb-3">
                    <v-btn @click="ok(foodCardInfo.cardId)" variant="tonal" flat color="red" class="mx-4">确定</v-btn>
                    <v-btn @click="showDelete = false" variant="plain" color="#5865f2" class="mx-4">取消</v-btn>
                </div>
            </v-card>
        </v-dialog>

        <v-card-text>
            <div class="flex justify-between">
                <div class=" font-semibold text-lg overflow-hidden line-clamp-1">{{ foodCardInfo?.title }}</div>
                <v-btn class="" rounded="xl" size="small" elevation="0">
                    <div class=" text-sky-700 font-semibold">{{ foodCardInfo.shareState == 1 ? "已公开" : "未公开" }}</div>
                </v-btn>
            </div>
            <div class=" text-xs overflow-hidden two-line-text mt-2">{{ foodCardInfo?.description }}</div>
            <div class="mt-2 flex items-center">
                <div class="grow "></div>

                <v-btn class="" size="small" color="primary" elevation="0"
                    @click.prevent="updateFoodCard(foodCardInfo.cardId)">
                    编辑
                </v-btn>


            </div>
        </v-card-text>
    </v-card>

    <UpdateFoodCardDialog :open="showUpdateDialogState" :food-card="updateFoodCardInfo.data!!"
        @oncancel="showUpdateDialogState = false" @onupdatesuccess="onupdatesuccess">
    </UpdateFoodCardDialog>

    <v-snackbar v-model="snackbar" :timeout="1000" style="color: red;">
        {{ snackbarTip }}
    </v-snackbar>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import FoodCard from '../model/FoodCard';
import UpdateFoodCardDialog from './UpdateFoodCardDialog.vue';
import { deleteFoodCard, getUserFoodCardInfo } from "../api/foodCard"
import { useRouter } from 'vue-router';

const showDelete = ref(false)
const snackbar = ref(false)
const snackbarTip = ref("")
const props = defineProps({
    //子组件接收父组件传递过来的值
    foodCardInfo: {
        type: Object,
        required: true
    },
});
console.log(props.foodCardInfo);

const updateFoodCardInfo = reactive({
    data: {} as FoodCard | undefined
})

const showUpdateDialogState = ref(false)

function updateFoodCard(cardId: number) {
    getUserFoodCardInfo(cardId).then(res => {
        if (res.code == 0) {
            updateFoodCardInfo.data = res.data
            console.log("*************");

            console.log(updateFoodCardInfo.data);

            showUpdateDialogState.value = true

        }
    })

}
function ok(id: any) {
    deleteFoodCard(id).then((res => {
        if (res.code == 0) {
            showDelete.value = false
            snackbar.value = true
            snackbarTip.value = "删除成功!"
        } else {
            snackbar.value = true
            snackbarTip.value = "删除失败!"
        }
    }))
}

function onupdatesuccess(params: Object) {
    // console.log(params);
    props.foodCardInfo.value = params
    // console.log( props.foodCardInfo.value );

    // 强制刷新
    window.location.href = window.location.href

}

</script>

<style>
.two-line-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 设置默认高度为两行的高度 */
    height: 32px;

}
</style>