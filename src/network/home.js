//home页面的网络请求单独放在一个js文件中

import {request} from "./request"

//对home首页获取多个数据进行封装
export function getHomeMultidata() {
    return request({
        url:"/home/multidata"
    })
}

export function getHomeGoods(type,page) {
    return request({
        url:"/home/data",
        params: { //放置路径后面的相关参数
            type,
            page
        }
    })
}