<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" @load="imageLoad"> <!--监听图片是否加载完-->
      <div class="goods-info">
          <p>{{goodsItem.title}}</p> <!--图片下面的文字描述-->
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span> <!--收藏人数-->
      </div>
  </div>
</template>

<script>
  export default {
    name:"GoodsListItem",
    props: {
        goodsItem: {
            type:Object,
            default() {
                return {}
            }
        }
    },
     computed: {
      showImage() { //this.goodsItem.show.img获取的是首页中的图片，this.goodsItem.image获取的是推荐页面中的图片
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() { //通过事件总线发送图片加载完的事件
        //详情页中的图片加载完之后home页面中不需要监听，只需要在详情页中监听就行
        if (this.$route.path.indexOf('/home')) {
          this.$bus.$emit('homeItemImageLoad')
        } else if (this.$route.path.indexOf('/detail')) {
          this.$bus.$emit('detailItemImageLoad')
        }
      },
      itemClick() { //图片的点击事件，跳转到详情页
        //设置路由的跳转并且可以点击返回；iid是商品item的id
        this.$router.push('/detail/' + this.goodsItem.iid) 
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
