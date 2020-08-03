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
  bottom: 0;
  height: 7vh;
  padding: 1vh;
  position: fixed;
  z-index: 50;

  @media (max-width: 800px) {
    width: 30%;
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
const Ul = styled.ul`
  margin-top: 2%;
  margin-right: 3%;
  color: white;
  height: 100vh;
  overflow-y: scroll;
  z-index: 20;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  @media (max-width: 600px) {
    font-size: 80%;
  }
`

const XBtn = styled.button`
  background: none;
  border: none;
  font-size: 120%;
  color: white;
  display: none;
  margin-top: -5%;
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

  deleteNote(e){
    // parse the note name
    var listItem = e.target.parentElement;
    var note = listItem.getElementsByClassName("noteText")[0].innerHTML;

    var db = firebase.firestore();
    db.collection("users").doc(this.props.user.uid)
    .collection("notes").doc(note).delete();
  }

  displayX(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='inline-block';
  }

  hideX(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0];
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
              <li className="note" onMouseOver={this.displayX.bind(this)} onMouseLeave={this.hideX.bind(this)} id={`${note}${index}_label`}>
                <div style={{display: "flex"}}>
                  <P className="noteText">{note.text}</P>
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
