import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/common';
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import PollDetails from './components/PollDetails'
import Leaderboard from './components/Leaderboard'
import NewQuestion from './components/NewQuestion'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter} from "react-router-dom";
import {Layout} from 'antd'
const { Footer } = Layout;
class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const {authUser} = this.props;
    return (
      <Layout className="layout">
          {authUser && <Header active='home' authUser={authUser}/> }
        <Switch>
          <Route path="/login">
            <Login/ >
          </Route>
          <Route path="/home">
          {authUser ? <Home /> :  <Redirect to={{pathname: "/login"}}/> }
          </Route>
          <Route path="/questions">
          {authUser ? <PollDetails /> :  <Redirect to={{pathname: "/login"}}/> }
          </Route>
          <Route path="/leaderboard">
          {authUser ? <Leaderboard /> :  <Redirect to={{pathname: "/login"}}/> }
          </Route>
          <Route path="/new_question">
          {authUser ? <NewQuestion /> :  <Redirect to={{pathname: "/login"}}/> }
          </Route>
        </Switch>

        {authUser ? (
        <Redirect
          to={{
            pathname: "/home"
          }}
        />
        ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />)}
      </Layout>

    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}
export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
