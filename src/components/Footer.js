/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import clock from "../images/clock.png";
import moreOptions from "../images/moreOptions.png";
import settings from "../images/settings.png";
import FooterPopup from "./FooterPopup.js"

const Container = styled.div`
  text-align: center;
  width: 100%;
  height: 45%;
  z-index: 40;
`

const Img = styled.img`

`

const IconButton = styled.button`
  background-color: transparent;
  padding: 0;
  margin: 5px;
  border: none;
`

const IconsContainer = styled.div`
  bottom: 2%;
  position: fixed;
  left: 50%;
  transform: translate(-45%, 0);
  margin-top: 2%;
`

const Triangle = styled.div`
  bottom: 9vh;
  position: relative;
  margin-left: ${props=>props.marginLeft};
  transform: translate(${props=>props.xtranslation}, 0) rotate(180deg);
  width: 0;
  height: 0;
  border-left: ${props=>props.left} solid transparent;
  border-right: ${props=>props.right} solid transparent;
  border-bottom: ${props=>props.bottom} solid black;
  position: fixed;
`

class Footer extends Component{
  constructor(props){
    super(props);
    this.state = {
      popupOption: "",
      showPopup: false,
      footerPopupsAllowed: this.props.footerPopupsAllowed
    }
  }

  componentDidUpdate(){
    if (this.props.footerPopupsAllowed != this.state.footerPopupsAllowed){
      this.setState({
        footerPopupsAllowed: this.props.footerPopupsAllowed
      })
    }
    //just because footer popup is allowed doesn't mean current one should show
    // don't show popup if new note or new task popups are opened then closed
    if (!this.props.footerPopupsAllowed && this.state.showPopup){
      this.setState({
        showPopup: false
      })
    }
  }

  toggleShowPopup(e){
    if (!this.state.showPopup){
      this.setState({
        showPopup: true,
        popupOption: e.target.id
      });
    }
    else if (this.state.popupOption == e.target.id){
      this.setState({
        showPopup: false
      });
    }
    else{
      this.setState({
          popupOption: e.target.id
      });
    }

    // hide new note and new task popups
    this.props.hideNoteTaskPopups();
    // allow footer popup to show
    this.props.allowFooterPopup();
  }

  render(){
    return(
      <Container>
        {this.state.showPopup && this.state.footerPopupsAllowed
          ?
            <div>
              <FooterPopup
                setRelaxationTime={this.props.setRelaxationTime.bind(this)}
                user={this.props.user}
                popupOption={this.state.popupOption}
                sleepHour={this.props.sleepHour}
                sleepMin={this.props.sleepMin}
                sleepClockMode={this.props.sleepClockMode}
                relaxationHour={this.props.relaxationHour}
                relaxationMin={this.props.relaxationMin}
                relaxationClockMode={this.props.relaxationClockMode}
                wakeupHour={this.props.wakeupHour}
                wakeupMin={this.props.wakeupMin}
                wakeupClockMode={this.props.wakeupClockMode}
                calculateTimePassedWidth={this.props.calculateTimePassedWidth.bind(this)}
              ></FooterPopup>
              {
                {
                  'clock': <Triangle left='18px' right='18px' bottom='20px' marginLeft='50%' xtranslation='-160%'/>,
                  'moreOptions':  <Triangle left='18px' right='18px' bottom='20px' marginLeft='50%' xtranslation='-40%'/>,
                  'settings': <Triangle left='18px' right='18px' bottom='20px' marginLeft='50%' xtranslation='85%'/>
                }[this.state.popupOption]
              }
            </div>
          : null
        }
        <IconsContainer>
          <IconButton onClick={this.toggleShowPopup.bind(this)}><Img id='clock' src={clock}/></IconButton>
          <IconButton onClick={this.toggleShowPopup.bind(this)}><Img id='moreOptions' src={moreOptions}/></IconButton>
          <IconButton onClick={this.toggleShowPopup.bind(this)}><Img id='settings' src={settings}/></IconButton>
        </IconsContainer>
      </Container>
    );
  }
}

export default Footer;
