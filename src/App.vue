<template>
  <div class="container">
    <h1 class="py-4">Matchstick game</h1>
    <Board/>
  </div>
</template>

<script>
import Board from "./components/Board.vue"
export default {
  name: 'App',
  components: {
    Board,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #e1f0ff;
  min-height: 100vh;
  position: relative;
}
</style>
