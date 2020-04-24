import React, { Component } from "react";
import axios from 'axios';

export const BookContext = React.createContext();

export class BookProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/users").then(res => {
          this.setState({
            users: res.data
          });
        });
    }

    render() {
        return (
            <BookContext.Provider 
                value={{
                    users: this.state.users
                }}
            >
                {this.props.children}
            </BookContext.Provider>
        )
    }
}