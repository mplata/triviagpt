import Head from 'next/head'
import { Roboto  } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Answer, Category, Question } from '@/types/openai.types';
import axios from 'axios';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {

  const [ currentQuestion, setCurrentQuestion ] = useState<Question | null>(null);
  const [ answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [ loadingQuestion, setLoadingQuestion ] = useState<boolean>(false);

  const fetchQuestion = async () => {
    setLoadingQuestion(true);
    const questionResponse = await axios.get('/api/question');
    const question:Question = questionResponse.data;
    console.log(question);
    setCurrentQuestion(question);
    setLoadingQuestion(false);
  };

  const fetchCategories = async () => {
    const categoriesResponse = await axios.get('/api/categories');
    const categories:Category = categoriesResponse.data;
    console.log(categories);
  };

  useEffect(() => {
    fetchQuestion();
    fetchCategories();
  }, []);

  const selectAnswer = (index: number, question: Answer) => {
    const correctAnswer = currentQuestion?.ca;
    if(index === correctAnswer && currentQuestion !== null){
      const answered = [currentQuestion, ...answeredQuestions];
      setAnsweredQuestions(answered);
      fetchQuestion();
    } else {
      console.log('Incorrecta');
    }
  } ;
  return (
    <>
      <Head>
        <title>Infinite Trivia</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={roboto.className}>TriviaGPT</h1>
        <div className='question_container'>
          <div className='current'>
            {
              (currentQuestion === null || loadingQuestion)
              ? <div>Asking GPT for a question...</div>
              : <div className='wrapper'>
                <span>{currentQuestion.t}</span>
                <div className='answers'>
                  {
                    currentQuestion.a.map((answer,i) => {
                      return <span onClick={() => selectAnswer(i,answer)} className='answer' key={i}>{answer.t}</span>
                    })
                  }
                </div>
              </div>
              
            }
          </div>
        </div>
        <div>
          {
            answeredQuestions.length > 0 !== null &&
            <div className='correct_container'>
                {
                  answeredQuestions.map((question,i) => {
                    return <span className='answered' key={i}>{question.t}</span>
                  })
                }
            </div>
          }
        </div>
      </main>
    </>
  )
}
