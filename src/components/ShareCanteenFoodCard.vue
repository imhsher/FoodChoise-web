<template>
    <v-card class=" relative rounded-lg  " :href="'/canteenfoodCard/window'+ props.foodCardInfo!.windowId">
            <v-img cover class="rounded-lg" :src="foodCardInfo?.picture" height="130"></v-img>

            <v-card-text style="background-color: #f5f5f5;">
                <div class=" font-semibold text-lg overflow-hidden line-clamp-1">{{ props.foodCardInfo?.name }}</div>
                <div class=" text-mg overflow-hidden line-clamp-1">第{{props.foodCardInfo?.windowLocation}}号窗口</div>
            </v-card-text>

    </v-card>
</template>

<script setup lang="ts">

const props = defineProps({
    //子组件接收父组件传递过来的值
    foodCardInfo: Object,
});
console.log(props.foodCardInfo);



</script>
