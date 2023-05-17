<script>
	import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { degToRad } from 'three/src/math/MathUtils';
	import { generators, getMidPoint, add, neg } from '../lib/methods';

	const firstGenerator = generators[0];

	const scale = spring(1);
</script>

<div>
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
			<OrbitControls enableDamping={true} enableZoom={true} />
		</T.PerspectiveCamera>

		<T.DirectionalLight castShadow position={[3, 10, 10]} />
		<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
		<T.AmbientLight intensity={0.2} />

		{@const points = firstGenerator.gen(100)}
		{@const midPoint = getMidPoint(points)}

		{#each firstGenerator.gen(100) as point})}
			<T.Mesh scale={0.05} position={add(point, neg(midPoint))} castShadow let:ref>
				<!-- Add interaction -->
				<InteractiveObject
					object={ref}
					interactive
					on:pointerenter={() => ($scale = 2)}
					on:pointerleave={() => ($scale = 1)}
				/>

				<T.SphereGeometry />
				<T.MeshStandardMaterial color="#333333" />
			</T.Mesh>
		{/each}
	</Canvas>
</div>

<style>
	:global(body, html) {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
	}

	div {
		height: 100%;
		width: 100%;
	}
</style>
