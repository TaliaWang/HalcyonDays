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
  z-index: 40;
  position: relative;

  @media (max-width: 1200px) {
      margin: 0% 25% 10% 25%;
  }
  @media (max-width: 800px) {
      margin: 0% 20% 10% 20%;
  }
  @media (max-width: 400px) {
      margin: 0% 10% 10% 10%;
  }
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
  font-size: 120%;
`

const TimeInput = styled.input`
  border-radius: 2px;
  border: none;
  text-align: left;
  width: 100%;
  padding: 1%;
  z-index: 20;
  font-size: 120%;
`

const Triangle = styled.div`
  margin-left: 50%;
  margin-top: 0.5%;
  transform: translate(140%, 10%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid black;

  @media (max-width: 1200px) {
    transform: translate(120%, 10%);
  }
  @media (max-width: 800px) {
    transform: translate(115%, 10%);
  }
  @media (max-width: 600px) {
    transform: translate(105%, 10%);
  }
  @media (max-width: 400px) {
    transform: translate(100%, 10%);
  }
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
                  <TimeInput id='hours' type='number' pattern="\d+" min="0" step="1" value={this.props.hours} onChange={this.props.handleNewTaskChange} placeholder="Hour(s)"/>
                </div>
                <div style={{float: 'right', width: '45%', marginRight: '-1%'}}>
                  <TimeInput id='mins' type='number' pattern="\d+" min="0" step="1" value={this.props.mins} onChange={this.props.handleNewTaskChange} placeholder="Minute(s)"/>
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
