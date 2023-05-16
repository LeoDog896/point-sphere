import { generatePoints as jkogan } from "./jkogan"
import type { Point } from "./type"

interface SphereGenerator {
    gen: (n: number) => Point[]
}

export function getMidPoint(points: Point[]): Point {
    return points.reduce((acc, cur) => {
        return [acc[0] + cur[0], acc[1] + cur[1], acc[2] + cur[2]]
    }, [0, 0, 0]).map(x => x / points.length) as Point;
}

export function add(a: Point, b: Point) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as Point;
}

export function neg(p: Point) {
    return [-p[0], -p[1], -p[2]] as Point;
}

export const generators: SphereGenerator[] = [
    {
        gen: jkogan
    }
]