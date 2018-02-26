import React from 'react';
import './DisplayPrices.css';
import bitcoinPic from './assets/img/bitcoin.png';

const DisplayPrices = ( {currentPrice, startingPrice, tradingState, percentMove} ) => {

    return (
        
            <div className = "col-xs-12 col-s-6 col-md-4">
                <div className="card card-stats">
                    <div className="content">
                        <div className="row ">
                            <div className="imageDiv col-xs-4">
                                <img src={bitcoinPic} alt="coin graphic" />
                            </div>
                            <div className="col-xs-8">
                                <div className="numbers">
                                    {currentPrice.toLocaleString('en')}
                                    <p>{percentMove.toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <hr />
                        <div className="stats text-left">
                            {tradingState} @ {startingPrice.toLocaleString('en')}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default DisplayPrices;