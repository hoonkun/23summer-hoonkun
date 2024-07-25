import fs from "fs"
import path from "path"
import config from "@/config"
import matter from "gray-matter"

export type PortfolioTag = {
  name: string
  color: string
}

export const PortfolioTags: Readonly<{ [key: string]: PortfolioTag }> = {
  Kotlin: { name: "Kotlin", color: "#ff6a00" },
  KotlinMultiplatform: { name: "Kotlin Multiplatform", color: "#ff6a00" },
  KotlinConsole: { name: "Kotlin Console", color: "#ff6a00" },
  MinecraftServerPlugin: { name: "Minecraft Server Plugin", color: "#59a100" },
  MinecraftCommands: { name: "Minecraft Commands", color: "#59a100" },
  Compose: { name: "Jetpack Compose", color: "#00c479" },
  BytesParsing: { name: "Byte Data Parsing", color: "#424242" },
  Unity: { name: "Unity", color: "#666666" },
  TwoDimensional: { name: "2d", color: "#008598" },
  Android: { name: "Android", color: "#00c479" },
  Python: { name: "Python", color: "#c09706" },
  Django: { name: "Django", color: "#088c03" },
  Typescript: { name: "Typescript", color: "#0069ad" },
  React: { name: "React", color: "#00a4c4" },
  NextJS: { name: "NextJS", color: "#777777" },
  ReactNative: { name: "React Native", color: "#00a4c4" },
  Electron: { name: "Electron", color: "#00a4c4" },
  SocketCommunicating: { name: "Socket Communication", color: "#424242" },
  GraphqlClient: { name: "GraphQL Client", color: "#3d04b6" },
  WebSocket: { name: "WebSocket", color: "#424242" },
  WebRTC: { name: "WebRTC", color: "#c22b00" },
  Java: { name: "Java", color: "#c22b00" },
  Csharp: { name: "C#", color: "#0055c4" }
} as const

type PortfolioType = "official" | "playground"

const PortfolioTypes: { [key: string]: PortfolioType } = {
  Official: "official",
  Playground: "playground"
}

export type PortfolioMatter = {
  identifier: string
  name: string
  description: string
  tags: string[]
  type: PortfolioType
  datetime: string
  image?: string
}

export type Portfolio = {
  data: PortfolioMatter
}

export type PortfolioWithContent = {
  data: PortfolioMatter
  content: string
}

export class Portfolios {
  static get queryset(): string[] {
    return fs.readFileSync(path.join(process.cwd(), "__portfolio__/_registry.json"))
      .let(it => JSON.parse(it.toString("utf-8")) as string[])
      .filter(it => !it.startsWith("_"))
  }

  static retrieve<T extends Portfolio>(key: string, content: boolean = false): T {
    return fs.readFileSync(path.join(process.cwd(), `__portfolio__/${key}.markdown`), { encoding: "utf8" })
      .let(it => matter(it, { excerpt: true, excerpt_separator: config.blog.excerpt_separator }))
      .let(it => content ? it.pick("data", "content") : it.pick("data"))
      .also(it => it.data = it.data.pick("name", "description", "tags", "type", "datetime", "image"))
      .also(it => it.data.identifier = key) as T
  }
}
