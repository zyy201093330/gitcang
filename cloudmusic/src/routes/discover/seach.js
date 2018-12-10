import React from 'react'
import style from './seach.scss'
import {connect} from 'dva'

@connect((state)=>{
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
        console.log(this.props)
        this.props.history.push(`/play/${id}`)
    }
    render(){
        let {seachlist} = this.props;
        return (
            <div className="seach">
                <div className="seach_header">
                    <input type="text" placeholder="搜索" ref="seach" ></input>
                    <button onClick={this.getseach.bind(this)}>搜索</button>
                </div>
                <div>
                    {
                        seachlist.map((v,i)=>{
                            return <div className="seachlist" key={i} onClick={()=>{this.toplay(v.id)}}>
                                <div>
                                    <p>{v.name}</p>
                                    <p>{v.artists[0].name}--{v.album.name}</p>
                                </div>
                                <div>
                                    <img src={require('../../assets/play.png')} />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Seach