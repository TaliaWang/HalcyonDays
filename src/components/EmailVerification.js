/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
`
const H3 = styled.h3`
`

const P = styled.p`
`


class EmailVerification extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
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
      <div>
        <H3>Please check your email to verify your account!</H3>
        <P>Refresh the page after verifying your account.</P>
        <Button onClick={this.resendEmail.bind(this)}>Resend verification email</Button>
      </div>
    );
  }
}

export default EmailVerification;
