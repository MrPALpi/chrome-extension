<script setup>
	import { ref } from 'vue';
	import VForm from '@/components/UI/VForm.vue';
	import VInput from '@/components/UI/VInput.vue';
	import VButton from '@/components/UI/VButton.vue';

	const res = ref(null);

	const submit = (data) => {
		data.device = navigator.userAgent;
		chrome.runtime.sendMessage({ action: 'login', data: data }, (response) => {
			console.log(response);
			res.value = response;
			if (response && response.success) {
				console.log(response);
				console.log('Данные успешно отправлены в background');
			}
		});
	};
</script>

<template>
	{{ res }}
	<v-form @submit="submit">
		<v-input type="email" name="email" placeholder="email" required></v-input>
		<v-input
			type="password"
			name="password"
			placeholder="password"
			required
		></v-input>
		<v-button type="submit">Login</v-button>
	</v-form>
</template>

<style scoped></style>
