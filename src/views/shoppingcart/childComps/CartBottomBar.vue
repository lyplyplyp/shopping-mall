<template>
  <div class="cart-bottom-bar">
      <div class="check-content">
          <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
          <span>全选</span>
      </div>

      <div class="total-price">
          合计:{{totalPrice}}
      </div>

      <div class="calculate">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton"
import { createLogger } from 'vuex'

  export default {
    name:"CartBottomBar",
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return '¥' + this.$store.state.cartList.filter(item => { //筛选出cartList中被选中的商品
                return item.checked
            }).reduce((preValue,item) => { //reduce()方法接收一个函数作为累加器，数组中的每个值相加最终计算为一个值;preValue为前一个值
                return preValue + item.price * item.count
            },0).toFixed(2) //0为传递给函数的初始值;toFixed(2)为价格后面保留两位小数
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if(this.$store.state.cartList.length === 0) return false //购物车中没有商品时全选按钮不显示
            //find(item => !item.checked)为查找没有选中的商品，若有没选中的商品此时isSelectAll为false，
            //全选按钮并不会显示，前面加一个!变为true选中全部商品时全选按钮才会有显示
            return !(this.$store.state.cartList.find(item => !item.checked))
        }
    },
    methods: {
        checkClick() {
            //方法1：
            if(this.isSelectAll) { //全部商品都选中时，点击一次全选按钮则全部商品都不选中
                this.$store.state.cartList.forEach(item => item.checked = false)
            } else { //全部商品或部分商品没选中时，点击一次全选按钮则全部商品都选中
                this.$store.state.cartList.forEach(item => item.checked = true)
            } 

            //方法2：
            /* let isSelectAll = true
            this.isSelectAll ?  this.$store.state.cartList.forEach(item => item.checked = false) :
            this.$store.state.cartList.forEach(item => item.checked = true) */
        }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
      height: 40px;
      background-color: #eee;
      position: relative;
      line-height: 40px;
      display: flex;
      font-size: 14px;
  }
  .check-content {
      display: flex;
      align-items: center; /* 垂直对齐 */
      margin-left: 10px;
      width: 60px;
  }
  .check-button {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-right: 5px;
  }
  .total-price {
      margin-left: 20px;
      flex: 1;
  }
  .calculate {
      width: 90px;
      background-color: red;
      color: #fff;
      text-align: center;
  }
</style>
