import React from 'react';
import style from './Index.scss'
import 'antd/dist/antd.css'

import Recommmend from '../../components/recommend'
import Station from '../../components/station'


class Index extends React.PureComponent{ 
  constructor(){
    super()
    this.state = {
      navflag:0
    }
  }
  render(){
    return (
      <div className="hotlist">
        <div className="header" >
          <div className="header_top">
            <p><img src={require('../../assets/tinggeshiqu.png')} /></p>
            <input type="text" placeholder="🔍猜你喜欢 浮生" /> 
            <p><img src={require('../../assets/yinpin.png')}></img> </p>
          </div>  
          <div className="header_nav">
            <span onClick={this.tabrecommmend.bind(this)}  >个性推荐</span>
            <span onClick={this.tabstation.bind(this)} >主播电台</span>
          </div>
        </div>
        <section>
          {this.state.navflag == 0 && <Recommmend></Recommmend>}
          {this.state.navflag == 1 && <Station></Station>} 
        </section>
        
      </div>
    )
  }
  tabrecommmend(){
    this.setState({
      navflag:0
    })
  }
  tabstation(){
    this.setState({
      navflag:1
    })
  }
 
}

export default Index
