<template>
    <!-- 展示个人食物卡片内容 -->
    <div class=" relative">
        <v-img :src="foodCardInfo?.data?.cover ?? 'https://dummyimage.com/1920x1080'" cover height="250"
            style="width:100%"></v-img>
    </div>

    <div>
        <div class="flex space-x-2 shadow justify-between" style="width: 100%; height: 60px; align-items: center;">

            <div class="flex">
                <div class="flex mr-3 ml-3 cursor-pointer">
                    <v-icon icon="mdi-account" color="primary" class="mr-2"></v-icon>
                    <div class=" text-primary">{{ meInfo.data?.nickname }}</div>
                </div>



                <!-- 点赞功能 -->
                <div class="flex mr-1 cursor-pointer" @click="cliLikes()">
                    <v-icon icon="mdi-heart" :color="likesColor" class="mr-2"></v-icon>
                    <div class=" text-grey">{{ likesnum }}</div>
                </div>


                <!-- 收藏功能 -->
                <div class="flex mr-1 cursor-pointer" @click="collection()">
                    <v-icon icon="mdi-star" size="25" :color="collectionColor" class="mr-2 "></v-icon>
                    <div class=" text-grey hover:text-red-600">{{ collnum }}</div>
                </div>
            </div>

            <UserAttentionButton v-if="userId && attUserId" :id="userId" :att-id="attUserId"></UserAttentionButton>

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

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { getShareFoodCardInfo, getShareCardFood, addCollectionCard, getCollectionCard, updateState, shareLikesCollection, updateCollection, updateLikesState, updateLikes } from "../../../api/foodCard"
import { useRoute } from 'vue-router';
import MeFoodInfo from '../../../components/MeFoodInfo.vue';
import UserAttentionButton from '../../../components/UserAttentionButton.vue';
import FoodCard from '../../../model/FoodCard';
import FoodInfo from '../../../model/FoodInfo';
import UserInfo from '../../../model/UserInfo';
import useUserStore from '../../../store/user';
import CreateFoodInfoButton from '../../../components/CreateFoodInfoButton.vue';
import UserCollection from '../../../model/UserCollection';
import LikesCollection from '../../../model/LikesCollection';

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


const attUserId = ref()
const currentPage = ref(1)
const pages = ref(0)

const userStore = useUserStore()

const showCreateFoodDialogState = ref(false)

onMounted(() => {
    cardFoodId.value = route.params.cardId
    meInfo.data = userStore.userInfo
    getCardInfo(cardFoodId.value)
    getCardFoods(cardFoodId.value, currentPage.value)
    userId.value = userStore.userInfo?.userId
    console.log("cuncu"+ userId.value);
    

    // 获得收藏信息
    shareCollectionCard()
    // 获得点赞量和收藏量
    getLikesCollection()

})

