import { Configuration, OpenAIApi } from "openai"

if (!import.meta.env.OPENAI_API_KEY) {
	throw new Error("OpenAI API Key not provided!")
}
const configuration = new Configuration({
	apiKey: import.meta.env.OPENAI_API_KEY,
})
export const openai = new OpenAIApi(configuration)
