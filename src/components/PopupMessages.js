import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import lockedImg from "../images/lockedImg.svg";
import unlockedImg from "../images/unlockedImg.svg";
import xImg from "../images/xImg.svg";
import accomplishedImg from "../images/accomplishedImg.png";
import warningImg from "../images/warningImg.png";

const Container = styled.div`
  position: relative;
  color: #B7C6FB;
  font-size: calc(0.8vh + 0.6vw);
  text-align: left;
  padding: calc(0.4vh + 0.3vw);
  background-color: white;
  width: calc(16vh + 12vw);
  height: calc(5vh + 3.75vw);
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: -1px 2px 5px 0px #B7C6FB;
  margin-top: calc(0.8vh + 0.6vw);
  margin-bottom: calc(1.6vh + 1.2vw);
`

const Img = styled.img`
  width: calc(3vh + 2.25vw);
  height: calc(3vh + 2.25vw);
  position: relative;
  margin-top: 50%;
  transform: translate(0, -50%);
`

const P = styled.p`
  color: white;
  font-size: calc(0.8vh + 0.6vw);
`

class PopupMessages extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <Container>
        <div style={{float: 'left', width: 'calc(12vh + 9vw)'}}>
          {this.props.popupMessage}
        </div>
        <div style={{float: 'right'}}>
          <Img src={this.props.popupMessageImg == 'accomplishedImg'
            ? accomplishedImg
            : (this.props.popupMessageImg == 'warningImg'
              ? warningImg
              : null
            )
          }/>
        </div>
      </Container>
    );
  }
}

export default PopupMessages;
