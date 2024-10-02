import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { update } from "three/examples/jsm/libs/tween.module.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { updatedMessages, personality } = JSON.parse(req.body);

  console.log(updatedMessages);

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a ${personality} robot called robin. You talk like a young boy`,
      },
      ...updatedMessages,
    ],
    model: "gpt-3.5-turbo",
  });

  res.status(200).json(response.choices[0].message);
}
