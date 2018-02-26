import React, { Component } from 'react';
import './App.css';
import DisplayPrices from './DisplayPrices';
import TradeTable from './TradeTable';

class App extends Component {

	constructor() {
		super()
		this.state = {
			currentPrice: 100,
			startingPrice: 100,
			// tradingStates: inPosition, watching, justBought, justSold
			tradingState: 'Just Sold',
			percentMove: 0
		}
	}

	componentDidMount() {
		this.setTimer(10); 
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
			this.setState({percentMove: percentMove})
			return percentMove;
		})
		//Decide what to do
		.then(percentMove => {
			console.log("% move: ", percentMove, "Price: ", this.state.currentPrice)
			switch(this.state.tradingState) {
				case "Watching":
							//if price is down set new startingPrice
					if (percentMove < 0) {
						this.setState({startingPrice: this.state.currentPrice})
					}
							// if price is up more than 1% then buy signal
					if (percentMove > 0.3) {
						console.log("Commence Buying at: ", this.state.currentPrice)
							// set purchase (starting) price and track
							// set tradingState to inPosition
						this.setState({tradingState: "In Position"})
						this.setState({startingPrice: this.state.currentPrice})
					}
					break;
				case "Just Bought":
							// probably don't need this one
					break;
				case "Just Sold":
							//reset startingPrice to currentPrice
							//set tradingState to watching
					this.setState({startingPrice: this.state.currentPrice});
					this.setState({tradingState: "Watching"})
					break;
				case "In Position":
							// sell for loss if move < 1%, sell for profit if move > 5%
					if (percentMove >= 1.0) {
						console.log("Selling for profit at: ", this.state.currentPrice)
							// this.setState({startingPrice: this.state.currentPrice})
						this.setState({tradingState: "Just Sold"})
					}
					if (percentMove <= -0.1) {
						console.log("Selling for loss at: ", this.state.currentPrice)
							// this.setState({startingPrice: this.state.currentPrice})
						this.setState({tradingState: "Just Sold"})
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
			<div className="container-fluid">
				<DisplayPrices 
					currentPrice={this.state.currentPrice}
					startingPrice={this.state.startingPrice}
					tradingState={this.state.tradingState}
					percentMove={this.state.percentMove}
				/>
				<hr />
				<TradeTable />

			</div>
		);
	}
}

export default App;
