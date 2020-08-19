/*global chrome*/
import React, { Component } from 'react';
import {BeatLoader} from 'react-spinners';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";
import editingImg from "../images/editingImg.svg";
import saveImg from "../images/saveImg.svg";
import xImg from "../images/xImg.svg";


const Border = styled.div`
  border: 1px solid white;
  position: fixed;
  margin: calc(2vh + 1.5vw) 2% calc(1.5vh + 1.125vw) 2%;
  height: calc(((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 50 - (3.2vh + 2.4vw)); /*height of container - some for xImg */
  width: 16%;

  @media (max-width: 800px) {
    width: 26%;
  }
`

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: calc((1.5vh + 1.125vw));
  right: 0;
  transform: translate(0, -75%);
  right: 1vw;
`

const CloseImg = styled.img`
  height: calc(0.8vh + 0.6vw);
  width: calc(0.8vh + 0.6vw);
  position: relative;
`

const CommentsInput = styled.div`
  background-color: transparent;
  border: none;
  color: white;
  font-size: calc(0.8vh + 0.6vw);
  font-weight: normal;
  bottom: calc(1.2vh + 0.8vw); /*spacing above editing/saved button*/
  top: calc(3vh + 2.25vw); /*spacing accounts for task and time inputs */
  position: absolute;
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-wrap: break-word;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: pre-wrap; /*preserves white space*/

  &:focus{
    outline: none;
  }
`

const Container = styled.div`
  background-image: linear-gradient(#FF68B8, #FFAA90);
  width: 20%;
  margin: 0;
  bottom: 0;
  height: calc(((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 50); /* 50% of view height excluding header and pink header strip */
  position: fixed;
  float: right;
  text-align: left;
  padding-bottom: 0;
  z-index: 60;

  @media (max-width: 800px) {
    width: 30%;
  }
`

const EditingSavedBtn = styled.button`
  position: absolute;
  border: 1px solid black;
  border: none;
  background-color: transparent;
  bottom: 0;
  right: 0;
`

const EditingSavedImg = styled.img`
  height: calc(1vh + 0.75vw);
  width: calc(1vh + 0.75vw);
`

const Form = styled.form`
`

const HoursInput = styled.div`
  border: none;
  min-width: 0.5em;
  height: calc(0.8vh + 0.6vw);

  &:focus{
    outline: none;
  }
`

const MinsInput = styled.div`
  border: none;
  min-width: 0.5em;
  height: calc(0.8vh + 0.6vw);

  &:focus{
    outline: none;
  }
`

const TimeInputContainer = styled.div`
  border: none;
  display: flex;
  color: white;
  font-size: calc(0.8vh + 0.6vw);
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  &:focus{
    outline: none;
  }
`

const NoteInput = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  color: white;
  font-size: calc(1vh + 0.75vw);
  font-weight: bold;
  max-height: calc(1.4vh + 1.05vw); /* one line only with a little spacing to prevent scroll with 1 line */
  padding-bottom: calc(0.4vh + 0.1vw);
  padding-top: calc(0.4vh + 0.1vw);
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-wrap: break-word;
  overflow-y: auto;
  overflow-x: hidden;

  &:focus{
    outline: none;
  }
`


class NoteComments extends Component{
  constructor(props){
    super(props);
    this.state = {
      editsMade: false,
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.selectedNote != prevProps.selectedNote){
      this.setState({
        editsMade: false
      });
    }
  }

  checkIfEditsMade(e){
    var noteInput = e.target.parentElement.parentElement.getElementsByClassName('noteComments_note')[0];
    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('noteComments_comments')[0];

    if (noteInput.innerText == this.props.selectedNote.name
      && commentsInput.innerText == this.props.selectedNote.comments){
        this.setState({
          editsMade: false
        });
    }
    else{
      this.setState({
        editsMade: true
      });
    }
  }

  discardChanges(e){
    if (this.state.editsMade){
        this.resetNote(e);
    }
    this.props.hideNoteComments();
  }

  resetNote(e){
    //reset this task to values before it was being edited
    var noteInput = e.target.parentElement.parentElement.getElementsByClassName('noteComments_note')[0];
    noteInput.innerText = this.props.selectedNote.name;

    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('noteComments_comments')[0];
    commentsInput.innerText = this.props.selectedNote.comments;
  }

  saveNote(e){
    var noteInput = e.target.parentElement.parentElement.getElementsByClassName('noteComments_note')[0];
    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('noteComments_comments')[0];

    var db = firebase.firestore();
    var notesRef = db.collection("users").doc(this.props.user.uid)
    .collection('notes');

    if (this.props.selectedNote.name == ""){
      // add a new note
      var date = new Date();
      notesRef.doc(noteInput.textContent)
      .set({
        name: noteInput.textContent,
        comments: commentsInput.innerText,
        timestamp: firebase.firestore.Timestamp.fromDate(date)
      }).then(()=>{
        this.props.changeSelectedNoteFromNoteComments(noteInput);
      });
    }
    // rest of these cases deal with editing an existing note
    else if (noteInput.innerText == ""){
      alert("Please enter a note name to save this note.");
    }
    else if (noteInput.innerText == this.props.selectedNote.name){
      // we can just update the fields of this note in the database
      var db = firebase.firestore();
      notesRef.doc(noteInput.textContent)
      .update({
        name: noteInput.textContent,
        comments: commentsInput.innerText
      }).then(()=>{
        this.props.changeSelectedNoteFromNoteComments(noteInput);
      });
    }
    else if (noteInput.innerText != this.props.selectedNote.name){
      // we have to delete this task and create a new one
      var oldDate;
      var oldFinished;
      var db = firebase.firestore();

      // store the old timestamp and finished state
      notesRef.doc(this.props.selectedNote.name).get()
      .then(doc=>{
        oldDate = doc.data().timestamp.toDate();
        oldFinished = doc.data().finished;
      }).then(()=>{
        // delete old task
        notesRef.doc(this.props.selectedNote.name).delete();
        // create a new task with the edited information and old timestamp
        notesRef.doc(noteInput.textContent).set({
          name: noteInput.textContent,
          comments: commentsInput.innerText,
          timestamp: firebase.firestore.Timestamp.fromDate(oldDate)
        }).then(()=>{
          this.props.changeSelectedNoteFromNoteComments(noteInput);
        });
      });
    }
  }

  render(){
    return(
      <Container>
        <CloseBtn><CloseImg src={xImg} onClick={this.discardChanges.bind(this)}/></CloseBtn>
        <Border>
          <NoteInput className='noteComments_note' onInput={this.checkIfEditsMade.bind(this)} contentEditable={true}>{this.props.selectedNote.name}</NoteInput>
          <CommentsInput className='noteComments_comments' onInput={this.checkIfEditsMade.bind(this)} contentEditable={true}>{this.props.selectedNote.comments}</CommentsInput>
          {this.state.editsMade?<EditingSavedBtn onClick={this.saveNote.bind(this)}><EditingSavedImg src={saveImg}/></EditingSavedBtn> : null}
        </Border>
      </Container>
    );
  }
}

export default NoteComments;
