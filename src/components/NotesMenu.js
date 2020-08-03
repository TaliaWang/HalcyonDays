/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";

const BackToGeneralBtn = styled.button`
  color: white;
  border: none;
  background-color: transparent;
  width: 100%;
  text-align: center;
`

const Container = styled.div`
  background-color: #606060;
  width: 20%;
  margin: -5% 0 0 0;
  min-height: 120vh;
  position: fixed;
  overflow-y: scroll;
  -webkit-transition: 0.3s ease-out;
  -webkit-transition: 0.3s ease-in;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

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
  margin: 0 5% 5% 5%;

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
          {this.props.selectedTask == "" ? null : <BackToGeneralBtn onClick={this.props.backToGeneralNotes}>Back to General Notes</BackToGeneralBtn>}
        </Container>
      </div>
    );
  }
}

export default NotesMenu;
