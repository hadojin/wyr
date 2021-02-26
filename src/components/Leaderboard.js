import React, { Component } from 'react';
import UserCard from './UserCard'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Leaderboard extends Component {
    render(){
        const {users} = this.props;
        let usersSorted = []
        Object.values(users).map(user=>{
            let score = Object.keys(user.answers).length + user.questions.length
            usersSorted.push({...user, score})
        })
        usersSorted.sort((a,b)=>b.score-a.score);
        return(
            usersSorted.map(user=><UserCard key={user.id} user={user}/>)
        );

    }
}

const ConnectedLeaderboard = connect(
    mapStateToProps
)(Leaderboard);

function mapStateToProps({ users }) {
    return {
        users
    };
}

export default withRouter(ConnectedLeaderboard);
