<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" :key="item.tabcontrol" 
      class="tab-control-item" 
      :class="{active: index === currentIndex}" @click="itemClick(index)"> <!--让正在点击的标题添加上active这个类并监听点击事件-->
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  props: {
      titles: {
          type:Array,
          default() {
              return []
          }
      }
  },
  data() {
      return {
          currentIndex:0 //默认选中第一个title
      }
  },
  methods: {
      itemClick(index) {
          this.currentIndex = index;
          this.$emit('tabClick',index); //父子组件通信，子传父,tabClick为事件的名称，index为传递的事件
      }
  }
}
</script>

<style scoped>
  .tab-control {
      display: flex;
      text-align: center;
      font-size: 15px;
      background-color: #fff;
  }

  .tab-control-item {
      flex:1;
      height: 40px;
      line-height: 40px;
  }

  .tab-control-item span {
      padding: 5px;
  }

  .active {
      color: var(--color-high-text);
  }

  .active span { /*给正在点击的标题添加下边框*/
      border-bottom: 2px solid  var(--color-high-text);
  }
</style>
