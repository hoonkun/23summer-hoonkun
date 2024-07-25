import fs from "fs"
import path from "path"

export type Category = {
  name: string
  display: string
  parent?: string
  color: {
    dark: string
    bright: string
  }
}

export class Categories {

  static list() {
    console.log(process.cwd())
    return fs.readFileSync(path.join(process.cwd(), "__posts__/_categories.json"), { encoding: "utf8" })
      .let(it => JSON.parse(it) as unknown as Category[])
  }

  static retrieve(name: string) {
    return this.list().find(it => it.name === name)
  }

}
