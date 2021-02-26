import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Tabs } from 'antd';
import QuestionsList from './QuestionsList'
import { Layout, Menu, Breadcrumb } from 'antd';
import Header from './Header'
const {Content } = Layout;
const { TabPane } = Tabs;

class Home extends Component {

    render() {
        const { allQuestions, userData: { answers } } = this.props;
        let unansweredQuestions = Object.keys(allQuestions).filter(questionId => (
            !(Object.keys(answers).includes(questionId))
        ));
        return (
            <div>
            <Content style={{ padding: '0 50px' }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Unanswered Questions" key="1">
                        <QuestionsList allQuestions={allQuestions} questionsIds={unansweredQuestions} showResults={false}/>
                    </TabPane>
                    <TabPane tab="Answered Questions" key="2">
                            <QuestionsList allQuestions={allQuestions} questionsIds={Object.keys(answers)} showResults={true}/>
                    </TabPane>
                </Tabs>
            </Content>
            </div>
        );
    }
}


const ConnectedHome = connect(
    mapStateToProps
)(Home);

function mapStateToProps({ authUser, users, questions }) {
    return {
        userData: users[authUser],
        allQuestions: questions
    }
}

export default ConnectedHome;
