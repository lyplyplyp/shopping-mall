import Vue from 'vue'
import VueRouter from 'vue-router'

//1、安装插件
Vue.use(VueRouter)

  const routes = [  //配置路由与组件的映射关系
    {
      path:"",
      redirect:"/home"
    },
    {
      path:"/home",
      component:() => import("@/views/home/Home")
    },
    {
      path:"/category",
      component:() => import("@/views/category/Category")
    },
    {
      path:"/shoppingcart",
      component:() => import("@/views/shoppingcart/ShoppingCart")
    },
    {
      path:"/my",
      component:() => import("@/views/my/My")
    },
    {
      path:"/detail/:iid",
      component:() => import("@/views/detail/Detail")
    }
]

//2、创建路由对象
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//3、导出router
export default router
