import { Category, Question } from "@/types/openai.types";

export const extractJsonText = (openAiResponse: string): Question | null => {
  try {
    const startIndex = openAiResponse.indexOf("{");
    const endIndex = openAiResponse.lastIndexOf("}") + 1;
    const jsonText = openAiResponse.slice(startIndex, endIndex);
    const question:Question = JSON.parse(jsonText);
    return question;
  } catch (error) {
    console.error(`Failed to extract JSON text from input string: ${error}`);
    return null;
  }
}

export const extractJsonTextCategory = (openAiResponse: string): Category | null => {
  try {
    const startIndex = openAiResponse.indexOf("{");
    const endIndex = openAiResponse.lastIndexOf("}") + 1;
    const jsonText = openAiResponse.slice(startIndex, endIndex);
    const category:Category = JSON.parse(jsonText);
    return category;
  } catch (error) {
    console.error(`Failed to extract JSON text from input string: ${error}`);
    return null;
  }
}
