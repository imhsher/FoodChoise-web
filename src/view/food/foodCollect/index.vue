<template>
    <div style="font-size: 35px; margin-top: 10px; margin-left: 5px;">我的收藏</div>
    <div class="grid grid-cols-4 gap-4 pt-5 grid-row: 2">



        <template v-for="(item, index) in shareCollectionFoodCardList.item" :key="item.collectionId">
            <UserCollectionFood :food-card-info="item"></UserCollectionFood>
        </template>


    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import UserCollectionFood from '../../../components/UserCollectionFood.vue';
import FoodCard from '../../../model/FoodCard';
import UserInfo from '../../../model/UserInfo';
import { getAllCollection, getRecentlyShareCard, getUserFoodCards } from "../../../api/foodCard";
import UserCollection from '../../../model/UserCollection';
import { getUserPublicInfo } from '../../../api/user';


var shareCollectionFoodCardList = reactive({
    item: [] as UserCollection[] | undefined
})


onMounted(() => {
    getAllCollection()
    
})

getAllCollection().then(res => {
    shareCollectionFoodCardList.item = res.item
    console.log(shareCollectionFoodCardList.item);
})



</script>