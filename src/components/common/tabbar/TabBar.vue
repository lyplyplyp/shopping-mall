<template>
    <div id="tab-bar">
      <slot></slot>
    </div>  
</template>

<script>
  export default {
    name:"TabBar"
}
</script>

<style scoped>
  #tab-bar {
    display: flex; /*在父级盒子中添加伸缩布局模式*/
    background-color: #f6f6f6;
    position: fixed; /*固定定位*/
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 2px rgb(100, 100, 100,0.2); /*垂直阴影为-1px设置的是盒子上方的阴影*/
    z-index: 9;
  }

 
</style>