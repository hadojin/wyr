import React, { Component } from 'react';
import QuestionCard from './QuestionCard'

class QuestionsList extends Component {
    render(){
        const {allQuestions, questionsIds=[], showResults} = this.props;

        let hopa = questionsIds.sort((a,b)=>{
           return allQuestions[b].timestamp - allQuestions[a].timestamp;
        })
  



        return(
            <div>
            {hopa.map(q=>
                <QuestionCard question={allQuestions[q]} showResults={showResults} key={q}/>
            )}
            </div>
        );

    }
}

export default QuestionsList
