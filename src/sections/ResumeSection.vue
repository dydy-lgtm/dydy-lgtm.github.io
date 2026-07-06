<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { resume } from "@/data/profile";
import { useEnter } from "@/composables/useEnter";

const props = defineProps<{ active: boolean }>();

const root = ref<HTMLElement>();
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context((self) => {
    gsap.set(self.selector!("[data-anim]"), { opacity: 0, y: 28 });
  }, root.value);
});

useEnter(
  () => props.active,
  () => {
    const blocks = root.value!.querySelectorAll("[data-anim]");
    gsap.to(blocks, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.1,
    });

    // 数字 count-up
    root.value!.querySelectorAll<HTMLElement>(".num-val").forEach((el) => {
      const target = Number(el.dataset.target) || 0;
      const obj = { n: 0 };
      gsap.to(obj, {
        n: target,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(obj.n));
        },
      });
    });
  }
);

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <section id="resume" ref="root" class="resume">
    <div class="card container">
      <div class="bento">
        <!-- 左:标题 + 简介 + 名片 -->
        <div class="col-title" data-anim>
          <p class="tag">RESUME 2026</p>
          <h2 class="title">
            <span v-for="(t, i) in resume.title" :key="i">{{ t }}</span>
            <!-- 手写签名 -->
            <em class="sign">Zwt</em>
          </h2>
          <p class="roles">{{ resume.roles }}</p>
          <p class="intro">{{ resume.intro }}</p>
          <div class="person">
            <div class="avatar"></div>
            <div class="meta">
              <p class="name">
                {{ resume.person.name }}
                <em>{{ resume.person.tagEn }}</em>
              </p>
              <p>{{ resume.person.location }}</p>
              <p>{{ resume.person.email }}</p>
              <p class="note">{{ resume.person.note }}</p>
            </div>
          </div>
        </div>

        <!-- 右上:数字统计(进入时 count-up,竖线分隔) -->
        <div class="stats" data-anim>
          <div v-for="s in resume.stats" :key="s.label" class="stat">
            <p class="num">
              <span class="num-val" :data-target="s.value">0</span
              ><i>{{ s.suffix }}</i>
            </p>
            <p class="lbl">{{ s.label }}</p>
          </div>
        </div>

        <!-- 右中:工作经历时间线(竖线 + 圆点) -->
        <div class="timeline" data-anim>
          <p class="block-title"><i class="dot"></i>工作经历</p>
          <div v-for="(t, i) in resume.timeline" :key="i" class="tl-item">
            <span class="period">{{ t.period }}</span>
            <span class="rail"><i></i></span>
            <div class="tl-body">
              <p class="tl-title">{{ t.title }}</p>
              <p class="tl-desc">{{ t.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 底:引言 / 技能 / 教育 三卡横排 -->
        <div class="bottom">
          <div class="quote" data-anim>
            <span class="q-mark">“</span>
            <p>{{ resume.quote }}</p>
            <svg class="squiggle" viewBox="0 0 72 14" fill="none">
              <path
                d="M2 8 q8 -10 16 0 t16 0 t16 0 t16 0"
                stroke="var(--accent)"
                stroke-width="2.5"
                stroke-linecap="round"
                opacity="0.75"
              />
            </svg>
          </div>

          <div class="skills" data-anim>
            <p class="block-title"><i class="dot"></i>专业技能</p>
            <!-- 软件图标走马灯:悬停暂停 -->
            <div class="skill-strip">
              <div class="skill-track">
                <div
                  v-for="(s, i) in [...resume.skills, ...resume.skills]"
                  :key="i"
                  class="skill"
                >
                  <span
                    class="skill-ic"
                    :style="{ background: s.bg, color: s.fg }"
                    >{{ s.abbr }}</span
                  >
                  <span class="skill-name">{{ s.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="edu" data-anim>
            <p class="block-title"><i class="dot"></i>教育背景</p>
            <p>{{ resume.education.period }}</p>
            <p>{{ resume.education.degree }}</p>
            <p>{{ resume.education.school }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.resume {
  background: var(--grad-resume);
  min-height: 100%;
  padding: calc(var(--nav-h) + 48px) 0 80px;
}
.card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(120, 90, 180, 0.08);
}
.bento {
  display: grid;
  grid-template-columns: 1.1fr 1.4fr;
  grid-template-areas:
    "title stats"
    "title timeline"
    "bottom bottom";
  gap: 22px;
}
.col-title {
  grid-area: title;
}
.tag {
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--text-weak);
}
.title {
  position: relative;
  font-size: 46px;
  font-weight: 800;
  line-height: 1.12;
  margin: 10px 0 14px;
  display: flex;
  flex-direction: column;
}
/* 标题右上的紫色手写签名 */
.sign {
  position: absolute;
  right: 4px;
  top: -4px;
  font-family: "Segoe Script", "Brush Script MT", cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  color: var(--accent);
  transform: rotate(-8deg);
}
.roles {
  font-size: 13px;
  color: var(--text-weak);
}
.intro {
  font-size: 14px;
  margin: 14px 0 24px;
  max-width: 30ch;
  line-height: 1.7;
}
.person {
  display: flex;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #111;
  flex: none;
}
.meta p {
  font-size: 12px;
  color: var(--text-weak);
  line-height: 1.7;
}
.meta .name {
  font-size: 15px;
  color: var(--text);
}
.meta .name em {
  color: var(--accent);
  font-style: italic;
  margin-left: 6px;
}

.stats {
  grid-area: stats;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 22px 0;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
}
.stat {
  padding: 0 22px;
}
/* 统计项之间的竖分隔线 */
.stat + .stat {
  border-left: 1px solid var(--line);
}
.stat .num {
  /* 大数字用衬线体,呼应原稿的杂志感 */
  font-family: Georgia, "Times New Roman", serif;
  font-size: 36px;
  font-weight: 700;
  color: var(--accent);
}
.stat .num i {
  font-size: 14px;
  font-style: normal;
  margin-left: 2px;
}
.stat .lbl {
  font-size: 12px;
  color: var(--text-weak);
  margin-top: 4px;
}

.timeline {
  grid-area: timeline;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
}
.block-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  margin-right: 8px;
}
.tl-item {
  display: grid;
  grid-template-columns: 84px 20px 1fr;
  gap: 0 10px;
  padding: 8px 0;
}
.period {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  padding-top: 2px;
}
/* 时间线竖轨:圆点 + 连接线 */
.rail {
  position: relative;
}
.rail i {
  position: absolute;
  left: 50%;
  top: 4px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(156, 96, 252, 0.18);
  transform: translateX(-50%);
  z-index: 1;
}
.rail::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 10px;
  bottom: -16px;
  width: 2px;
  background: rgba(156, 96, 252, 0.22);
  transform: translateX(-50%);
}
.tl-item:last-child .rail::before {
  display: none;
}
.tl-title {
  font-size: 14px;
  font-weight: 600;
}
.tl-desc {
  font-size: 12px;
  color: var(--text-weak);
  line-height: 1.7;
  margin-top: 4px;
}

/* —— 底部三卡 —— */
.bottom {
  grid-area: bottom;
  display: grid;
  grid-template-columns: 1.05fr 1.6fr 0.95fr;
  gap: 22px;
}
.quote,
.skills,
.edu {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
}
.quote {
  position: relative;
  font-size: 13px;
  color: var(--text-weak);
  line-height: 1.8;
}
.q-mark {
  display: block;
  font-family: Georgia, serif;
  font-size: 34px;
  line-height: 0.6;
  color: var(--accent);
  margin-bottom: 10px;
}
.squiggle {
  display: block;
  width: 72px;
  margin: 12px 0 0 auto;
}

.skill-strip {
  overflow: hidden;
}
.skill-track {
  display: flex;
  width: max-content;
  animation: skill-slide 16s linear infinite;
}
.skill-strip:hover .skill-track {
  animation-play-state: paused;
}
@keyframes skill-slide {
  to {
    transform: translateX(-50%);
  }
}
.skill {
  width: 64px;
  margin-right: 16px;
  text-align: center;
}
.skill-ic {
  width: 46px;
  height: 46px;
  margin: 0 auto 6px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 800;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
.skill-name {
  display: block;
  font-size: 11px;
  color: var(--text-weak);
  white-space: nowrap;
}

.edu {
  position: relative;
  overflow: hidden;
}
.edu p {
  font-size: 12px;
  color: var(--text-weak);
  line-height: 1.8;
}
/* 右下角的学士帽水印 */
.edu::after {
  content: "🎓";
  position: absolute;
  right: 4px;
  bottom: -8px;
  font-size: 58px;
  opacity: 0.16;
  transform: rotate(-10deg);
}

@media (max-width: 860px) {
  .bento {
    grid-template-columns: 1fr;
    grid-template-areas: "title" "stats" "timeline" "bottom";
  }
  .bottom {
    grid-template-columns: 1fr;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 0;
  }
  .stat:nth-child(3) {
    border-left: none;
  }
}
</style>
