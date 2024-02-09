'use client'

import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter"
import React, { PropsWithChildren } from "react"
import reset from "@/lib/react-syntax-highlighter/reset"
import styled from "styled-components"

const ImportedHighlighter = Prism as typeof React.Component<SyntaxHighlighterProps>

export const CodeHighlighter: React.FC<PropsWithChildren<{ className: string }>> = props =>
  <CodeStyle>
    <ImportedHighlighter
      language={props.className.replace("language-", "")}
      style={reset}
    >
      {props.children as any}
    </ImportedHighlighter>
  </CodeStyle>

export const CodeStyle = styled.div`
  overflow-x: auto;
  
  .comment { color: #808080 }
  .prolog { color: #808080 }
  .cdata { color: #808080 }
  .delimiter { color: #CF8E6D }
  .boolean { color: #CF8E6D }
  .keyword { color: #CF8E6D }
  .selector { color: #CF8E6D }
  .important { color: #CF8E6D }
  .atrule { color: #CF8E6D }
  .operator { color: #bcbec4 }
  .punctuation { color: #bcbec4 }
  .tag { color: #e8bf6a }
  .tag.punctuation { color: #e8bf6a }
  .tag.script { color: #bcbec4 }
  .attr-name { color: #bcbec4 }
  .tag.class-name { color: #2FBAA3 }
  .doctype { color: #e8bf6a }
  .builtin { color: #CF8E6D }
  .entity { color: #6897bb }
  .number { color: #6897bb }
  .symbol { color: #6897bb }
  .property { color: #c77dbb }
  .property-access { color: #c77dbb }
  .constant { color: #c77dbb }
  .variable { color: #c77dbb }
  .string { color: #6AAB73 }
  .char { color: #6AAB73 }
  .attr-value { color: #a5c261 }
  .attr-value.punctuation { color: #a5c261 }
  .attr-value.punctuation:first-of-type { color: #bcbec4 }
  .url { color: #287bde; text-decoration: underline; }
  .function { color: #56A8F5 }
  .method { color: #56A8F5 }
  .regex {background: #364135 }
  .bold { font-weight: bold }
  .italic { font-style: italic }
  .inserted { background: #294436 }
  .deleted { background: #484a4a }
  .code.language-css .token.property { color: #bcbec4 }
  .code.language-css .token.property + .token.punctuation { color: #bcbec4 }
  .code.language-css .token.id { color: #ffc66d }
  .code.language-css .token.selector > .token.class { color: #ffc66d }
  .code.language-css .token.selector > .token.attribute { color: #ffc66d }
  .code.language-css .token.selector > .token.pseudo-class { color: #ffc66d }
  .code.language-css .token.selector > .token.pseudo-element { color: #ffc66d }
  .maybe-class-name { color: #bcbec4 }
`