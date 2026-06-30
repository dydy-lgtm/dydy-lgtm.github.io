<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { contact } from "@/data/contact";
import { goToId, goToTop } from "@/composables/useFullpage";
import { useEnter } from "@/composables/useEnter";

const props = defineProps<{ active: boolean }>();

const root = ref<HTMLElement>();
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context((self) => {
    gsap.set(self.selector!(".phone, .glass"), { opacity: 0, y: 30 });
  }, root.value);
});

useEnter(
  () => props.active,
  () => {
    gsap.to(root.value!.querySelectorAll(".phone, .glass"), {
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
      <!-- 二维码手机 -->
      <div class="phone">
        <img v-if="contact.qrcode" :src="contact.qrcode" alt="QR" />
        <div v-else class="qr-placeholder">QR</div>
      </div>

      <!-- 玻璃拟态联系卡 -->
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
            class="social"
            >{{ s.name.slice(0, 1) }}</a
          >
        </div>
        <div class="actions">
          <button class="primary" @click="goToId('hero')">联系我</button>
          <button @click="goToTop">返回顶部</button>
        </div>
      </div>
    </div>

    <a class="mailto" :href="`mailto:${contact.email}`"
      >mailto:{{ contact.email }}</a
    >
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
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.7)
  );
}
.inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6vw;
  width: 100%;
}
.phone {
  width: min(280px, 30vw);
  aspect-ratio: 9 / 19;
  border-radius: 32px;
  background: #fff;
  padding: 14px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}
.phone img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.qr-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #111;
  font-size: 24px;
  border: 2px dashed #ccc;
  border-radius: 18px;
}
.glass {
  flex: 1;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 32px;
}
.kicker {
  font-size: 12px;
  letter-spacing: 0.25em;
  opacity: 0.7;
}
.title {
  font-size: 44px;
  font-weight: 800;
  margin: 10px 0 14px;
}
.desc {
  font-size: 13px;
  line-height: 1.8;
  opacity: 0.8;
  margin-bottom: 22px;
}
.socials {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
}
.social {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 0.2s, transform 0.2s;
}
.social:hover {
  background: #16c784; /* hover 变绿,呼应原站 */
  transform: translateY(-2px);
}
.actions {
  display: flex;
  gap: 12px;
}
.actions button {
  padding: 11px 22px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.2s;
}
.actions button:hover {
  transform: scale(1.04);
}
.actions .primary {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(156, 96, 252, 0.5);
}
.mailto {
  position: absolute;
  left: 14px;
  bottom: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
@media (max-width: 860px) {
  .inner {
    flex-direction: column;
    padding: 100px 0 60px;
  }
}
</style>
