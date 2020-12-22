export function formatDate(date, fmt) {
  //获取年份，+在正则表达式中表示重复一次或更多次，y+则表示重复y一次或更多次
  if (/(y+)/.test(fmt)) {
    //date.getFullYear()拿到的是一个数字，后面加上''转换成字符串，substr为截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //获取除年份之外的时间
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  //若给出的小时为05，那么'00' + str结果为0005，此时str的长度为2，substr(str.length)截取后变为05
  return ('00' + str).substr(str.length);
};

