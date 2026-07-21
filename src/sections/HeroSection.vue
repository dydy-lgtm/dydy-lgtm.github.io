<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { hero } from "@/data/profile";
import { goToId, markReady } from "@/composables/useFullpage";

defineProps<{ active: boolean }>();

const root = ref<HTMLElement>();
const videoEl = ref<HTMLVideoElement>();
let ctx: gsap.Context;
let revealed = false;
let fallbackTimer: number | undefined;

// 入场视频播完(或兜底超时)后才揭示文字 + 放行导航
const INTRO_FALLBACK_MS = 2500;

function revealHero() {
  if (revealed) return;
  revealed = true;
  if (fallbackTimer) window.clearTimeout(fallbackTimer);
  gsap.to(root.value!.querySelectorAll("[data-anim]"), {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
  });
  markReady(); // 解锁翻屏 + 让导航/屏点淡入
}

onMounted(() => {
  ctx = gsap.context((self) => {
    // 初始隐藏态,避免入场前闪现
    gsap.set(self.selector!("[data-anim]"), { y: 40, opacity: 0 });

    // 背景 Ken Burns:持续缓动循环(不再绑滚动)
    gsap.to(self.selector!(".bg"), {
      scale: 1.12,
      duration: 1,
      ease: "sine.inOut",
      // repeat: -1,
      // yoyo: true,
    });
  }, root.value);

  const v = videoEl.value;
  if (v) {
    v.loop = false; // 入场先完整播一次
    v.addEventListener(
      "ended",
      () => {
        // v.loop = false; // 之后恢复循环做氛围
        // v.play().catch(() => {});
        // revealHero();
      },
      { once: true }
    );
    // 视频缺失 / 加载失败:立即揭示,避免空白等待
    v.addEventListener("error", revealHero, { once: true });
  }

  // 总兜底:无论视频多长 / 自动播放被拦,最长 INTRO_FALLBACK_MS 后强制揭示
  fallbackTimer = window.setTimeout(revealHero, INTRO_FALLBACK_MS);
});

onBeforeUnmount(() => {
  if (fallbackTimer) window.clearTimeout(fallbackTimer);
  ctx?.revert();
});
</script>

<template>
  <section id="hero" ref="root" class="hero">
    <!-- 首屏多镜头 AI 视频背景,通铺满屏(把视频放到 public/media/hero.mp4) -->
    <video
      ref="videoEl"
      class="bg"
      :src="hero.videoSrc"
      autoplay
      muted
      playsinline
    ></video>
    <div class="mask"></div>

    <div class="content container">
      <p class="kicker" data-anim>{{ hero.kicker }}</p>
      <h1 class="title" data-anim>{{ hero.title }}</h1>
      <p class="subtitle" data-anim>{{ hero.subtitle }}</p>
      <div class="ctas" data-anim>
        <button
          v-for="c in hero.ctas"
          :key="c.label"
          :class="['btn', { primary: c.primary }]"
          @click="goToId(c.to)"
        >
          {{ c.label }}
        </button>
      </div>
    </div>

    <span class="badge">{{ hero.badge }}</span>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  color: #fff;
  /* 没有视频素材时的深色兜底 */
  background: #14121c;
}
.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 没有视频时的占位底色 */
  background: #14121c;
}
.mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.15) 55%,
    rgba(0, 0, 0, 0) 100%
  );
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 13vh;
}
.kicker {
  font-size: 13px;
  letter-spacing: 0.25em;
  opacity: 0.85;
}
.title {
  font-size: clamp(38px, 4.5vw, 60px);
  font-weight: 800;
  margin: 12px 0 8px;
}
.subtitle {
  font-size: 16px;
  opacity: 0.85;
  margin-bottom: 28px;
}
.ctas {
  display: flex;
  gap: 14px;
}
.btn {
  padding: 11px 24px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s, color 0.2s;
}
.btn:hover {
  transform: scale(1.04);
}
.btn.primary {
  background: #fff;
  color: #111;
  border-color: #fff;
}
.badge {
  position: absolute;
  right: 22px;
  bottom: 18px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 6px;
  padding: 3px 8px;
}
</style>
