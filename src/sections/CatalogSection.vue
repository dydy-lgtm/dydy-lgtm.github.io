<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { catalog, catalogFilters } from "@/data/works";
import { useEnter } from "@/composables/useEnter";

// active 由父级传入,用于进入驱动
const props = defineProps<{ active: boolean }>();

const activeFilter = ref("全部");
const list = computed(() =>
  activeFilter.value === "全部"
    ? catalog
    : catalog.filter((w) => w.category === activeFilter.value)
);

const root = ref<HTMLElement>();
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context((self) => {
    gsap.set(self.selector!(".card"), { opacity: 0, y: 28 });
  }, root.value);
});

useEnter(
  () => props.active,
  () => {
    gsap.to(root.value!.querySelectorAll(".card"), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.06,
    });
  }
);

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <section id="catalog" ref="root" class="catalog">
    <div class="container">
      <p class="kicker">PROJECT INDEX</p>
      <h2 class="big">作品目录</h2>

      <div class="filters">
        <button
          v-for="f in catalogFilters"
          :key="f"
          :class="{ on: activeFilter === f }"
          @click="activeFilter = f"
        >
          {{ f }}
        </button>
      </div>

      <div class="grid">
        <article v-for="(w, i) in list" :key="w.id" class="card">
          <div
            class="cover"
            :style="{ backgroundImage: `url(${w.cover})` }"
          ></div>
          <div class="body">
            <p class="tag">
              {{ String(i + 1).padStart(2, "0") }} / {{ w.tag }}
            </p>
            <h3>{{ w.title }}</h3>
            <p class="desc">{{ w.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  background: var(--bg-light);
  min-height: 100%;
  padding: calc(var(--nav-h) + 36px) 0 90px;
}
.kicker {
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--accent);
}
.big {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  margin: 8px 0 24px;
}
.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px;
  width: fit-content;
  margin-bottom: 28px;
}
.filters button {
  border: none;
  background: transparent;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--text-weak);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.filters button.on {
  background: #111;
  color: #fff;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
}
.cover {
  height: 180px;
  background: #e6e6ea center / cover no-repeat;
}
.body {
  padding: 16px 18px 20px;
}
.tag {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--accent);
}
.body h3 {
  font-size: 17px;
  margin: 6px 0 6px;
}
.desc {
  font-size: 12px;
  color: var(--text-weak);
  line-height: 1.6;
}
@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
