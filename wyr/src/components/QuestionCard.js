import React, { Component } from 'react';
import { Card, Button, Avatar } from 'antd';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

const { Meta } = Card;

class QuestionCard extends Component {
    showResult(){
        this.props.history.push("questions/"+this.props.question.id)
    }
    render() {
        const { question, showResults } = this.props;
        return (
        
            <Card
                style={{ width: 600 }}
                actions={[
                    <Button type="primary" size="medium" onClick={this.showResult.bind(this)}>
                        {showResults ? "Show Results":"Submit Answer"}
                        </Button>
                ]}
            >
                <Meta
                    avatar={<Avatar src={this.props.users[question.author].avatarURL} />}
                    title={this.props.users[question.author].name + " asks"}
                    description={
                        <div>
                            <h4>Would you rather</h4>
                            <div>{question.optionOne.text}</div>
                            <div>{question.optionTwo.text}</div>
                        </div>
                    }
                />
            </Card>
        );

    }
}
const ConnectedQuestionCard = connect(
    mapStateToProps,
)(QuestionCard);

function mapStateToProps({ users }) {
    return {
        users
    };
}
export default withRouter(ConnectedQuestionCard)
