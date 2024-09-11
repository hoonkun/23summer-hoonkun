import { NumberArrayLike, Vector2 } from "@esotericsoftware/spine-webgl"
import { Vectors } from "@/lib/23summer/kiwi/VectorUtils"

export type Polygon = [Vector2, Vector2, Vector2]

export namespace Polygons {

  export const fromVertices = (vertices: NumberArrayLike): Polygon[] => {
    const result: Polygon[] = []
    const copied = vertices instanceof Float32Array ? Array.from(vertices) : [...vertices]
    const points = copied.chunked(2).map(([x, y]) => new Vector2(x, y))

    while(points.length > 3) {
      let earFound = false
      for (let i = 0; i < points.length; i++) {
        if (!isEar(points, i)) continue

        const prev = points[(i - 1 + points.length) % points.length]
        const curr = points[i]
        const next = points[(i + 1) % points.length]
        result.push([prev, curr, next])

        points.splice(i, 1)
        earFound = true
        break
      }

      if (!earFound)
        throw new Error("Unable to find an ear to clip. The polygon might be self-intersecting.");
    }

    if (points.length === 3) {
      result.push([points[0], points[1], points[2]]);
    }

    return result
  }

  const isEar = (polygon: Vector2[], index: number): boolean => {
    const prev = polygon[(index - 1 + polygon.length) % polygon.length];
    const curr = polygon[index];
    const next = polygon[(index + 1) % polygon.length];

    if (Vectors.crossMultiply3(prev, curr, next) <= 0) return false;

    for (let j = 0; j < polygon.length; j++) {
      if (j !== index && j !== (index - 1 + polygon.length) % polygon.length && j !== (index + 1) % polygon.length) {
        if (contains([polygon[j], prev, curr], next)) return false;
      }
    }
    return true;
  }

  export const contains = (it: Polygon, point: Vector2) => {
    const [a, b, c] = it
    const ab = Vectors.minus(a, b)
    const bc = Vectors.minus(b, c)
    const ca = Vectors.minus(c, a)
    const ap = Vectors.minus(a, point)
    const bp = Vectors.minus(b, point)
    const cp = Vectors.minus(c, point)

    const c1 = Vectors.crossMultiply(ab, ap) >= 0
    const c2 = Vectors.crossMultiply(bc, bp) >= 0
    const c3 = Vectors.crossMultiply(ca, cp) >= 0

    return c1 == c2 && c2 == c3
  }

  export const findContainingOrNearest = (polygons: Polygon[], point: Vector2) => {
    const containingPolygon = polygons.find(it => Polygons.contains(it, point))

    if (containingPolygon) {
      return [true, containingPolygon] as const
    } else {
      return [false, null] as const
    }
  }

  export const intersection = (vertices: Vector2[], center: Vector2, point: Vector2) => {
    const lines: [Vector2, Vector2][] = []

    const someFunction = (x: number, y: number, v1: Vector2, v2: Vector2) => {
      const { x: x1, y: y1 } =  v1
      const { x: x2, y: y2 } = v2

      let rect: [number, number, number, number]
      if (x1 < x2 && y1 < y2) {
        rect = [x1, y1, x2, y2]
      } else if (x1 < x2 && y2 < y1) {
        rect = [x1, y2, x2, y1]
      } else if (x2 < x1 && y1 < y2) {
        rect = [x2, y1, x1, y2]
      } else {
        rect = [x2, y2, x1, y1]
      }

      const xContains = rect[0] < x && x < rect[2]
      const yContains = rect[1] < y && y < rect[3]

      return xContains && yContains
    }

    for (let i = 0; i < vertices.length - 1; i++) {
      lines.push([vertices[i], vertices[i + 1]])
    }
    lines.push([vertices[vertices.length - 1], vertices[0]])

    for (const it of lines) {
      const [remaining1, remaining2] = it

      const aSlope = (center.y - point.y) / (center.x - point.x)
      const bSlope = (remaining2.y - remaining1.y) / (remaining2.x - remaining1.x)

      // aSlope * (x - center.x) + center.y = bSlope * (x - remaining1.x) + remaining1.y
      // x * aSlope - aSlope * center.x + center.y = bSlope * x - bSlope * remaining1.x + remaining1.y
      // aSlope * x - bSlope * x = aSlope * center.x - center.y - bSlope * remaining1.x + remaining1.y

      const x = (aSlope * center.x - center.y - bSlope * remaining1.x + remaining1.y) / (aSlope - bSlope)
      const y = aSlope * (x - center.x) + center.y

      if (someFunction(x, y, remaining1, remaining2) && someFunction(x, y, center, point))
        return new Vector2(x, y)
    }

    return null
  }

}
