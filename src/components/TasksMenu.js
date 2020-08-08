/*global chrome*/
import React, { Component } from 'react';
import {BeatLoader} from 'react-spinners';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";

const LockButton = styled.button`
`
const Checkbox = styled.button`
  margin-right: 2%;
  transform: translate(0, 20%);
  border: 1px solid white;
  border-radius: 3px;
  background-color: transparent;
  height: 22px;
  width: 22px;
  padding: 2px;
  float: left;

  @media (max-width: 600px) {
    transform: translate(0, 5%);
  }
`

const Container = styled.div`
  background-color: #606060;
  width: 20%;
  margin: -5% 0 0 80%;
  height: 110vh;
  position: fixed;

  @media (max-width: 800px) {
    margin: -5% 0 0 70%;
    width: 30%;
  }
  @media (max-width: 600px) {
      margin: -5% 0 0 70%;
      width: 30%;
      font-size: 80%;
  }
`

const EditBtn = styled.button`
  background: none;
  border: none;
  font-size: 120%;
  color: white;
  display: none;

  &:hover{
    font-size: 140%;
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

const LabelBtn = styled.button`
  color: white;
  border: none;
  background-color: transparent;
  display: flex;
  font-size: 100%;
  font-family: openSansRegular;
  text-align: left;
  padding: 0;
  max-width: 100%;
`

const P = styled.p`
  font-size: 120%;
  color: white;
  margin-top: 1%;
  margin-bottom: 0;
  font-family: openSansRegular;
  display: flex;

  @media (max-width: 600px) {
      font-size: 100%;
  }
`

const TasksContainer = styled.div`
  overflow-y: scroll;
  overflow-x: scroll;
  height: 80vh;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  @media (max-width: 800px) {
    height: 75vh;
  }
  @media (max-width: 400px) {
    height: 70vh;
  }
`

const TextareaTask = styled.div`
  cursor: pointer;
  font-size: 120%;
  width: 100%;
  min-height: 1em;
  min-width: 50px;
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
  border-radius: 5px;

  &:focus{
    outline: none;
  }

  @media (max-width: 600px) {
      font-size: 100%;
  }
`

const TextareaTime = styled.div`
  cursor: default;
  min-height: 1em;
  overflow: scroll;
  min-width: 10px;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  position: relative;
  color: white;
  background-color: transparent;
  margin-bottom: 0;
  font-family: openSansRegular;
  resize: none;
  border: none;
  border-radius: 5px;

  &:focus{
    outline: none;
  }
`


const XBtn = styled.button`
  background: none;
  border: none;
  font-size: 120%;
  color: white;
  display: none;

  &:hover{
    font-size: 140%;
  }
