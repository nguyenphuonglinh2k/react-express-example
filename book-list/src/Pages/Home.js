import React, { Component } from 'react';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle
  } from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Home.css';
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };

        this.redirect = false;
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/books").then(res => {
          this.setState({
            books: res.data
          });
        });

        var token = localStorage.getItem('token');

        if (!token) {
            this.redirect = true;
        }
    }

    render() {
        const { books } = this.state;

        return (
            <Container>
                { this.redirect && <Redirect to="/login" />}
                <h1>The most read book</h1>
                <Row>
                    { books.map(book => (
                        <Col sm="4" style={{marginBottom: 25}}>
                            <Card className="cardItem">
                                <CardImg top width="100%" src={book.image} />
                                <CardBody>
                                    <CardTitle className="title">{book.name}</CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );   
    }
}