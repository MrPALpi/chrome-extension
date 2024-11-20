<template>
	<div class="input-block">
		<slot name="before"></slot>
		<input class="input-block__field" v-bind="$attrs" />
		<slot name="after"></slot>
	</div>
</template>

<style lang="scss" scoped>
	.input-block {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 0 7px;
		border-bottom: 1px solid $accent;

		&__field {
			padding: 5px 10px;
			flex: 1 1 auto;
			outline: none;
			border: none;
			min-height: 32px;
			border-radius: 10px;
			color: $dark;
			background-color: $white;

			&::placeholder {
				color: $light-dark;
			}
		}
	}
</style>
