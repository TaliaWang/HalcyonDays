/*global chrome*/
import React, { Component } from 'react';
import {BeatLoader} from "react-spinners"
import firebase from '../firebase';
import styled from 'styled-components';
import xImg from "../images/xImg.svg";

const BackToGeneralBtn = styled.button`
  color: white;
  border-top: 1px solid white;
  border-right: none;
  border-left: none;
  border-bottom: none;
  background-color: transparent;
  font-size: 100%;
  width: 20%;
  text-align: center;
  bottom: 0vh;
  height: 7vh;
  padding: 1vh;
  position: fixed;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  @media (max-width: 800px) {
    width: 30%;
  }
  @media (max-width: 600px) {
    font-size: 80%;
  }
`

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
  padding-bottom: 5px;
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

const P = styled.p`
  font-size: calc(0.8vh + 0.6vw);
  color: white;
  margin-top: 0.5%;
  cursor: pointer;
`

const Ul = styled.ul`
  font-size: calc(0.8vh + 0.6vw);
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
            <Ul>
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
            <div style={{textAlign: 'center', marginTop: '5%'}}>
              <BeatLoader color='white' size='10'/>
            </div>
          }
        </Container>
      </div>
    );
  }
}

export default NotesMenu;
