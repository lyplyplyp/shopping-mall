<template>
  <div>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="@/assets/img/common/back.svg">
        </div>
        <div slot="center" class="title">
            <div v-for="(item,index) in titles" :key="item.detailnavbar" 
            class="title-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
            {{item}}
            </div>
        </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar"

  export default {
    name:"DetailNavBar",
    components: {
        NavBar
    },
    data() {
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0 //默认选中第一个title
        }
    },
    methods: {
      itemClick(index) { //title的点击事件
          this.currentIndex = index;
          this.$emit('titleClick',index) //监听title事件点击并把事件发送出去
      },
      backClick() { //返回的点击事件
          this.$router.back()  //指跳转到当前路径的上一个路径，即home页面
      }
  }
  }
</script>

<style scoped>
  .title {
      display: flex;
      font-size: 13px;
  }
  .title-item {
      flex: 1;
  }
  .active {
      color: var(--color-high-text);
  }
  .back img {
      margin-top: 11px;
  }
</style>
