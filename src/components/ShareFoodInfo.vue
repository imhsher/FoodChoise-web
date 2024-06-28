<template>
    <v-card class=" relative rounded-lg p-1 ">
        <v-img cover class="rounded-lg" :src="foodInfo?.cover" height="130"></v-img>

      


        <v-card-text>
            <div class=" font-semibold text-lg overflow-hidden line-clamp-1">{{foodInfo?.name}}</div>
            <div class=" text-xs overflow-hidden two-line-text ">{{foodInfo?.description}}</div>
            <div style="font-size: 14px; color: #808080;">￥<span>{{ foodInfo?.price }}</span></div>
            <div class="mt-2 flex items-center">
                

                <div class="grow "></div>

                <v-btn class="" size="small" color="primary" elevation="0">
                    编辑
                </v-btn>
            </div>
        </v-card-text>



    </v-card>
</template>

<script setup lang="ts">


const props = defineProps({
    //子组件接收父组件传递过来的值
    foodInfo: Object,
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