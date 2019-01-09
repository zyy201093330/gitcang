<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import Bg from '@/assets/bg.jpg'
import {imgToBase64, uploadBase64} from '@/api/index'
export default {
  computed: {
    canvas(){
      return this.$refs.canvas;
    },
    context(){
      console.log(this.$refs.canvas);
      return this.$refs.canvas.getContext('2d');
    }
  },
  methods: {
    async init(){
      let {canvas,context} = this;
      let img = await this.loadImage(Bg);
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0,0,img.width,img.height, 0,0,img.width,img.height);

      const res = await imgToBase64('http://img.wxcha.com/file/201603/07/7ec4c7c1f7.jpg');
      const avatarUrl = res.data.base64;
      let avatar = await this.loadImage(avatarUrl);
      context.drawImage(avatar, 0, 0, avatar.width, avatar.height, 97, 747, 86, 86);
      context.font = '26px 微软雅黑';
      context.fillStyle = '#265f18';
      let text = context.measureText("张永毅");
      context.fillText('张永毅', 140-text.width/2, 860);
      context.save();
      context.beginPath();
      context.lineWidth=4;
      context.strokeStyle="#8db287";
      context.arc(140,790,43,0,360,false);
      context.stroke();
      context.closePath();
      let base64 = canvas.toDataURL('image/jpeg', 0.6);
      const upload = await uploadBase64(base64);
      console.log('upload...', upload);
    },
    loadImage(src){
      return new Promise((resolve, reject)=>{
        let img = new Image();
        img.src = src;
        img.onload = ()=>{
          resolve(img);
        }
        img.onerrpr = ()=>{
          reject();
        }
      })
    }
  },
  mounted(){
    this.init();
  }
}
</script>
<style lang="scss">
  canvas{
    width: 100%;
  }
</style>