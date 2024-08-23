<template>
    <v-card class=" rounded-lg p-1">

        <div class=" relative ">
            <v-img cover class="rounded-lg" src="https://s2.loli.net/2023/11/26/dFR5BtieEOaKLnZ.png"
                height="110"></v-img>
            <!-- <v-avatar class=" absolute " style="bottom: -21px; left: calc(50% - 21px);" size="42"
                color="surface-variant" :image="shareAttentionCardInfo.item?.[0]?.userInfo?.headPic"></v-avatar> -->
        </div>


        <v-card-text>
            <div class=" mt-1 flex items-center justify-between">
                <div>
                    <div class=" font-semibold text-lg">{{ nowAttUserInfo.data?.nickname }}</div>
                </div>
                <v-btn width="5em" color="primary" rounded="xl" elevation="0" size="small"
                    @click="getAttentionState()">{{ attention
                    }}</v-btn>
            </div>
            <div style="height: 0.2px;width: 100%;" class="bg-slate-200 mt-2 mb-2"></div>
            <div v-if="nowAttUserInfo.data?.personalityTags" class=" text-xs truncate max-h-7">
                {{ nowAttUserInfo.data?.personalityTags }}</div>
            <div v-else class=" text-xs truncate max-h-7">这家伙很懒，什么也没有留下。</div>


        </v-card-text>


    </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { shareIsAttention, getUserPublicInfo, shareAttentionState, updatePubAttInfo, updateAttentionStateAndNum, addPriAttUserInfo } from '../api/user';
import { reactive } from 'vue';
import UserInfoAttention from '../model/UserInfoAttention';
import UserInfo from '../model/UserInfo';
import useUserStore from '../store/user';

onMounted(() => {
    shareNow()
    userId.value = nowAttentionInfo.data?.userId



})


const nowAttentionInfo = reactive({
    data: {} as UserInfoAttention | undefined
})

const nowAttUserInfo = reactive({
    data: {} as UserInfo | undefined
})

const attention = ref()
const userId = ref()
const attentionState = ref()
const attentionNum = ref()
console.log(attentionNum.value);
function shareNow() {
    const id = ref()
    shareNowAttention().then((res: { data: { userId: number; attentionNum: number; attentionState: number; } | undefined; }) => {
        nowAttentionInfo.data = res.data
        console.log(nowAttentionInfo.data);
        userId.value = res.data?.userId
        id.value = res.data?.userId
        attentionState.value = nowAttentionInfo.data?.attentionState
        attentionNum.value = res.data?.attentionNum
        console.log(id.value);

        if (nowAttentionInfo.data?.attentionState == 0) {
            attention.value = "关注"
        }
        getUserPublicInfo(id.value).then(res => {
            nowAttUserInfo.data = res.data
        })

    })




}


function getAttentionState() {
    // 1.首先判断是否收藏状态（是否收藏）
    // 2.没有收藏
    if (attentionState.value == 0) {
        //2.1修改公共的收藏状态为1
        // 已经拿到userId
        // console.log("qqq"+userId.value);
        attentionState.value = 1
        attentionNum.value++
        attention.value = "已关注"
        console.log(attentionNum.value);
        
        updatePubAttInfo(userId.value, attentionNum.value, attentionState.value)
        // 2.2然后判断私有的是否存在这条记录
        // 查找是否存在这条记录
        shareAttentionState(userId.value).then(res => {
            // 2.2.1存在修改私有的状态为1
            // 2.2.2没有向私有记录添加这一条记录并修改状态为1
            if (res.data) {
                //存在
                // 修改私有的关注量和状态            
                updateAttentionStateAndNum(userId.value, attentionState.value, attentionNum.value)
            } else {
                //不存在
                //添加这条记录
                // 添加关注量和状态
                addPriAttUserInfo(userId.value, attentionState.value)
            }

        })
    } else {
        // 3.收藏
        attentionState.value = 0
        attentionNum.value--
        console.log(attentionNum.value);
        attention.value = "关注"
        // 3.1修改公共的收藏状态为0和关注量
        updatePubAttInfo(userId.value, attentionNum.value, attentionState.value)
        // 3.2修改私有的收藏状态为0和关注量
        updateAttentionStateAndNum(userId.value, attentionState.value, attentionNum.value)
    }



}
</script>