/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';

const TimeForm = styled.form`
  text-align: center;
  margin-bottom: 2vh;
`

const Container = styled.div`
  text-align: center;
  background-color: black;
  position: relative;
  margin-left: 35%;
  margin-right: 35%;
  height: 15vh;
  border-radius: 10px;
  padding: 1%;
`

const Input = styled.input`
  position: relative;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 1%;
  width: 40%;
  float: ${props=> props.float};
`

const LogoutButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 2px;
  padding: 2%;
`


const P = styled.p`
  color: white;
  margin-top: 3vh;
  position: relative;
`

const P_Form = styled.p`
  color: white;
  line-height: 1px;
`

class FooterPopup extends Component{
  constructor(props){
    super(props);
    this.state = {
      popupOption: this.props.popupOption
    }
  }

  componentDidUpdate(){
    if (this.state.popupOption != this.props.popupOption){
      this.setState({
        popupOption: this.props.popupOption
      })
    }
  }

  logout(){
    firebase.auth().signOut();
  }

  render(){
    return(
      <Container>
        // switch between the different popups
        {
          {
            'clock':
              <div style={{marginTop: '-4vh', display: 'block'}}>
                <TimeForm>
                    <P_Form>Set Sleep Time</P_Form>
                    <Input type='number' pattern="\d+" min="0" step="1" float='left' placeholder='Hour(s)'/>
                    <Input type='number' pattern="\d+" min="0" step="1" float='right' placeholder='Minute(s)'/>
                    <button type='submit' style={{display: 'none'}}/>
                </TimeForm>
                <br/><br/>
                <TimeForm>
                  <P_Form>Set Relaxation Time</P_Form>
                  <Input type='number' pattern="\d+" min="0" step="1" float='left' placeholder='Hour(s)'/>
                  <Input type='number' pattern="\d+" min="0" step="1" float='right' placeholder='Minute(s)'/>
                  <button type='submit' style={{display: 'none'}}/>
                </TimeForm>
              </div>,
            'moreOptions':
              <P>Coming soon! </P>,
            'settings':
              <P><LogoutButton onClick={this.logout.bind(this)}>Log out</LogoutButton></P>,
          }[this.state.popupOption]
        }
      </Container>
    );
  }
}

export default FooterPopup;
