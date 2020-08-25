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
  position: absolute;
  color: #B7C6FB;
  display: flex;
  font-size: calc(0.8vh + 0.6vw);
  text-align: left;
  padding: calc(0.4vh + 0.3vw);
  background-color: white;
  width: calc(16vh + 12vw);
  max-height: calc(6vh + 4.5vw);
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: -1px 2px 5px 0px #B7C6FB;
  margin-top: calc(-6vh - 4.5vw);
  margin-bottom: calc(0.4vh + 0.3vw);
`

const Img = styled.img`
  width: calc(3vh + 2.25vw);
  height: calc(3vh + 2.25vw);
  padding: calc(0.4vh + 0.3vw);
  position: relative;
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
          {this.props.popupMessage}
          <Img src={this.props.popupMessageImg == 'accomplishedImg'
            ? accomplishedImg
            : (this.props.popupMessageImg == 'warningImg'
              ? warningImg
              : null
            )
          }/>
      </Container>
    );
  }
}

export default PopupMessages;
