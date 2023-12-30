'use client'

import React from "react"
import styled from "styled-components"

export const NewPageLinkIndicator: React.FC = () => <NewTabIndicatorRoot>↗</NewTabIndicatorRoot>

const NewTabIndicatorRoot = styled.span`
  font-family: "JetBrains Mono", sans-serif;
  margin-right: 4px;
`
