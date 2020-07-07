/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
`
const Container = styled.div`
  margin: 0% 25% 1% 25%;
  background-color: black;
  border-radius: 10px;
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding: 5% 0% 5% 0%;
`

const H3 = styled.h3`
`

const P = styled.p`
`

const TaskInput = styled.input`
  border: 1px solid rgba(112,112,112,1);
  text-align: center;
  font-size: 130%;
  width: 100%;
  font-family: ISOCT2;
  font-weight: bold;
  padding: 1% 0 0 0;
`

const TimeInput = styled.input`
  border: 1px solid rgba(112,112,112,1);
  text-align: center;
  font-size: 130%;
  width: 100%;
  font-family: ISOCT2;
  font-weight: bold;
  padding: 1% 0 0 0;
`

const Triangle = styled.div`
  margin: 1% 48% 0 49%;
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
          <Form>
              <div style={{display: 'block', backgroundColor: 'black', padding: '1%', margin: '0 0 5% 0'}}>
                <TaskInput id='task' value={this.props.task} onChange={this.props.handleNewTaskChange} placeholder="ENTER TASK"/>
              </div>
              <div style={{display: 'block', padding: '1%'}}>
                <div style={{display: 'flex'}}>
                  <TimeInput id='hours' value={this.props.hours} onChange={this.props.handleNewTaskChange} placeholder="HOURS"/>
                  <TimeInput id='mins' value={this.props.mins} onChange={this.props.handleNewTaskChange} placeholder="MINUTES"/>
                </div>
              </div>
              <button onClick={this.props.submitTask} style={{display:'none'}}/>
          </Form>
        </Container>
      </div>
    );
  }
}

export default NewTask;
