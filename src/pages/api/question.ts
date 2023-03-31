// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateQuestion } from '@/services/openai.service';
import { Question } from '@/types/openai.types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question>
) {

  const openaiKey = process.env.OPENAI_KEY;
  if (openaiKey) {
    const question:Question =await generateQuestion(openaiKey);
    res.status(200).json(question);
  }
}
