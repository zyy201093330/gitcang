import React from 'react'
import style from './seach.scss'
import {connect} from 'dva'

@connect((state)=>{
    console.log(state)
    return state.example
},(dispatch)=>{
    return {
        getseach:(payload)=>{
            dispatch({
                type:'example/getseach',
                payload
            })
        },
        getsongsurl:(payload)=>{
            dispatch({
                type:'example/getsongsurl',
                payload
            })
        },
        playAll: payload=>{
            dispatch({
              type: 'example/getUrls',
              payload
            })
        },
        getlyric:payload=>{
            dispatch({
                type:'example/getlyric',
                payload
            })
        },
        distinguishSong: payload=>{
            console.log(payload)
            dispatch({
              type: 'example/distinguishSong',
              payload
            })
        }
    }
})


class Seach extends React.PureComponent {
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.getseach()
    }
    getseach(){
        let seach = this.refs.seach.value
        this.props.getseach(seach)
    }
    toplay(id){
        this.props.history.push(`/play/${id}`)
    }
    playAll(){
        this.props.playAll(this.props.seachlist.map(item=>item.id));
        this.props.getlyric(this.props.seachlist[0].id)
        this.props.history.push(`/play/${this.props.seachlist[0].id}`);
    }
    distinguishSong(){
        console.log(this.props)
        this.props.distinguishSong(this.props.seachlist.map(item=>item.id))
    }
    render(){
        let {seachlist} = this.props;
        return (
            <div className="seach">
                <div className="seach_header">
                    <input type="text" placeholder="搜索" ref="seach" ></input>
                    <button onClick={this.getseach.bind(this)}>搜索</button><br />
                </div>
                <div className="box">
                    <button onClick={this.playAll.bind(this)}>播放全部</button>
                    <button onClick={this.distinguishSong.bind(this)}>听歌识曲</button>
                </div>
                <div>
                    {
                        seachlist.map((v,i)=>{
                            return <div className="seachlist" key={i} onClick={()=>{this.toplay(v.id)}}>
                                <div>
                                    <p>{v.name}</p>
                                    <p>{v.artists[0].name}--{v.album.name}</p>
                                </div>
                                <p>
                                    <img src={require('../../assets/play.png')} />
                                </p>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Seach