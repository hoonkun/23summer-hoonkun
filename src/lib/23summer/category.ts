import fs from "fs"

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
    return fs.readFileSync("./__posts__/_categories.json", { encoding: "utf8" })
      .let(it => JSON.parse(it) as unknown as Category[])
  }

  static retrieve(name: string) {
    return this.list().find(it => it.name === name)
  }

}
