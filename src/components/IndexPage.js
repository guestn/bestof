'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import MainMenu from './MainMenu';

export default class SettingsPage extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			inputValue: '',
		}
	}
	componentWillMount() {
		this.setState({
			inputValue: 'rollmop99',
		})
	}
	handleInputChange(event) {
		this.setState({
			inputValue: event.target.value
		})
		console.log(this.state.inputValue)
	}
  render() {
      return (
      <div className="index-page">
        <div className="main-pane">

          <h2 className="name">Authorize</h2>
          <input type="text" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} autoFocus="true"/>

          <a className="btn btn-text" href={'https://api.instagram.com/oauth/authorize/?client_id=986c2242a5c14645ba742b0750bea0a7&response_type=token&redirect_uri=http://localhost:3020/auth?user='+this.state.inputValue}>Get My Top Photo Collage!</a>

          
          
        </div>

      </div>
    );
  }
}




