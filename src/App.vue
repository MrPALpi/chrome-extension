<script setup>
	import { ref } from 'vue';
	import VForm from '@/components/UI/VForm.vue';
	import VInput from '@/components/UI/VInput.vue';
	import VButton from '@/components/UI/VButton.vue';

	const isAuth = ref(null);
	const channel = new BroadcastChannel('login');

	const submit = (data) => {
		data.device = navigator.userAgent;
		console.log(data);
		channel.postMessage({ action: 'login', ...data });
	};

	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (message.action === 'showAuthenticatedUI') {
				isAuth.value = 'true';
			} else if (message.action === 'notShowAuthenticatedUI') {
				isAuth.value = 'false';
			}
		});

	channel.postMessage({ action: 'check' });
	
</script>

<template>
	<div v-if="isAuth" class="authenticated">authenticated</div>
	<v-form v-else @submit="submit">
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

<style lang="scss" scoped>
	.authenticated {
		color: $accent;
	}
</style>
