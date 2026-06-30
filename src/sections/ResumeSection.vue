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

        <!-- 右上:数字统计(进入时 count-up) -->
        <div class="stats" data-anim>
          <div v-for="s in resume.stats" :key="s.label" class="stat">
            <p class="num">
              <span class="num-val" :data-target="s.value">0</span
              ><i>{{ s.suffix }}</i>
            </p>
            <p class="lbl">{{ s.label }}</p>
          </div>
        </div>

        <!-- 右中:工作经历时间线 -->
        <div class="timeline" data-anim>
          <p class="block-title"><i class="dot"></i>工作经历</p>
          <div v-for="(t, i) in resume.timeline" :key="i" class="tl-item">
            <span class="period">{{ t.period }}</span>
            <div class="tl-body">
              <p class="tl-title">{{ t.title }}</p>
              <p class="tl-desc">{{ t.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 底:引言 / 技能 / 教育 -->
        <div class="quote" data-anim>“{{ resume.quote }}”</div>
        <div class="skills" data-anim>
          <p class="block-title"><i class="dot"></i>专业技能</p>
          <div class="skill-list">
            <div v-for="s in resume.skills" :key="s" class="skill">{{ s }}</div>
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
    "quote skills-edu";
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
  font-size: 46px;
  font-weight: 800;
  line-height: 1.12;
  margin: 10px 0 14px;
  display: flex;
  flex-direction: column;
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
  gap: 10px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
}
.stat .num {
  font-size: 34px;
  font-weight: 800;
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
  grid-template-columns: 90px 1fr;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px dashed var(--line);
}
.period {
  font-size: 12px;
  color: var(--accent);
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

.quote {
  grid-area: quote;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
  font-size: 14px;
  color: var(--text-weak);
  line-height: 1.8;
}
.skills,
.edu {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
}
[style*="skills-edu"],
.skills {
  grid-area: skills-edu;
}
.skill-list {
  display: flex;
  gap: 14px;
}
.skill {
  flex: 1;
  text-align: center;
  padding: 18px 8px;
  border: 1px solid var(--line);
  border-radius: 12px;
  font-size: 12px;
  color: var(--text-weak);
}
.edu {
  display: none;
}
.edu p {
  font-size: 12px;
  color: var(--text-weak);
  line-height: 1.8;
}

@media (max-width: 860px) {
  .bento {
    grid-template-columns: 1fr;
    grid-template-areas: "title" "stats" "timeline" "quote" "skills-edu";
  }
}
</style>
