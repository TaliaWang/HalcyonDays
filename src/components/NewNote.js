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
  margin: 0 10% 0 10%;
  text-align: center;
  padding-top: 5%;
  padding-bottom: 5%;
`

const H3 = styled.h3`
`

const P = styled.p`
`

const NoteInput = styled.input`
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
  transform: translate(-150%, 0);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid black;
`

class NewNote extends Component{
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
              <NoteInput id='task' value={this.props.task} onChange={this.props.handleNewTaskChange} placeholder="New Note"/>
              <button type='submit' onClick={this.props.submitTask} style={{display:'none'}}/>
          </Form>
        </Container>
      </div>
    );
  }
}

export default NewNote;
