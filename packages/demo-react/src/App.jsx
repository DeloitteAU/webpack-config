import React from 'react';
import image from './test-image.png'
import './App.scss';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<div className="header">
					<img src={image} alt="WAIT: If you are reading this on a screen file loader is not working" />
				</div>
				<h1>Congratulations</h1>
				<p>React is configured correctly</p>
			</div>
		)
	};
}
