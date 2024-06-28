<template>
    <v-card  class=" relative rounded-lg p-1 ">
        <v-img cover class="rounded-lg" :src="foodInfo?.cover" height="130"></v-img>

        <div class="absolute top-2 right-2 space-x-2">
           

            <v-btn @click.prevent="showDelete = true" class="backdrop-blur-sm bg-white/20" icon="" size="x-small" elevation="0">
                <v-icon icon="mdi-delete" color="#808080" class=""></v-icon>
            </v-btn>
            
        </div>

        <v-dialog width="500" persistent :model-value="showDelete" style="text-align: center;">
            <v-card title="是否要永久删除这条记录!">
                <div class="flex justify-center mt-5 mb-3">
                    <v-btn @click="ok(foodInfo?.foodId)" variant="tonal" flat color="red" class="mx-4">确定</v-btn>
                    <v-btn @click="showDelete = false" variant="plain" color="#5865f2" class="mx-4">取消</v-btn>
                </div>
            </v-card>
        </v-dialog>

        <v-card-text>
            <div class=" font-semibold text-lg overflow-hidden line-clamp-1">{{ foodInfo?.name }}</div>
            <div class=" text-xs overflow-hidden two-line-text ">{{ foodInfo?.description }}</div>
            <div style="font-size: 14px; color: #808080;">￥<span>{{ foodInfo?.price }}</span></div>
            <div class="mt-2 flex items-center">

                <!-- <div>  
                    <div class="flex items-center">
                        <v-icon icon="mdi-account" color="primary"></v-icon>
                        <span class=" font-semibold">114514</span>
                    </div>
                </div> -->

                <div class="grow "></div>

                <v-btn class="" size="small" color="primary" elevation="0"
                    @click.prevent="updateFoodInfoInfo(foodInfo?.foodId)">
                    编辑
                </v-btn>
            </div>
        </v-card-text>


    
    </v-card>

    <UpdateFoodInfoDialog :open="showUpdateDialogState" :food-info="updateFoodInfo.data!!"
        @oncancel="showUpdateDialogState = false" @onupdatesuccess="updateSuccess">
    </UpdateFoodInfoDialog>

    <v-snackbar v-model="snackbar" :timeout="1000" style="color: red;">
        {{ snackbarTip }}
    </v-snackbar>
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