import React from 'react';
import { Link } from 'react-router-dom'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem } from 'reactstrap';

export default class Example extends React.Component {
	constructor(props) {
		super(props);
    	this.state = {
    		isOpen: false
    	};
	  }

toggle = () => {
    this.setState({
	    isOpen: !this.state.isOpen
    });
}

render() {
    return (
    	<div>
        	<Navbar color="dark" dark expand="md">
          		<NavbarBrand href="/">Coin Ticker</NavbarBrand>
          		<NavbarToggler onClick={this.toggle} />
          		<Collapse isOpen={this.state.isOpen} navbar>
            		<Nav className="ml-auto" navbar>
              			<NavItem>
                			<Link className="nav-link" to='/login' component='Login'>Login</Link>
              			</NavItem>
						<NavItem>
							<Link className="nav-link" to='/signup' component='Signup'>Sign up</Link>
						</NavItem>
{/* 						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									Option 1
								</DropdownItem>
								<DropdownItem>
									Option 2
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>
									Reset
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown> */}
					</Nav>
				</Collapse>
        	</Navbar>
      	</div>
    );
  }
}
