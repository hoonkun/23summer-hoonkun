'use client'

import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import _ImportedHighlighter, { SyntaxHighlighterProps } from "react-syntax-highlighter"
import React, { PropsWithChildren } from "react"

const ImportedHighlighter = _ImportedHighlighter as typeof React.Component<SyntaxHighlighterProps>

export const CodeHighlighter: React.FC<PropsWithChildren<{ className: string }>> = props =>
  <ImportedHighlighter
    language={props.className.replace("language-", "")}
    style={darcula}
  >
    {props.children as any}
  </ImportedHighlighter>
