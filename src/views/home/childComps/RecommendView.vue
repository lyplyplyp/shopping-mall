<template>
    <div class="recommend">
        <div v-for="item in crecommends" :key="item.recommend" class="recomend-item">
            <a :href="item.link">
                <img :src="item.image">
                <div>{{item.title}}</div> <!--图片下面的文字-->
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{ //父子组件通信，父传子,把Home文件中请求到的数据传给RecommendView
        crecommends: { //crecommends是childrecommends的缩写
            type:Array,
            default() {
                return [];
            }
        }

    }
}
</script>

<style scoped>
  .recommend {
      display: flex;
      width: 100%;
      text-align: center;
      font-size: 12px;
      padding: 10px 0 20px;
      border-bottom: 10px solid #eee;/*设置盒子底部边框*/
  }

  .recomend-item {
      flex: 1;
  }

  .recomend-item img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
  }
</style>