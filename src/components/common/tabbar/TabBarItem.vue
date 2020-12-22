<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
             <!--不活跃的时候取这张图片-->
             <slot name="item-icon"></slot> <!--图片插槽-->
        </div>

        <div v-else>
            <!--活跃的时候取这张图片-->
            <slot name="item-icon-active"></slot> <!--图片活跃状态插槽-->
        </div>
        

        <!--绑定内联样式-->
        <div :style="activeStyle">
            <slot name="item-text"></slot> <!--文本插槽-->
        </div>
        
    </div>
</template>

<script>
export default {
    name:"TabBarItem",
    props: { 
        path:String,  //可以动态地获取path
        activeColor: { //可以动态地获取文本颜色
            type:String,
            default:"blue" //默认设置文本颜色为blue
        }
    },
    data() {
        return {
           
        }
    },
    computed: { //动态地决定isActive为true还是false
        isActive() {
            //indexOf(this.path)判断活跃状态的路由包不包含item里面path
            //比如活跃路由的path为/home，item里面的path也为/home，此时为true
            //如果要检索的path没有出现，则该方法返回-1,此时需要包含item里面的path，所以不等于-1
            return this.$route.path.indexOf(this.path) !== -1;
        },
        activeStyle() {
            return this.isActive ? {color:this.activeColor} : {};
        }
    },
    methods: {
        itemClick() {
            this.$router.push(this.path);
        }
    }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1; /*在子级盒子中添加份数*/
    text-align: center;
    height: 49px; /*tabbar常用的高度*/
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle; /*设置元素的垂直对齐*/
    margin-bottom: 2px;
  }
</style>