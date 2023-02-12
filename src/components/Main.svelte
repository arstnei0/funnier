<script lang="ts">
	import Hoverable from "./Hoverable.svelte"
	import {
		funnierButton,
		loadingText,
		mainInput,
		resultText,
	} from "./Main.css"

	let content = ""
	let el: HTMLTextAreaElement
	let result = null as null | string
	let err = false
	let loading = false

	$: ((_) => {
		if (el) {
			el.style.height = "auto"
			el.style.height = `${el.scrollHeight + 10}px`
		}
	})(content)

	async function funnier() {
		const body = {
			content,
		}

		loading = true
		const response = await fetch("/api/funnier", {
			method: "post",
			body: JSON.stringify(body),
		})
		loading = false

		if (response.ok) {
			const result$ = (await response.json()) as string
			result = result$
		} else {
			err = true
		}
	}
</script>

<textarea
	class={mainInput}
	bind:value={content}
	bind:this={el}
	placeholder="🙃Some boring text..."
/>
<Hoverable>
	<button class={funnierButton} on:click={funnier}>🍿</button>
</Hoverable>

{#if loading}
	<h2 class={loadingText}>🚀Still generating...🚀</h2>
{/if}

{#if result !== null}
	<p class={resultText}>{result}</p>
{/if}
