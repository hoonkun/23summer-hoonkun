'use client'

import React from "react"
import styled from "styled-components"

export const PostRoot = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  
  line-height: 225%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  font-family: "IBM Plex Sans KR", sans-serif;
  
  background-color: #181c22;
  
  p {
    margin: 20px 0;
  }

  table {
    border-color: #FFFFFFBB;
    table-layout: fixed;
  }

  table td, th {
    border-color: #FFFFFFBB;
  }

  del {
    opacity: 0.55;
  }

  ul, ol {
    padding-inline-start: 20px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #FFFFFF;
    margin: 40px 0 10px 0;
  }

  .math-inline {
    max-width: 100%;
    margin-bottom: -12px;
    display: inline-block;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    color: #FFFFFF;
    padding-right: 3px;
  }

  table .math-inline {
    margin-bottom: -5px;
  }

  p:has(> img) + blockquote {
    text-align: center;
    color: #FFFFFF90;
    font-size: 14px;
    margin-top: -10px;
    background-color: transparent;
    border-left: none;
    line-height: 150%;
    word-break: keep-all;
  }

  code {
    font-family: "JetBrains Mono", sans-serif !important;
    font-size: 13px;
    line-height: 150%;
  }
  
  pre:has(+ blockquote) > pre {
    margin: 0 !important;
    border-radius: 5px 5px 0 0;
    overflow-x: auto;
    font-family: "JetBrains Mono", sans-serif;
    background-color: rgb(43, 43, 43);
  }
  
  pre:has( > pre) {
    margin: 20px 0 0 0;
  }
  
  pre:has(> pre):not(:has(+ blockquote)) > pre {
    margin: 0 !important;
    border-radius: 5px;
    padding: 7px 15px;
    font-size: 16px;
    font-family: "JetBrains Mono", sans-serif;
    background-color: rgb(43, 43, 43);
  }

  pre + blockquote {
    margin: 0 0 0 0;
    font-size: 13px;
    background-color: #00000040;
    padding: 8px 15px;
    font-family: "JetBrains Mono", sans-serif;
    border-radius: 0 0 5px 5px;
    border-left: none;
  }

  a {
    color: #639aff;
    text-decoration: underline;
  }

  blockquote {
    p {
      margin: 0;
    }
    margin: 0;
    background-color: #FFFFFF10;
    padding: 15px 25px;
    border-left: 5px solid #78a718;
    border-radius: 5px;
  }
  
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 10px 15px;
    border-radius: 5px 5px 0 0;
    background: #00000020;
  }
  
  .hljs {
    color: #bababa;
  }

  .hljs-strong, .hljs-emphasis {
    color: #a8a8a2;
  }

  .hljs-bullet, .hljs-quote, .hljs-link, .hljs-number, .hljs-regexp, .hljs-literal {
    color: #6896ba;
  }

  .hljs-code, .hljs-selector-class {
    color: #a6e22e;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-keyword, .hljs-selector-tag, .hljs-section, .hljs-attribute, .hljs-name, .hljs-variable {
    color: #cb7832;
  }

  .hljs-params {
    color: #b9b9b9;
  }

  .hljs-string {
    color: #6a8759;
  }

  .hljs-subst, .hljs-type, .hljs-built_in, .hljs-builtin-name, .hljs-symbol, .hljs-selector-id, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-template-tag, .hljs-template-variable, .hljs-addition {
    color: #e0c46c;
  }

  .hljs-comment, .hljs-deletion, .hljs-meta {
    color: #7f7f7f;
  }
`

export const PostContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;
  padding: 0 15px;
  font-size: 16px;
`

export const InlineCode = styled.code`
  padding: 2px 5px;
  background-color: #00000040;
  border-radius: 4px;
`