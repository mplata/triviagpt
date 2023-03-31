import { Category, Question } from "@/types/openai.types";
import axios from "axios";
import { extractJsonText } from "./util/openai.util";

export const generateQuestion = async (apiKey: string): Promise<Question> => {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": 'application/json',
    };
    const topics = ['Pop culture', 'Geography','History','Science and Technology','Sports','Literature',
      'Food and drink', 'Art and music','Famous personalities','Mythology and folklore', 'anime'];
    const topicLists = topics.join(',');
    const jsonRequestPrompt = `Generate one trivia question about one of the following topics: ${topicLists},
    including 4 posible answers indicating the correct one. Do not include any explanations,
    only provide a  RFC8259 compliant JSON response  following this format without deviation:
    {
      "t": "string indicating the text of the question",
      "ca": "an integer indicating the index of the correct answer",
      "ct": "a string indicating the category of the answer",
      "a": [{
        "t": "Text of the answer",
      }]
    }`;
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": jsonRequestPrompt},
      ],
    };
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers });
    const responseData = response.data;
    const { choices } = responseData;
    const messageContent:string = choices[0].message.content;
    const question =  extractJsonText(messageContent);
    if (question === null){
      throw Error('Error while generating question');
    }
    return question;
};
