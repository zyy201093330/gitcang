import JSBridge from '@/utils/JSBridge.js';

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
