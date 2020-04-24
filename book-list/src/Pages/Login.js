import React, { Component } from 'react';
import { 
    Container,
    Alert
} from 'reactstrap';
import { useLocation, Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken';

import { BookContext } from '../Contexts/Book';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login.css';

export default function() {
    let query = useQuery();
    let name = query.get('name');

    return (
        <Container>
            <form>
                <div><h2>Account Login</h2></div>
                { name && <Validate />}
                <div>
                    <label for="name">User Name</label><br />
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                    />
                </div>
                <div>
                    <label for="password">Password</label><br />
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                    />
                </div>
                <div>
                    <button>
                        <span>Login</span>
                    </button>
                </div>
                <div>
                    <span>Are you new? </span>
                    <a href="/create">Sign Up</a>
                </div>
            </form>
        </Container>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Validate() {
    let query = useQuery();
    let name = query.get('name');
    let password = query.get('password');

    return (
        <div>
            <BookContext.Consumer>
                {({ users }) => {
                    var user = users.find(user => user.name === name);
                    if (!user) {
                        return <Alert color="danger">User is not exist</Alert>
                    }

                    if (user.password !== password) {
                        return <Alert color="danger">Wrong password</Alert>
                    }  

                    var token = jwt.sign({
                        name: name,
                        password: password
                    }, 'secretToken', { expiresIn: '1h' });

                    localStorage.setItem('token', token);

                    return <Redirect to="/" />
                }}
            </BookContext.Consumer>
        </div>
    );
}