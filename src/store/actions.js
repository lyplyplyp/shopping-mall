import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
    //此时这个方法不仅要增加购物车中的数量还要添加新的商品，而mutations中的每个方法完成的事件都比较单一，因此把这个方法放在actions里面
    addCart(context,payload) { //context是默认的参数，相当于store
        //1、查找之前数组中是否有该商品
        //find()用于找出第一个符合条件的数组成员，如果没有找到返回undefined
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  
        //2、判断oldProduct
        if(oldProduct) { //商品已经存在购物车时
          context.commit(ADD_COUNTER,oldProduct) //把oldProduct传过去
        } else { //商品未存在购物车时
          payload.count = 1
          context.commit(ADD_TO_CART,payload)
        }
      }
}