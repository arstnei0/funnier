import { globalStyle, style } from "@vanilla-extract/css"
import { mono, sans, serif } from "./font.css"
import { bgColor, bgColorLight, fontColorPrimary } from "./color.css"
import { borderRadius } from "./size.css"

globalStyle("body", {
	vars: {
		[sans]: "'Poppins', sans-serif",
		[serif]: "'Noto Serif', serif",
		[mono]: "'Fira Code', monospace",
		[fontColorPrimary]: "#f0f6df",
		[bgColor]: "#131212",
		[bgColorLight]: "#1d1d1d",
		[borderRadius]: "10px",
	},
	fontFamily: sans,
	backgroundColor: bgColor,
	color: fontColorPrimary,
})

globalStyle("main", {
	marginLeft: "20%",
	marginRight: "20%",
	marginTop: "3%",
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "center",
	marginBottom: "20%",
})

globalStyle("a", {
	color: "#8bbff6",
	textDecoration: "none",
})
