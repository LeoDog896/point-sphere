import { generatePoints as jkogan } from './jkogan';
import type { Point } from './type';

interface SphereGenerator {
	gen: (n: number) => Point[];
	name: string;
}

export function getMidPoint(points: Point[]): Point {
	return points
		.reduce(
			(acc, cur) => {
				return [acc[0] + cur[0], acc[1] + cur[1], acc[2] + cur[2]];
			},
			[0, 0, 0]
		)
		.map((x) => x / points.length) as Point;
}

export function add(a: Point, b: Point) {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]] satisfies Point;
}

export function neg(p: Point) {
	return [-p[0], -p[1], -p[2]] satisfies Point;
}

export const generators: SphereGenerator[] = [
	{
		name: "Kogan Spacing",
		gen: jkogan
	},
	{
		name: "Random",
		gen: (n: number) => {
			// make random points on a sphere
			return Array(n).fill(0).map(() => {
				const z = Math.random() * 2 - 1;
				const theta = Math.random() * 2 * Math.PI;
				const r = Math.sqrt(1 - z * z);
				return [r * Math.cos(theta), r * Math.sin(theta), z];
			});
		}
	}
];
