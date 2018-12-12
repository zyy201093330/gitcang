import React from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
import {Carousel } from 'antd-mobile'
import style from './play.scss'
import {formaTim} from '../../utils/index'

import Lyric from '../../components/lyric'
import Audioprocess from '../../components/audioprocess'

@connect((state)=>{
    console.log(state)
    return state.example
},(dispatch)=>{
    return {
        getsongsurl:(payload)=>{
            dispatch({
                type:'example/getsongsurl',
                payload
            })
        },
        changePlay:(payload)=>{
            console.log(payload)
            dispatch({
                type:'example/changePlay',
                payload
            })
        },
        getUrl: id=>{
            dispatch({
                type: 'examle/getUrl',
                payload: id
            })
        },
        changeMode: ()=>{
            dispatch({
                type: 'example/changeMode',
            })
        },
        getlyric:(payload)=>{
            console.log(payload)
            dispatch({
                type:'example/getlyric',
                payload
            })
        }
    }
})


class Play extends React.PureComponent{
    constructor(){
        super()
        this.state = {
            progresstime:0,
            isflag:true
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if (nextProps.id != this.props.id){
    //       this.props.getlyric(nextProps.id);
    //     }
    // }
    // static getDerivedStateFromProps(props, state){
    //     // 只要判断下一次的id和上一次的id不一样就要重新获取歌词
    //     if (props.id != state.id && props.id){
    //         console.log(props.id)
    //       props.getlyric(props.id);
    //     }
    //     return {
    //       id: props.id
    //     }
    //   }
    componentDidMount(){
        this.props.getsongsurl(this.props.match.params.id)
        let id = this.props.match.params.id;
        this.props.getUrl(id);
    }
    tiemupdate(){
        let progresstime = this.refs.audio.currentTime/this.refs.audio.duration*100;
        this.setState({
            progresstime
        },()=>{
            if (this.state.progresstime == 100){
                this.props.changePlay('next');
                console.log(this.props.playList)
                if (!this.props.playList.length){
                  this.refs.audio.pause();
                  this.refs.audio.currentTime = 0;
                  this.refs.audio.play();
                }
            }
        })
    }
    get duration(){
        if(this.refs.audio && this.refs.audio.duration){
            return formaTim(this.refs.audio.duration)
        }
        return "00:00"
    }
    get currentTime(){
        if(this.refs.audio && this.refs.audio.currentTime){
            return formaTim(this.refs.audio.currentTime)
        }
        return "00:00"
    }
    touchStart(){
        this.setState({
            isflag:false
        },()=>{
            this.refs.audio.pause()
        })
    }
    touchMove(e){
        let touch = e.touches[0],
            progressEls = this.refs.progress;
        let progress = (touch.pageX - progressEls.offsetLeft)/progressEls.offsetWidth;
        if(progress > 1){
            progress = 1;
        }else if(progress < 0){
            progress = 0;
        }
        this.setState({
            progresstime:progress*100
        },()=>{
            this.refs.audio.currentTime = progress*this.refs.audio.duration
        })
    }
    touchEnd(){
        this.setState({
            isflag:true
        },()=>{
            this.refs.audio.play()
        })
    }
    changeState(){
        this.setState({
            isflag:!this.state.isflag
        },()=>{
            this.state.isflag?this.refs.audio.play():this.refs.audio.pause()
        })
    }   
    changePlay(type){
        this.props.changePlay(type)
    }
    get mode(){
        return this.props.mode==1?'单曲循环':this.props.mode==2?'随机播放':'列表循环'
    }
    changeMode(){
        this.props.changeMode();
    }
    render(){
        let {songsurllist,playList,url,picUrl} = this.props;
        return (
            <div className="play">
             <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                <div><img src={picUrl} className={this.state.isflag?style.imgpics:style.imgpic} /></div>
                
                <Audioprocess audio={this.refs.audio} />
                </Carousel>
                
                <div className="progressbox" 
                    onTouchStart={this.touchStart.bind(this)}
                    onTouchMove={this.touchMove.bind(this)}
                    onTouchEnd={this.touchEnd.bind(this)}
                >
                    <span>{this.currentTime}</span>
                    <p className="progress" ref="progress">
                        <span style={{width:this.state.progresstime+'%'}}></span>
                    </p>
                    <span>{this.duration}</span>
                </div>
                <div className="func">
                    <p onClick={()=>{this.changePlay('prev')}}><img src={require('../../assets/shangyishou.png')} /></p>
                    <p onClick={this.changeState.bind(this)}><img src={this.state.isflag?require('../../assets/pause.png'):require('../../assets/play.png')} /></p>
                    <p onClick={()=>{this.changePlay('next')}}><img src={require('../../assets/xiayishou.png')} /></p>
                    <button onClick={()=>this.changeMode()}>{this.mode}</button>
                </div>
                <Lyric lyric={this.props.datalyric} currentTime={this.refs.audio && this.refs.audio.currentTime} />
                {this.props.url?<audio src={url} autoPlay crossOrigin="anonymous" ref="audio" onTimeUpdate={()=>{this.tiemupdate()}}></audio>:null}
            </div>
        )
    }
    
}

export default Play

