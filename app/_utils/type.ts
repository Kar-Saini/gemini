export type Country = {
  name: { common: string };
  code?: { root?: string; suffixes?: string[] };
};
export interface PromptResponseType {
  id: string;
  userPrompt: { timeStamp: string; prompt: string };
  geminiResponse?: { timeStamp: string; response: string };
}

export type Chats = {
  name?: string;
  timeStamp: string;
  id: string;
  promptAndResponses: PromptResponseType[];
}[];
