<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <router-link to="/">Home</router-link>
    <router-link to="/people">People</router-link>
    <router-link to="/favorites">Favorites</router-link>
  </header>
  <RouterView />
</template>
<style>
header {
  height: 40px;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  background: var(--color-background-mute);
}
</style>
