import React, { Component } from 'react';
import './App.css';
import TopNavbar from './components/TopNavbar/TopNavbar';
import DisplayPrices from './components/DisplayPrices/DisplayPrices';
import TradeTable from './components/TradeTable/TradeTable';
import Signup from './components/Signup/Signup'
import { Switch, Route } from 'react-router-dom';

class App extends Component {

	constructor() {
		super()
		this.state = {
			currentPrice: 100,
			startingPrice: 100,
			tradingState: 'Just Sold',
			percentMove: 0,
			isLoggedIn: false
		}
	}

	componentDidMount() {
		this.setTimer(10); 
	}

	setTimer = ((timer) => {
		setInterval(this.getCurrentPrice, timer*1000)
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
		const percentMove = (this.state.currentPrice - this.state.startingPrice) / this.state.startingPrice * 100;
		return percentMove;
	}

	render() {
		return (
			<div>
				<TopNavbar />
				<div className="container-fluid">
					<Switch>
						<Route path='/signup' component={ Signup } />

						<DisplayPrices 
							currentPrice={this.state.currentPrice}
							startingPrice={this.state.startingPrice}
							tradingState={this.state.tradingState}
							percentMove={this.state.percentMove}/>
						<TradeTable />

					</Switch>

				</div>
			</div>
		);
	}
}

export default App;
