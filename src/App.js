import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Header'
import UserIndex from './UserIndex'
import UserCreate from './UserCreate'
import UserShow from './UserShow'
import UserEdit from './UserEdit'
import Login from './Login'
import Register from './Register'
import './App.css';

function App() {
  return (
    <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/user' component={UserIndex}/>
                        <Route path='/create' component={UserCreate}/>
                        <Route path='/users/edit/:id' component={UserEdit}/>
                        <Route path='/users/:id' component={UserShow}/>
                    </Switch>
                </div>
            </BrowserRouter>
  );
}

export default App;
