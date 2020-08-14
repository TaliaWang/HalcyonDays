/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import lockedImg from "../images/lockedImg.svg";
import unlockedImg from "../images/unlockedImg.svg";

const Container = styled.div`
  position: absolute;
  text-align: left;
  background-image: linear-gradient(#FF68B8, #FFAA90);
  width: 100%;
  height: 100%;
  bottom: -3vh;
  z-index: 20;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
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
  margin-left: 5%;
  margin-right: 5%;

  @media (max-width: 600px) {
    font-size: 80%;
  }
`

const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  font-size: 150%;
  padding-top: 10px;
  padding-bottom: 5px;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;

  @media (max-width: 600px) {
    font-size: 100%;
  }
`

class Statistics extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <Container onMouseLeave={this.props.hideStatistics}>
        <Title>
          <LockBtn onClick={this.props.toggleStatisticsLocked}><img height='20px' width='20px' src={this.props.statisticsLocked ? lockedImg : unlockedImg}/></LockBtn>
          &nbsp;My Stats
        </Title>
        <P><H4>{this.props.numFinishedTasks}/{this.props.numTasks}</H4> tasks completed</P>
        <P><H4>{this.props.numTasks-this.props.numFinishedTasks}</H4> task(s) incomplete</P>
        <P><H4>{this.props.hoursNeededForTasks}</H4>h <H4>{this.props.minsNeededForTasks}</H4>m needed for incomplete tasks</P>
        <P>Relaxation time = <H4>{this.props.relaxationTimeHours}</H4>h <H4>{this.props.relaxationTimeMins}</H4>m</P>
        <P>Sleep time = <H4>{this.props.sleepTimeHours}</H4>h <H4>{this.props.sleepTimeMins}</H4>m</P>
      </Container>
    );
  }
}

export default Statistics;
