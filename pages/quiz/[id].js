/* eslint-disable react/prop-types *//* eslint-disable linebreak-style */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screen/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen db={dbExterno} />
    </ThemeProvider>

  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  console.log('infos que o Next da para nós', context);

  try {
    const dbExterno = await fetch(`http://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((e) => {
        if (e.ok) { return e.json(); }

        throw new Error('Falha em pegar os dados');
      })
      .then((respostaEmJson) => respostaEmJson);

    return {
      props: {
        dbExterno,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}
