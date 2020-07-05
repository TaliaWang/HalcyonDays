/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const H3 = styled.h3`
`

const LogoutBtn = styled.button`
`

const P = styled.p`
`

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    // Add new user to database if they are verified
    if (this.props.user != null && this.props.user.emailVerified){
      var db = firebase.firestore();
      const userRef = db.collection('users').doc(this.props.user.email);

      userRef.get()
      .then((docSnapshot) => {
        // add new user if they don't already exist
        if (!docSnapshot.exists) {
          userRef.set({
              email: this.props.user.email,
          })
          .then(function(docRef) {
              alert("Sign up successful!");
          })
          .catch(function(error) {
              alert("Error adding new user to database.");
          });
        }
        // else just log in and do nothing
      });
    }
  }

  logout(){
    firebase.auth().signOut();
  }

  render(){
    return(
      <div>
        <H3>Dashboard</H3>
        {this.props.user ? <P>{this.props.user.email}</P> : null}
        <LogoutBtn onClick={this.logout.bind(this)}>Log Out</LogoutBtn>
      </div>
    );
  }
}

export default Dashboard;
