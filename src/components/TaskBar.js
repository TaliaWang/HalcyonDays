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
  width: 20px;
  border-left: 1px solid white;
  background-color: black;
`


class TaskBar extends Component{
  constructor(props){
    super(props);
    this.barHeight = '25px';
    this.minsInDay = 60*24;
    this.state = {
      timePassedWidth: 0,
      unfinishedTasks: this.props.unfinishedTasks
    }
  }

  updateMainBarTimePassed(){
    // calculate time passed in day in minutes
    var d = new Date();
    var timePassedMins = d.getHours()*60 + d.getMinutes();

    // calculate percentage width that the time passed section should be
    var widthPercent = (timePassedMins/this.minsInDay)*100;
    this.setState({
      timePassedWidth: widthPercent
    })
  }

  componentDidMount(){
    // determine whether this is main page bar or sub-task bar
    if (this.props.type == 'mainBar'){

      this.updateMainBarTimePassed();
      // update the time passed in bar every minute
      setInterval(this.updateMainBarTimePassed(), 60000);
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.unfinishedTasks != prevProps.unfinishedTasks){
      this.setState({
        unfinishedTasks: this.props.unfinishedTasks
      })
    }
  }

  render(){
    return(
      <Container height={this.height}>
        <div style={{display: 'flex', width: '100%'}}>
          <TimePassed height={this.barHeight} width={this.state.timePassedWidth}></TimePassed>
          {this.props.unfinishedTasks.map((task, index) =>
            <UnfinishedTask id={`unfinished_${task}${index}`} task={task}/>
          )}
        </div>
      </Container>
    );
  }
}

export default TaskBar;
