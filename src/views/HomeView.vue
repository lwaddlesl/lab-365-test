<template>
  <main>
    <div class="buttons">
      <button @click="$router.push('/people')">to people</button>
      <button @click="$router.push('/favorites')">to favorites</button>
    </div>
  </main>
</template>
<style scoped>
.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>
