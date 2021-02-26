import { Form, Button, Select,Space  } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { setAuthUser } from '../actions/authUser';
import 'antd/dist/antd.css';
import {withRouter} from 'react-router-dom'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },

};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
class Login extends Component {
    onSubmit(values){
        this.props.setAuthUser(values.userId)
        let redirect = this.props.location.state.redirect_to
        if(redirect){
            this.props.history.push(redirect)
        }else{
            this.props.history.push("/")
        }
    }
    render() {
        return (
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
                    label="Select"
                    name="userId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={}
                        allowClear
                    >
                        {this.props.users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                </Button>
                </Form.Item>
            </Form>
        );
    }
}
const ConnectedLoginForm = connect(
    mapStateToProps,
    { setAuthUser }
)(Login);

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    };
}

export default withRouter(ConnectedLoginForm);
