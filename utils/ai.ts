import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { z } from "zod";

import { Analysis } from "@prisma/client";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    color: z
      .string()
      .describe(
        'a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.',
      ),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).',
      ),
  }),
);

async function getPrompt(content: string) {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
}

type AnalysisParser = Omit<
  Analysis,
  'id' | 'createdAt' | 'updatedAt' | 'entryId'
>;
export async function analyze(
  content: string,
): Promise<AnalysisParser | never> {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const prompt = await getPrompt(content);
  const result = await model.call(prompt);

  try {
    return await parser.parse(result);
  } catch (error) {
    console.error(error);

    return error.message;
  }
}
