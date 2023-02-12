import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import svelte from "@astrojs/svelte"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: vercel(),
	integrations: [svelte()],
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
})
