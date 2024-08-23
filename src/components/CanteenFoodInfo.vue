<template>
    <v-card  class=" relative rounded-lg p-1 ">
        <v-img cover class="rounded-lg" :src="foodInfo?.cover" height="130"></v-img>
        <v-card-text>
            <div class=" font-semibold text-lg overflow-hidden line-clamp-1">{{ foodInfo?.name }}</div>
            <div style="font-size: 14px; color: #808080;">￥<span>{{ foodInfo?.price }}</span></div>
            <div class="mt-2 flex items-center">
            </div>
        </v-card-text>


    
    </v-card>
</template>

<script setup lang="ts">
import useUserStore from '../store/user';
import { reactive, ref } from 'vue';
import { deleteFoodInfo, getUserFoodInfo } from "../api/foodInfo"
import UpdateFoodInfoDialog from './UpdateFoodInfoDialog.vue';
import FoodInfo from '../model/FoodInfo';

console.log("展示页");
const showDelete = ref(false)
const snackbar = ref(false)
const snackbarTip = ref("")
const props = defineProps({
    //子组件接收父组件传递过来的值
    foodInfo: Object,
});

const emit = defineEmits<{
    (e: 'updateFoodInfo', obj: object): void,
}>()



const updateFoodInfo = reactive({
    data: {} as FoodInfo | undefined
})

const showUpdateDialogState = ref(false)

function updateFoodInfoInfo(foodId: number) {
    showUpdateDialogState.value = true
    getUserFoodInfo(foodId).then(res => {

        updateFoodInfo.data = res.data
        console.log(res.data);
        console.log(res.code);

    })
}

function updateSuccess(foodInfo: object) {

    emit("updateFoodInfo", foodInfo)

    showUpdateDialogState.value = false

}

function ok(id: any) {
    console.log(id);
    
    deleteFoodInfo(id).then((res => {
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