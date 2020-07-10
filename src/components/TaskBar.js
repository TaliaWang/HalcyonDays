/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
`

const Container = styled.div`
  border: 1px solid rgba(112,112,112,1);
  margin: 20% 25% 0 25%;
  height: ${props => props.height};
`

const TimePassed = styled.div`
  height: ${props => props.height};
  width: ${props => props.width}%;
  background-color: grey;
`

const UnfinishedTask = styled.div`
  height: ${props => props.height};
  width: ${props => props.width}%;
  border-left: 1px solid white;
  background-color: black;
`


class TaskBar extends Component{
  constructor(props){
    super(props);
    this.barHeight = '40px';
    this.minsInDay = 60*24;
    this.state = {
      timePassedWidth: this.props.timePassedWidth,
      unfinishedTasks: this.props.unfinishedTasks
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.unfinishedTasks != prevProps.unfinishedTasks){
      this.setState({
        unfinishedTasks: this.props.unfinishedTasks
      })
    }
    if (this.props.type == 'mainBar'){
      if (this.props.timePassedWidth != prevProps.timePassedWidth){
        this.setState({
          timePassedWidth: this.props.timePassedWidth
        })
      }
    }
  }

  getTaskWidth(task){
    var totalMins = task.hours*60 + task.mins;
    var widthPercent = totalMins/this.minsInDay*100;
    //alert(widthPercent);
    return widthPercent;
  }

  render(){
    return(
      <Container height={this.height}>
        <div style={{display: 'flex', width: '100%'}}>
          <TimePassed height={this.barHeight} width={this.state.timePassedWidth}></TimePassed>
          {this.props.unfinishedTasks.map((task, index) =>
            <UnfinishedTask id={`unfinished_${task}${index}`} task={task} width={this.getTaskWidth(task)}/>
          )}
        </div>
      </Container>
    );
  }
}

export default TaskBar;
