<script lang="ts">
	import { Canvas, OrbitControls, T, Three } from '@threlte/core';
	import { generators, add, neg } from '../lib/methods';
	import { Vector3 } from 'three';
	import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

	let generatorName = generators[0].name;
	let count = 100;

	$: generator = generators.find((gen) => gen.name === generatorName);

	type Color = [r: number, g: number, b: number];

	let colorStart: Color = [48, 165, 176];
	let colorEnd: Color = [105, 48, 176];

	/**
	 * Gets a color between two colors, where
	 * amount is between 0 and 1.
	 */
	function betweenColor(start: Color, end: Color, amount: number) {
		return [
			Math.round(start[0] + (end[0] - start[0]) * amount),
			Math.round(start[1] + (end[1] - start[1]) * amount),
			Math.round(start[2] + (end[2] - start[2]) * amount)
		];
	}

	$: points = generator?.gen(count);
</script>

<main>
	<div class="content">
		<h1>Point Spheres</h1>
		<h2>Generating Equidistant points on a Sphere's Surface</h2>
		<p>
			Various uniform sphere algorithms have been proposed in order to create a spherical object
			that can either:
		</p>
		<ul>
			<li>Fool the human eye (accurate <i>enough</i>)</li>
			<li>Provide points with a perfect uniform distribution</li>
		</ul>
		<p>
			However, the problem itself is inheriently biased, and none have solved it. Therefore, this
			demonstation aims to show the many different algorithms for those choosing a sphere generation
			approach.
		</p>

		<h2>Generators</h2>

		<select bind:value={generatorName}>
			{#each generators as gen}
				<option value={gen.name}>
					{gen.name}
				</option>
			{/each}
		</select>

		{#if generator && !generator.pure}
			<button on:click={() => (points = generator?.gen(count))}>Generate</button>
		{/if}
	</div>
	<div class="display">
		<Canvas>
			<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
				<OrbitControls enablePan={false} enableDamping={true} enableZoom={true} />
			</T.PerspectiveCamera>

			<T.DirectionalLight castShadow position={[3, 10, 10]} />
			<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
			<T.AmbientLight intensity={0.9} />

			{#if generator && points}
				{#each points as point}
					{@const color = betweenColor(colorStart, colorEnd, (point[2] + 1) / 2)}
					<T.Mesh scale={0.05} position={add(point, neg(generator.offset))} castShadow>
						<T.SphereGeometry />
						<T.MeshStandardMaterial color="rgb({color[0]}, {color[1]}, {color[2]})" />
					</T.Mesh>
				{/each}

				<!-- make geometry wireframe based on the points -->
				<T.Mesh scale={1.01} position={generator.offset} castShadow>
					<Three type={ConvexGeometry} args={[points.map((point) => new Vector3(...point))]} />
					<T.MeshBasicMaterial wireframe />
				</T.Mesh>
			{/if}
		</Canvas>
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}

	div.content {
		height: calc(100% - 4rem);
		width: fit-content;
		border-right: 2px solid darkgray;
		padding: 2rem;
		background-color: #eeeeee;
	}

	h1 {
		white-space: nowrap;
	}

	:global(body, html) {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
	}

	div.display {
		height: 100%;
		width: 100%;
	}
</style>
