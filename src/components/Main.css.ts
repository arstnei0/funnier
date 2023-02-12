import { style } from "@vanilla-extract/css"
import { bgColor, bgColorLight, fontColorPrimary } from "~/styles/color.css"
import { mono, sans, serif } from "~/styles/font.css"
import { borderRadius } from "~/styles/size.css"

export const mainInput = style({
	backgroundColor: bgColorLight,
	color: fontColorPrimary,
	fontSize: "1.6em",
	fontFamily: mono,
	width: "100%",
	overflowY: "hidden",
	resize: "none",
	height: "auto",
	padding: "1em",
	borderRadius,
	border: "none",
	outline: "none",
	transition: "all .3s ease",
	":hover": {
		filter: "brightness(140%)",
	},
})

export const funnierButton = style({
	outline: "none",
	border: "none",
	backgroundColor: bgColorLight,
	color: fontColorPrimary,
	fontSize: "1.6em",
	padding: ".8em",
	borderRadius,
	transition: "all .3s ease",
	marginTop: "1.5em",

	":hover": {
		filter: `brightness(1.4)`,
	},
})

export const loadingText = style({
	width: "100%",
	fontSize: "2em",
	textAlign: "center",
})

export const resultText = style({
	fontSize: "2em",
})