function getCardInfo(cardFoodId: number) {
    console.log(cardFoodId);

    getShareFoodCardInfo(cardFoodId).then(res => {
        if (res.code === 0) {
            foodCardInfo.data = res.data
            attUserId.value = res.data?.userInfo?.userId
            // console.log(foodCardInfo.data);
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



const userId = ref()
const collectionInfo = reactive({
    data: {} as UserCollection | undefined
})
// 是否收藏状态
const getCollectionInfo = ref()
//收藏状态0\1
const collectionStatr = ref()

// 点赞和收藏量
const likesCollection = reactive({
    data: {} as LikesCollection
})
const collnum = ref()
const likesnum = ref()
//获得点赞状态
const likesState = ref()
// 获得点赞和收藏量
function getLikesCollection() {

    shareLikesCollection(cardFoodId.value, userId.value).then(res => {

        likesCollection.data = res.data!
        collnum.value = res.data?.collection
        likesnum.value = res.data?.likes
        likesState.value = res.data?.likesState

        // 初始化点赞颜色
        if (likesState.value == 0) {
            likesColor.value = "grey"
        } else if (likesState.value == 1) {
            likesColor.value = "red"
        }
    })
}

//修改收藏量
function addCollection(cardFoodId: number, userId: number, collnum: number) {
    updateCollection(cardFoodId, userId, collnum).catch(res => {
        console.log(res);

    })
}

function addLikes(cardFoodId: number, userId: number, likesnum: number) {
    updateLikes(cardFoodId, userId, likesnum).catch(res => {
        console.log(res);

    })
}


// 获取收藏信息
function shareCollectionCard() {

    getCollectionCard(cardFoodId.value, userId.value).then(res => {
        //请求是否成功
        if (res.code === 0) {
            collectionInfo.data = res.data
            collectionStatr.value = res.data?.collectionState

            if (collectionStatr.value != undefined || "") {
                console.log("cardFoodId" + cardFoodId.value);
                console.log("userId" + userId.value);
                console.log("收藏状态" + collectionStatr.value);
                console.log("详细信息" + collectionInfo.data);
                //能够获得信息
                getCollectionInfo.value = true

                // 初始化颜色
                if (collectionStatr.value == 0) {
                    collectionColor.value = "grey"
                } else if (collectionStatr.value == 1) {
                    collectionColor.value = "yellow"
                }


            } else {
                //不能获得信息
                getCollectionInfo.value = false
                collectionColor.value = "grey"
            }
        }
    })

}

// 定义修改的icon颜色
const collectionColor = ref("grey")
const likesColor = ref("grey")
const collectionCard = reactive({
    cardId: foodCardInfo.data!.cardId,
    userId: meInfo.data!.userId,
    title: foodCardInfo.data!.title,
    description: foodCardInfo.data!.description,
    cover: foodCardInfo.data!.cover!,
})


// 收藏功能实现
function collection() {

    // 判断是否收藏
    //状态为0
    if (getCollectionInfo.value == true) {
        // 已经收藏
        console.log("已经收藏" + getCollectionInfo.value);


        if (collectionStatr.value == 0) {
            // 重新修改展示状态为收藏状态

            console.log("收藏状态为" + collectionStatr.value);
            //取消收藏功能

            const state = 1
            console.log("修改状态接口" + cardFoodId.value + userId.value + state);
            updateState(cardFoodId.value, userId.value, state).then(res => {


                if (res.code == 0) {
                    console.log("修改成功");
                    collectionColor.value = "yellow"
                    collectionStatr.value = 1
                    collnum.value++
                    addCollection(cardFoodId.value, userId.value, collnum.value)
                }
            })

            // collectionColor.value = "yellow"
        } else if (collectionStatr.value == 1) {
            // 重新修改展示状态为取消收藏状态
            console.log("状态为0");
            const state = 0
            console.log("修改状态接口" + cardFoodId.value + userId.value + state);
            updateState(cardFoodId.value, userId.value, state).then(res => {
                if (res.code == 0) {
                    console.log("修改成功");
                    collectionColor.value = "grey"
                    collectionStatr.value = 0
                    collnum.value--
                    addCollection(cardFoodId.value, userId.value, collnum.value)
                }

            })

        }
    } else {
        console.log("未收藏" + getCollectionInfo.value);
        // 未收藏
        console.log("未收藏");
        // 给collectionCard进行赋值
        collectionCard.cardId = foodCardInfo.data!.cardId
        collectionCard.userId = meInfo.data!.userId
        collectionCard.title = foodCardInfo.data!.title
        collectionCard.description = foodCardInfo.data!.description
        collectionCard.cover = foodCardInfo.data!.cover!

        addCollectionCard(collectionCard).then(res => {
            // 收藏成功
            if (res.code == 0) {
                collectionColor.value = "yellow"
                collnum.value++
                addCollection(cardFoodId.value, userId.value, collnum.value)
            }

        })

    }
}


function cliLikes() {
    // 判断是否点赞
    //状态为0
    if (likesState.value == 0) {
        // 点赞
        // 修改点赞状态为1
        likesState.value = 1
        updateLikesState(cardFoodId.value, userId.value, likesState.value).then(res => {
            if (res.code == 0) {
                likesColor.value = "red"
                likesnum.value++
                // 增加点赞量
                addLikes(cardFoodId.value, userId.value, likesnum.value)
            }
        })
    } else {
        //取消点赞
        // 修改点赞状态为0
        likesState.value = 0
        updateLikesState(cardFoodId.value, userId.value, likesState.value).then(res => {
            if (res.code == 0) {
                likesColor.value = "grey"
                likesnum.value--
                // 减少点赞量
                addLikes(cardFoodId.value, userId.value, likesnum.value)
            }
        })
    }
}


</script>