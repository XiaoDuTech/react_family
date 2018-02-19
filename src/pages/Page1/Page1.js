import React,{Component} from 'react';
import './Page1.css';
import image from './images/logo_top_ca79a146.png';
export default class Page1 extends Component{
  render(){
    return(
      <div className="page-box">
        this is Page12
        <img src={image}/>
      </div>
    )
  }
}
