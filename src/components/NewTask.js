/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
`
const Container = styled.div`
  margin: 0% 35% 10% 35%;
  background-color: black;
  border-radius: 10px;
  z-index: 20;
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding-top: 5%;
`

const H3 = styled.h3`
`

const P = styled.p`
`

const TaskInput = styled.input`
  border-radius: 2px;
  border: none;
  text-align: left;
  width: 100%;
  padding: 1%;
  z-index: 20;
`

const TimeInput = styled.input`
  border-radius: 2px;
  border: none;
  text-align: left;
  width: 100%;
  padding: 1%;
  z-index: 20;
`

const Triangle = styled.div`
  margin-left: 50%;
  margin-top: 0.5%;
  transform: translate(-50%, 0);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid black;
`

class NewTask extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <Triangle/>
        <Container>
          <Form onSubmit={this.props.submitTask}>
              <div style={{display: 'block', backgroundColor: 'black', margin: '0 0 5% 0'}}>
                <TaskInput id='task' value={this.props.task} onChange={this.props.handleNewTaskChange} placeholder="New Task"/>
              </div>
              <div style={{paddingBottom: '15%'}}>
                <div style={{float: 'left', width: '45%'}}>
                  <TimeInput id='hours' pattern="\d+" min="1" step="1" type='number' value={this.props.hours} onChange={this.props.handleNewTaskChange} placeholder="Hour(s)"/>
                </div>
                <div style={{float: 'right', width: '45%', marginRight: '-1%'}}>
                  <TimeInput id='mins' pattern="\d+" min="0" step="1" type='number' value={this.props.mins} onChange={this.props.handleNewTaskChange} placeholder="Minute(s)"/>
                </div>
              </div>
              <button type='submit' onClick={this.props.submitTask} style={{display:'none'}}/>
          </Form>
        </Container>
      </div>
    );
  }
}

export default NewTask;