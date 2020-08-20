import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import newItemImg from "../images/newItemImg.svg";
import lockedImg from "../images/lockedImg.svg";
import unlockedImg from "../images/unlockedImg.svg";
import xImg from "../images/xImg.svg";

const BackBtn = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: rotate(180deg) translate(-50%, 25%);
  font-size: calc(1vh + 0.75vw);
`

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
  position: fixed;
  text-align: left;
  background-image: linear-gradient(#FF68B8, #FFAA90);
  width: 30%;
  height: calc(15vh + 11.25vw);
  overflow-y: hidden;
  bottom: 0;
  z-index: 50;

  @media (max-width: 800px) {
    width: 40%;
  }
`

const NewCountdownImg = styled.img`
  border: none;
  outline: none;
  background-color: transparent;
  height: calc(2vh + 1.5vw);
  width: calc(2vh + 1.5vw);
  position: relative;
`

const NewCountdownBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  bottom: calc(-0.2vh - 0.15vw);
  right: 0;
`

const P = styled.p`
  color: white;
  font-size: calc(0.8vh + 0.6vw);
`

const TextContainer = styled.div`
  position: relative;
  border: 1px solid black;
  top: calc(2vh + 1.5vw);
  margin-left: 5%;
  margin-right: calc(2.5vh + 1.875vw);
  height: calc(12vh + 9vw);
  overflow-y: auto;
`

const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  font-size: calc(1vh + 0.75vw);
  padding-top: calc(0.4vh + 0.1vw);
  padding-bottom: calc(0.4vh + 0.1vw);
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
      showCountdownsList: true
    }
  }


  hideCountdownsList(){
    this.setState({
      showCountdownsList: false
    });
  }

  showCountdownsList(){
    this.setState({
      showCountdownsList: true
    });
  }

  render(){
    return(
      <Container>
        <div style={{position: 'absolute', width: '100%', zIndex: '30'}}>
          <Title>{this.state.showCountdownsList ? "My Countdowns" : "New Countdown"}</Title>
          <CloseBtn><CloseImg src={xImg} onClick={this.props.hideCountdowns}/></CloseBtn>
        </div>
        {this.state.showCountdownsList
          ?
          <div>
            <TextContainer>
              <P>Coming soon!</P>
            </TextContainer>
            <NewCountdownBtn onClick={this.hideCountdownsList.bind(this)}><NewCountdownImg src={newItemImg}/></NewCountdownBtn>
          </div>
          : <div>
              <BackBtn onClick={this.showCountdownsList.bind(this)}>➤</BackBtn>
            </div>
        }
      </Container>
    );
  }
}

export default Countdowns;
