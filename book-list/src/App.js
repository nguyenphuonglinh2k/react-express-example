import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './Pages/Header';
import Home from './Pages/Home';
import { BookProvider } from './Contexts/Book';
import Login from './Pages/Login';
import CreateUser from './Pages/CreateUser';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/create" exact>
              <CreateUser />
            </Route>
          </Switch>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;
