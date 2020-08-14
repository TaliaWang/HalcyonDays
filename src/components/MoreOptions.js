/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import feedbackImg from "../images/feedbackImg.svg";
import aboutUsImg from "../images/aboutUsImg.svg";
import helpImg from "../images/helpImg.svg"
import githubImg from "../images/githubImg.png";
import linkedinImg from "../images/linkedinImg.png";
import instagramImg from "../images/instagramImg.png";

const Container = styled.div`
  background-color: transparent;
  color: white;
  margin-left: 0;
  text-align: left;
  padding-left: 0;
`

const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 100%;
`


const P = styled.p`
  color: white;
  margin-left: 5%;
  margin-right: 5%;
`

class MoreOptions extends Component{
  constructor(props){
    super(props);
    this.state = {
      option: ""
    }
  }

  switchOption(e){
    // if user clicked on image with empty id instead of button, get option from image's button
    if (e.target.id == ""){
      this.setState({
        option: e.target.parentElement.id
      });
    }
    else{
      this.setState({
        option: e.target.id
      });
    }
  }

  render(){
    return(
      <Container>
        {
          {
            "" :
              <div style={{marginLeft: '100px', marginTop: '80px'}}>
                <Button id='helpOption' onClick={this.switchOption.bind(this)}><img src={helpImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;Help</Button>
                <br/><br/>
                <Button id='aboutUsOption' onClick={this.switchOption.bind(this)}><img src={aboutUsImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;About Us</Button>
                <br/><br/>
                <Button id='feedbackOption' onClick={this.switchOption.bind(this)}><img src={feedbackImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;Give us feedback</Button>
              </div>,
            "aboutUsOption" :
              <div style={{textAlign: 'center', paddingLeft: '5%', paddingRight: '5%', marginTop: '30px'}}>
                <h4 style={{textAlign: 'center'}}>Sophie Tong</h4>
                <p style={{textAlign: 'justify', marginTop: '-10px'}}>The designer for HalcyonDays, and an Architecture student at the University of Toronto. Find me at:</p>
                <hr/>
                <h4 style={{textAlign: 'center'}}>Talia Wang</h4>
                <p style={{textAlign: 'justify', marginTop: '-10px'}}>The developer for HalcyonDays, and a Software Engineering student at the University of Waterloo. Find me at:</p>
                <a target="_blank" href='https://github.com/TaliaWang'><img src={githubImg} style={{transform: 'translate(0, -120%)'}}/></a>
                <a target="_blank" href='https://www.linkedin.com/in/talia-wang'><img src={linkedinImg} width='60px' height='60px' style={{transform: 'translate(0, -40%)'}}/></a>
                <a target="_blank" href='https://www.instagram.com/taliawang5881'><img src={instagramImg} width='30px' height='30px' style={{transform: 'translate(0, -125%)'}}/></a>
              </div>

          }[this.state.option]
        }
      </Container>
    );
  }
}

export default MoreOptions;
