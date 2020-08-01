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
  font-size: 120%;
`

const Triangle = styled.div`
  margin-left: 50%;
  margin-top: 0.5%;
  transform: translate(-225%, 0);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid black;

  @media (max-width: 1200px) {
    transform: translate(-200%, 0);
  }
  @media (max-width: 800px) {
    transform: translate(-180%, 0);
  }
  @media (max-width: 600px) {
    transform: translate(-170%, 0);
  }
`

class NewNote extends Component{
  constructor(props){
    super(props);
    this.state = {
      newNote: ""
    }
  }

  handleNewNoteChange(e){
    this.setState({
      newNote: e.target.value
    });
  }

  submitNote(e){
    e.preventDefault();
    var db = firebase.firestore();
    db.collection("users").doc(this.props.user.uid)
    .collection("notes").doc(this.state.newNote)
    .set({
      text: this.state.newNote
    }).then(result=>{
      this.setState({
        newNote: ""
      });
    })
  }

  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <Triangle/>
        <Container>
          <Form onSubmit={this.submitNote.bind(this)}>
              <NoteInput id='note' value={this.state.newNote} onChange={this.handleNewNoteChange.bind(this)} placeholder="New Note"/>
              <button type='submit' onClick={this.props.submitNote} style={{display:'none'}}/>
          </Form>
        </Container>
      </div>
    );
  }
}

export default NewNote;
