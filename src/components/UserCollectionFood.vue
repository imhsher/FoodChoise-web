<template>
    <v-card class=" relative rounded-lg p-1 " :href="'/sharePublicCard/card' + foodCardInfo?.cardId">
            <v-img cover class="rounded-lg" :src="props.foodCardInfo?.cover" height="130"></v-img>

            <v-card-text>
                <div class=" font-semibold text-lg overflow-hidden line-clamp-1">{{ props.foodCardInfo?.title }}</div>
                <div class=" text-xs overflow-hidden two-line-text ">{{ props.foodCardInfo?.description }}</div>
                <div class="mt-2 flex items-center">
                    <div>
                        <div class="flex items-center">
                            <span class=" font-semibold text-[11px] text-gray-400">{{ meInfo.data?.nickname }}</span>
                        </div>
                    </div>
                </div>
            </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import UserInfo from '../model/UserInfo';
import { getUserPublicInfo } from '../api/user';


const props = defineProps({
    //子组件接收父组件传递过来的值
    foodCardInfo: Object,
});

const userId = props.foodCardInfo?.userId
const meInfo = reactive({
    data: {} as UserInfo | undefined
})

getUserPublicInfo(userId).then(res => {
    meInfo.data = res.data
})

</script>

<style>
.two-line-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 设置默认高度为两行的高度 */
    height: 32px;

}
</style>