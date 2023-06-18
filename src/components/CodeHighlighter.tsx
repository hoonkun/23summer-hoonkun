'use client'

import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ImportedHighlighter from "react-syntax-highlighter"
import React, { PropsWithChildren } from "react"

export const CodeHighlighter: React.FC<PropsWithChildren<{ className: string }>> = ({ className, children }) =>
  <ImportedHighlighter language={className.replace("language-", "")} style={darcula}>{children as any}</ImportedHighlighter>
