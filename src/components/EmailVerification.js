/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 2.5%;
  margin-bottom: 2%;
`

const H1 = styled.h1`
`

const P = styled.p`
`


class EmailVerification extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  backToLogin(){
    firebase.auth().signOut();
  }
  
  resendEmail(){
    this.props.user.sendEmailVerification({
      url: 'https://covid2-a6d70.firebaseapp.com',
      handleCodeInApp: false
    })
    .then(function(){
      alert("Verification email sent!");
    })
    .catch(function(error){
      alert(error);
    });
  }

  render(){
    return(
      <div style={{textAlign: 'center', margin: '15% 35% 0 40%', width: '25%'}}>
        <div style={{textAlign: 'left'}}>
          <H1>Almost done!</H1>
          <P>Please check your email to verify your account.</P>
          <Button onClick={this.resendEmail.bind(this)}>Resend verification email</Button>
          <br/>
          <Button onClick={this.backToLogin.bind(this)}>Go back to login</Button>
        </div>
      </div>
    );
  }
}

export default EmailVerification;
