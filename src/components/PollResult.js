import React, { Component } from 'react';
import { Card, Button, Avatar, Progress } from 'antd';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

const { Meta } = Card;

class PollResult extends Component {
    back(){
        this.props.history.push("/")
    }
    render() {
        const { question, user, users } = this.props;
        const userVote = user.answers[question.id]
        const num_votes_1 = question.optionOne.votes.length
        const num_votes_2 = question.optionTwo.votes.length
        const total_votes = num_votes_1 + num_votes_2
        const percentOne = (num_votes_1/total_votes) * 100
        const percentTwo = (num_votes_2/total_votes) * 100
        return (
            <Card
                style={{ width: 600 }}
                actions={[
                    <Button type="primary" size="medium" onClick={this.back.bind(this)}>
                        Back
                        </Button>
                ]}
            >
                <Meta
                    avatar={<Avatar src={users[question.author].avatarURL }/>}
                    title={users[question.author].name + " asks"}
                    description={
                        <div>
                        <h4>Would you rather</h4>
                        <Card>
                            <div>{question.optionOne.text} {userVote == "optionOne" &&  <span>(Your Vote)</span>}</div>
                            <Progress percent={percentOne} />
                            <h4>{num_votes_1} out of {total_votes} votes</h4>
                        </Card>
                        <Card>
                            <div>{question.optionTwo.text} {userVote == "optionTwo" &&  <span>(Your Vote)</span>}</div>
                            <Progress percent={percentTwo} />
                            <h4>{num_votes_2} out of {total_votes} votes</h4>
                        </Card>
                        </div>

                    }
                />
            </Card>
        );

    }
}
function mapStateToProps({ questions, authUser, users }) {
    return {
        // questions,
        // authUser,
        users
    };
}
const ConnectedPollResult = connect(
    mapStateToProps
)(PollResult);
export default withRouter(ConnectedPollResult)
// export default withRouter(PollResult)
