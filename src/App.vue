<template>
  <div id="app">
    <div id="nav">
      <router-link to="/drag">Drag</router-link> |
      <router-link to="/dag">DAG</router-link> |
      <router-link to="/flow">Flow</router-link> |
      <router-link to="/g6editor">G6-Editor</router-link> |
      <router-link to="/x6editor">X6-Editor</router-link> |
      <router-link to="/codehljs">hljs</router-link> |
      <router-link to="/menutest">menu</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
