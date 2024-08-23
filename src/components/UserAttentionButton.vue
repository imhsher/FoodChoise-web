<template>
    <div @click="cancelAttention()" class="mr-5 flex rounded cursor-pointer enterColor"
        style="background-color: #e5e9ef;  width: 5em;" :class="{attentionColor : isadd}">
        <div style="margin: 0 auto; font-size: 14px;">
            {{ attention }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, defineProps } from 'vue';
import { getUserPublicInfo, updatePubAttInfo, shareAttentionState, updateAttentionStateAndNum, addPriAttUserInfo, shareIsAttention, addAttUser, delAttUser } from '../api/user';
import UserInfo from '../model/UserInfo';
import UserInfoAttention from '../model/UserInfoAttention';

onMounted(() => {
    
    
})
const isadd = ref(false)
const props = defineProps<({
    id: number,
    attId: number
})>()


shareIsAtt(props.id, props.attId)





const attention = ref()


function shareIsAtt(id: number, attUserId: number) {
    
    shareIsAttention(id, attUserId).then(res => {
        if (res.data) {
            attention.value = "已关注"
            isadd.value = !isadd.value
        } else {
            attention.value = "关注"
        }
    })

}

function cancelAttention() {
    // 2.没有关注
    if (attention.value == "关注") {
        // 加入关注
        addAttUser(props.id, props.attId).then(() =>{
            attention.value = "已关注"
            isadd.value = !isadd.value
        })
       
        
    } else if(attention.value == "已关注") {
        // 取消关注
        delAttUser(props.id, props.attId).then(()=>{
            attention.value = "关注"
            isadd.value = false
        })
    }

}

</script>

<style>
.enterColor {
    color: #6d757a;
}

.enterColor:hover {
    color: #145ab6;
}

.attentionColor{
    color: #145ab6;
}
</style>