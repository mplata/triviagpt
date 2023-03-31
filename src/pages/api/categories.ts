// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateCategories } from '@/services/openai.service';
import { Category } from '@/types/openai.types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category>
) {

  const openaiKey = process.env.OPENAI_KEY;
  if (openaiKey) {
    const category:Category =await generateCategories(openaiKey);
    res.status(200).json(category);
  }
}
