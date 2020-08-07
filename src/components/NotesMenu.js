/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";

const BackToGeneralBtn = styled.button`
  color: white;
  border-top: 1px solid white;
  border-right: none;
  border-left: none;
  border-bottom: none;
  background-color: #606060;
  font-size: 100%;
  width: 20%;
  text-align: center;
  bottom: 1vh;
  height: 7vh;
  padding: 1vh;
  position: fixed;

  @media (max-width: 800px) {
    width: 30%;
  }
  @media (max-width: 600px) {
    font-size: 80%;
    bottom: 5vh;
    height: 10vh;
  }
`

const Container = styled.div`
  background-color: #606060;
  width: 20%;
  margin: -5% 0 0 0;
  height: 100vh;
  position: fixed;

  @media (max-width: 1200px) {
    width: 20%;
  }
  @media (max-width: 800px) {
    width: 30%;
  }
`

const EditBtn = styled.button`
  background: none;
  border: none;
  font-size: 120%;
  color: white;
  display: none;
  transform: translate(0, -25%);

  &:hover{
    font-size: 140%;
  }

  @media (max-width: 600px) {
      transform: translate(0, -15%);
  }
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding: 5% 0% 5% 0%;
`

const H3 = styled.h3`
  text-align: center;
  color: white;
  margin: 0 5% 0% 5%;
  border-bottom: 1px solid white;
  padding: 3%;

  @media (max-width: 600px) {
      font-size: 100%;
  }
`

const Img = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
`

const Label = styled.label`
  color: white;
  font-size: 120%;
`

const P = styled.p`
  font-size: 120%;
  color: white;
  margin-top: 0.5%;
`

const Textarea = styled.div`
  cursor: default;
  font-size: 120%;
  width: 100%;
  min-height: 1em;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  position: relative;
  color: white;
  background-color: transparent;
  margin-top: 0;
  margin-bottom: 0;
  font-family: openSansRegular;
  resize: none;
  border: none;

  &:focus{
    outline: none;
  }

  @media (max-width: 600px) {
      font-size: 100%;
  }
`

const Ul = styled.ul`
  margin-top: 2%;
  margin-right: 3%;
  color: white;
  height: 80vh;
  overflow-y: scroll;
  overflow-x: scroll;
  z-index: 20;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  @media (max-width: 600px) {
    font-size: 80%;
    height: 75vh;
  }
`

const XBtn = styled.button`
  background: none;
  border: none;
  font-size: 120%;
  color: white;
  display: none;
  transform: translate(0, -25%);

  &:hover{
    font-size: 140%;
  }

  @media (max-width: 600px) {
      transform: translate(0, -15%);
  }
`

class NotesMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      notes: this.props.notes,
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.notes != this.state.notes){
      this.setState({
        notes: [],
      }, ()=>{
        this.setState({
          notes: this.props.notes
        })
      })
    }
  }

  enableNoteEdit(e){
    var textarea = e.target.parentElement.getElementsByClassName('noteText')[0];
    textarea.contentEditable = true;
    textarea.style.cursor='text';

    var oldNote = textarea.textContent;

    // add listener for enter to submit new note
    textarea.addEventListener('keypress', event =>{
      if (event.keyCode == 13){
        event.preventDefault();
        var editedNote = textarea.textContent.trim();

        var date;
        var db = firebase.firestore();
        var notesCollectionRef;

        if (this.props.selectedTask == ""){
          // find note from general notes
          notesCollectionRef = db.collection("users").doc(this.props.user.uid).collection("notes");
          notesCollectionRef.doc(oldNote).get()
          .then(doc=>{
            // record the old timestamp to assign this to edited note
            date = doc.data().timestamp.toDate();
          }).then(()=>{
            // delete old note and create a new one with edited note
            notesCollectionRef.doc(oldNote).delete();
            notesCollectionRef.doc(editedNote).set({
              text: editedNote,
              timestamp: firebase.firestore.Timestamp.fromDate(date)
            });
          })
        }
        else{
          // find note from selected task notes
          notesCollectionRef = db.collection("users").doc(this.props.user.uid)
          .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
          .collection("tasks").doc(this.props.selectedTask)
          .collection('notes');

          notesCollectionRef.doc(oldNote).get()
          .then(doc=>{
            // record the old timestamp to assign this to edited note
            date = doc.data().timestamp.toDate();
          }).then(()=>{
            // delete old note and create a new one with edited note
            notesCollectionRef.doc(oldNote).delete();
            notesCollectionRef.doc(editedNote).set({
              text: editedNote,
              timestamp: firebase.firestore.Timestamp.fromDate(date)
            });
          })
        }
        textarea.contentEditable = false;
        textarea.style.cursor = 'pointer';
      }
    })
  }

  deleteNote(e){
    // parse the note name
    var listItem = e.target.parentElement;
    var note = listItem.getElementsByClassName("noteText")[0].innerHTML;

    var db = firebase.firestore();
    if (this.props.selectedTask == ""){
      // delete note from general notes
      db.collection("users").doc(this.props.user.uid)
      .collection("notes").doc(note).delete();
    }
    else{
      // delete notes from selected task
      db.collection("users").doc(this.props.user.uid)
      .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
      .collection("tasks").doc(this.props.selectedTask)
      .collection('notes').doc(note).delete();
    }
  }

  displayBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='inline-block';

    var button = e.target.parentElement.getElementsByClassName('editBtn')[0];
    button.style.display='inline-block';
  }

  hideBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='none';

    var button = e.target.parentElement.getElementsByClassName('editBtn')[0];
    button.style.display='none';
  }

  render(){
    return(
      <div onMouseLeave={this.props.toggleShowNotesMenu} style={{textAlign: 'left'}}>
        <Container>
          <br/><br/>
          {this.props.selectedTask == "" ? <H3>General Notes</H3> : <H3>Notes for: {this.props.selectedTask}</H3>}
          <Ul>
            {this.state.notes.map((note, index) =>
              <li className="note" onMouseOver={this.displayBtns.bind(this)} onMouseLeave={this.hideBtns.bind(this)} id={`${note}${index}_label`}>
                <div style={{display: "flex"}}>
                  <Textarea className="noteText" contentEditable={false}>{note.text}</Textarea>
                  <EditBtn className='editBtn' onClick={this.enableNoteEdit.bind(this)}>✎</EditBtn>
                  <XBtn className="XBtn" onClick = {this.deleteNote.bind(this)}>✖</XBtn>
                </div>
              </li>
            )}
          </Ul>
          <BackToGeneralBtn onClick={this.props.backToGeneralNotes}>Back to General Notes</BackToGeneralBtn>
        </Container>
      </div>
    );
  }
}

export default NotesMenu;
