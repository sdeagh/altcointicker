import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './Signup.css';

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signupEmail: "",
            signupPassword: "",
            signupConfirmPassword: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({ signupEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signupPassword: event.target.value })
    }

    onConfirmPasswordChange = (event) => {
        this.setState({ signupConfirmPassword: event.target.value })
    }

    handleSignupClick = (event) => {
        fetch('http://localhost:3000/signup', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user) {
                this.props.loadUser(user)
            }
        })
    }

    render() {
        return (
            <div className='main'>
                <form>
                    <FormGroup>
                        <Label>
                            Email address
                        </Label>
                        <Input
                            placeholder="Enter email"
                            type="email"
                            onChange={ this.onEmailChange }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Password
                        </Label>
                        <Input
                            placeholder="Password"
                            type="password"
                            onChange={ this.onPasswordChange }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Confirm Password
                        </Label>
                        <Input
                            placeholder="Confirm password"
                            type="password"
                            onChange={ this.onConfirmPasswordChange }
                        />
                    </FormGroup>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Button bsStyle="info" fill onClick={ this.handleSignupClick }>
                            Sign up
                        </Button>
                        <Link to='/login'>Login</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;