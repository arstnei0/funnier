import type { APIRoute } from "astro"
import { z } from "zod"
import { openai } from "../../lib/openai"
import c from "chalk"

const Input = z.object({
	content: z.string(),
})
type Input = z.infer<typeof Input>

export const post: APIRoute = async (ctx) => {
	try {
		const input = Input.parse(await ctx.request.json())
		try {
			const result = await openai.createCompletion({
				model: "text-davinci-003",
				prompt:
					"Make the following text more interesting and funnier and add emojis to the text" +
					": \n" +
					input.content,
				stream: false,
				n: 1,
				temperature: 1,
				max_tokens: 300,
			})
			console.log(
				`${c.green("New request for this text: ")}\n${
					input.content
				}\n${c.blue("The result is: ")}\n${result.data.choices[0].text}`
			)
			return new Response(JSON.stringify(result.data.choices[0].text))
		} catch (e) {
			console.log(e)
			return new Response("Server Error", { status: 500 })
		}
	} catch (e) {
		return new Response("Invalid input", { status: 400 })
	}
}
