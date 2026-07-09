<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { about, principles } from "@/data/profile";
import { useEnter } from "@/composables/useEnter";

const props = defineProps<{ active: boolean }>();

const root = ref<HTMLElement>();
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context((self) => {
    // 左右两组分别从两侧带 3D 翻转飞入(transformPerspective 给单元素透视)
    gsap.set(self.selector!(".photo-card, .intro"), {
      x: -160,
      opacity: 0,
      rotateY: 35,
      transformPerspective: 900,
    });
    gsap.set(self.selector!(".p-card"), {
      x: 160,
      opacity: 0,
      rotateY: -35,
      transformPerspective: 900,
    });
    gsap.set(self.selector!(".desk-bg"), { scale: 1.1 });
  }, root.value);
});

// 翻入即播:左侧相片卡/标题从左、右侧 4 张便签卡从右,向中间汇入并转正
// 入场结束后清掉内联样式,把控制权交回 CSS(hover 放大)
useEnter(
  () => props.active,
  () => {
    const q = (s: string) => root.value!.querySelectorAll(s);
    gsap.to(q(".photo-card, .intro"), {
      x: 0,
      opacity: 1,
      rotateY: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      clearProps: "transform,opacity",
    });
    gsap.to(q(".p-card"), {
      x: 0,
      opacity: 1,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.15,
      clearProps: "transform,opacity",
    });
    gsap.to(root.value!.querySelector(".desk-bg"), {
      scale: 1,
      duration: 1.4,
      ease: "power2.out",
    });
  }
);

// 点击卡片弹出详情大卡;点 × 或蒙层空白处关闭
const opened = ref<(typeof principles)[number] | null>(null);

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <section id="about" ref="root" class="about">
    <div class="stage">
      <!-- 设计工作台拼贴背景(放 public/media/desk.jpg),白色蒙层压淡 -->
      <div class="desk-bg"></div>
      <div class="mask"></div>

      <!-- 3D 倾斜场景:左右两组元素共处一个倾斜平面,呈现原片的立体俯视感 -->
      <div class="scene">
      <!-- 左:白边相片卡 + 关于我 + 小档案 -->
      <div class="left">
        <div class="photo-card">
          <div class="photo"></div>
        </div>
        <div class="intro">
          <h2 class="big">关于<br />我</h2>
          <p class="meta">
            <span v-for="m in about.meta" :key="m">{{ m }}</span>
          </p>
        </div>
      </div>

      <!-- 右:4 张横向错落的便签卡 -->
      <div class="cards">
        <article
          v-for="p in principles"
          :key="p.no"
          class="p-card"
          @click="opened = p"
        >
          <!-- hover 缩放作用在内层:外层命中区域不随缩放变形,避免 hover 抖动 -->
          <div class="p-inner">
            <p class="p-title">{{ p.title }}<span class="arrow">→</span></p>
            <p class="p-en">
              <span class="chip" :style="{ background: p.color }"></span
              >{{ p.en }}
            </p>
            <p class="p-desc">{{ p.desc }}</p>
            <span class="p-no">{{ p.no }}</span>
          </div>
        </article>
      </div>
      </div>

      <!-- 点击后的详情大卡:背景白化虚化,卡片缩放浮出 -->
      <Transition name="modal">
        <div
          v-if="opened"
          class="overlay"
          @click.self="opened = null"
          @wheel.stop
        >
          <div class="detail" :style="{ '--tint': opened.color }">
            <button class="close" aria-label="关闭" @click="opened = null">
              ×
            </button>
            <div class="d-head">
              <div class="d-icon">{{ opened.title[0] }}</div>
              <div>
                <p class="d-title">{{ opened.title }}</p>
                <p class="d-no">{{ opened.no }}</p>
              </div>
            </div>
            <p class="d-en">{{ opened.en }}</p>
            <p class="d-desc">{{ opened.full }}</p>
          </div>
        </div>
      </Transition>
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
  background: rgba(248, 248, 246, 0.55);
}

/* —— 3D 倾斜场景 ——
   整体绕三轴微转:rotateX 俯视、rotateY 让右侧向远处收、rotate 负角让右侧翘起,
   相片卡/标题/便签卡都躺在这个倾斜平面上,静置即有 3D 感 */
.scene {
  position: absolute;
  inset: 0;
  transform: perspective(1200px) rotateX(7deg) rotateY(-9deg) rotate(-4deg);
  /* 不开 preserve-3d:子元素拍平到倾斜平面即可,真 3D 上下文会让
     Chromium 的 hover 命中检测漂移,卡片 hover 缩放时来回抖 */
}

