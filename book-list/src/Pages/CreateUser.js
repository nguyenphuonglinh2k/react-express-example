import React, { Component } from 'react';
import axios from 'axios';
import { 
    Container
} from 'reactstrap';
import { Redirect, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/CreateUser.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };

        this.redirect = false;

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            name: this.state.name,
            password: this.state.password
        };

        axios.post('http://localhost:5000/api/users', obj)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            password: ''
        });

        this.redirect = true;
    }

    render() {
        return (
            <Container>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <h2>Sign Up</h2>
                        <p>Please fill in this form to create an account!</p>
                    </div>
                    <div>
                        <label for="name">User Name</label><br />
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={this.state.name} 
                            onChange={this.onChangeName}
                            required />
                    </div>
                    <div>
                        <label for="password">Password</label><br />
                        <input 
                            type="password"
                            id="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.onChangePassword}
                            required 
                        />
                    </div>
                    <div>
                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                        { this.redirect && <Redirect to="/login" />}
                    </div>
                </form>
            </Container>
        );
    }
}
