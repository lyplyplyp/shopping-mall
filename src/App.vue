<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <keep-alive exclude="Detail"> <!--keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态或避免重新渲染-->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabbar/MainTabBar"; //导入MainTabBar
  

  export default {
    name: 'App',
    components:{
      MainTabBar,
    }
  }
</script>

<style>
  @import "./assets/css/base.css"; /*引入base.css，在<style>中引入需要加@*/
</style>
