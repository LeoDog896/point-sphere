import { fibbonachiSphere } from './fibbonacci';
import { generatePoints as jkogan } from './jkogan';
import type { Point } from './type';
import { uvSphere } from './uvsphere';

interface SphereGenerator {
	gen: (...n: number[]) => Point[];
	name: string;
	pure: boolean;
	description: string;
	offset: Point;
	params: {
		name: string;
		from: number;
		to: number;
	}[];
}

export function add(a: Point, b: Point) {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]] satisfies Point;
}

export function neg(p: Point) {
	return [-p[0], -p[1], -p[2]] satisfies Point;
}

export const generators: SphereGenerator[] = [
	{
		name: 'Kogan Spacing',
		description: `Jonathan Kogan's new algorithm for spacing equidistant points is a heuristic approach that takes the way that previous algorithms have failed and uses that as training data for an algorithm that works well, and fast. It is currently the best known one available, but still has its flaws.`,
		gen: jkogan,
		pure: true,
		offset: [0, 0, 0],
		params: [
			{
				name: 'amount',
				from: 1,
				to: 100
			}
		]
	},
	{
		name: 'Fibbonachi Sphere',
		description: `The Fibbonachi Sphere algorithm is a classic algorithm that generates a convincing point sphere. It isn't nowhere as accurate as other methods designed, but it produces one just accurate enough to fool the human eye.`,
		gen: fibbonachiSphere,
		pure: true,
		offset: [0, 0, 0],
		params: [
			{
				name: 'amount',
				from: 1,
				to: 100
			}
		]
	},
	{
		name: 'Random',
		description: `Some use random point clouds, but these clouds are generally useful only for higher counts of N and are otherwise useless`,
		gen: (n: number) => {
			// make random points on a sphere
			return Array(n)
				.fill(0)
				.map(() => {
					const z = Math.random() * 2 - 1;
					const theta = Math.random() * 2 * Math.PI;
					const r = Math.sqrt(1 - z * z);
					return [r * Math.cos(theta), r * Math.sin(theta), z];
				});
		},
		pure: false,
		offset: [0, 0, 0],
		params: [
			{
				name: 'amount',
				from: 1,
				to: 100
			}
		]
	},
	{
		name: 'UV Sphere',
		pure: true,
		offset: [0, 0, 0],
		description: "The UV Sphere is mainly meant to design a clean UV map for spheres, but it also is seldom used for point generation on spheres. However, it is barely accurate.",
		gen: uvSphere,
		params: [
			{
				name: 'Stacks',
				from: 1,
				to: 100
			},
			{
				name: 'Stacks',
				from: 1,
				to: 10
			}
		]
	}
];
