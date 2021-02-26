import React, { Component } from 'react';
import QuestionCard from './QuestionCard'

const QuestionsList = ({allQuestions, questionsIds=[], showResults}) => (
    <div>
    {questionsIds
        .sort((a,b)=>(
           allQuestions[b].timestamp - allQuestions[a].timestamp
        ))
        .map(q=>
            <QuestionCard 
                question={allQuestions[q]}
                showResults={showResults} 
                key={q}
                />
    )}
    </div>
)

export default QuestionsList
