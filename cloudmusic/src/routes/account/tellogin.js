import React from 'react'
import {connect} from 'dva'
import {NavLink} from 'dva/router'

@connect(state => {
    return {
        tellist:state.example.tellist
    }
},dispatch => {
    return {
        tellogin:payload => {
            dispatch({
                type:'example/tellogin',
                payload
            })
        }
    }
})

export default class extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            phone:'15712879594',
            password:'xz980312'
        }
    }
    componentDidMount(){
        
    }
    render(){
        let {phone,password} = this.state;
        return (
           <div className="tel">
                <p><input placeholder="请输入手机号" type="text" maxLength="19" value={phone} onChange={(e)=>{this.setState({phone:e.target.value})}} /></p>
                <p><input placeholder="密码" type="password" value={password} onChange={(e)=>{this.setState({password:e.target.value})}} /></p>
                <button onClick={this.submit.bind(this)}><NavLink to="/main/discover">登录</NavLink></button>         
           </div>
        )
    }
    submit(){
        if(!/\d{11}/.test(this.state.phone)){
            alert('请输入正确的手机号码')
            return;
        }
        if(!/\S{6,20}/.test(this.state.password)){
            alert('请输入正确的密码')
            return;
        }
        let {phone,password} = this.state;
        this.props.tellogin({
            phone:phone,
            password:password
        })
       
    }
}

