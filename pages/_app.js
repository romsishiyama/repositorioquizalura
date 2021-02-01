/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import GitHubCorner from '../src/components/GitHubCorner';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    color:${({ theme }) => theme.colors.secondary};
  }


  body {
    margin: 0;
    padding: 0;
    display : flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contratText};
  }

  html, body{
    min-height : 100vh;
  }

  #__next{
    flex:1;
    display:flex;
    flex-direction: column;

  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Quiz da Roms</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <GitHubCorner projectUrl="https://github.com/romsishiyama" />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
