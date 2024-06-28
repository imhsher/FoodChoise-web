<template>

    <div class="flex items-end justify-between  mr-10">
        <div style="font-size: 35px; margin-top: 10px; margin-left: 5px;">美食分享</div>
        <div class="mb-1 py-2 px-3 flex items-center rounded-lg border hover:bg-zinc-200 cursor-pointer"
            @click="updateFun">

            <v-icon id="img" icon="mdi-cached" size="20" class="mr-1"></v-icon>
            <div class="text-sm/[12px]">换一换</div>

        </div>
    </div>



    <div class="grid grid-cols-4 gap-4 pt-5 grid-row: 2 mr-10">

        <template v-for="(item, index) in shareFoodCardList.item" :key="item.cardId">
            <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                <RecentlyShareFoodCard :food-card-info="item" v-if="isRouterActive"></RecentlyShareFoodCard>
            </v-lazy>
        </template>


    </div>

    <div class="fixed right-0 bottom-10  mr-1 " v-if="show">
        <div class="h-11 w-15 border rounded-lg grid content-center cursor-pointer" @click="updateFun">
            <v-icon id="img" icon="mdi-cached" size="28" color="info" class="mx-auto"></v-icon>
        </div>
        <div class="my-2 px-2 pb-3 pt-1 border rounded-lg flex flex-col cursor-pointer" @click="scrollTop">
            <v-icon icon="mdi-menu-up" size="20" class="mx-auto p-0"></v-icon>
            <div class="text-sm/[12px] block">顶部</div>
        </div>
    </div>

    <!-- <v-infinite-scroll :items="shareFoodCardList.item" :onLoad="load" class="grid grid-cols-4 gap-4 pt-5 grid-row: 2">
        <template v-for="(item, index) in shareFoodCardList.item" :key="item">
            <RecentlyShareFoodCard :food-card-info="item"></RecentlyShareFoodCard>
        </template>
    </v-infinite-scroll> -->

</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, inject, provide, nextTick } from 'vue';
import { getRecentlyShareCard } from '../../../api/foodCard';
import FoodCard from '../../../model/FoodCard';
import RecentlyShareFoodCard from '../../../components/RecentlyShareFoodCard.vue';
import { onMounted } from 'vue';
const pn = 1
const ps = 29
const isRouterActive = ref(true)
const show = ref(false)
var shareFoodCardList = reactive({
    item: [] as FoodCard[] | undefined
})

onMounted(() => {
    window.onscroll = () => {
        let scrollTo = document.documentElement.scrollTop
        if (scrollTo >= 400) {
            show.value = true
        } else {
            show.value = false
        }

    }
})
getRecentlyShareCard(pn, ps).then(res => {
    console.log(res);
    if (res.code == 0) {
        shareFoodCardList.item = res?.data?.item
    }
})

function scrollTop() {
    watchEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 可选，使滚动平滑
        });
    });
}

function updateFun() {

    isRouterActive.value = false
    nextTick(() => {
        isRouterActive.value = true
        console.log(11);
        getRecentlyShareCard(pn, ps).then(res => {
            console.log(res);
            if (res.code == 0) {
                shareFoodCardList.item = res?.data?.item
            }
        })
        scrollTop()
    })
}

// async function api() {
//     return new Promise(resolve => {
//         // setTimeout(() => {
//         //     resolve(Array.from({ length: 10 }, (k, v) => v + shareFoodCardList.item.value.at(-1)! + 1))
//         // }, 1000)
//     })
// }
// async function load({ loading }:any) {
//     // 执行 API 调用
//     const res = await api()

//     // shareFoodCardList.value.push(...(res as number[]))  

//     loading('ok')
// }



</script>