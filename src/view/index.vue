<template>
    <div class="flex">
        <div class="basis-11/12  pl-5 pr-5 space-y-6">
            <div class=" relative overflow-hidden rounded-md" style="width: 100%; ">
                <v-carousel style="width: 100%; height: 300px;" cycle show-arrows="hover">

                    <v-carousel-item src="https://s2.loli.net/2023/11/27/loxb7uZL4dHTqFn.png" cover></v-carousel-item>

                    <v-carousel-item src="https://s2.loli.net/2023/11/27/loxb7uZL4dHTqFn.png" cover></v-carousel-item>

                    <v-carousel-item src="https://s2.loli.net/2023/11/27/loxb7uZL4dHTqFn.png" cover></v-carousel-item>

                </v-carousel>



            </div>

            <!-- 最新分享模块 -->
            <div class="flex justify-between">
                <div class=" font-semibold  ">
                    最新分享
                </div>
                <v-btn variant="plain" @click="shareFood">
                    更多
                </v-btn>
            </div>
            <!-- 最新分享展示的信息 -->
            <div class="grid grid-cols-3 gap-4">

                <recently-share-food-card v-for="(item, index) in shareFoodCardList.item" :food-card-info="item"
                    :key="index">
                </recently-share-food-card>

            </div>
        </div>


        <div class="basis-3/12 w-60 space-y-4 ">
            <!-- 推荐关注 -->
            <div class="  flex justify-between items-center">
                <div class="font-semibold">
                    推荐关注
                </div>

                <v-btn class="font-semibold text-xs" color="primary" variant="text" @click="shareFood">
                    更多
                </v-btn>

            </div>

            <v-card class=" rounded-lg p-1">

                <div class=" relative ">
                    <v-img cover class="rounded-lg" src="https://s2.loli.net/2023/11/26/dFR5BtieEOaKLnZ.png"
                        height="110"></v-img>
                    <v-avatar class=" absolute " style="bottom: -21px; left: calc(50% - 21px);" size="42"
                        color="surface-variant" :image="shareAttentionCardInfo.item?.[0]?.userInfo?.headPic"></v-avatar>
                </div>


                <v-card-text>
                    <div class=" mt-1 flex items-center justify-between  ">
                        <div>
                            <div class=" font-semibold text-lg" style="font-size: 14px;">{{ shareAttentionCardInfo.item?.[0]?.userInfo?.nickname
                                }}</div>
                        </div>
                        <v-btn color="primary" density="default" rounded="xl" size="small" style="width: 5em;" @click="isAttention">{{
                    attention
                }}</v-btn>
                    </div>
                    <div style="height: 0.2px;width: 100%;" class="bg-slate-200 mt-2 mb-2"></div>
                    <div v-if="shareAttentionCardInfo.item?.[0]?.userInfo?.personalityTags"
                        class=" text-xs truncate max-h-6">{{ shareAttentionCardInfo.item?.[0]?.userInfo?.personalityTags
                        }} </div>
                    <div v-else class=" w-full text-xs truncate max-h-6">这家伙很懒什么也没有留下 </div>


                </v-card-text>


            </v-card>

            <!-- 分享热榜 -->
            <div class="  flex justify-between items-center">
                <div class="font-semibold">
                    分享热榜
                </div>

                <v-btn class="font-semibold text-xs" color="primary" variant="text" @click="shareFood">
                    更多
                </v-btn>

            </div>

            <share-heat-food-card v-for="(item, index) in shareHeatFoodList.item" :key="item.cardId"
                :food-card-info="item"></share-heat-food-card>


        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import RecentlyShareFoodCard from '../components/RecentlyShareFoodCard.vue';
import ShareHeatFoodCard from '../components/ShareHeartFoodCard.vue'
import { onMounted } from 'vue'
import request from "../utils/request"
import PageResult from '../model/PageResult';
import FoodCard from '../model/FoodCard';
import { ref } from 'vue';
import { getRecentlyShareCard } from '../api/foodCard';
import ShareFoodInfo from '../components/ShareFoodInfo.vue';
import useUserStore from '../store/user';
import UserInfo from '../model/UserInfo';
import { shareIsAttention, addAttUser, delAttUser } from '../api/user';
import router from '../router';

const attention = ref()
const pn = 1
const ps = 6
const psHeat = 2
const psAtt = 1
const meInfo = reactive({
    data: {} as UserInfo | undefined
})
const userStore = useUserStore()

var shareFoodCardList = reactive({
    item: [] as FoodCard[] | undefined
})
var shareHeatFoodList = reactive({
    item: [] as FoodCard[] | undefined
})

var shareAttentionCardInfo = reactive({
    item: [] as FoodCard[] | undefined
})

const attUserId = ref()
const userId = ref()
onMounted(() => {
    meInfo.data = userStore.userInfo
    userId.value = userStore.userInfo?.userId
    getRecentlyShareCard(pn, ps)
    getHeatShareCard(pn, psHeat)
    getAttentionCardInfo(pn, psAtt)

})

getRecentlyShareCard(pn, ps).then(res => {
    console.log(res);
    if (res.code == 0) {
        shareFoodCardList.item = res?.data?.item
    }
})

function getHeatShareCard(pn: any, psHeat: any) {
    getRecentlyShareCard(pn, psHeat).then(res => {
        console.log(res);
        if (res.code == 0) {
            shareHeatFoodList.item = res?.data?.item
        }
    })
}

function getAttentionCardInfo(pn: any, psAtt: any) {

    getRecentlyShareCard(pn, psAtt).then(res => {
        if (res.code == 0) {
            shareAttentionCardInfo.item = res?.data?.item
            attUserId.value = res?.data?.item[0].userInfo?.userId
          
            // 查询是否关注
            shareIsAttention(userId.value, attUserId.value).then(res => {
                if (res.data) {
                    attention.value = "已关注"
                } else {
                    attention.value = "关注"
                }
            })
        }
    })
}

function isAttention() {
    if(attention.value == "关注"){
        console.log(userId.value);
        console.log(attUserId.value);
        
        
        //添加到关注
        addAttUser(userId.value, attUserId.value).then(res => {
            console.log(res.data);
            
            attention.value = "已关注"
        })

    } else {
        // 取消关注
        delAttUser(userId.value, attUserId.value).then(res => {
            console.log(userId.value);
        console.log(attUserId.value);
            console.log(res.data);
            
            attention.value = "关注"
        })
    }

}

function shareFood(){
    router.push('/shareFoodInfo')
}

</script>
