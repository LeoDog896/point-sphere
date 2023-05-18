<script lang="ts">
	import { Canvas, OrbitControls, T, Three } from '@threlte/core';
	import { generators, add, neg } from '../lib/methods';
	import { Vector3 } from 'three';
	import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

	let generatorName = generators[0].name;

	$: params = generator?.params.map((param) => param.value);
	$: generator = generators.find((gen) => gen.name === generatorName);

	type Color = [r: number, g: number, b: number];

	let colorStart: Color = [48, 165, 176];
	let colorEnd: Color = [105, 48, 176];

	let showPoints = true;
	let showWireframe = true;

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

	$: points = params ? generator?.gen(...params) : undefined;
</script>

<main>
	<div class="content">
		<h1><a href="https://github.com/LeoDog896/point-sphere">Point Spheres</a></h1>
		<h2>Generating Equidistant points on a Sphere's Surface</h2>
		<p>
			This problem is more commonly known as a variant of 
			the <a href="https://en.wikipedia.org/wiki/Tammes_problem">Tammes Problem</a> or the
			generalized <a href="https://en.wikipedia.org/wiki/Thomson_problem">Thomson Problem</a>.
		</p>
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

		{#if generator}
			<h2>
				Generator: <select bind:value={generatorName}>
					{#each generators as gen}
						<option value={gen.name}>
							{gen.name}
						</option>
					{/each}
				</select>
			</h2>

			<p>
				{@html generator.description}
			</p>
		{/if}

		{#if generator}
			<h1>Options</h1>

			{#each generator.params as param}
				<label for={param.name}>
					{param.name}:
					<input
						type="number"
						min={param.from}
						max={param.to}
						name={param.name}
						bind:value={param.value}
					/>
				</label>
			{/each}

			{#if !generator.pure}
				<button on:click={() => (points = params ? generator?.gen(...params) : undefined)}
					>Generate</button
				>
			{/if}
		{/if}

		<h1>Display</h1>

		<label for="showPoints">
			<input type="checkbox" bind:checked={showPoints} id="showPoints" />
			Show Points
		</label>

		<label for="showWireframe">
			<input type="checkbox" bind:checked={showWireframe} id="showWireframe" />
			Show Wireframe
		</label>
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
				{#if showPoints}
					{#each points as point}
						{@const color = betweenColor(colorStart, colorEnd, (point[2] + 1) / 2)}
						<T.Mesh scale={0.05} position={add(point, neg(generator.offset))} castShadow>
							<T.SphereGeometry />
							<T.MeshStandardMaterial color="rgb({color[0]}, {color[1]}, {color[2]})" />
						</T.Mesh>
					{/each}
				{/if}

				{#if showWireframe}
					<T.Mesh scale={1.01} position={generator.offset} castShadow>
						<Three type={ConvexGeometry} args={[points.map((point) => new Vector3(...point))]} />
						<T.MeshBasicMaterial wireframe />
					</T.Mesh>
				{/if}
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

	@media (max-width: 800px) {
		main {
			flex-direction: column;
		}

		div.content {
			height: fit-content;
			width: 100%;
			border-right: none;
			border-bottom: 2px solid darkgray;
		}

		div.display {
			height: 100%;
			width: 100%;
		}
	}
</style>
