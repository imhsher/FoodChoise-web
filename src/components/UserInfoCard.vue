<template>

    <div class="flex justify-between content-center items-center" style="width:100%; height: 110px;">
        <div class="flex content-center items-center">
            <div style=" margin-left: 5px;">
                <v-avatar :image="attentionUserInfo.data?.headPic" size="80"></v-avatar>
            </div>

            <div style="margin-left: 20px;">
                <v-card-title style="font-size: 18px;" class="cursor-pointer">
                    {{ attentionUserInfo.data?.nickname }}
                </v-card-title>
                <v-card-text v-if="personalityTags" style="font-size: 12px; color:dimgrey;">
                    {{ personalityTags }}
                </v-card-text>
                <v-card-text v-else style="font-size: 12px; color:dimgrey;">
                    这家伙很懒，什么也没有留下。
                </v-card-text>
            </div>
        </div>

        <div>
            <UserAttentionButton :id="props.userInfo?.userId" :att-id="props.userInfo?.attId"></UserAttentionButton>
        </div>
    </div>

    <v-divider :thickness="1" class="border-opacity-100" color="info"></v-divider>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getUserPublicInfo, shareAttentionState, updateAttentionStateAndNum, } from '../api/user';
import UserInfo from '../model/UserInfo';
import UserAttentionButton from '../components/UserAttentionButton.vue'
import { onMounted } from 'vue';
import UserAttention from '../model/UserAttention';


const attentionUserInfo = reactive({
    data: {} as UserInfo | undefined
})

const personalityTags = ref()
onMounted(() => {

    console.log(props.userInfo?.attId);
    
    getUserPublicInfo(props.userInfo?.attId).then(res => {
        attentionUserInfo.data = res.data
        personalityTags.value = attentionUserInfo.data?.personalityTags
    })
 
})

const props = defineProps({
    userInfo: Object
})






</script>

<style>
    
</style>