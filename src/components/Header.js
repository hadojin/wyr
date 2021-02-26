import React, { Component } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';
import {withRouter} from 'react-router-dom'

import {Link} from 'react-router-dom'
const { Header } = Layout;

class Navigation extends Component {
    logout(){
        this.props.setAuthUser(null)
        this.props.history.push("/login")
    }

    render() {
        const {authUser, users} = this.props;
        let active = this.props.history.location.pathname.split("/")[1]
        return (
            // <Header>
            // <div className="logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={"home"} selectedKeys={active?active:"home"}>
              <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="leaderboard"><Link to="/leaderboard">Leaderboard</Link></Menu.Item>
              <Menu.Item key="add"><Link to="/add">New Question</Link></Menu.Item>
              <Menu.Item style={{float: 'right' }} key='logout' icon={<LogoutOutlined />} onClick={this.logout.bind(this)}>Logout</Menu.Item>
              <div  style={{float: 'right' }}>
                  <Avatar size="Large" src={users[authUser].avatarURL} />
                  {users[authUser].name}
                </div>
              {/* <h2></h2> */}
            </Menu>
        //   </Header>
        );
    }
}

function mapStateToProps({ users }) {
    return {
      users
    };
  }
const ConnectedNavigation = connect(
    mapStateToProps,
    { setAuthUser }
)(Navigation);



export default withRouter(ConnectedNavigation);
