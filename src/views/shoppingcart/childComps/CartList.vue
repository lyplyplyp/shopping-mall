<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">
          <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
      </scroll>
  </div>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll"

  import CartListItem from "./CartListItem"

  import { mapGetters } from 'vuex'

  export default {
    name:"CartList",
    components:{
        Scroll,
        CartListItem
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart-list {
       height: calc(100% - 44px - 49px - 40px); /* 商品列表所占的高度 */
  }
  .content {
      height: 100%; /* 继承父亲的高度 */
      overflow: hidden;
  }
</style>
