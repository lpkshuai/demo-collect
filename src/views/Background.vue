<template>
  <div><div class="bg-box"></div></div>
</template>

<script></script>

<style scoped>
.bg-box {
  width: 200px;
  height: 100px;
  margin: 50px auto 0;
  border: 1px solid red;
  background-image: linear-gradient(30deg, rgba(108, 128, 151, 0.1) 0%, rgba(108, 128, 151, 0.1) 33%, transparent 33%);
  background-size: 15px 1px;
}
.stripe-bg::before {
  transform: rotate(45deg);
  content: '';
  top: -100px;
  left: -100px;
  bottom: -100px;
  right: -100px;
  position: absolute;
  background-image: linear-gradient(30deg, rgba(108, 128, 151, 0.1) 0%, rgba(108, 128, 151, 0.1) 33%, transparent 33%);
  background-size: 15px 1px;
}
</style>
