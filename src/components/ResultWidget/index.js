/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import styled from 'styled-components';
import react from 'react';
import Widget from '../Widget';
import Footer from '../Footer';

export default function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado
      </Widget.Header>
      <Widget.Content>
        <p>
          {`Você acertou 
          ${results.filter((x) => x).length}
          perguntas`}
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              {index + 1 }
              {' '}
              Resultado :
              {' '}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}
