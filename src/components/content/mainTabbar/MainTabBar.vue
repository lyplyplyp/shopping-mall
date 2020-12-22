<template>
   <!--使用tab-bar组件和tab-bar-item组件-->
    <tab-bar>
      <tab-bar-item path="/home" activeColor="red"> <!--动态设置文本颜色-->
        <!--具名插槽，标签可以动态的替换插槽并且可以继续加组件使布局均等分配-->
        <img slot="item-icon" src="@/assets/img/tabbar/首页.png">
        <img slot="item-icon-active" src="@/assets/img/tabbar/首页active.png">
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/category" activeColor="red">
        <img slot="item-icon" src="@/assets/img/tabbar/分类.png">
        <img slot="item-icon-active" src="@/assets/img/tabbar/分类active.png">
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/shoppingcart" activeColor="red">
        <img slot="item-icon" src="@/assets/img/tabbar/购物车.png">
        <img slot="item-icon-active" src="@/assets/img/tabbar/购物车active.png">
        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/my" activeColor="red">
        <img slot="item-icon" src="@/assets/img/tabbar/我的.png">
        <img slot="item-icon-active" src="@/assets/img/tabbar/我的active.png">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar> 
</template>

<script>
  import TabBar from "@/components/common/tabbar/TabBar"; //导入TabBar.vue
  import TabBarItem from "@/components/common/tabbar/TabBarItem"; //导入TabBarItem.vue

  export default {
    name:"MainTabBar",
    components: { //注册组件
        TabBar,
        TabBarItem
    }
  }
</script>

<style scoped>

</style>