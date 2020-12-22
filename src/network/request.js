import axios from "axios"

//export default只导出一个，export function可以导出多个
export function request(config) { 
    //1、创建axios的实例
    const instance = axios.create({
        baseURL:"http://162.122.190.220:8080/api/c8",//非正确接口
        timeout:5000
      })


      //2、axios的拦截器(interceptors)
      //请求拦截
      instance.interceptors.request.use(config => {
          return config; //拿到config之后记得返回出去
      },err => {
          //console.log(err);
      })

      //响应拦截
      instance.interceptors.response.use(res => {
          return res.data; //拿到结果之后记得把res.data返回出去
      },err => {
          console.log(err);
      })


      //3、发送真正的网络请求
      return instance(config) //request函数返回的是promise
     /*  .then(res => {
          resolve(res)
      })
      .catch(err => {
          reject(err)
      }) */
}
