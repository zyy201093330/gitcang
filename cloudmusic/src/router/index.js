import React from 'react';
import dynamic from 'dva/dynamic';

// 引入一级路由
import LoginPage from '../routes/LoginPage';
import MainPage from '../routes/MainPage';
import Tellogin from '../routes/account/tellogin'
import Play from '../routes/discover/play'
import DistinguishPage from '../routes/DistinguishPage'

// 引入二级路由
import AccountPage from '../routes/account/Index';
import DiscoverPage from '../routes/discover/Index';
import FriendPage from '../routes/friend/Index';
import MyPage from '../routes/my/Index';
import VideoPage from '../routes/video/Index';
import Dayrecommend from '../routes/discover/dayrecommend';
import Seach from '../routes/discover/seach';


export default {
  routes: [{
    path: '/login',
    component: LoginPage
  }, 
  {
    path:'/tellogin',
    component: Tellogin
  },
  {
    path:'/play/:id?',
    component:Play
  },
  {
    path:'/DistinguishPage/:id?',
    component:DistinguishPage
  },
  {
    path: '/main',
    component: MainPage,
    children: [{
      path: '/main/account',
      component: AccountPage
    },{
      path: '/main/discover',
      component: DiscoverPage
    },{
      path: '/main/friend',
      component: FriendPage
    },{
      path: '/main/my',
      component: MyPage
    },{
      path: '/main/video',
      component: VideoPage
    },{
      path:'/main/dayrecommend',
      component:Dayrecommend
    },{
      path:'/main/seach',
      component:Seach
    }]
  },{
    path: '/',
    redirect: '/main/discover'
  }]
}
