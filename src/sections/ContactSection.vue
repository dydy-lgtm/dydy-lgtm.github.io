<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { contact } from "@/data/contact";
import { goToTop } from "@/composables/useFullpage";
import { useEnter } from "@/composables/useEnter";

const props = defineProps<{ active: boolean }>();

// 社交圆钮的线性图标(24x24 stroke 路径),按 contact.socials[].icon 取用
const ICONS: Record<string, string> = {
  mail: "M3 5.5h18v13H3z M3 6.5l9 6.5 9-6.5",
  wechat:
    "M21 11.5a8.5 8.5 0 0 1-12.3 7.6L4 21l1.9-4.2A8.5 8.5 0 1 1 21 11.5z",
  dribbble:
    "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z M5 8.8c4.6 2.4 9.6 2.3 13.6-.6 M6.3 17.6c2-4.6 6.6-7.2 12.5-6",
  telegram: "M21 4 3.5 11.3l5.4 1.9L10.5 19l3.1-3.4 4.6 3z",
};

const root = ref<HTMLElement>();
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context((self) => {
    gsap.set(self.selector!(".glass, .pct"), { opacity: 0, y: 30 });
  }, root.value);
});

useEnter(
  () => props.active,
  () => {
    gsap.to(root.value!.querySelectorAll(".glass, .pct"), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
    });
  }
);

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <section id="contact" ref="root" class="contact">
    <!-- AI 视频背景:画面里已含举着二维码手机的人物 -->
    <video
      class="bg"
      :src="contact.videoSrc"
      autoplay
      muted
      loop
      playsinline
    ></video>
    <div class="mask"></div>

    <div class="inner container">
      <!-- 右侧玻璃拟态联系卡 -->
      <div class="glass">
        <p class="kicker">{{ contact.kicker }}</p>
        <h2 class="title">{{ contact.title }}</h2>
        <p class="desc">{{ contact.desc }}</p>
        <div class="socials">
          <a
            v-for="s in contact.socials"
            :key="s.name"
            :href="s.link"
            :title="s.name"
            :aria-label="s.name"
            class="social"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                :d="ICONS[s.icon] ?? ICONS.mail"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
            </svg>
          </a>
        </div>
        <div class="actions">
          <a class="btn primary" :href="`mailto:${contact.email}`">联系我</a>
          <button class="btn" @click="goToTop">返回顶部</button>
        </div>
      </div>
    </div>

    <!-- 右下角:浏览进度徽标(最后一屏 = 100) -->
    <span class="pct">100</span>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  height: 100%;
  overflow: hidden;
  color: #fff;
  display: flex;
  align-items: center;
}
.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #160d1c;
}
.mask {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    60% 60% at 30% 50%,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.55)
  );
}
.inner {
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.glass {
  width: min(340px, 88vw);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  padding: 30px 32px;
}
.kicker {
  font-size: 12px;
  letter-spacing: 0.25em;
  opacity: 0.7;
}
.title {
  font-size: 42px;
  font-weight: 800;
  margin: 10px 0 14px;
}
.desc {
  font-size: 13px;
  line-height: 1.9;
  opacity: 0.85;
  margin-bottom: 22px;
}
.socials {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}
/* 白底黑icon的圆钮,对齐原稿 */
.social {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #fff;
  color: #17171c;
  transition: transform 0.2s, box-shadow 0.2s;
}
.social svg {
  width: 19px;
  height: 19px;
}
.social:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4);
}
.actions {
  display: flex;
  gap: 12px;
}
.btn {
  padding: 11px 22px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}
.btn:hover {
  transform: scale(1.04);
}
.btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(156, 96, 252, 0.5);
}
/* 右下角进度徽标 */
.pct {
  position: absolute;
  right: 20px;
  bottom: 18px;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.2);
}
@media (max-width: 860px) {
  .inner {
    justify-content: center;
  }
}
</style>
