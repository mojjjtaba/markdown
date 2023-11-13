<template>
	<div class="bg-brown-lighten-5 main-container">
		<RouterView/>
	</div>
</template>

<script setup>
import {RouterView} from 'vue-router'
</script>

<style>
.main-container {
	min-height: 100vh;
}
</style>