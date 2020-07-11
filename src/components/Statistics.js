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
      relaxationHours: this.props.relaxationHours,
      relaxationMins: this.props.relaxationMins,
      sleepHours: this.props.sleepHours,
      sleepMins: this.props.sleepMins,
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
        <P>Relaxation time = <H4>{this.state.relaxationHours}</H4>h <H4>{this.state.relaxationMins}</H4>m</P>
        <P>Sleep time = <H4>{this.state.sleepHours}</H4>h <H4>{this.state.sleepMins}</H4>m</P>
      </Container>
    );
  }
}

export default Statistics;
