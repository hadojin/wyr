import React, { Component } from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

class UserCard extends Component{
    render() {
        const { user } = this.props;
        return (
            <Card
                style={{ width: 600 }}
            >
                <Meta
                    avatar={<Avatar src={user.avatarURL} />}
                    title={user.name}
                    description={
                        <div>
                            <div>Answered: {Object.keys(user.answers).length}</div>
                            <div>Questions: {user.questions.length}</div>
                            <div>Score: {user.score}</div>

                        </div>
                    }
                />
            </Card>
        );

    }
}

export default UserCard
