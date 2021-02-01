/* eslint-disable func-names */
import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
// import Link from '../src/components/Link';
import Footer from '../src/components/Footer';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0.2, duration: 1 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>
              {' '}
              {db.title}
            </h1>
          </Widget.Header>
          <Widget.Content>

            <p>{db.description}</p>
            <form onSubmit={function (e) {
              e.preventDefault();

              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Como posso te chamar?"
                value={name}
              />
              <Button
                type="submit"
                disabled={name.length === 0}
                as={motion.button}
                transition={{ delay: 0.7, duration: 0.2 }}
                variants={{
                  show: { opacity: 1, y: '0' },
                  hidden: { opacity: 0, y: '100%' },
                }}
                initial="hidden"
                animate="show"

              >
                {`Vamos lá ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.7, duration: 1 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
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
                    <Widget.Topic href={`/quiz/${projectNme}___${githubUser}`} disabled={name.length === 0}>
                      {`${githubUser}/${projectNme}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          transition={{ delay: 1.2, duration: 1 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
    </QuizBackground>
  );
}
