/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';

const Container = styled.div`
  text-align: left;
  background-color: black;
  position: fixed;
  margin-left: 80%;
  margin-top: -130px;
  width: 17%;
  height: 30%;
  border-radius: 10px;
  z-index: 20;
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
        <P><H4>{this.state.numFinishedTasks}/{this.state.numTasks}</H4> tasks completed</P>
        <P><H4>{this.state.numTasks-this.state.numFinishedTasks}</H4> task(s) incomplete</P>
        <P><H4>{this.state.hoursNeededForTasks}</H4>h <H4>{this.state.minsNeededForTasks}</H4>m needed for incomplete tasks</P>
        <P>Relaxation time = <H4>{this.state.relaxationTimeHours}</H4>h <H4>{this.state.relaxationTimeMins}</H4>m</P>
        <P>Sleep time = <H4>{this.state.sleepTimeHours}</H4>h <H4>{this.state.sleepTimeMins}</H4>m</P>
      </Container>
    );
  }
}

export default Statistics;
