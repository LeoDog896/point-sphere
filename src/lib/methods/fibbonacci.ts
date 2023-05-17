import type { Point } from "./type";

export function fibbonachiSphere(n: number): Point[] {
    let points: Point[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        points.push([x, y, z]);
    }

    return points;
}
