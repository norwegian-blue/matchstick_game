<template>
  <h1 class="py-3 mb-4 bg-primary text-white fw-bold">Matchstick game</h1>
  <Board />
  <Progress />
  <NewGame />
</template>

<script>
import Board from "./components/Board.vue";
import Progress from "./components/Progress.vue";
import NewGame from "./components/NewGame.vue";
export default {
  name: 'App',
  components: {
    Board,
    Progress,
    NewGame,
  },
}
</script>

<style>
#app {
  font-family: Ubuntu, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #e1f0ff;
  min-height: 100vh;
  position: relative;
}
</style>
