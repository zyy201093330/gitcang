import React,{Component} from 'react'
import {connect} from 'dva'
import {Carousel} from 'antd'


class Station extends React.Component{
    constructor(){
        super()
    }
    render(){
        let {list} = this.props;
        return(
            <div>
                <div className="lunbo">
                    <Carousel autoplay>
                        {
                            list.map((v,i)=>{
                                return <div className="lunbo_div" key={i}><img src={v.imageUrl}></img></div>
                            })
                        }  
                    </Carousel>  
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
        type:'example/getlist',
        payload:data
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToprosp)(Station)

