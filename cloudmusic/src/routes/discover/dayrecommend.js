import React from 'react'
import styles from './dayrecommend.scss'
import {connect} from 'dva'

@connect(state => {
    console.log(state)
    return {
        dayplaylist:state.dayrecommend
    }
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
                <div className="playlist">
                    <ul>
                        {
                            dayplaylist.map((v,i)=>{
                                return <li key={i}>
                                    <img src={v.album.picUrl}></img>
                                </li>
                            })
                        }
                    </ul>
                   
                </div>
            </div>
        )
    }
}
export default Dayrecommend