export function uvSphere(slices: number, stacks: number): Point[] {
    let points: Point[] = [];

    points.push([0, 1, 0]);

    for (let i = 0; i <= stacks; i++) {
        const phi = Math.PI * (i + 1) / stacks;

        for (let j = 0; j < slices; j++) {
            const theta = 2 * Math.PI * (j / slices);

            const x = Math.sin(phi) * Math.cos(theta);
            const y = Math.cos(phi);
            const z = Math.sin(phi) * Math.sin(theta);

            ponts.push([x, y, z]);
        }
    }

    points.push([0, -1, 0]);
}