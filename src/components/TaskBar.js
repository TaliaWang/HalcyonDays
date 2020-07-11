/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
`

const TimeContainer = styled.div`
  margin: 20% 25% 0 25%;
  height: ${props => props.height}px;
  display: flex;
`

const TasksContainer = styled.div`
  border: 1px solid rgba(112,112,112,1);
  margin: -43px 25% 0 25%;
  height: ${props => props.height}px;
  display: flex;
  z-index: 5;
  width: 50%;
`

const SleepTime = styled.div`
  height: 40px;
  width: 70%;
  float: right;
  background-color: #AFEEEE;
`

const TimePassed = styled.div`
  height: ${props => props.height}px;
  margin-left: ${props => props.width}%;
  margin-top: -5px;
  margin-bottom: -5px;
  min-width: 5px;
  border: 1px solid black;
  background-color: transparent;
  z-index: 10;
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
    this.barHeight = 50;
    this.barHeightUnit = 'px';
    this.minsInDay = 60*24;
    this.state = {
      timePassedWidth: this.props.timePassedWidth,
      unfinishedTasks: this.props.unfinishedTasks,
      sleepHour: this.props.sleepHour,
      sleepMin: this.props.sleepMin,
      width: 0,
    }
  }

  calculateSleepWidth(){
    // width of sleep section
  }

  componentDidMount(){
    this.calculateSleepWidth();
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
    this.calculateSleepWidth();
  }

  getTaskWidth(task){
    var totalMins = task.hours*60 + task.mins;
    var widthPercent = totalMins/this.minsInDay*100;
    //alert(widthPercent);
    return widthPercent;
  }

  render(){
    return(
      <div style={{display: 'block'}}>
      {/* tasks container is on top of time container*/}
      <TimeContainer height={this.barheight}>
          <TimePassed height={this.barHeight} width={this.state.timePassedWidth}></TimePassed>
          {/*this.props.unfinishedTasks.map((task, index) =>
            <UnfinishedTask id={`unfinished_${task}${index}`} task={task} width={this.getTaskWidth(task)}/>
          )*/}
      </TimeContainer>
      <TasksContainer height={this.barheight}>
        <div style={{width: '100%'}}>
          <SleepTime></SleepTime>
        </div>
      </TasksContainer>
      </div>
    );
  }
}

export default TaskBar;
