import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import './Signup.css';

const Signup = () => {
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
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Password
                    </Label>
                    <Input
                        placeholder="Password"
                        type="password"
                    />
                </FormGroup>
                
                <Button bsStyle="info" fill>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Signup;