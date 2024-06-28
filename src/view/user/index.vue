<template>
    <div>
        <!-- 个人中心模块 -->
        <v-card elevation="0" class="pl-4 pr-4 pb-5 pt-2">

            <v-card-text>
                <div class="flex items-center">
                    <!-- 头像 -->
                    <v-avatar size="100">
                        <v-img v-if="userInfo.data?.headPic" :src="userInfo.data?.headPic" alt="John"></v-img>
                        <img v-else src="../../assets/index/index_cooking_pot.svg" alt="">
                    </v-avatar>

                    <!-- 个人信息 -->
                    <div class=" ml-4 space-y-1">
                        <div class=" text-3xl font-bold">{{ userInfo.data?.nickname }}</div>
                        <div style="color: #808080 ;"> {{ userInfo.data?.name }}</div>
                        <div @click="dialog = true" class="flex cursor-pointer" style="min-width: 200px;">
                            <div style="color: #808080 ; font-size: 11px;" v-if="userInfo.data?.personalityTags">{{
                            userInfo.data?.personalityTags }}</div>
                            <div style="color: #808080 ; font-size: 11px;" v-else>这家伙很懒，什么也没有留下</div>
                            <img class="ml-1" src="../../assets/修改.svg" alt="">
                        </div>
                        <!-- <div class=" text-xs font-bold">关注：<span style="color: #E53935;">2001</span></div> -->
                    </div>

                </div>

                <div class="flex w-max mt-5">
                    <v-btn v-if="userInfo?.data?.schoolId" rounded="xl" size="small" color="primary" elevation="0"
                        prepend-icon="mdi-school">
                        <div class=" text-white">{{ userInfo?.data?.schoolInfo?.name }}</div>
                    </v-btn>
                </div>

                <div class="mt-5 flex space-x-5">
                    <v-btn @click="goToInfo" variant="outlined" rounded="lg" size="small">
                        编辑个人资料
                    </v-btn>

                    <v-btn variant="outlined" rounded="lg" color="primary" size="small">
                        分享
                    </v-btn>
                </div>
            </v-card-text>


        </v-card>
        <!-- 分割线 -->
        <v-divider class="border-opacity-100"></v-divider>


        <!-- 个人创建的食物卡片展示部分 -->
        <div class="grid grid-cols-4 gap-4 pt-5">

            <v-skeleton-loader v-if="listLoading" class=" border" type="card-avatar, actions"></v-skeleton-loader>

            <template v-else>
                <template v-for="(item, index) in foodCards.item" :key="item.cardId">


                    <MeFoodCard :food-card-info="item">

                    </MeFoodCard>

                </template>
            </template>

        </div>

        <div class="text-center mt-5" v-if="pages > 0">
            <v-pagination v-model="currentPage" :length="pages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"
                @update:model-value="getUserFoodCard"></v-pagination>
        </div>

        <CreateFoodCardButton v-if="meInfo?.data?.userId == parseInt(userId)" :open="showCreateCardDialogState"
            @oncancel="showCreateCardDialogState = false" @oncreatesuccess="onCreateFoodSuccess"></CreateFoodCardButton>



    </div>
    <!-- 修改个性标签的弹框 -->
    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="600" min-width="400" title="修改个性标签">
            <v-text-field v-model="tage" class="mx-4 my-5" label="长度不能大于18位" :rules="Turules"></v-text-field>
            <template v-slot:actions>
                <v-btn class="ms-auto" text="确认修改" @click="uptags"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import UserInfo from '../../model/UserInfo';
import { reactive, ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { getUserInfo, getUserPublicInfo, upPersonalityTags } from '../../api/user'
import { getUserFoodCards } from "../../api/foodCard";
import MeFoodCard from '../../components/MeFoodCard.vue';
import CreateFoodCardButton from '../../components/CreateFoodCardButton.vue';
import FoodCard from '../../model/FoodCard';
import useUserStore from '../../store/user';
import router from '../../router';
import { toValue } from 'vue';

const showCreateCardDialogState = ref(false)
const userStore = useUserStore()
const listLoading = ref(false)
const dialog = ref(false)
const tage = ref()
const Turules = [
    (value: any) => {
        if (value.length <= 18) {
            return true
        }
        return '输入长度不能大于18位'
    }
]
const meInfo = reactive({
    data: {} as UserInfo | undefined
})
const userInfo = reactive({
    data: {} as UserInfo | undefined
})

const userId = ref("")
const foodCards = reactive({
    item: [] as FoodCard[] | undefined
})

const route = useRoute();

const currentPage = ref(1)
const pages = ref(0)

onMounted(() => {
    userId.value = route.params.userId[0]
    getMeData()
    getUserData()
    getUserFoodCard()
})


function getUserData() {

    getUserPublicInfo(userId.value).then(res => {
        if (res.code === 0) {
            userInfo.data = res.data
            document.title = userInfo?.data?.nickname + "的食选空间"
        }
    })

}
function getMeData() {
    meInfo.data = userStore.userInfo
}

function getUserFoodCard(pn: number = 1) {
    listLoading.value = true
    getUserFoodCards(userId.value, pn, 8).then(res => {
        foodCards.item = res.data?.item
        pages.value = res.data?.pages!!
        currentPage.value = res.data?.current!!
        listLoading.value = false
    })
}

function onCreateFoodSuccess() {
    // console.log("xxxxxx");

    showCreateCardDialogState.value = false
    getUserFoodCard()
}

function goToInfo() {
    router.push("/upUserInfo/")
}
// 修改个性标标签
function uptags() {
    if (Turules[0](tage.value)) {
        upPersonalityTags(tage.value, meInfo.data!.userId).then(res => {
            dialog.value = false
        })
    } else if (tage.value == '') {
        dialog.value = false
    }

}
</script>