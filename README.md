# portfolio-clone

复刻 ZWT UI 设计作品集(单页滚动站)。技术栈:**Vue3 + Vite + GSAP + Lenis**。
设计分析见上级目录 `作品集网站_复刻分析.md`。

## 启动

```bash
npm install
npm run dev      # 本地开发
npm run build    # 打包
```

## ⭐ 怎么改成你自己的内容

**只改 `src/data/` 里的数据文件,不用碰布局和动画:**

| 文件 | 内容 |
|---|---|
| `src/data/site.ts` | 品牌名、顶部导航 |
| `src/data/profile.ts` | 首屏文案、简历(数字/时间线/技能/教育)、方法页 4 张卡 |
| `src/data/works.ts` | 精选作品 + 作品目录的项目数组(换作品改这里) |
| `src/data/contact.ts` | 联系页文案、二维码、社交链接 |

**图片 / 视频** 放到 `public/media/`,数据文件里的路径已指向那里:

```
public/media/
  hero.mp4          首屏背景视频(多镜头 AI 视频)
  contact.mp4       联系页背景视频
  desk.jpg          方法页桌面平铺图
  qrcode.png        联系页二维码
  works/*.jpg       各作品封面(见 works.ts 里的 cover 路径)
```

> 没放素材也能跑:视频/图片位置会显示占位底色,布局和动效不受影响。

## 结构

```
src/
  data/         ← 内容(改这里)
  sections/     ← 6 个段落组件(布局 + 样式)
  components/   ← 导航、滚动进度
  composables/  ← 动效封装(平滑滚动 / 滚动揭示 / count-up)
  styles/tokens.css ← 配色与设计 token(从录屏提取)
```

## 动效说明

- 平滑滚动:`composables/useSmoothScroll.ts`(Lenis + GSAP 同步)
- 滚动揭示:指令 `v-reveal`(可加 `data-reveal-stagger` 做子元素错位)
- 数字计数:指令 `v-countup="20"`
- 首屏镜头感:`HeroSection.vue`,背景 Ken Burns 推近 + 文案随滚动上移淡出退场
- 方法页 pin 视差 + 聚光:`AboutSection.vue`,`pin + scrub`;背景拉远 → 卡片依次浮入 → 聚焦卡放大、其余压暗(暗幕在聚焦卡之下)
- 精选作品手风琴:`FeaturedSection.vue`,flex 过渡 + 自动轮播(hover 暂停)
- 段落转场:`components/SectionFlash.vue`,滚动经过边界闪一层色板(首屏→简历=白闪;→精选=暗入;目录→联系=暗叠化),在 `App.vue` 配置 `trigger / color / peak`
