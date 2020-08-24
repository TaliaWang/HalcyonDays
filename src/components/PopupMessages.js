import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import lockedImg from "../images/lockedImg.svg";
import unlockedImg from "../images/unlockedImg.svg";
import xImg from "../images/xImg.svg";

const Container = styled.div`
  position: relative;
  color: #B7C6FB;
  font-size: calc(0.8vh + 0.6vw);
  text-align: left;
  padding: calc(0.2vh + 0.15vw);
  background-color: white;
  width: calc(16vh + 12vw);
  height: calc(3vh + 2.25vw);
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: -1px 2px 5px 0px #B7C6FB;
  margin-top: calc(0.8vh + 0.6vw);
  margin-bottom: calc(1.6vh + 1.2vw);
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
        A friendly reminder!
      </Container>
    );
  }
}

export default PopupMessages;
