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
            <div className='mainContent'>
                <Container fluid>
                    <Row>
                        <Col xs="12" s="6" md="4" xl="3">
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
                                <CardBody className='d-flex align-items-center justify-content-start'>
                                    <CardText>
                                        { this.props.tradingState } @ { this.props.startingPrice.toLocaleString('en') }
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DisplayPrices;