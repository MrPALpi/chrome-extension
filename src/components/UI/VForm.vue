<template>
	<form v-bind="$attrs" @submit.prevent="submit" class="v-form">
		<slot></slot>
	</form>
</template>

<script setup>
	const emit = defineEmits(['submit']);
	const submit = (e) => {
		const formData = new FormData(e.target);
		const objectData = Object.fromEntries(formData);
		emit('submit', objectData);
	};
</script>

<style lang="scss" scoped>
	.v-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
</style>
