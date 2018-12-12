import React from 'react';
import style from './Index.scss'

class Index extends React.PureComponent{
  render(){
    return(
      <div className="friend">
        <h1>{this.props.match.path}</h1>
        <header className="head">
          <span></span>
          <span>我的音乐</span>
          <span></span>
        </header>
      </div>
    )
  }
}

export default Index;
