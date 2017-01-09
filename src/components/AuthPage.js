'use strict';

import React from 'react';
import pageData from '../data/pageData';
import MainMenu from './MainMenu';
import { Link } from 'react-router';
import Button from './Button';
import { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CanvasComponent from './CanvasComponent';



export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			generateClicked: false,
			authorized: false,
			statusMessage: '',
			userData: null,
			dataCollected: false,
			accessToken: null,
			username: null,
			imageUrlsSet: false,
			images: null,
			imageUrls: null
		}
		
	}
	
	componentWillMount() {
		var hash = this.props.location.hash.slice(1);
		var accessToken = hash.substr(hash.indexOf("=") + 1);
		
		this.setState({
			generateClicked: false,
			authorized: false,
			inputValue: 'rollmop99',
			userData: null,
			dataCollected: false,
			accessToken: accessToken,
			username: this.props.location.query.user
		});	

	}
	
	componentDidMount() {
		var hash = window.location.hash.slice(1);
		var accessToken = hash.substr(hash.indexOf("=") + 1)
		console.log('accessToken: ', accessToken);
		//var urlParams = new URLSearchParams(window.location.search);
		//var username = urlParams.get('user');
		//var username = this.props.location.query.user;
		this.setState({
			accessToken: accessToken
		})
		this.collectData();
	}
	
	handleSlider(value) {
		this.setState({
			sliderValue: value
		})
	}

	collectData() {
		this.setState({
			generateClicked: true
		})
		console.log('user2: '+this.state.username)
	
	
		// setup fetch to server

		var request = new Request('/submit', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				      'Accept': 'application/json',

			}),
			body: JSON.stringify({ name: this.state.username, accessToken: this.state.accessToken})
		});
		
		// Now use it!
		
		fetch(request)
		.then((response) => {
			console.log('response',response)
			return response.json();
		})
		.then((data) => {
			console.log(JSON.parse(data))
			var parsedData = JSON.parse(data);
			return parsedData;
		})
		.then((parsedData) => {

			this.setState({
				userData: parsedData,
				dataCollected: true
			})

			this.sortData();
		})
		.catch((err) => {
				console.log('error!!!',err)
		});		
		
	}
	
	sortData() {
		var objToSort = {}
		var dataObj = this.state.userData.data;
		//make an obj of format { url: likes, obj: likes... }
		for (var i=0; i < dataObj.length; i++) {
			objToSort[dataObj[i].images.standard_resolution.url] = dataObj[i].likes.count;
		}
		var images = [];
		var imageUrls = [];
		var sortable = [];
		for (var url in objToSort) {
			sortable.push([url, objToSort[url]])
		}
		sortable.sort(function(a, b) {
		  return a[1] - b[1]
		})

		//get last 9 items of sortable and push them to imgs object

		for (var i = sortable.length - 1; i > sortable.length - 10; i--) {
			if (typeof sortable[i] != 'undefined') {
				images.push(<div><span>{sortable[i][1]}</span><img src={sortable[i][0]} key={i} /></div>);
				imageUrls.push(sortable[i][0])
			}
		}
		console.log(imageUrls);
		this.setState({
			imageUrlsSet: true,
			images: images,
			imageUrls: imageUrls
		})
	}
	
	
	
  render() {

				
    return (
      <div className="auth-page">        
        <div className="main-pane">

					
					<ReactCSSTransitionGroup
          	transitionName="anim"
						transitionEnterTimeout={3000}
						transitionLeaveTimeout={3000}>
						<span key={this.state.statusMessage} className="statusMessage">{this.state.statusMessage}</span>
					</ReactCSSTransitionGroup>
					<div>User: {this.state.username}</div>					
					
									 									
					{this.state.imageUrlsSet ? <div><div className="images">{this.state.images}</div><CanvasComponent imageUrls={this.state.imageUrls}/></div> : <div>Loading...</div>}

        </div>

          
      </div>
    );
  }
}

//						<button className="btn-text btn-generate" onClick={this.collectData.bind(this)}>Go</button>


//					{this.state.imageUrlsSet ? (<div><div className="images">{this.state.images}</div><CanvasComponent imageUrls={this.state.imageUrls}/></div>) : (<div>Loading...</div>)}
