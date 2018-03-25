import React from 'react';
import './DisplayPrices.css';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

//const DisplayPrices = ( {currentPrice, startingPrice, tradingState, percentMove} ) => {

class DisplayPrices extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div>

            <Container fluid>
                <Row>
                    <Col xs="12" s="6" md="4">
                        <Card>
                            <Row>
                                <Col xs="4" className='d-flex justify-content-center align-items-center'>
                                    <i className='cc BTC' />
                                </Col>
                                <Col xs="8">
                                    <CardBody className='d-flex flex-column align-items-center justify-content-end'>
                                        <CardTitle className='cardTitle ml-auto'>{this.props.currentPrice.toLocaleString('en')}</CardTitle>
                                        <CardText className='cardText ml-auto'>{this.props.percentMove.toFixed(2)}%</CardText>
                                    </CardBody>
                                </Col>
                            </Row>
                            <hr />
                            <CardSubtitle>
                                 {this.props.tradingState} @ {this.props.startingPrice.toLocaleString('en')}
                            </CardSubtitle>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <div className = "col-xs-12 col-s-6 col-md-4">
                <div className="card card-stats">
                    <div className="content">
                        <div className="row ">
                            <div className="col-4 d-flex justify-content-center align-items-center">
                                <i className='cc BTC' />
                            </div>
                            <div className="col-8 d-flex justify-content-end align-items-center">
                                <div className="numbers">
                                    {this.props.currentPrice.toLocaleString('en')}
                                    <p>{this.props.percentMove.toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <hr />
                        <div className="stats text-left">
                            {this.props.tradingState} @ {this.props.startingPrice.toLocaleString('en')}
                        </div>
                    </div>
                </div>
            </div>

            </div>
        )
    }
}

export default DisplayPrices;