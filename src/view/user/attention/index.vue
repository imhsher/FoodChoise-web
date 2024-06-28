<template>
    <div style="font-size: 35px; margin: 15px 0 20px 5px">我的关注</div>

    <v-divider :thickness="2" color="success" class="border-opacity-75"></v-divider>

    <template v-for="(item, index) in attentionUserInfo.item">
        <UserInfoCard v-if="item" :user-info="item" class="justify-self-auto"></UserInfoCard>
    </template>

    

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import UserInfoCard from '../../../components/UserInfoCard.vue';
import { shareAllAttUserInfo, shareAttentionState, shareAttentionUser } from '../../../api/user';
import { reactive} from 'vue';
import UserAttention from '../../../model/UserAttention';
import useUserStore from '../../../store/user';
import UserInfoAttention from '../../../model/UserInfoAttention';
const attentionUserInfo = reactive({
    item : [] as UserInfoAttention[] | undefined
})
const userStore = useUserStore()
onMounted(() => {
    const userId = userStore.userInfo!.userId
    shareAllAttUserInfo(userId).then(res => {
        attentionUserInfo.item = res.item  
        
    })
})


</script>