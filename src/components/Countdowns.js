import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import lockedImg from "../images/lockedImg.svg";
import unlockedImg from "../images/unlockedImg.svg";
import xImg from "../images/xImg.svg";

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  right: 1vw;
`

const CloseImg = styled.img`
  height: calc(0.8vh + 0.6vw);
  width: calc(0.8vh + 0.6vw);
  position: relative;
`

const Container = styled.div`
  position: absolute;
  text-align: left;
  background-image: linear-gradient(#FF68B8, #FFAA90);
  width: 100%;
  min-height: 30vh;
  bottom: -3vh;
  z-index: 50;
`

const LockBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
`

const H4 = styled.h4`
  color: white;
  font-size: 110%;
  display: inline;
`

const P = styled.p`
  color: white;
  font-size: calc(0.8vh + 0.6vw);
`

const TextContainer = styled.div`
  position: relative;
  margin-top: 7%;
  margin-left: 5%;
  margin-right: 5%;
`

const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  font-size: calc(1vh + 0.75vw);
  padding-top: 10px;
  padding-bottom: 5px;
  width: 20vw;
  margin-left: 5%;
  margin-right: 5%;

  @media (max-width: 800px) {
    width: 25vw;
  }
`

class Countdowns extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <Container>
        <div style={{position: 'absolute', width: '100%', zIndex: '30'}}>
          <Title>My Countdowns</Title>
          <CloseBtn><CloseImg src={xImg} onClick={this.props.hideCountdowns}/></CloseBtn>
        </div>
        <br/>
        <TextContainer>
          <P><H4>Coming soon!</H4></P>
          <P><H4>This section is for:</H4></P>
          <P><H4>- Deadlines</H4></P>
          <P><H4>- Events</H4></P>
          <P><H4>- Important dates</H4></P>
        </TextContainer>
      </Container>
    );
  }
}

export default Countdowns;
