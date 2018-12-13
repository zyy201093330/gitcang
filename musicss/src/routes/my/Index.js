import React,{component} from 'react'
import dispatch from '../../utils/dispatch'

class My extends React.PureComponent{
    render(){
        return (
            <div>
                <button onClick={()=>{this.click()}}>发送消息到首页</button>
            </div>
        )
    }
    click(){
        dispatch.emit('postMessage',{name:'1605a',num:'23人'})
        console.log(dispatch.emit('postMessage',{name:'1605a',num:'23人'}))
    }
}

export default My