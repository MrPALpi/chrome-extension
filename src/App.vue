<script setup>
	import { ref, onMounted } from 'vue';
	import VForm from '@/components/UI/VForm.vue';
	import VInput from '@/components/UI/VInput.vue';
	import VButton from '@/components/UI/VButton.vue';

	const isAuth = ref(null);
	const channel = new BroadcastChannel('login');

	const submit = (data) => {
		data.device = navigator.userAgent;
		channel.postMessage({action: 'login', form: data});
	};

		channel.onmessage = (messageEvent) => {
		if (messageEvent.data.action === 'showAuthenticatedUI') {
			isAuth.value = messageEvent.data.result;	
		}
	}

	channel.postMessage({action:'check'});
	
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
