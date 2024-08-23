<template>
    <div class=" px-4 ">
        <div>
            <div class=" flex w-full justify-between " style="margin-top: 10px;">
                <div style="font-size: 35px;" class="font-serif cursor-pointer">
                    <span @click="isShowCard = !isShowCard" :class="{ active: !isShowCard }">一食堂</span>
                    /
                    <span @click="isShowCard = !isShowCard" :class="{ active: isShowCard }">二食堂</span>
                </div>
            </div>
            <v-divider :thickness="2" style="height: 5px; margin-top: 30px;" class="border-opacity-100" color="success"></v-divider>
            <div class="mt-8 text-2xl">食堂一楼</div>
            <div class="grid grid-cols-4 gap-4 pt-5 grid-row: 2">
                <!-- 一食堂 -->
                <template v-if="isShowCard " v-for="(item, index) in shareOneCanteenCardList.item" :key="item.cardId">
                    <ShareCanteenFoodCard v-if="item.floor == onefloor" :food-card-info="item"></ShareCanteenFoodCard>
                </template>

                <!-- 二食堂 -->
                <template v-else v-for="(item, index) in shareTwoCanteenCardList.item">
                    <ShareCanteenFoodCard :food-card-info="item" v-if="item.floor == onefloor"></ShareCanteenFoodCard>
                </template>
            </div>
            
            <v-divider :thickness="2" style="height: 5px; margin-top: 30px;" class="border-opacity-100" color="info"></v-divider>

            <div class="mt-8 text-2xl">食堂二楼</div>
            <div class="grid grid-cols-4 gap-4 pt-5 grid-row: 2">
                <!-- 一食堂 -->
                <template v-if="isShowCard" v-for="(item, index) in shareOneCanteenCardList.item" :key="item.cardId">
                    <ShareCanteenFoodCard :food-card-info="item" v-if="item.floor == twofloor"></ShareCanteenFoodCard>
                </template>
                <!-- 二食堂 -->
                <template v-else v-for="(item, index) in shareTwoCanteenCardList.item">
                    <ShareCanteenFoodCard :food-card-info="item" v-if="item.floor == twofloor"></ShareCanteenFoodCard>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import ShareCanteenFoodCard from '../../../components/ShareCanteenFoodCard.vue';
import FoodCard from '../../../model/FoodCard';
import request from '../../../utils/request';
import PageResult from '../../../model/PageResult';
import UserInfo from '../../../model/UserInfo';
import { getCanteenFoodCard, getUserFoodCards } from "../../../api/foodCard";
import CanteenCard from '../../../model/CanteenCard';
const isShowCard = ref(true)
const oneCanteen = 1
const twoCanteen = 2
const onefloor = 1
const twofloor = 2

var shareOneCanteenCardList = reactive({
    item: [] as CanteenCard[] | undefined
})

var shareTwoCanteenCardList = reactive({
    item: [] as CanteenCard[] | undefined
})
onMounted(() => {

    shareCanteenWindowInfo()
})

function shareCanteenWindowInfo() {
    getCanteenFoodCard(oneCanteen).then(res => {
        console.log(res.item);
        if(res.code==0){
            shareOneCanteenCardList.item = res.item
        }
       
    })

    getCanteenFoodCard(twoCanteen).then(res => {
        if(res.code == 0){
            shareTwoCanteenCardList.item = res.item
        }     
    })
}

</script>

<style>
.active {
    color: grey;
}
</style>