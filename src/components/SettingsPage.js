
'use strict';

import React from 'react';
import pageData from '../data/pageData';
import MainMenu from './MainMenu';
import { Link } from 'react-router';


import RangeSlider from './RangeSlider';
import Button from './Button';
import { PropTypes } from 'react';
import fileDownload from 'react-file-download';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';




export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			generateClicked: false,
			authorized: false,
			statusMessage: '',
			userData: null,
			dataCollected: false,
			accessToken: null
		}
		
	}
	
	componentWillMount() {
		this.setState({
			generateClicked: false,
			authorized: false,
			inputValue: 'rollmop99',
			userData: null,
			dataCollected: false,
			accessToken: null
		});	
	}
	
	componentDidMount() {
		var hash = window.location.hash.slice(1);
		var accessToken = hash.substr(hash.indexOf("=") + 1)
		console.log('accessToken: ', accessToken);
		this.setState({
			accessToken: accessToken
		});
	}
	
	handleSlider(value) {
		this.setState({
			sliderValue: value
		})
	}
	
	authClicked() {
		var request = new Request('/submit', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				      'Accept': 'application/json',

			}),
			body: JSON.stringify({ name: this.state.inputValue })
		});
		fetch(request)
		.then((response) => {
			console.log('response',response)
			return response.json();

		})
		.then((data) => {
			console.log('data', data)
		})
	}

	generateClicked() {
		this.setState({
			generateClicked: true
		})
		
	
		// setup fetch to server

		var request = new Request('/submit', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				      'Accept': 'application/json',

			}),
			body: JSON.stringify({ name: this.state.inputValue })
		});
		
		// Now use it!
		

		fetch(request)
		.then((response) => {
			console.log('response',response)
			return response.json();

		})
		.then((data) => {
			console.log(JSON.parse(data))
			var parsedData = JSON.parse(data)
			var datum = parsedData.data[0].type
			console.log(parsedData.data[0].link);
			this.setState({
				userData: parsedData,
				dataCollected: true
			})
			console.log(this.state.userData.data[0])
		})
		.catch((err) => {
				console.log('error',err)
		});		
		
	}
	
	handleInputChange(event) {
		this.setState({
			inputValue: event.target.value
		})
		console.log(this.state.inputValue)
	}
	
	
	onDownloadClicked() {
		fileDownload(this.state.outputValue, 'JSON.csv');
		this.setState({
			statusMessage: 'File Downloaded'
		})
	}
	
  render() {
	 	const value = this.state.value;
	 	//const test = (typeof this.state.userData!=null) ? this.state.userData.data[0].link : '---';
//this.state.userData.data[0]

		if (this.state.dataCollected) {
/*
			var imgs = []
			for (var i=0; i<9; i++) {
				imgs.push(this.state.userData[i].images.thumbnail.url);
			}
*/
			var imgs = this.state.userData.data.map((object,i) => {
					return <img src={object.images.thumbnail.url} key={i} />
			})
			console.log(imgs)
		}
		
    return (
      <div className="home">
        <MainMenu/>
        
        <div className="main-pane">

					
					<ReactCSSTransitionGroup
          	transitionName="anim"
						transitionEnterTimeout={3000}
						transitionLeaveTimeout={3000}>
						<span key={this.state.statusMessage} className="statusMessage">{this.state.statusMessage}</span>
					</ReactCSSTransitionGroup>
					
					<input type="text" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} />
					
					<div className="button-container">
						<button className="btn-text btn-generate" onClick={this.generateClicked.bind(this)}>Go</button>
						<button className="btn-text" onClick={this.authClicked.bind(this)}>Auth</button>

						<CopyToClipboard text={this.state.inputValue}
							onCopy={() => this.setState({statusMessage: 'Objects Copied to Clipboard'})}>
							<button className="btn-icon btn-copy" disabled={!this.state.generateClicked}>Copy</button>
						</CopyToClipboard>
						<button className="btn-icon btn-download" onClick={this.onDownloadClicked.bind(this)} disabled={!this.state.generateClicked}>DL</button>
					</div>
					
				 	<span className="test">{(this.state.dataCollected) ? this.state.userData.data[0].link : '---'}</span>
				 	
					<div>{this.state.generateClicked}</div>
					<a href="https://api.instagram.com/oauth/authorize/?client_id=986c2242a5c14645ba742b0750bea0a7&redirect_uri=http://localhost:3020&response_type=token">AUTHORIZE</a>
					
					<div className="images">{imgs}</div>

        </div>

          
      </div>
    );
  }
}
