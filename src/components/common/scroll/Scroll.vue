<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name:"Scroll",
    props: {
        probeType: {
            type:Number,
            //0和1都是不侦测实时的位置；2在手指滚动的过程中侦测，手指离开后的惯性滚动中不侦测；3只要是滚动就侦测
            default:0 
        },
        pullUpLoad: {
            type:Boolean,
            default:false //默认不加载
        } 
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        //1、创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            //scroll封装之后内部包含了tabControl，而tabControl里面封装的是div，所以必须把click设置为true
           click:true,
           probeType:this.probeType, //probe是侦测的意思，不设置具体值是因为不是每个页面都需要实时监听滚动位置
           pullUpLoad:this.pullUpLoad
        })

        //2、监听滚动的位置,在回调函数里面拿到position，这个position就是实时滚动的位置
        if(this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll',(position) => {
                this.$emit('scroll',position) //监听滚动事件并把事件发送出去
            })
        }

        //3、监听上拉加载
        if(this.pullUpLoad) {
            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp')
            }) 
        }
    },
    methods: {
        scrollTo(x,y,time=500) { //scrollTo(x,y,回到顶部所花费的时间)，time=500设置默认值
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp() { //完成一次加载后拿到scroll然后再调用scroll里面的finishPullUp()方法继续加载
            this.scroll && this.scroll.finishPullUp()
        },
        refresh() { //等把所有的图片加载完之后调用refresh()重新计算滚动的高度
            this.scroll && this.scroll.refresh()
        },
        getScrollY() { //Home离开时记录状态和位置
            return this.scroll ? this.scroll.y : 0
        }
    }
  }
</script>

<style scoped>
</style>
