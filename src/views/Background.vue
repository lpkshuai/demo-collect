<template>
  <div><div class="bg-box"></div></div>
</template>

<script></script>

<style scoped>
.bg-box {
  position: relative;
  width: 200px;
  height: 100px;
  margin: 50px auto 0;
  border: 1px solid red;
  overflow: hidden;
}
.bg-box::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: -100px;
  content: '';
  background-image: linear-gradient(30deg, rgba(108, 128, 151, 0.1) 0%, rgba(108, 128, 151, 0.1) 33%, transparent 33%);
  background-size: 15px 1px;
  transform: skewx(45deg) translateX(-50px);
}
</style>
