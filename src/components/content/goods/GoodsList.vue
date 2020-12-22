<template>
  <div class="goods">
      <goods-list-item v-for="item in cgoods" :key="item.goodslist" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem"

  export default {
    name:"GoodsList",
    components: {
        GoodsListItem
    },
    props: {
        cgoods: {
            type:Array,
            default() {
                return []
            }
        }
    }
}
</script>
  
<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap; /*换行*/
    justify-content: space-around; /*水平对齐，space-around相当于给每个盒子加了左右margin*/
    padding: 2px;
  }
</style>
