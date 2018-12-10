import React from 'react';
import {NavLink} from 'dva/router'
import './LoginPage.scss'

class LoginPage extends React.PureComponent{
    render(){
        return (
            <div className="login">
                <p className="p"><NavLink exact to="/tellogin" >手机号登录</NavLink></p>
                <p className="p"><NavLink exact to="/tellogin" >注册</NavLink></p>
            </div>
        )
    }
}

export default LoginPage;
