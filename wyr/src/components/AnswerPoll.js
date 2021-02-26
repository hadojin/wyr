import React, { Component } from 'react';
import { Card, Button, Avatar, Radio, Form } from 'antd';
import { withRouter } from 'react-router-dom';
import {addVote} from '../actions/questions'
import {addVoteToUser} from '../actions/users'
import { connect } from 'react-redux';

const { Meta } = Card;

class PollResult extends Component {
    onSubmit(values) {
        const {question, user} = this.props;
        this.props.addVote(question.id, values.Answer, user.id)
        this.props.addVoteToUser(question.id, values.Answer, user.id)
        this.props.history.push('/home')
    }
    render() {
        const { question, user } = this.props;
        // const userVote = user.answers[question.id]
        // const num_votes_1 = question.optionOne.votes.length
        // const num_votes_2 = question.optionTwo.votes.length
        // const total_votes = num_votes_1 + num_votes_2
        // const percentOne = (num_votes_1/total_votes) * 100
        // const percentTwo = (num_votes_2/total_votes) * 100
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return (
            <Card
                style={{ width: 600 }}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={question.author + " asks"}
                    description={
                        <div>
                        <h4>Would you rather</h4>
                        <Form
                            // {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            title="Would you rather"
                            onFinish={this.onSubmit.bind(this)}
                        // onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                // label="Choose an option"
                                name="Answer"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                            <Radio.Group value="optionOne">
                                    <Radio style={radioStyle} value="optionOne">
                                        {question.optionOne.text}
                                    </Radio>
                                    <Radio style={radioStyle} value="optionTwo">
                                    {question.optionTwo.text}
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        </div>

                    }
                />
            </Card>
        );

    }
}

const ConnectedPollResult = connect(
    null,
    { addVote, addVoteToUser }
)(PollResult);

// function mapStateToProps({ users }) {
//     return {
//         users: Object.values(users)
//     };
// }
export default withRouter(ConnectedPollResult)