/* —— 左侧:相片卡 + 关于我 —— */
.left {
  position: absolute;
  left: clamp(24px, 29vw, 32vw);
  top: 50%;
  /* 原片里左侧头像+文字向右倾:场景整体是 -4deg,这里加 8deg 抵消后净 +4deg 顺时针 */
  transform: translateY(-52%) rotate(8deg);
}
.photo-card {
  width: clamp(150px, 13.5vw, 200px);
  padding: 9px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
  /* 相片卡在左侧整组右倾的基础上再多歪一点 */
  transform: rotate(3deg);
}
.photo {
  aspect-ratio: 4 / 5;
  border-radius: 10px;
  /* 没有照片时的深色占位底 */
  background: #23262e url("/media/about.jpg") center / cover no-repeat;
}
.intro {
  margin-top: 20px;
}
.big {
  font-size: clamp(34px, 3.6vw, 52px);
  font-weight: 800;
  line-height: 1.05;
}
.meta {
  display: flex;
  gap: 12px;
  margin-top: 10px;
  border-left: 2px solid rgba(0, 0, 0, 0.7);
  padding-left: 8px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-weak);
}

/* —— 右侧:错落便签卡 —— */
.cards {
  position: absolute;
  left: 48.5%;
  top: 50%;
  transform: translateY(-50%);
  width: min(320px, 27vw);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
/* 像随手摆放的便签,横向交错 */
.p-card:nth-child(2) {
  margin-left: 42px;
}
.p-card:nth-child(3) {
  margin-left: 10px;
}
.p-card:nth-child(4) {
  margin-left: 32px;
}
.p-card {
  position: relative;
  cursor: pointer;
}
.p-card:hover {
  z-index: 2;
}
/* 视觉样式都在内层;backdrop-filter 在 3D 变换里会闪,换成更实的白底 */
.p-inner {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;
}
.p-card:hover .p-inner {
  transform: scale(1.05);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.14);
}
.p-title {
  font-size: 15px;
  font-weight: 700;
  padding-right: 28px;
}
/* hover 时标题后浮出箭头 */
.arrow {
  display: inline-block;
  margin-left: 8px;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.p-card:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}
.p-en {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-weak);
  margin: 5px 0 6px;
}
.chip {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  flex: none;
}
.p-desc {
  font-size: 11px;
  color: var(--text-weak);
  line-height: 1.6;
  /* 单行截断,完整内容点开详情看 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.p-no {
  position: absolute;
  right: 14px;
  top: 13px;
  font-size: 10px;
  color: var(--text-weak);
}

/* —— 点击详情大卡 —— */
.overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px);
}
.detail {
  position: relative;
  width: min(520px, 86vw);
  border-radius: 22px;
  padding: 30px 34px 34px;
  background: #fff;
  background: linear-gradient(
    150deg,
    #fff 42%,
    color-mix(in srgb, var(--tint) 38%, #fff)
  );
  box-shadow: 0 34px 90px rgba(0, 0, 0, 0.16);
}
.close {
  position: absolute;
  right: 16px;
  top: 16px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.06);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.close:hover {
  background: rgba(0, 0, 0, 0.12);
  transform: rotate(90deg);
}
.d-head {
  display: flex;
  align-items: center;
  gap: 14px;
}
.d-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: var(--tint);
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--tint) 45%, transparent);
}
.d-title {
  font-size: 20px;
  font-weight: 800;
}
.d-no {
  font-size: 11px;
  color: var(--text-weak);
  margin-top: 3px;
}
.d-en {
  font-size: 14px;
  font-weight: 700;
  margin: 20px 0 8px;
}
.d-desc {
  font-size: 13px;
  color: #3a3a40;
  line-height: 1.9;
}

/* 详情卡进出场:蒙层淡入,卡片缩放浮出 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active .detail,
.modal-leave-active .detail {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .detail,
.modal-leave-to .detail {
  transform: scale(0.9);
}

/* 窄屏:左右改为上下排,避免重叠;3D 倾斜也一并取消 */
@media (max-width: 860px) {
  .scene {
    position: static;
    transform: none;
  }
  .photo-card {
    transform: none;
  }
  .left {
    position: static;
    transform: none;
    padding: 12vh 24px 0;
    display: flex;
    align-items: flex-end;
    gap: 20px;
  }
  .cards {
    position: static;
    transform: none;
    width: auto;
    margin: 24px 24px 0;
  }
  .p-card:nth-child(n) {
    margin-left: 0;
  }
}
</style>
