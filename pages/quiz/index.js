/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuestionWidget from '../../src/components/QuestionWidget';
import LoadingWidget from '../../src/components/LoadingWidget';
import ResultWidget from '../../src/components/ResultWidget';
import Widget from '../../src/components/Widget';
// import QuizPage from '../../src/components/QuizPage';

export default function QuizPage() {
  const screenStates = {
    QUIZ: 'QUIZ',
    RESULT: 'RESULT',
    LOADING: 'LOADING',
  };

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  //
  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
          addResult={addResult}
        />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectNme, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic href={`/quiz/${projectNme}___${githubUser}`}>
                      {`${githubUser}/${projectNme}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
      </QuizContainer>
    </QuizBackground>
  );
}
