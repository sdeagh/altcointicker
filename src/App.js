import React, { Component } from 'react';
import './App.css';
import DisplayPrices from './DisplayPrices';

class App extends Component {

	constructor() {
		super()
		this.state = {
			currentPrice: 936,
			startingPrice: 900,
			// tradingStates: inPosition, watching, justBought, justSold
			tradingState: 'justSold'
		}
	}

	componentDidMount() {
		this.setTimer(60); 
	}

	setTimer = ((timer) => {
		const getPrice = setInterval(this.getCurrentPrice, timer*1000)
	})

	

	getCurrentPrice = () => {
		fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,USD,EUR")
		.then(response => response.json(response))
		.then(price => {
			this.setState({currentPrice: price.USD})
			return price;
		})
		//Calculate percentage move
		.then(price => {
			const percentMove = (this.state.currentPrice - this.state.startingPrice) / this.state.startingPrice * 100;
			return percentMove;
		})
		//Decide what to do
		.then(percentMove => {
			console.log(percentMove)
			switch(this.state.tradingState) {
				case "watching":
					//if price is down set new startingPrice
					if (percentMove < 0) {
						this.setState({startingPrice: this.state.currentPrice})
					}
					// if price is up more than 1% then buy signal
					if (percentMove > 0.5) {
						console.log("Buying at: ", this.state.currentPrice)
						// set purchase (starting) price and track
						// set tradingState to inPosition
						this.setState({tradingState: "inPosition"})
						this.setState({startingPrice: this.state.currentPrice})
					}
					break;
				case "justBought":
					break;
				case "justSold":
				//reset startingPrice to currentPrice
				//set tradingState to watching
					this.setState({startingPrice: this.state.currentPrice});
					this.setState({tradingState: "watching"})
					break;
				case "inPosition":
					// sell for loss if move < 1%, sell for profit if move > 5%
					if (percentMove >= 2) {
						console.log("Selling for profit at: ", this.state.currentPrice)
						// this.setState({startingPrice: this.state.currentPrice})
						this.setState({tradingState: "justSold"})
					}
					if (percentMove <= -0.5) {
						console.log("Selling for loss at: ", this.state.currentPrice)
						// this.setState({startingPrice: this.state.currentPrice})
						this.setState({tradingState: "justSold"})
					}
					break;
				default:
			}

		})
	}

	calculatePercentMove = () => {
		console.log(this.state.currentPrice);
		const percentMove = (this.state.currentPrice - this.state.startingPrice) / this.state.startingPrice * 100;
		return percentMove;
	}

	setStartingPrice = () => {
		
	}

	render() {
		return (
			<div className="App">
				<DisplayPrices 
					currentPrice={this.state.currentPrice}
					startingPrice={this.state.startingPrice}
					tradingState={this.state.tradingState}
				/>
			</div>
		);
	}
}

export default App;
