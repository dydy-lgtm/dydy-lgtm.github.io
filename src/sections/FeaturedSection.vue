<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { featured } from "@/data/works";
import { useEnter } from "@/composables/useEnter";

const props = defineProps<{ active: boolean }>();

// 默认展开第 1 张;仅鼠标 hover 切换,无自动轮播
const activeIndex = ref(0);

function focus(i: number) {
  activeIndex.value = i;
}

const root = ref<HTMLElement>();
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context((self) => {
    gsap.set(self.selector!(".head, .panel"), { opacity: 0, y: 28 });
  }, root.value);
});

useEnter(
  () => props.active,
  () => {
    gsap.to(root.value!.querySelectorAll(".head, .panel"), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
    });
  }
);

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <section id="featured" ref="root" class="featured">
    <div class="head container">
      <p class="kicker">SELECTED CASE HIGHLIGHTS</p>
      <h2 class="big">精选作品</h2>
    </div>

    <div class="accordion container">
      <article
        v-for="(w, i) in featured"
        :key="w.id"
        class="panel"
        :class="{ active: activeIndex === i }"
        @mouseenter="focus(i)"
      >
        <span class="tag">{{ w.tag }}</span>

        <!-- 折叠态:竖排标题 -->
        <div class="collapsed">{{ w.title }}</div>

        <!-- 展开态:封面 + 详情 -->
        <div class="expanded">
          <div
            class="cover"
            :style="{ backgroundImage: `url(${w.cover})` }"
          ></div>
          <div class="info">
            <h3>{{ w.title }}</h3>
            <p v-if="w.subtitle" class="sub">{{ w.subtitle }}</p>
            <p class="desc">{{ w.desc }}</p>
            <div class="chips" v-if="w.chips">
              <span v-for="c in w.chips" :key="c">{{ c }}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.featured {
  background: var(--bg-dark);
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.head {
  margin-bottom: 8px;
}
.kicker {
  font-size: 12px;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
}
.big {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  margin: 8px 0 32px;
}
.accordion {
  display: flex;
  gap: 14px;
  height: 320px;
}
.panel {
  position: relative;
  flex: 1;
  min-width: 0;
  border-radius: 16px;
  overflow: hidden;
  background: #1b1b1f;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: flex 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.panel.active {
  flex: 6;
}
.tag {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 11px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.collapsed {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  writing-mode: vertical-rl;
  letter-spacing: 0.15em;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  transition: opacity 0.3s;
}
.panel.active .collapsed {
  opacity: 0;
}

.expanded {
  position: absolute;
  inset: 0;
  display: flex;
  opacity: 0;
  transition: opacity 0.4s 0.15s;
}
.panel.active .expanded {
  opacity: 1;
}
.cover {
  flex: 1.4;
  background: #333 center / cover no-repeat;
}
.info {
  flex: 1;
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.info h3 {
  font-size: 22px;
}
.sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 4px 0;
}
.desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin-top: 6px;
}
.chips {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}
.chips span {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}
</style>
