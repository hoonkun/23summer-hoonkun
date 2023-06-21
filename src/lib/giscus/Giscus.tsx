'use client'

import React from "react"
import Giscus, { GiscusProps } from "@giscus/react"

export const Discussions: React.FC<GiscusProps> = (props) => {
  return <Giscus {...props} host={"https://comments.hoonkun.kiwi"} />
}
