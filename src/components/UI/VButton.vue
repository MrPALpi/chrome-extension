<template>
	<button class="button" v-bind="$attrs">
		<slot />
	</button>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped>
	.button {
		background-color: $accent;
		padding: 8px 16px;
		color: $white;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&:hover {
			background-color: $accent-hover;
		}
	}
</style>
