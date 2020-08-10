/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';

const Container = styled.div`
display: flex;
z-index: 20;
margin-left: -122%;
@media (max-width: 1200px) {
    margin-left: -112%;
    margin-top: 15%;
    position: fixed;
}
@media (max-width: 1000px) {
    margin-left: -115%;
    margin-top: 20%;
    position: fixed;
}
@media (max-width: 800px) {
    margin-left: -132%;
    margin-top: 25%;
    position: fixed;
}
@media (max-width: 600px) {
    margin-left: -140%;
    margin-top: 40%;
    position: fixed;
}
@media (max-width: 400px) {
    margin-left: -142%;
    margin-top: 50%;
    position: fixed;
}
`

const StatsContainer = styled.div`
  text-align: left;
  background-color: black;
  position: fixed;
  margin-left: 80%;
  margin-top: -140px;
  width: 17%;
  min-height: 25%;
  border-radius: 10px;
  z-index: 20;
  @media (max-width: 1200px) {
      width: 35%;
  }
  @media (max-width: 1000px) {
      width: 40%;
  }
  @media (max-width: 800px) {
      width: 50%;
  }
  @media (max-width: 600px) {
      width: 60%;
  }
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
`

const Triangle = styled.div`
  margin-left: ${props=>props.marginLeft};
  transform: translate(-70%, -150%) rotate(270deg);
  position: fixed;
  z-index: 20;
  width: 0;
  height: 0;
  border-left: ${props=>props.left} solid transparent;
  border-right: ${props=>props.right} solid transparent;
  border-bottom: ${props=>props.bottom} solid black;

  @media (max-width: 1200px) {
      display: none;
  }
`

class Statistics extends Component{
  constructor(props){
    super(props);
    this.state = {
      numTasks: this.props.numTasks,
      numFinishedTasks: this.props.numFinishedTasks,
      relaxationTimeHours: this.props.relaxationTimeHours,
      relaxationTimeMins: this.props.relaxationTimeMins,
      sleepTimeHours: this.props.sleepTimeHours,
      sleepTimeMins: this.props.sleepTimeMins,
      hoursNeededForTasks: this.props.hoursNeededForTasks,
      minsNeededForTasks: this.props.minsNeededForTasks
    }
  }

  render(){
    return(
      <Container>
        <StatsContainer>
          <P><H4>{this.state.numFinishedTasks}/{this.state.numTasks}</H4> tasks completed</P>
          <P><H4>{this.state.numTasks-this.state.numFinishedTasks}</H4> task(s) incomplete</P>
          <P><H4>{this.state.hoursNeededForTasks}</H4>h <H4>{this.state.minsNeededForTasks}</H4>m needed for incomplete tasks</P>
          <P>Relaxation time = <H4>{this.state.relaxationTimeHours}</H4>h <H4>{this.state.relaxationTimeMins}</H4>m</P>
          <P>Sleep time = <H4>{this.state.sleepTimeHours}</H4>h <H4>{this.state.sleepTimeMins}</H4>m</P>
        </StatsContainer>
        <Triangle left='18px' right='18px' bottom='2.2vh' marginLeft='80%'/>
      </Container>
    );
  }
}

export default Statistics;
