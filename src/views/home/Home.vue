<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
    ref="tabControl1" 
    @tabClick="tabClick"
    class="tab-control"
    v-show="isTabFixed"/> <!--一开始不显示即不吸顶-->
    <scroll class="content" ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :cbanners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :crecommends="recommends"/>
      <feature-view/>
      <!--@tabClick="tabClick",父组件接收子组件发送过来的事件（监听事件并在父组件里处理事件）-->
      <tab-control :titles="['流行','新款','精选']" ref="tabControl2" @tabClick="tabClick"/>
      <goods-list :cgoods="showGoods"/>
    </scroll>
    <!--组件是不能直接监听事件的，如果想要监听必须加上.native（监听组件根元素的原生事件）-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
//导入的子组件
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

//导入的公共组件
import NavBar from "@/components/common/navbar/NavBar"
import TabControl from "@/components/content/tabControl/TabControl"
import GoodsList from "@/components/content/goods/GoodsList"
import Scroll from "@/components/common/scroll/Scroll"
import BackTop from "@/components/content/backtop/BackTop"

//导入的方法或者额外的数据
import { getHomeMultidata, getHomeGoods } from "@/network/home"
import {debounce} from "@/assets/img/common/utils"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    //用于存储请求过来的数据
    return {
      //最开始banners和recommends为空数组
      banners: [],
      recommends: [],
      goods: {
        //titles的数据模型，记录"流行/新款/精选"中的数据
        pop: { page: 0, list: [] }, //pop是流行的意思，page记录所在的页数，list记录访问的数据量
        new: { page: 0, list: [] }, //new是新款的意思
        sell: { page: 0, list: [] }, //sell是精选的意思
      },
      currentType: "pop", //默认当前点击的是pop
      isShowBackTop:false, //默认不显示回到顶部的图标
      tabOffsetTop:0, //默认tabControl的offsetTop(滚动多高时有吸顶效果)为0
      isTabFixed:false, //默认不吸顶
      saveY:0 //默认保存的位置为0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() { //一定要配合keep-alive（缓存作用）来使用，进到home页面时触发
    this.$refs.scroll.scrollTo(0,this.saveY,0) //(x,y,回到home所花费的时间)
    this.$refs.scroll.refresh() //回到home页面时要进行刷新重新计算一下位置
  },
  deactivated() { //一定要配合keep-alive（缓存作用）来使用，离开home页面时触发
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    //created生命周期函数，当组件一旦创建好的时候就会执行这个函数发送网络请求
    //1、请求多个数据
    this.getHomeMultidata()

    //2、请求商品数据
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")
  },
  mounted() {
    //1、监听item中图片加载完成
    //拿到refresh并对this.$refs.scroll.refresh进行防抖动
    const refresh = debounce(this.$refs.scroll.refresh,200) 
    this.$bus.$on('homeItemImageLoad',() => {
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //index为最新点击的title
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() { //点击回到顶部的监听事件
      //拿到scroll这个组件对象去调用它的scrollTo()方法
      this.$refs.scroll.scrollTo(0,0) 
    },
    contentScroll(position) {
      //1、判断BackTop是否显示
      //当(-position.y) > 1000的时候显示出回到顶部的图标，position.y本身就是一个负值，所以前面要加上-
      this.isShowBackTop = (-position.y) > 1000

      //2、决定tabControl是否吸顶(position:fixed)
      //(-position.y) > this.tabOffsetTop的时候就吸顶，此时isTabFixed为true
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    }, 
    loadMore() {
      this.getHomeGoods(this.currentType) //调用getHomeGoods()方法并把currentType传进去
    }, 
    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },


    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list; //this就是当前组件的对象
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      //一开始默认page是0，然后要向后端开始请求数据所以加1，但是page并没有改变，后面才是给goods里面的page加1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //Array的扩展运算符可以用于合并数组，ary1.push(...ary2)
        this.goods[type].list.push(...res.data.list); //把请求到的数据存放起来
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped> /*scoped是作用域的意思，加上了这个属性里面的样式只会针对于当前这个组件*/
#home {
  height: 100vh; /*视口宽度*/
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*一开始在使用浏览器原生滚动时为了让导航不跟随一起滚动所以需要设置以下样式，但是现在使用了
  better-scroll可以局部滚动了，所以不需要再给导航设置以下样式了*/
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content { /*设置滚动的高度*/
    position: absolute;
    top: 44px; /*navbar的高度*/
    bottom: 49px; /*tabbar的高度*/
    left: 0;
    right: 0;
    overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>