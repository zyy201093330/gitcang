<template>
    <div class="fill">
        <div class="address">收货地址</div>
        <ul>
            <li>
                <p>联系省市</p>
                <p></p>
            </li>
            <li>
                <P>详细地址</P>
                <P></P>
            </li>
            <li>
                <P>联系电话</P>
                <P>请输入联系电话</P>
            </li>
            <li>
                <p>联系人</p>
                <p>请输入联系人</p>
            </li>
        </ul>
        <button class="btn" disabled>确认</button>
        <div class="coupon" @click="maskcoupon"><img src="../assets/ee-icon.png" alt=""></div>
        <div :class="isconupn==true?'maskcoupon show':'hide'">
            <div>
                <p>分享后自己能够获得优惠券</p>
                <p>自己和好友都能得</p>
                <img src="../assets/coupon.png" />
                <div class="maskbtn">
                    <button @click="delcoupon">给钱都不要</button>
                    <button>果断分享</button>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isconupn:false
        }
    },
    created(){
        window['CHELUN_SHARE_DATA_WXTIMElINE'] = {
            title:'分享一张大图',
            imgUrl:'http://pics.sc.chinaz.com/files/pic/pic9/201812/bpic9612.jpg',
            type:'phtot'
        }
    },
    methods:{
        maskcoupon(){
            this.isconupn = true
        },
        delcoupon(){
            this.isconupn = false
        }
    }
}
</script>

<style  >
.show{
    display: block;
}
.hide{
    display: none;
}
.fill{
    width:100%;
    height:auto;
    background: #eee;
}
.address{
    width:100%;
    height:40px;
    line-height: 40px;
}
.fill>ul li{
    width:100%;
    height:50px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding:0 10px;
}
.btn{
    width:100%;
    height:50px;
    border:0;
    box-shadow: none;
    color:#fff;
    font-size:18px;
    background: #999;
    position: fixed;
    bottom:0;
    left:0;
}
.coupon{
    width:50px;
    height:50px;
    border-radius: 50%;
    position: fixed;
    right:10px;
    bottom:80px;
}
.coupon>img{
    width:100%;
    height:100%;
}
.maskcoupon{
    width:100%;
    height:100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    left:0;
    top:0;
}
.maskcoupon>div{
    width:80%;
    height:300px;
    background: #fff;
    padding:10px;
    margin:200px auto;
}
.maskcoupon>div img{
    width:100%;
    height:200px;
}
.maskbtn{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.maskbtn>button{
    width:100%;
    height:100%;
}
</style>
