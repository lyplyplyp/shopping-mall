<template>
  <div id="detail">
     <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
     <!--:probe-type="3"前面不加冒号相当于传的是一个字符串而不是变量-->
     <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
       <detail-swiper :ctop-images="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop"/>
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
       <detail-param-info :param-info="paramInfo" ref="params"/>
       <detail-comment-info :comment-info="commentInfo" ref="comment"/>
       <goods-list :cgoods="recommends" ref="recommend"/>
     </scroll>
     <detail-bottom-bar @addToCart="addToCart"/>
     <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo" 
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "@/components/common/scroll/Scroll"
  import GoodsList from "@/components/content/goods/GoodsList"
  import BackTop from "@/components/content/backtop/BackTop"

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail"
  import {debounce} from "@/assets/img/common/utils"
  
  export default {
    name:"Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop
    },
    data() {
      return {
          iid:null,
          topImages:[], //轮播图
          goods:{},  //商品信息
          shop:{},  //商家信息
          detailInfo:{}, //商品详细信息
          paramInfo:{}, //商品参数
          commentInfo:{}, //评论 
          recommends:[], //推荐
          themeTopY:[], //title对应滚动的Y值
          getThemeTopY:null,
          currentIndex:0,
          isShowBackTop:false
      }
    },
    created() {
      //1、保存传入的iid
      this.iid = this.$route.params.iid //this.$route就是获取当前活跃状态的路由，params是参数的意思

      //2、根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //console.log(res);
        //(1)获取数据
        const data = res.result;
        //(2)获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        //(3)获取商品信息
        this.goods= new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //(4)获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //(5)获取商品详细信息
        this.detailInfo = data.detailInfo

        //(6)获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //(7)获取评论信息
        if (data.rate.cRate !== 0) { //有评论信息才会执行以下代码去获取
          this.commentInfo = data.rate.list[0]
        } 
      }) 

      //3、请求推荐数据
      getRecommend().then(res => {
        //console.log(res);
        this.recommends = res.data.list
      })

      //4、给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        //获取每个title对应的offsetTop(点击标题滚到对应内容)
        this.themeTopY = []
        this.themeTopY.push(0);//push()方法可向数组的末尾添加一个或多个元素，并返回新的长度
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE); //Number.MAX_VALUE为js中数字的最大值
        //console.log(this.themeTopY);
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY() //图片加载完之后调用getThemeTopY()
      },
      titleClick(index) { //监听title的点击获取index
        //console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
      },
      contentScroll(position) {
        //获取y值
        const positionY = -position.y

        //positionY和title中的offsetTop进行对比
        let length = this.themeTopY.length
        for(let i = 0;i < length - 1;i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < 
          this.themeTopY[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }

          //判断BackTop是否显示
          this.isShowBackTop = (-position.y) > 1000
        } 
      },
      backClick() { //点击回到顶部的监听事件
          //拿到scroll这个组件对象去调用它的scrollTo()方法
          this.$refs.scroll.scrollTo(0,0) 
      },
      addToCart() { //加入购物车事件
        //1、获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0] //图片
        product.title = this.goods.title  //标题
        product.desc = this.goods.desc    //描述
        product.price = this.goods.realPrice  //价格
        product.iid = this.iid  //商品id

        //2、将商品添加到购物车里
        this.$store.dispatch('addCart',product); //把product传过去
      }
    },
    mounted() { //监听detail中图片加载完成
      //拿到refresh并对this.$refs.scroll.refresh进行防抖动
      const refresh = debounce(this.$refs.scroll.refresh,200) 
      this.$bus.$on('detailItemImageLoad',() => {
      //console.log('加载完成');  
      refresh()
    })
    }
  }
</script>

<style scoped>
  #detail { /*盖住tabbar，不让tabbar显示*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
    width: 100%;
  }
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>