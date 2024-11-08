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
		padding: 16px 0 7px;
		// border-bottom: 1px solid $border;

		&__field {
			flex: 1 1 auto;
			outline: none;
			border: none;
			min-height: 32px;

			&::placeholder {
				// color: $holder-2;
			}
		}
	}
</style>
