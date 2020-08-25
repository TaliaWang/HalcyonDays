/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import feedbackImg from "../images/feedbackImg.svg";
import aboutUsImg from "../images/aboutUsImg.svg";
import helpImg from "../images/helpImg.svg";
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

const BackBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 150%;
  transform: rotate(180deg);
  position: absolute;
  left: 5%;
  bottom: 0;
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

  render(){
    return(
      <Container>
        {
          {
            "moreOption" :
              <div style={{marginLeft: '100px', marginTop: '80px'}}>
                <Button id='helpOption' onClick={this.props.switchHeaderOption}><img src={helpImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;Help</Button>
                <br/><br/>
                <Button id='aboutUsOption' onClick={this.props.switchHeaderOption}><img src={aboutUsImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;About us</Button>
                <br/><br/>
                <Button id='feedbackOption' onClick={this.props.switchHeaderOption}><img src={feedbackImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;Give us feedback</Button>
              </div>,
            "helpOption":
              <div style={{marginTop: '40px'}}>
                  <h4 style={{textAlign: 'center'}}>Time bar legend</h4>
                  <p style={{textAlign: 'center', marginTop: '-10px'}}>Coming soon!</p>
                  <BackBtn onClick={this.props.goBackInMoreOption}>➤</BackBtn>
              </div>,
            "aboutUsOption" :
              <div style={{textAlign: 'center', paddingLeft: '5%', paddingRight: '5%', marginTop: '40px'}}>
                <h4 style={{textAlign: 'center'}}>Sophie Tong</h4>
                <p style={{textAlign: 'justify', marginTop: '-20px'}}>The designer for HalcyonDays, and an Architecture student at the University of Toronto. Find me at:</p>
                <a target="_blank" href='https://www.linkedin.com/in/sophie-tong-7328241b4'><img src={linkedinImg} width='60px' height='60px' style={{transform: 'translate(-20%, -50%)'}}/></a>
                <a target="_blank" href='https://www.instagram.com/che_____n'><img src={instagramImg} width='30px' height='30px' style={{transform: 'translate(-20%, -145%)'}}/></a>
                <hr style={{marginTop: '-40px'}}/>
                <h4 style={{textAlign: 'center', marginTop: '0px'}}>Talia Wang</h4>
                <p style={{textAlign: 'justify', marginTop: '-20px'}}>The developer for HalcyonDays, and a Software Engineering student at the University of Waterloo. Find me at:</p>
                <a target="_blank" href='https://github.com/TaliaWang'><img src={githubImg} style={{transform: 'translate(0, -120%)'}}/></a>
                <a target="_blank" href='https://www.linkedin.com/in/talia-wang'><img src={linkedinImg} width='60px' height='60px' style={{transform: 'translate(0, -40%)'}}/></a>
                <a target="_blank" href='https://www.instagram.com/taliawang5881'><img src={instagramImg} width='30px' height='30px' style={{transform: 'translate(0, -125%)'}}/></a>
                <BackBtn onClick={this.props.goBackInMoreOption}>➤</BackBtn>
              </div>,
            "feedbackOption":
              <div style={{textAlign: 'center', paddingLeft: '5%', paddingRight: '5%', marginTop: '60px'}}>
                <h4 style={{textAlign: 'center'}}>Thank you for using HalcyonDays!</h4>
                <p style={{textAlign: 'center', marginTop: '-10px'}}>
                  Send us an email at:<br/><br/>
                  talia6075881@gmail.com<br/>
                  sophietongchen@gmail.com<br/><br/>
                  if you have any suggestions on how this app can be improved. Your feedback is much appreciated! :)
                </p>
                <BackBtn onClick={this.props.goBackInMoreOption}>➤</BackBtn>
              </div>,
          }[this.props.headerOption]
        }
      </Container>
    );
  }
}

export default MoreOptions;
