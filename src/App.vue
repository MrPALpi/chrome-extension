<script setup>
import VForm from '@/components/UI/VForm.vue';
import VInput from '@/components/UI/VInput.vue';

const submit = (data) => {
	console.log(data)
}
</script>

<template>
	<v-form @submitForm="submit">
			<v-input type="email"></v-input>
			<v-input type="password"></v-input>
			<button type="submit">submit</button>
	</v-form>	
</template>

<style scoped></style>
