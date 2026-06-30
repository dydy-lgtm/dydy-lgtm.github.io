import { onMounted, watch, type Ref } from "vue";

/**
 * 进入驱动:当某屏第一次成为 active 时,执行一次入场动画(不依赖滚动进度)。
 *
 * - index 0(首屏)初始即 active,挂载后立即播放。
 * - 其余屏翻入时播放一次,之后不再重复。
 *
 * 用法(在段落组件里):
 *   const props = defineProps<{ active: boolean }>();
 *   useEnter(() => props.active, () => gsap.to(els, {...}));
 *
 * 注意:fn 在 onMounted 之后才会被调用,可安全访问模板 ref / DOM。
 * 段落应在自己的 onMounted 里先用 gsap.set 设好初始隐藏态,避免入场前闪现。
 */
export function useEnter(
  isActive: Ref<boolean> | (() => boolean),
  fn: () => void
) {
  let played = false;
  const get = typeof isActive === "function" ? isActive : () => isActive.value;

  const run = () => {
    if (!played && get()) {
      played = true;
      fn();
    }
  };

  onMounted(() => {
    run(); // 覆盖初始即 active 的首屏
    watch(get, run);
  });
}
