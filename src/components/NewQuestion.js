import { Form, Button, Input, Divider, Card, Avatar } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { addQuestion } from '../actions/questions';
import { addQuestionToUser } from '../actions/users';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import { _saveQuestion } from '../api/apifuns';

const { Meta } = Card;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class NewQuestion extends Component {
    onSubmit(values) {
        let question = {...values, author:this.props.authUser }
        _saveQuestion(question).then(question=>{
            this.props.addQuestion(question);
            this.props.addQuestionToUser(question);
        })
        this.props.history.push("/home")
    }
    render() {
        console.log("RENDER")
        return (
            <Card
                style={{ width: 600 }}
            >
                <Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={"Would you rather"}
                    description={
                        <div>
                            {/* <h4>Would you rather</h4> */}
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={this.onSubmit.bind(this)}
                            // onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    // label="Option"
                                    name="optionOneText"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input option one!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please input option one..." />
                                </Form.Item>
                                <Divider plain>
                                    OR
                </Divider>
                                <Form.Item
                                    // label="Option"
                                    name="optionTwoText"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input option two!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please input option two..." />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
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

const ConnectedNewQuestionForm = connect(
    mapStateToProps,
    { addQuestion, addQuestionToUser }
)(NewQuestion);

function mapStateToProps({ authUser }) {
    return {
        authUser
    };
}

export default withRouter(ConnectedNewQuestionForm);
