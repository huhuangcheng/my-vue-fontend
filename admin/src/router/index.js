import { createRouter, createWebHashHistory,beforeEach} from 'vue-router'


import Login from '../views/Login.vue' //@ src绝对引用
import MainBox from '@/views/MainBox.vue'
// import Home from '@/views/home/Home.vue'
// import Center from '@/views/center/Center.vue'
import RoutesConfig from './config'
import store from '../store/index'


const routes = [
  {
    path:'/login',
    name:"login",
    component:Login
  },
  {
    path:"/mainbox",
    name:"mainbox",
    component:MainBox,
  },

  //mainbox的嵌套路由，后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


//每次路由跳转之前
router.beforeEach((to,from,next)=>{
  if(to.name==="login"){
    next()
  }else{
    //如果（已经登录过）授权   next()

    //未授权，重定向login
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    }else{
      if(!store.state.isGetterRouter){

        //删除所有的嵌套路由
        //mainbox
        router.removeRoute("mainbox")

        ConfigRouter()
        next({
          path:to.fullPath   //为什么这里加to.fullPath,见下面解释
        })
      }else{
        next()
      }
    }
  }
})

const ConfigRouter=()=>{
  if(!router.hasRoute("mainbox")){
    router.addRoute({
      path:"/mainbox",
      name:"mainbox",
      component:MainBox
    })
  }
  RoutesConfig.forEach(item=>{
    checkPermission(item)&&router.addRoute("mainbox",item)
  })
  //改变isGetterRouter=true
  store.commit("changeGetterRouter",true)
}

const checkPermission=(item)=>{
  if(item.requireAdmin){
    return store.state.userInfo.role===1
  }
    return true
}


export default router


// to.fullPath 的作用
// to.fullPath 是用户 原本想访问的完整路径（包括路径、查询参数 ?、哈希 # 等），例如：

// 用户访问 /dashboard?id=1#section，则 to.fullPath 就是 /dashboard?id=1#section。

// 如果直接调用 next()，用户会被导航到根路径 /，而不是他原本想访问的页面。
