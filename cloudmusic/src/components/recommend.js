import React,{Component} from 'react'
import {connect} from 'dva'
import {Carousel} from 'antd'
import {NavLink} from 'dva/router'

class Recommend extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {list,resourcelist} = this.props;
        return(
            <div className="recommend">
                <div className="lunbo">
                     <Carousel autoplay>
                        {
                            list.map((v,i)=>{
                                return <p className="lunbo_div" key={i}><img src={v.imageUrl}></img></p>
                            })
                        }  
                    </Carousel>  
                </div>
                <div className="rec_nav">
                    <dl>
                        <dt><img src={require('../assets/yinpin.png')}></img></dt>
                        <dd>私人FM</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../assets/yinpin.png')}></img></dt>
                        <dd><NavLink to="/main/dayrecommend">每日推荐</NavLink> </dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../assets/yinpin.png')}></img></dt>
                        <dd><NavLink to="/main/seach">歌单</NavLink></dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../assets/yinpin.png')}></img></dt>
                        <dd>排行榜</dd>
                    </dl>
                </div>
                <div>
                    <p className="rec_tit">推荐歌单<span>></span></p>
                    <div className="rec_song">
                        {
                            resourcelist.map((v,i)=>{
                                return <dl key={i}>
                                    <dt><img src={v.picUrl} /></dt>
                                    <dd>{v.name}</dd>
                                </dl>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.props.getlist()
    }
}

const mapStateToProps = state=>{
    return state.example
}

const mapDispatchToprosp = (dispatch)=>{
  return {
    getlist:(data)=>{
      dispatch({
        type:'example/getlist'
      })

      dispatch({
        type:'example/resourcelist'
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToprosp)(Recommend)

