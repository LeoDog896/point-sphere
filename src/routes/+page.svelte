<script>
	import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core';
	import { generators, getMidPoint, add, neg } from '../lib/methods';

	const firstGenerator = generators[0];

	const points = firstGenerator.gen(100)
	const midPoint = getMidPoint(points)

</script>

<div>
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
			<OrbitControls enableDamping={true} enableZoom={true} />
		</T.PerspectiveCamera>

		<T.DirectionalLight castShadow position={[3, 10, 10]} />
		<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
		<T.AmbientLight intensity={0.2} />

		{#each points as point}
			<T.Mesh position={add(point, neg(midPoint))} castShadow let:ref>
				<InteractiveObject
					object={ref}
					interactive
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
