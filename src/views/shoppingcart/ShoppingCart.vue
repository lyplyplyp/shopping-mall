<template>
    <div class="cart">
        <!--导航-->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>

        <!--商品列表-->
        <cart-list/>

        <!--底部汇总-->
        <cart-bottom-bar/>
    </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar"

  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"

  import { mapGetters } from 'vuex' //从vuex中导入辅助函数mapGetters
  
  export default {
    name:"ShoppingCart",
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        //方法1：直接计算商品数量
        /* cartLength() {
            return this.$store.getters.cartLength
        } */

        //方法2：使用对象展开运算符将getters混入computed对象中(mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性)
        ...mapGetters(['cartLength'])
    },
  }
</script>

<style scoped>
  .nav-bar {
      background-color: var(--color-tint);
      color: #fff;
  }
  .cart {
      height: 100vh;
  }
</style>