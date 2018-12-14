import React from 'react';
import {NavLink} from 'dva/router'
import styles from './index.scss'
import RouterView from '../../router/RouterView'

class Index extends React.PureComponent{
  render(){
    return (
      <div className="tel">
        <p className="p"><NavLink exact to="/tellogin" >手机号登录</NavLink></p>

      </div>
    )
  }
}

export default Index;
