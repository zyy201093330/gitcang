const host = /localhost/.test(window.location.host)?'https://h5.chelun.com':'http://h5-test.chelun.com';

function sendRequest(url, method = 'GET', data = {}) {
  let params = {
      method,
      headers:{
        'content-type':'application/json'
      }
  };
  // 判断如果是一个post请求，带上请求体信息
  if (method == 'POST') {
      params.body = JSON.stringify(data);
  }
  // 判断请求查询url是否携带query
  if (url.indexOf('?') == -1) {
      url += `?_=${+new Date()}`
  } else {
      url += `&_=${+new Date()}`
  }
  // 拼接登陆态token
  // url += `&token=${getToken()}`;
  return fetch(url, params)
    .then(res => res.json())
    .then(body => body);
}



import JSBridge from '@/utils/JSBridge.js';

//上传图片
export let uploadImg = (type)=>{
  return new Promise((resovel, reject)=>{
    JSBridge.invoke('device', 'chooseImage', {
      type,
      chooseCallbackName: function(res){
        resolve(res);
      }
    })
  })
}

// 唤起登陆
export let doLogin = ()=>{
  JSBridge.invoke('app', 'login', {
    loginCallBackName: res=>window.location.reload()
  });
}

//唤起分享
export let doShare = ()=>{
  JSBridge.invoke('ui', 'shareMessage');
}

// 上传base64
export let uploadBase64 = (base64)=>{
  return sendRequest('http://123.206.55.50:11000/upload_base64', 'POST', {base64})
}

//转base64
// export let imgToBase64 = (url) => {
//   return sendRequest('http://123.206.55.50:11000/tobase64','POST',{url})
// }
export let imgToBase64 = (url)=>{
  console.log(url)
  return sendRequest('http://123.206.55.50:11000/tobase64', 'POST', {url})
}

export let doPay = ()=>{
  JSBridge.invoke('app', 'pay', {
    price: 398.00,
    orderNum: '6486849305969374209',
    channels: ["weixin","alipay","baidu"],
    callbackUrl: "https://h5.chelun.com/2017/update-licence2/order.html"
  });
}

// 获取驾照签发城市
export let cityList = ()=>{
  return sendRequest('/api/ExchangeJiaZhao/cityList');
}

// 获取可补换城市
export let costList = (...params)=>{
  console.log(params)
  return sendRequest(`/api/ExchangeJiaZhao/getCostList?order_type=${params[0]}&city_id=${params[2] }&province_id=${params[1]}`);
}
