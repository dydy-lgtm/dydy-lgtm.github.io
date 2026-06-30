<script setup lang="ts">
import { active, count, goToIndex, ready } from "@/composables/useFullpage";
</script>

<template>
  <div class="dots" :class="{ show: ready }">
    <button
      v-for="i in count"
      :key="i"
      class="dot"
      :class="{ on: active === i - 1 }"
      :aria-label="`第 ${i} 屏`"
      @click="goToIndex(i - 1)"
    ></button>
  </div>
</template>

<style scoped>
.dots {
  position: fixed;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  flex-direction: column;
  gap: 12px;
  mix-blend-mode: difference;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.7s ease;
}
.dots.show {
  opacity: 1;
  pointer-events: auto;
}
.dot {
  width: 9px;
  height: 9px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: transform 0.25s, background 0.25s;
}
.dot.on {
  background: #fff;
  transform: scale(1.5);
}
.dot:hover {
  background: rgba(255, 255, 255, 0.85);
}
</style>
