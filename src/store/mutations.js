import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
    //方法
    [ADD_COUNTER](state,payload) {
        payload.count++
      },
      [ADD_TO_CART](state,payload) {
        payload.checked = false //默认不选中
        state.cartList.push(payload) //push()方法可向数组的末尾添加一个或多个元素，并返回新的长度
      }
}