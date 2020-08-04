/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 2%;
`

const Container = styled.div`
  text-align: center;
  margin: 15% 35% 0 40%;
  width: 30%;

  @media (max-width: 800px) {
    margin: 30% 35% 0 38%;
    width: 35%;
  }
  @media (max-width: 600px) {
    margin: 40% 15% 0 30%;
    width: 50%;
  }
  @media (max-width: 400px) {
    margin: 40% 15% 0 20%;
    width: 65%;
  }
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
      url: 'https://halcyondays-app.herokuapp.com',
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
      <Container>
        <div style={{textAlign: 'left'}}>
          <H1>Almost done!</H1>
          <P>Please check your email to verify your account.</P>
          <Button onClick={this.resendEmail.bind(this)}>Resend verification email</Button>
          <br/>
          <Button onClick={this.backToLogin.bind(this)}>Go back to login</Button>
        </div>
      </Container>
    );
  }
}

export default EmailVerification;
