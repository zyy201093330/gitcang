<template>
    <div class="drive">
        <header class="header">
            <span><</span>
            <span>补换驾照</span>
            <span></span>
        </header>
        <section class="section">
            <nav class="nav">
                <span class="bg">订单提交</span>
                <span>填写收货地址</span>
                <span>正在办理</span>
                <span>办理完成</span>
            </nav>
            <div class="image"></div>
            <div class="photo">
                <dl>
                    <dt></dt>
                    <dd>身份证正面</dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>身份证反面</dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>驾驶证正页</dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>驾驶证副页</dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>白底半身照</dd>
                </dl>
            </div>
            <ul class="ulist">
                <li>
                    <p>服务类型</p>
                    <p>换驾照<span>﹥</span></p>
                </li>
                <li>
                    <p>当前驾照签发城市</p>
                    <p>请选择签发地</p>
                </li>
                 <li>
                    <p>可补换的签发城市</p>
                    <p>请选择签发地</p>
                </li>
                <li>
                    <p>服务费</p>
                    <p>￥399</p>
                </li>
                <li>
                    <p>优惠</p>
                    <p>登陆后查看优惠券<span>></span></p>
                </li>
            </ul>
            <a href="#">常见问题</a>
        </section>        
        <footer class="footer">
            <p>
                实付：
                <span>￥399</span>
            </p>
            <button>立即支付</button>
        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    components:{

    },
    methods:{

    }
}
</script>

<style>
.drive{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.header{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 10px;
    box-sizing: border-box;
    border-bottom:1px solid #ccc;
}
.section{
    flex:1;
}
.nav{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #F0F0EF;
}
.nav>span{
    display: block;
    width:100%;
    height:100%;
    line-height: 40px;
    border-right:1px solid #F0F0EF;
}
.bg{
    background: #3AAFFC;
    color:#fff;
}
.image{
    width:100%;
    height:90px;
    background: rgba(0,0,0,.5)
}
.photo{
    width:100%;
    height:auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:20px 0;
}
.photo>dl{
    width:17%;
    height:auto;
}
.photo dt{
    width:30px;
    height: 30px;
    border:1px solid #ccc;
    border-radius: 10px;
    margin:0 auto;
}
.photo dd{
    margin-top:5px;
}
.ulist{
    width:100%;
    height: auto;
}
.ulist>li{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px;
    box-sizing: border-box;
}
.footer{
    width:100%;
    height:50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left:10px;
}
.footer>button{
    width:100px;
    height:100%;
    color:#fff;
    background: #333;
    border:0;
     
}
</style>
