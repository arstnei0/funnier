<script lang="ts">
	const OFFSET = 7

	let hoveringEl: HTMLDivElement | null = null as any
	let offsetX = 0
	let offsetY = 0
	let mouseX = 0
	let mouseY = 0
	let pressing = false

	if (globalThis.document) {
		document.addEventListener("mousemove", (e) => {
			mouseX = e.clientX
			mouseY = e.clientY
		})

		document.addEventListener("mousedown", () => {
			pressing = true
		})

		document.addEventListener("mouseup", () => {
			pressing = false
		})

		// @ts-ignore
		globalThis.cursorEnter = (el: HTMLDivElement) => {
			hoveringEl = el
			offsetY = 0
			offsetX = 0
		}

		// @ts-ignore
		globalThis.cursorLeave = () => {
			hoveringEl = null
			offsetY = 0
			offsetX = 0
		}
	}
	$: round = hoveringEl?.dataset?.round === "true"
	$: hoveringElX = (() => {
		const hel = hoveringEl
		if (!hel) return null
		let left = 0
		let element = hel
		do {
			left += element.offsetLeft || 0
			element = element.offsetParent as any
		} while (element)
		return left + hel.offsetWidth / 2
	})()
	$: hoveringElY = (() => {
		const hel = hoveringEl
		if (!hel) return null
		const rect = hel.getBoundingClientRect()
		return rect.top + rect.height / 2
	})()
	$: yString = `${hoveringElY ?? mouseY}px`
	$: xString = `${hoveringElX ?? mouseX}px`

	$: isHovering = !!hoveringEl
	$: width = (() =>
		hoveringEl?.dataset.shadow === "false"
			? `0px`
			: round
			? height
			: `${
					hoveringEl?.clientWidth
						? (hoveringEl?.clientWidth as any) * 1.3
						: 20
			  }px`)()
	let height = (() =>
		hoveringEl?.dataset.shadow === "false"
			? `0px`
			: `${
					hoveringEl?.clientHeight
						? (hoveringEl?.clientHeight as any) * 1.3
						: 20
			  }px`)()

	$: transformStyle = (() =>
		`translate(${offsetX * 1.3}px, ${offsetY * 1.3}px)`)()
	$: (() => {
		const hoveringElement = hoveringEl
		const x = mouseX
		const y = mouseY
		if (hoveringElement) {
			const rect = hoveringElement.getBoundingClientRect()
			let left = 0
			let element = hoveringElement
			do {
				left += element.offsetLeft || 0
				element = element.offsetParent as any
			} while (element)
			offsetX = (x - left - hoveringElement.offsetWidth / 2) / OFFSET
			offsetY = (y - rect.top - rect.height / 2) / OFFSET
		}
	})()
	$: (() => {
		const hoveringElement = hoveringEl
		if (hoveringElement) {
			hoveringElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`
		}
	})()
</script>

<div id="custom-cursor">
	<div
		id="cursor"
		style:top={yString}
		style:left={xString}
		style:width
		style:height
		style:transform={transformStyle}
		class:pressing
		class:hovering={isHovering}
	>
		<div id="cursor-content-wrap">
			<div id="cursor-content" class:round />
		</div>
	</div>
	<div id="cursor-highlight" />
</div>

<style>
	#custom-cursor {
		z-index: 1000;
		position: fixed;
		pointer-events: none;
	}

	#cursor {
		width: 20px;
		height: 20px;
		z-index: 1000;
		position: fixed;
		transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
			height 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
			width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	#cursor-content {
		width: 100%;
		z-index: 1000;
		height: 100%;
		border-radius: 10px;
		background-color: #989898;
		opacity: 0.5;
		transform: translate(-50%, -50%);
		transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
			height 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
			width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	#cursor-content.round {
		border-radius: 50%;
	}

	#cursor-content-wrap {
		width: 100%;
		height: 100%;
		transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
			transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
		transform: scale(1);
	}

	.pressing:not(.hovering) #cursor-content {
		opacity: 0.8;
	}

	.pressing:not(.hovering) #cursor-content-wrap {
		transform: scale(0.85);
	}

	.pressing.hovering #cursor-content {
		opacity: 0.5 !important;
	}

	:global(*) {
		cursor: none;
	}

	.hovering #cursor-content {
		opacity: 0.2;
	}

	.pressing.hovering #cursor-content-wrap {
		transform-origin: center;
		transform: scale(0.9) translate(-5%, -5%);
	}
</style>
