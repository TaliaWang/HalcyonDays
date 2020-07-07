/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
`
const Checkbox = styled.input`
`

const Container = styled.div`
  background-color: grey;
  width: 20%;
  margin: -20% 0 0 80%;
  height: 100vh;
  position: fixed;
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding: 5% 0% 5% 0%;
`

const H3 = styled.h3`
`

const Label = styled.label`
`

const P = styled.p`
`


class TasksMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.tasks
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.tasks != prevProps.tasks){
      this.setState({
        tasks: this.props.tasks
      })
    }
  }

  toggleChecked(e){
    e.target.checked=!e.target.checked;
  }

  render(){
    return(
      <div style={{textAlign: 'left'}}>
        <Container>
          {this.state.tasks.map((task, index) =>
            <div>
              <Checkbox id={index} type='checkbox' checked={task.finished} onClick={this.toggleChecked.bind(this)}/>
              <Label for={index}>{task.name} ({task.hours}h {task.mins}m)</Label>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default TasksMenu;
