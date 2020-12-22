import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//1、安装插件
Vue.use(Vuex)

//2、创建Store对象
const store =  new Vuex.Store({
  state: { //保存状态
    cartList:[]
  },
  mutations, //修改状态
  actions, //异步操作
  getters, //类似于组件里的计算属性
  modules: { //专门划分一些模块
  }
})

//3、挂载到Vue实例
export default store