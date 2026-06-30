<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { principles } from "@/data/profile";
import { useEnter } from "@/composables/useEnter";

const props = defineProps<{ active: boolean }>();

const root = ref<HTMLElement>();
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context((self) => {
    gsap.set(self.selector!(".p-card"), { y: 60, opacity: 0 });
    gsap.set(self.selector!(".desk-bg"), { scale: 1.12 });
  }, root.value);
});

// 翻入即播:4 张卡依进入 stagger 浮入(不随滚动进度)
// 入场结束后清掉内联 transform,把控制权交回 CSS(hover 放大 / 点击聚焦的 3D 变换)
useEnter(
  () => props.active,
  () => {
    gsap.to(root.value!.querySelectorAll(".p-card"), {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.15,
      clearProps: "transform,opacity",
    });
    gsap.to(root.value!.querySelector(".desk-bg"), {
      scale: 1,
      duration: 1.4,
      ease: "power2.out",
    });
  }
);

// 点击卡片聚焦/取消(支持点击);hover 放大由 CSS 处理
const focusedNo = ref<string | null>(null);
function toggle(no: string) {
  focusedNo.value = focusedNo.value === no ? null : no;
}

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <section id="about" ref="root" class="about">
    <div class="stage">
      <!-- 桌面平铺背景图(放 public/media/desk.jpg) -->
      <div class="desk-bg"></div>
      <div class="mask"></div>

      <h2 class="big">关于<br />我</h2>

      <div class="cards">
        <article
          v-for="p in principles"
          :key="p.no"
          class="p-card"
          :class="{
            focus: focusedNo === p.no,
            dim: focusedNo !== null && focusedNo !== p.no,
          }"
          @click="toggle(p.no)"
        >
          <p class="p-title">{{ p.title }} <span class="arrow">→</span></p>
          <p class="p-en">{{ p.en }}</p>
          <p class="p-desc">{{ p.desc }}</p>
          <span class="p-no">{{ p.no }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--bg-light);
  height: 100%;
}
.stage {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.desk-bg {
  position: absolute;
  inset: 0;
  background: #ededf0 url("/media/desk.jpg") center / cover no-repeat;
  will-change: transform;
}
.mask {
  position: absolute;
  inset: 0;
  background: rgba(244, 244, 242, 0.45);
}
.big {
  position: absolute;
  left: 8vw;
  bottom: 14vh;
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 800;
  line-height: 1;
}
.cards {
  position: absolute;
  right: 8vw;
  top: 0;
  bottom: 0;
  width: min(420px, 40vw);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  /* 3D 透视:整列卡片像一块斜置的面板,营造立体感 */
  perspective: 1200px;
  transform-style: preserve-3d;
}
.p-card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transform-origin: right center;
  /* 默认略微侧倾,产生纵深 */
  transform: rotateY(-12deg);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s ease, opacity 0.4s ease;
}
/* hover:转正并放大,卡片向前凸出 */
.p-card:hover {
  transform: rotateY(0deg) scale(1.06);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.18);
  z-index: 4;
}
/* 点击聚焦:保持放大转正、压在最上层 */
.p-card.focus {
  transform: rotateY(0deg) scale(1.09);
  box-shadow: 0 30px 70px rgba(156, 96, 252, 0.28);
  border-color: var(--accent);
  z-index: 5;
}
/* 有卡聚焦时,其余卡淡出收缩 */
.p-card.dim {
  opacity: 0.45;
  transform: rotateY(-12deg) scale(0.96);
}
.p-title {
  font-size: 16px;
  font-weight: 700;
}
.arrow {
  color: var(--accent);
}
.p-en {
  font-size: 12px;
  color: var(--text-weak);
  margin: 4px 0 8px;
}
.p-desc {
  font-size: 12px;
  color: var(--text-weak);
  line-height: 1.7;
}
.p-no {
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 11px;
  color: var(--text-weak);
}
</style>
