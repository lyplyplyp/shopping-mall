//防抖函数的封装
export function debounce(func,delay=50) { //防抖函数，超过规定时间再执行refresh()
    let timer = null
    return function(...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this,args)
      },delay)
    }
  }