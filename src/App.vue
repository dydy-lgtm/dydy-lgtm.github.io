<script setup lang="ts">
import { useFullpage } from "@/composables/useFullpage";
import SiteNav from "@/components/SiteNav.vue";
import ScreenDots from "@/components/ScreenDots.vue";
import HeroSection from "@/sections/HeroSection.vue";
import ResumeSection from "@/sections/ResumeSection.vue";
import AboutSection from "@/sections/AboutSection.vue";
import FeaturedSection from "@/sections/FeaturedSection.vue";
import CatalogSection from "@/sections/CatalogSection.vue";
import ContactSection from "@/sections/ContactSection.vue";

// 段落顺序 = 屏索引;id 用于导航 goToId 映射
const { track, active } = useFullpage([
  "hero",
  "resume",
  "about",
  "featured",
  "catalog",
  "contact",
]);
</script>

<template>
  <SiteNav />
  <ScreenDots />

  <div class="fp-viewport">
    <div class="fp-track" ref="track">
      <div class="fp-panel"><HeroSection :active="active === 0" /></div>
      <div class="fp-panel"><ResumeSection :active="active === 1" /></div>
      <div class="fp-panel"><AboutSection :active="active === 2" /></div>
      <div class="fp-panel"><FeaturedSection :active="active === 3" /></div>
      <div class="fp-panel"><CatalogSection :active="active === 4" /></div>
      <div class="fp-panel"><ContactSection :active="active === 5" /></div>
    </div>
  </div>
</template>

<style scoped>
/* 视口:固定满屏、隐藏溢出,整屏切换靠 .fp-track 的 translateY */
.fp-viewport {
  position: fixed;
  inset: 0;
  overflow: hidden;
}
.fp-track {
  will-change: transform;
}
/* 每屏一个 100vh 面板;超高内容(目录/简历)在面板内部纵向滚动 */
.fp-panel {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  /* 内部滚动条隐藏(滚动仍可用) */
  scrollbar-width: none;
}
.fp-panel::-webkit-scrollbar {
  display: none;
}
</style>
