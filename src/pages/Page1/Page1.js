import React,{Component} from 'react';

import style from './Page1.css';

import image from './images/logo_top_ca79a146.png';

export default class Page1 extends Component{
  render(){
    return(
      <div className={style.box}>
        this is Page1
        <img src={image}/>
      </div>
    )
  }
}
