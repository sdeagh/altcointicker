import React from 'react';

const DisplayPrices = ( {currentPrice, startingPrice, tradingState} ) => {
    return (
        <div>
            <h4>Trading State</h4>
            <h1>{tradingState}</h1>
            <h4>Starting Price</h4>
            <h1>{startingPrice}</h1>
            <h4>Current Price</h4>
            <h1>{currentPrice}</h1>
        </div>
    )
}

export default DisplayPrices;