import React from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
import style from './play.scss'
import {formaTim} from '../../utils/index'

@connect((state)=>{
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
    componentDidMount(){
        this.props.getsongsurl(this.props.match.params.id)
    }
    tiemupdate(){
        let progresstime = this.refs.audio.currentTime/this.refs.audio.duration*100;
        this.setState({
            progresstime
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
    render(){
        let {songsurllist} = this.props;
        return (
            <div className="play">
                <div><img src={songsurllist.picurl} className={this.state.isflag?style.imgpics:style.imgpic} /></div>
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
                </div>
                {songsurllist.url?<audio src={songsurllist.url} autoPlay ref="audio" onTimeUpdate={()=>{this.tiemupdate()}}></audio>:null}
            </div>
        )
    }
    
}

export default Play

