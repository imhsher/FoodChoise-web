<template>
    <!-- 展示个人食物卡片内容 -->
    <div class=" relative">
        <v-img :src="foodCardInfo?.data?.cover ?? 'https://dummyimage.com/1920x1080'" cover height="250"
            style="width:100%"></v-img>
    </div>

    <div>
        <div class="flex space-x-2 shadow" style="width: 100%; height: 60px; align-items: center;">

            <div class="flex mr-3 ml-3 cursor-pointer">
                <v-icon icon="mdi-account" color="primary" class="mr-2"></v-icon>
                <div class=" text-primary">{{ meInfo.data?.nickname }}</div>
            </div>




            <div class="flex mr-1 cursor-pointer">
                <v-icon icon="mdi-heart" color="red" class="mr-2"></v-icon>

                <div class=" text-grey">{{ likes.item?.likes }}</div>
            </div>



            <div class="flex mr-1 cursor-pointer ">
                <v-icon icon="mdi-star" size="25" color="yellow" class="mr-2 "></v-icon>
                <div class=" text-grey hover:text-red-600">{{ likes.item?.collection }}</div>
            </div>

        </div>
    </div>

    <!-- 卡片内容 -->
    <div class="grid grid-cols-4 gap-4 p-3">

        <template v-for="(item, index) in cardFoods.item" :key="item.foodId">
            <MeFoodInfo :food-info="item" @updateFoodInfo="(v: object) => updateFoodInfo(v, index)">
            </MeFoodInfo>
        </template>

    </div>
    <!-- 分页条 -->
    <div class="text-center mt-5" v-if="pages > 0">
        <v-pagination v-model="currentPage" :length="pages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"
            @update:model-value="(v) => getCardFoods(cardFoodId, v)"></v-pagination>
    </div>

    <v-btn icon="mdi-plus" color="primary" class=" fixed bottom-10 right-10 z-10"
        @click="showCreateFoodDialogState = true"></v-btn>

    <create-food-info-button :open="showCreateFoodDialogState" @oncancel="showCreateFoodDialogState = false"
        @oncreatesuccess="onCreateFoodSuccess" :card-id="foodCardInfo.data?.cardId"></create-food-info-button>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { getShareFoodCardInfo, getShareCardFood, shareLikesCollection } from "../../../api/foodCard"
import { useRoute } from 'vue-router';
import ShareFoodInfo from "../../../components/ShareFoodInfo.vue"
import MeFoodInfo from '../../../components/MeFoodInfo.vue';
import FoodCard from '../../../model/FoodCard';
import FoodInfo from '../../../model/FoodInfo';
import UserInfo from '../../../model/UserInfo';
import useUserStore from '../../../store/user';
import CreateFoodInfoButton from '../../../components/CreateFoodInfoButton.vue';
import LikesCollection from '../../../model/LikesCollection';

// const cardId = ref(-1)
const foodCardInfo = reactive({
    data: {} as FoodCard | undefined
})

const cardFoods = reactive({
    item: [] as FoodInfo[] | undefined
})

const route = useRoute();
const cardFoodId = ref()

const meInfo = reactive({
    data: {} as UserInfo | undefined
})

const currentPage = ref(1)
const pages = ref(0)

const userStore = useUserStore()

const showCreateFoodDialogState = ref(false)

const likes = reactive({
    item: {} as LikesCollection | undefined
})

onMounted(() => {
    // cardId.value = parseInt(route.params.cardId[0])
    cardFoodId.value = route.params.cardId
    console.log(route.params.cardId);
    console.log("进入页面");

    meInfo.data = userStore.userInfo
    getCardInfo(cardFoodId.value)
    getCardFoods(cardFoodId.value, currentPage.value)
    shareLikesCollection(cardFoodId.value, meInfo.data!.userId).then(res => {
        likes.item = res.data
    })

})

function getCardInfo(cardFoodId: number) {
    console.log(cardFoodId);

    getShareFoodCardInfo(cardFoodId).then(res => {
        if (res.code === 0) {
            foodCardInfo.data = res.data
            console.log(foodCardInfo.data);
        }
    })

}

function updateFoodInfo(foodInfo: Object, index: number) {

    cardFoods.item!![index] = foodInfo as FoodInfo
    showCreateFoodDialogState.value = false
}

function getCardFoods(cardFoodId: number, pn: number = currentPage.value, ps: number = 8) {

    getShareCardFood(cardFoodId, pn, ps).then(res => {
        if (res.code === 0) {
            cardFoods.item = res.data?.item
            currentPage.value = res.data?.current!!
            pages.value = res.data?.pages!!
        }
    })
}

function onCreateFoodSuccess() {
    showCreateFoodDialogState.value = false
    getCardFoods(cardFoodId.value, currentPage.value)
}


</script>