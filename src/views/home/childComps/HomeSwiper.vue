<template>
  <div class="homeswiper">
    <swiper>
          <!--key是循环的标识，若修改了数据它会删除原来的再显示修改后的,:key="item.index"，因为item.index是变量，所以key的前面要加冒号-->
          <swiper-item v-for="item in cbanners" :key="item.homeswiper"> 
              <a :href="item.link">
                <!--image src有值的时候，才开始加载,onload事件是在src的资源加载完毕的时候，才会触发-->
                <img :src="item.image" @load="imageLoad">
              </a>
          </swiper-item>
      </swiper>
  </div>      
</template>

<script>
  import {Swiper,SwiperItem} from "@/components/common/swiper"

  export default {
    name:"HomeSwiper",
    props: { //父子组件通信，父传子，把Home文件中请求到的数据传给HomeSwiper
        cbanners: {
            type:Array,
            default() {
                return [];
            }
        }
    },
    data() {
      return {
        isLoad:false //默认没加载
      }
    },
    components: {
         Swiper,
         SwiperItem
    },
    methods: {
      //监听轮播图是否加载完
      imageLoad() {
        if (!this.isLoad) { //为了不让HomeSwiper多次发出事件可以使用isLoad的变量进行状态的记录
          this.$emit('swiperImageLoad') //发送事件
          this.isLoad = true
        }
      }
    }
  }
</script>