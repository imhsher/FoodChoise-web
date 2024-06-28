<template>
    <v-card class=" relative rounded-lg p-1 " :href="'/sharePublicCard/card' + foodCardInfo?.cardId">
            <v-img cover class="rounded-lg" :src="foodCardInfo?.cover" height="130"></v-img>

        
            <v-card-text>
                <div class=" font-semibold text-lg overflow-hidden line-clamp-1">{{ foodCardInfo?.title }}</div>
                <div class=" text-xs overflow-hidden two-line-text ">{{ foodCardInfo?.description }}</div>
                <div class="mt-2 flex items-center">
                    <div>
                        <div class="flex items-center">
                            <span class=" font-semibold text-[11px] text-gray-400">{{props.foodCardInfo?.userInfo.nickname}}</span>
                        </div>
                    </div>
                </div>
            </v-card-text>



    </v-card>
</template>

<script setup lang="ts">

const props = defineProps({
    //子组件接收父组件传递过来的值
    //来自view/index的数据
    foodCardInfo: Object,
});

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