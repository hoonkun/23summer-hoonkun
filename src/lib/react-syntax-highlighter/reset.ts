import { CSSProperties } from "react"

const reset: Record<string, CSSProperties> = {
  "code[class*=\"language-\"]": {
    "color": "#bcbec4",
    "fontFamily": "Consolas, Monaco, 'Andale Mono', monospace",
    "direction": "ltr",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "4",
    "OTabSize": "4",
    "tabSize": "4",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none"
  },
  "pre[class*=\"language-\"]": {
    "color": "#bcbec4",
    "fontFamily": "Consolas, Monaco, 'Andale Mono', monospace",
    "direction": "ltr",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "4",
    "OTabSize": "4",
    "tabSize": "4",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none",
    "margin": ".5em 0",
    "overflow": "auto",
    "background": "rgb(39,40,44)"
  },
  "pre[class*=\"language-\"]::-moz-selection": {
    "color": "inherit",
    "background": "rgba(33, 66, 131, .85)"
  },
  "pre[class*=\"language-\"] ::-moz-selection": {
    "color": "inherit",
    "background": "rgba(33, 66, 131, .85)"
  },
  "code[class*=\"language-\"]::-moz-selection": {
    "color": "inherit",
    "background": "rgba(33, 66, 131, .85)"
  },
  "code[class*=\"language-\"] ::-moz-selection": {
    "color": "inherit",
    "background": "rgba(33, 66, 131, .85)"
  },
  "pre[class*=\"language-\"]::selection": {
    "color": "inherit",
    "background": "rgba(33, 66, 131, .85)"
  },
  "pre[class*=\"language-\"] ::selection": {
    "color": "inherit",
    "background": "rgba(33, 66, 131, .85)"
  },
  "code[class*=\"language-\"]::selection": {
    "color": "inherit",
    "background": "rgba(33, 66, 131, .85)"
  },
  "code[class*=\"language-\"] ::selection": {
    "color": "inherit",
    "background": "rgba(33, 66, 131, .85)"
  },
  ":not(pre) > code[class*=\"language-\"]": {
    "background": "rgb(39,40,44)",
    "padding": ".1em",
    "borderRadius": ".3em"
  }
};

export default reset
