<template>
    <div>
        <div>
            <input type="file" @change="changfile">
            图片上传
        </div>
        <img :src="src" alt="">
        <canvas id="canvas" ref="cvs"></canvas>
    </div>
</template>

<script>
import {uploadImg,uploadBase64} from '@/api/index';
export default {
    data(){
        return {
            src: ''
        }
    },
    methods:{
        async changfile(e){
            console.log(e)
            let that = this;
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = ()=>{
                this.src = reader.result
                var img = new Image();
                img.src = reader.result
                img.onload = async ()=>{
                    var cvs = that.refs.cvs
                    console.log(cvs)
                }
            }
        }
    }
}
</script>

<style>
#canvas{
    width:100%;
    height:200px;
}
</style>
