import React from 'react';
import RouterView from '../router/RouterView';
import {NavLink} from 'dva/router';
import './MainPage.scss';

class MainPage extends React.PureComponent{
  render(){
    return (
 
    <React.Fragment>

      <RouterView routes={this.props.routes}></RouterView>

      <footer>
        <NavLink to="/main/discover">
          <p></p>
          <span>发现</span>
        </NavLink>
        <NavLink to="/main/video">
          <p></p>
          <span>视频</span>
        </NavLink>
        <NavLink to="/main/my">
          <p></p>
          <span>我的</span>
        </NavLink>
        <NavLink to="/main/friend">
          <p></p>
          <span>朋友</span>
        </NavLink>
        <NavLink to="/login">
          <p></p>
          <span>账号</span>
        </NavLink>
      </footer>
    </React.Fragment>
   )
  }
}

export default MainPage;