`


class TasksMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.tasks,
      noteSwitchesAllowed: true
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.tasks != this.state.tasks){
      this.setState({
        tasks: [],
      }, ()=>{
        this.setState({
          tasks: this.props.tasks
        })
      })
    }
  }

  decideWhetherToChangeSelectedTaskFromTaskMenu(e){
    if (this.state.noteSwitchesAllowed){
        this.props.changeSelectedTaskFromTaskMenu(e);
    }
  }

  deleteNotesForSelectedTask(task){
    var db = firebase.firestore();
    var notesRef = db.collection("users").doc(this.props.user.uid)
                  .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
                  .collection("tasks").doc(task).collection('notes');
    // get all notes for this task
    var notes = [];
    notesRef.get().then(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        notes.push(doc.data());
      })
    // delete the notes for this task
    }).then(()=>{
      notes.forEach(note => {
        notesRef.doc(note.text).delete();
      });
    }).then(()=>{
      this.props.backToGeneralNotes();
    });
  }

  deleteTask(e){
    // parse the task name
    var task = e.target.parentElement.getElementsByClassName('taskText')[0].textContent;

    var confirmDelete = window.confirm(`Are you sure you want to delete "${task}?" Doing so will delete this task and all of its notes.`);

    if (confirmDelete){
      var db = firebase.firestore();
      // delete all notes for task
      this.deleteNotesForSelectedTask(task);

      // delete task itself
      db.collection("users").doc(this.props.user.uid)
      .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
      .collection("tasks").doc(task).delete();
      // display general notes since this task and its notes have been deleted
      this.props.backToGeneralNotes();
    }
  }

  displayBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0] || e.target.parentElement.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='inline-block';

    var button = e.target.parentElement.getElementsByClassName('editBtn')[0] || e.target.parentElement.parentElement.getElementsByClassName('editBtn')[0];
    button.style.display='inline-block';
  }

  hideBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0] || e.target.parentElement.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='none';

    var button = e.target.parentElement.getElementsByClassName('editBtn')[0] || e.target.parentElement.parentElement.getElementsByClassName('editBtn')[0];
    button.style.display='none';
  }

  enableTaskEdit(e){
    this.props.changeSelectedTaskFromTaskMenu(e);

    this.setState({
      noteSwitchesAllowed: false // prevent notes from changing while tasks are being edited
    });

    var textareaTask = e.target.parentElement.getElementsByClassName('taskText')[0];
    textareaTask.contentEditable = true;
    textareaTask.style.cursor='text';
    textareaTask.style.border='1px solid white';

    var oldTask = textareaTask.textContent;

    var textareaHours = e.target.parentElement.parentElement.getElementsByClassName('taskHours')[0];
    textareaHours.contentEditable = true;
    textareaHours.style.cursor='text';
    textareaHours.style.border='1px solid white';

    var oldHours = textareaHours.textContent;

    var textareaMins = e.target.parentElement.parentElement.getElementsByClassName('taskMins')[0];
    textareaMins.contentEditable = true;
    textareaMins.style.cursor='text';
    textareaMins.style.border='1px solid white';

    var oldMins = textareaMins.textContent;

    // allow only 0 or positive input for time
    textareaHours.onkeypress = function(ev) {
      if (isNaN(String.fromCharCode(ev.which))) {
        ev.preventDefault();
      }
    }
    textareaMins.onkeypress = function(ev) {
      if (isNaN(String.fromCharCode(ev.which))) {
        ev.preventDefault();
      }
    }

    // add listener for enter to submit new task
    textareaTask.addEventListener('keypress', event => {
      this.submitEditedTask(event, textareaTask, textareaHours, textareaMins, oldTask, oldHours, oldMins);
    });
    textareaHours.addEventListener('keypress', event => {
      this.submitEditedTask(event, textareaTask, textareaHours, textareaMins, oldTask, oldHours, oldMins);
    });
    textareaMins.addEventListener('keypress', event => {
      this.submitEditedTask(event, textareaTask, textareaHours, textareaMins, oldTask, oldHours, oldMins);
    });

  }

  submitEditedTask(event, textareaTask, textareaHours, textareaMins, oldTask, oldHours, oldMins){
    if (event.keyCode == 13){
      event.preventDefault();
      var editedTask = textareaTask.textContent.trim();
      var editedHours = (textareaHours.textContent.trim() == "" ? 0 : parseInt(textareaHours.textContent.trim()));
      var editedMins = (textareaMins.textContent.trim() == "" ? 0 : parseInt(textareaMins.textContent.trim()));

      var db = firebase.firestore();
      var tasksCollectionRef = db.collection("users").doc(this.props.user.uid)
      .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
      .collection("tasks");

      if (editedTask != oldTask && editedTask != ""){

        var finished;
        var hours = editedHours + Math.floor(editedMins / 60);
        var mins = editedMins % 60;
        var name = editedTask;
        var date;

        var notes = [];

        // get fields from old task
        tasksCollectionRef.doc(oldTask)
        .get().then(doc=>{
          finished = doc.data().finished;
          date = doc.data().timestamp.toDate();
        }).then(()=>{
          // delete old task (notes subcollection still exists to be deleted after)
          // deleting old task early on prevents tasks menu from glitching with old task and edited task both showing
          tasksCollectionRef.doc(oldTask).delete();

          // create new task
          tasksCollectionRef.doc(editedTask)
          .set({
            finished: finished,
            hours: hours,
            mins: mins,
            name: name,
            timestamp: firebase.firestore.Timestamp.fromDate(date)
          }).then(()=>{

            tasksCollectionRef.doc(oldTask).collection('notes')
            .get().then(querySnapshot=>{
              // copy over notes from old task into notes of new task
              querySnapshot.forEach(doc=>{
                notes.push(doc.data());
                tasksCollectionRef.doc(editedTask).collection('notes').doc(doc.data().text)
                .set({
                  text: doc.data().text,
                  timestamp: firebase.firestore.Timestamp.fromDate(doc.data().timestamp.toDate())
                });
              });
            }).then(()=>{
              // delete notes from old task
              notes.forEach(note => {
                  tasksCollectionRef.doc(oldTask).collection('notes').doc(note.text).delete();
              });
            });
          });
        });
      }
      else if ((editedHours != oldHours || editedMins != oldMins) && editedTask != ""){
        var hours = editedHours + Math.floor(editedMins / 60);
        var mins = editedMins % 60;
        // no need to copy collections, just update the hours and mins of this task in the database
        tasksCollectionRef.doc(oldTask)
          .update({
            hours: hours,
            mins: mins
          });
      }
      else if (editedTask == ""){
        textareaTask.textContent = oldTask;
        textareaHours.textContent = oldHours;
        textareaMins.textContent = oldMins;
      }

      textareaTask.contentEditable = false;
      textareaTask.style.cursor='pointer';
      textareaTask.style.border='none';

      textareaHours.contentEditable = false;
      textareaHours.style.cursor='default';
      textareaHours.style.border='none';

      textareaMins.contentEditable = false;
      textareaMins.style.cursor='default';
      textareaMins.style.border='none';

      this.setState({
        noteSwitchesAllowed: true
      });
    }
  }

  render(){
    return(
      <div onMouseLeave={this.props.toggleShowTasksMenu} style={{textAlign: 'left'}}>
        <Container>
          <br/><br/>
          <H3>{this.props.todayDate.day}, {this.props.todayDate.month} {this.props.todayDate.date}, {this.props.todayDate.year}
             &nbsp;-<br/>{this.props.tmrwDate.day}, {this.props.tmrwDate.month} {this.props.tmrwDate.date}, {this.props.tmrwDate.year}
          </H3>
          {this.props.tasksLoaded
            ?
            <TasksContainer>
              {this.state.tasks.map((task, index) =>
                <div style={{margin: '5% 5% 1% 5%'}}>
                  <Checkbox id={`${task}${index}`} onClick={this.props.toggleTaskChecked.bind(this)}>
                    {task.finished ? <Img src={checkmark}/> : null}
                  </Checkbox>
                  <div onMouseOver={this.displayBtns.bind(this)} onMouseLeave={this.hideBtns.bind(this)}>
                    <LabelBtn id={`${task}${index}_label`}>
                      <TextareaTask className='taskText' onClick={this.decideWhetherToChangeSelectedTaskFromTaskMenu.bind(this)} contentEditable={false}>{task.name}</TextareaTask>
                      <EditBtn className='editBtn' onClick={this.enableTaskEdit.bind(this)}>✎</EditBtn>
                      <XBtn className="XBtn" onClick = {this.deleteTask.bind(this)}>✖</XBtn>
                    </LabelBtn>
                    <P>(<TextareaTime className='taskHours' contentEditable={false}>{task.hours}</TextareaTime>h&nbsp;<TextareaTime className='taskMins' contentEditable={false}>{task.mins}</TextareaTime>m)</P>
                  </div>
                </div>
              )}
            </TasksContainer>
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

export default TasksMenu;
