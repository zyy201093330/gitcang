import React from 'react'
import styles from './dayrecommend.scss'
import {connect} from 'dva'

@connect(state => {
    console.log(state)
    return  state.dayremmend
  
},dispatch => {
    return {
        getremmendersongs:payload => {
            dispatch({
                type:'dayremmend/getremmendersongs'
            })
        }
    }
})

class Dayrecommend extends React.PureComponent{
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.getremmendersongs();
    }
    render(){
        let {dayplaylist} = this.props;
        console.log(dayplaylist)
        if(dayplaylist){
            window.localStorage.setItem('daylist',JSON.stringify(dayplaylist))
        }
       
        let dayplaylists = JSON.parse(window.localStorage.getItem('daylist'))
        console.log(dayplaylists)
        return (
            <div className="dayrecommend">
                <header className="dr_header">
                    <span>{'<'}</span>
                    <span>每日推荐</span>
                    <span><img src={require('../../assets/yinpin.png')} /></span>
                </header>
                <p className="dr_img"><img src={require('../../assets/dr1.png')} /></p>
                <div className="allplay">
                    <div className="play_tit">
                        <p>
                            <img src={require('../../assets/play.png')} />
                            播放全部
                        </p>
                        <p>
                            <img src={require('../../assets/yinpin.png')} />
                            多选
                        </p>
                    </div>
                </div>
                
                    <ul className="playlist">
                        {
                            dayplaylists.map((v,i)=>{
                                return <li key={i}>
                                    <p>
                                        <img src={v.album.picUrl} />
                                        <span>{v.album.name}</span><br />
                                        <span>{v.artists[0].name}--{v.album.name}</span>
                                    </p>
                                    <p>
                                        <img src={require('../../assets/play.png')} />
                                    </p>  
                                </li>
                            })
                        }
                    </ul>
                   
            
            </div>
        )
    }
}
export default Dayrecommend