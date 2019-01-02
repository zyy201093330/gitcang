import JSBridge from '@/utils/JSBridge.js'
export let uploadImg = (type)=>{
    return new Promise((resolve,reject)=>{
        JSBridge.invoke("device",'chooseImage',{
            type,
            chooseCallbackaName:function(res){
                resolve(res)
            }
        })
    })
}