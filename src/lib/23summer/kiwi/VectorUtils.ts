import { Bone, Vector2 } from "@esotericsoftware/spine-webgl"

export namespace Vectors {

  export const copy = (a: Vector2): Vector2 =>
    new Vector2(a.x, a.y)

  export const distance = (a: Vector2, b: Vector2): number =>
    Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))

  export const minus = (a: Vector2, b: Vector2): Vector2 =>
    new Vector2(b.x - a.x, b.y - a.y)

  export const crossMultiply = (a: Vector2, b: Vector2): number =>
    a.x * b.y - a.y * b.x

  export const crossMultiply3 = (o: Vector2, a: Vector2, b: Vector2): number =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)

  const findVector = (points: readonly Vector2[], point: Vector2, comparator: (curr: number, acc: number) => boolean): Vector2 => {
    let temp = distance(points[0], point)
    let result = points[0]

    points.forEach((it, index) => {
      if (index === 0) return
      const currentDistance = distance(it, point)
      if (comparator(currentDistance, temp)) {
        temp = currentDistance
        result = it
      }
    })

    return result
  }

  export const nearest = (points: Vector2[], point: Vector2): Vector2 =>
    findVector(points, point, (curr, acc) => curr < acc)

  export const furthest = (points: readonly Vector2[], point: Vector2): Vector2 =>
    findVector(points, point, (curr, acc) => curr > acc)

  export const cubicInterpolation = (a: Vector2, b: Vector2, t: number) =>
    new Vector2(
      a.x + (b.x - a.x) * t * t,
      a.y + (b.y - a.y) * t * t,
    )

  export const linearInterpolation = (a: Vector2, b: Vector2, t: number) =>
    new Vector2(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t,
    )

  export const fromBone = (bone: Bone) => new Vector2(bone.x, bone.y)

}
