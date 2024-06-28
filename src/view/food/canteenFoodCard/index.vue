<template>
    <!-- 食堂食物信息卡片内容展示 -->
    <div class=" relative">
        <!-- 默认展示：'https://dummyimage.com/1920x1080' -->
        <v-img :src="canteenCardInfo.data?.picture || 'https://dummyimage.com/1920x1080'" cover height="250"
            style="width:100%"></v-img>
        <div class="flex absolute left-2 bottom-2 space-x-2">
            <v-btn rounded="xl" size="small"
                class="backdrop-blur-sm bg-black/20" elevation="0">
                <v-icon icon="mdi-account" color="primary" class="mr-1"></v-icon>
                <div class=" text-white">{{ canteenCardInfo.data.name }}</div>
            </v-btn>
        </div>
    </div>

    <!-- 卡片内容 -->
    <div class="grid grid-cols-4 gap-4 p-3">

        <template v-for="(item, index) in canteenFoods.item" :key="item.foodId">
            <CanteenFoodInfo :food-info="item">
            </CanteenFoodInfo>
        </template>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { getShareFoodCardInfo, getShareCardFood, getCanteenInfo } from "../../../api/foodCard"
import { useRoute } from 'vue-router';
import CanteenFoodInfo from '../../../components/CanteenFoodInfo.vue';
import UserInfo from '../../../model/UserInfo';
import { getCanteenWindowFoodInfo } from '../../../api/foodInfo';
import CanteenFood from '../../../model/CanteenFoodInfo';
import CanteenCard from '../../../model/CanteenCard';

const canteenCardInfo = reactive({
    data: {} as any | undefined
})

const canteenFoods = reactive({
    item: [] as CanteenFood[] | undefined
})

const route = useRoute();
const windowId = ref()
const windowName = ref()
const meInfo = reactive({
    data: {} as UserInfo | undefined
})

onMounted(() => {
    windowId.value = route.params.windowId
    shareCanteenFoodInfo(windowId.value)
    shareCanteenInfo(windowId.value)
})

function shareCanteenFoodInfo(windowId:number){
    getCanteenWindowFoodInfo(windowId).then(res =>{
        canteenFoods.item = res.item
    })
}

function shareCanteenInfo(windowId:number){
    getCanteenInfo(windowId).then(res => {
        
        
        canteenCardInfo.data = res.data
        console.log(canteenCardInfo.data);
    })

    
}

</script>