/*global chrome*/
import React, { Component } from 'react';
import {BeatLoader} from "react-spinners"
import firebase from '../firebase';
import styled from 'styled-components';
import xImg from "../images/xImg.svg";
import newItemImg from "../images/newItemImg.svg";

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -75%);
  right: 1vw;
`

const CloseImg = styled.img`
  height: calc(0.8vh + 0.6vw);
  width: calc(0.8vh + 0.6vw);
  position: relative;
`

const Container = styled.div`
  background-image: linear-gradient(#FF68B8, #FFAA90);
  width: 20%;
  top: 0;
  height: calc(100vh - (2vh + 1.5vw) - (0.6vh + 0.45vw));
  padding-top: calc(3vh + 2.25vw);
  position: fixed;
  float: left;
  z-index: 50;

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

const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  font-size: calc(1vh + 0.75vw);
  padding-bottom: calc(0.4vh + 0.1vw);
  width: 15vw;
  margin-left: 5%;
  margin-right: 5%;

  @media (max-width: 800px) {
    width: 22vw;
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

const NewNoteBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  bottom: ${props=>props.showNoteComments
        // calculate button height above note comments box with some buffer
    ?  'calc((((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 50) + (0.4vh + 0.1vw))'
    : 'calc(0.4vh + 0.1vw)'
  };
  transition: bottom 0.3s;
  right: 0;
`

const NewNoteImg = styled.img`
  border: none;
  outline: none;
  background-color: transparent;
  height: calc(2vh + 1.5vw);
  width: calc(2vh + 1.5vw);
  position: relative;
`

const P = styled.p`
  font-size: calc(0.8vh + 0.6vw);
  color: white;
  margin-top: 0.5%;
  width: 100%;
  cursor: pointer;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`

const Ul = styled.ul`
  font-size: calc(0.8vh + 0.6vw);
  color: white;
  left: 0;
  right: calc(2.4vh + 1.8vw);
  top: calc(4vh + 3vw);
  bottom: ${props=>props.showNoteComments
    ? 'calc(((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 50)' // account for note comments height
    : 'calc(2vh + 1.5vw)'
  };
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 20;
`

const XBtn = styled.button`
  background: none;
  border: none;
  font-size: calc(0.8vh + 0.6vw);
  color: white;
  display: none;
  transform: translate(0, -25%);
`

class NotesMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      notes: this.props.notes
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.notes != this.state.notes){
      this.setState({
        notes: [],
      }, ()=>{
        this.setState({
          notes: this.props.notes
        });
      })
    }
  }

  deleteNote(e){
    // parse the note name
    var listItem = e.target.parentElement;
    var note = listItem.getElementsByClassName("noteText")[0].innerHTML;

    var confirmDelete = window.confirm(`Are you sure you want to delete "${note}?"`);

    if (confirmDelete){
      var db = firebase.firestore();
      db.collection("users").doc(this.props.user.uid)
      .collection("notes").doc(note).delete();
    }

    // close the note if it's currently open
    if (this.props.selectedNote.name == note){
       this.props.hideNoteComments();
    }
  }

  displayBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='inline-block';
  }

  hideBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='none';
  }

  render(){
    return(
      <div onMouseLeave={this.props.toggleShowNotesMenu} style={{textAlign: 'left'}}>
        <Container>
          <div style={{position: 'absolute', width: '100%'}}>
            <Title>My Notes</Title>
            <CloseBtn><CloseImg src={xImg} onClick={this.props.hideNotesMenu}/></CloseBtn>
          </div>
          <br/><br/>
          {this.props.notesLoaded
            ?
            <Ul showNoteComments={this.props.showNoteComments}>
              {this.state.notes.map((note, index) =>
                <li className="note" onMouseOver={this.displayBtns.bind(this)} onMouseLeave={this.hideBtns.bind(this)} id={`${note}${index}_label`}>
                  <div style={{display: "flex"}}>
                    <P className="noteText" onClick={this.props.changeSelectedNote}>{note.name}</P>
                    <XBtn className="XBtn" onClick = {this.deleteNote.bind(this)}>✖</XBtn>
                  </div>
                </li>
              )}
            </Ul>
            :
            <div style={{textAlign: 'center', marginTop: 'calc(3vh + 2.25vw)'}}>
              <BeatLoader color='white' size='10'/>
            </div>
          }
          <NewNoteBtn onClick={this.props.addNewNote} showNoteComments={this.props.showNoteComments}><NewNoteImg src={newItemImg}/></NewNoteBtn>
        </Container>
      </div>
    );
  }
}

export default NotesMenu;
