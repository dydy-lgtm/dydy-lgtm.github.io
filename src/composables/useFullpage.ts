import { gsap } from "gsap";
import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 整屏切换(Transform Fullpage)。
 * 用 translateY 移动 .fp-track,在各 100vh 段落间整屏切换,而非真实文档滚动。
 *
 * - 滚轮 / 触摸 / 方向键 → goTo(active ± 1)
 * - 切换中 locked 锁定 + 短冷却,避免触控板惯性连发
 * - 超高段落(scrollHeight > clientHeight 且未到边缘)放行原生内部滚动,到边缘再翻屏
 * - resize 重新对位 y = -active * innerHeight
 *
 * 模块级单例:goToIndex / goToId 供导航和按钮直接 import 调用。
 */

// —— 模块级单例状态 ——
export const active = ref(0);
export const count = ref(0);
/** 入场闸门:首屏视频播完前为 false,此间锁住翻屏、隐藏文字/导航/屏点 */
export const ready = ref(false);

/** 首屏入场动画结束后调用:解锁翻屏并放行导航显示 */
export function markReady() {
  ready.value = true;
}

let trackEl: HTMLElement | null = null;
let panels: HTMLElement[] = [];
let idToIndex: Record<string, number> = {};
let locked = false;

const DURATION = 0.9;
const COOLDOWN = 140; // ms,动画结束后的冷却,吃掉触控板余波
const WHEEL_THRESHOLD = 8; // 忽略极小的滚动抖动
const EDGE = 2; // px,内部滚动到边缘的容差

function clamp(i: number) {
  return Math.max(0, Math.min(count.value - 1, i));
}

export function goToIndex(i: number) {
  const target = clamp(i);
  if (!trackEl || locked || target === active.value) return;
  locked = true;
  active.value = target;
  gsap.to(trackEl, {
    y: -target * window.innerHeight,
    duration: DURATION,
    ease: "power3.inOut",
    onComplete: () => {
      window.setTimeout(() => {
        locked = false;
      }, COOLDOWN);
    },
  });
}

export function goToId(id: string) {
  const i = idToIndex[id];
  if (i != null) goToIndex(i);
}

export function goToTop() {
  goToIndex(0);
}

/** 当前屏能否在给定方向上继续内部滚动(超高段落:作品目录/简历等) */
function canScrollInside(dir: 1 | -1) {
  const panel = panels[active.value];
  if (!panel) return false;
  const scrollable = panel.scrollHeight - panel.clientHeight > EDGE;
  if (!scrollable) return false;
  if (dir > 0)
    return panel.scrollTop + panel.clientHeight < panel.scrollHeight - EDGE;
  return panel.scrollTop > EDGE;
}

function onWheel(e: WheelEvent) {
  // 入场动画期间锁住翻屏
  if (!ready.value) {
    e.preventDefault();
    return;
  }
  const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
  // 超高段落未到边缘:放行原生内部滚动,不翻屏
  if (canScrollInside(dir)) return;
  e.preventDefault();
  if (locked || Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
  goToIndex(active.value + dir);
}

function onKey(e: KeyboardEvent) {
  if (!ready.value) return;
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    if (canScrollInside(1)) return;
    e.preventDefault();
    goToIndex(active.value + 1);
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    if (canScrollInside(-1)) return;
    e.preventDefault();
    goToIndex(active.value - 1);
  } else if (e.key === "Home") {
    e.preventDefault();
    goToIndex(0);
  } else if (e.key === "End") {
    e.preventDefault();
    goToIndex(count.value - 1);
  }
}

let touchStartY = 0;
const TOUCH_THRESHOLD = 50;

function onTouchStart(e: TouchEvent) {
  touchStartY = e.touches[0].clientY;
}

function onTouchMove(e: TouchEvent) {
  if (!ready.value) {
    e.preventDefault();
    return;
  }
  const dy = touchStartY - e.touches[0].clientY; // 上滑(看下文)为正
  const dir: 1 | -1 = dy > 0 ? 1 : -1;
  if (canScrollInside(dir)) return; // 内部还能滚:放行
  e.preventDefault();
  if (locked || Math.abs(dy) < TOUCH_THRESHOLD) return;
  goToIndex(active.value + dir);
  touchStartY = e.touches[0].clientY; // 防止一次拖动连翻
}

function onResize() {
  if (trackEl) gsap.set(trackEl, { y: -active.value * window.innerHeight });
}

/**
 * 在根组件挂载一次。
 * @param ids 段落 id 数组(顺序 = 屏索引),用于 goToId 映射
 * @returns track —— 绑到 .fp-track 的模板 ref
 */
export function useFullpage(ids: string[]) {
  const track = ref<HTMLElement>();

  onMounted(() => {
    trackEl = track.value!;
    panels = Array.from(trackEl.children) as HTMLElement[];
    count.value = ids.length;
    idToIndex = Object.fromEntries(ids.map((id, i) => [id, i]));
    active.value = 0;
    gsap.set(trackEl, { y: 0 });

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("resize", onResize);
    trackEl = null;
    panels = [];
  });

  return { track, active, count, goToIndex, goToId, goToTop };
}
