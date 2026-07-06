<script setup lang="ts">
import { computed } from "vue";
import { brand, navItems } from "@/data/site";
import { active, goToId } from "@/composables/useFullpage";

// 屏索引 → 段落 id;高亮当前屏对应的导航项
const idToIndex: Record<string, number> = {
  hero: 0,
  resume: 1,
  about: 2,
  featured: 3,
  catalog: 4,
  contact: 5,
};

const activeId = computed(() => {
  // 找到当前屏对应的导航项(导航第 1 项"简历"覆盖首屏+简历两屏)
  let current = navItems[0].id;
  for (const item of navItems) {
    if (idToIndex[item.id] <= active.value) current = item.id;
  }
  return current;
});
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <div class="brand" @click="goToId('hero')">{{ brand }}</div>
      <nav class="links">
        <a
          v-for="item in navItems"
          :key="item.id"
          :class="{ on: activeId === item.id }"
          @click="goToId(item.id)"
          >{{ item.label }}</a
        >
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  height: var(--nav-h);
  z-index: 100;
  display: flex;
  align-items: center;
  mix-blend-mode: difference; /* 让深/浅底上都可见 */
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* ZWT 贴左、菜单贴右,只留极小内边距(不再用居中 container) */
  padding: 0 28px;
}
.brand {
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #fff;
  cursor: pointer;
}
.links {
  display: flex;
  gap: 28px;
}
.links a {
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s;
  position: relative;
}
.links a.on,
.links a:hover {
  opacity: 1;
}
.links a.on::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(-50%);
}
</style>
