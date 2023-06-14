import React from "react"
import { dateBasedRandom, dice } from "@/lib/23summer/dice"

import { HomeClient } from "@/app/_client"

export default function Home() {
  const die = dice()
  const rotation = dateBasedRandom() % 10 - 5

  return <HomeClient die={die} rotation={rotation}/>
}
