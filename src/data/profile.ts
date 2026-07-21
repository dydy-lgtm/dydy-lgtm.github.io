// ⭐ 简历 / 关于我 内容 —— 改这里换成你自己的资料

export const hero = {
  kicker: "PORTFOLIO 2026",
  title: "UI设计作品集",
  subtitle: "UI设计 / 交互体验 / 产品设计",
  // 把首屏的多镜头 AI 视频放到 public/ 下,改这里的路径
  videoSrc: "/media/hero.mp4",
  badge: "",
  ctas: [
    { label: "去看看", to: "featured", primary: true },
    { label: "联系我", to: "contact", primary: false },
  ],
};

export const resume = {
  title: ["设计", "创造价值"],
  roles: "UI设计师 / UX设计师 / 产品设计师",
  intro: "专注于页面设计、交互体验与页面秩序,让复杂信息更清晰地被看见。",
  person: {
    name: "戴宇",
    tagEn: "Designer",
    location: "中国 · 深圳",
    email: "315883782@qq.com",
    note: "7天内到岗",
  },
  // 翻入简历屏时,数字会从 0 滚动到目标值(count-up)
  stats: [
    { value: 7, suffix: "年+", label: "UI 设计经验" },
    { value: 20, suffix: "+", label: "项目落地参与" },
    { value: 4, suffix: "端", label: "多端界面设计" },
    { value: 1, suffix: "套", label: "独立设计产品" },
  ],
  timeline: [
    {
      period: "2024.06 - 2026.05",
      title: "UI/UX设计师 · 产品页面设计方向",
      desc: "负责政府可视化大屏项目、自研产品迭代优化、运营物料设计。参与需求拆解、视觉方向制定、交互优化、动效制作和页面落地。",
    },
    {
      period: "2022.07 - 2024.04",
      title: "UI/UX设计师 · 产品界面设计方向",
      desc: "负责青葱守护产品的Web 页面、移动端界面、后台管理系统与组件规范设计。参与从信息架构、交互流程到高保真视觉的完整设计过程。",
    },
  ],
  // 专业技能 —— 横向滚动走马灯;abbr 是图标块里的缩写,bg/fg 是图标块配色
  skills: [
    { abbr: "S", name: "Sketch", fg: "#fff", bg: "#FDB300", src: "/media/skills/sketch.png" },
    { abbr: "Ps", name: "Photoshop", fg: "#31A8FF", bg: "#001E36", src: "/media/skills/ps.png" },
    { abbr: "Ai", name: "Ai", fg: "#FF9A00", bg: "#330000", src: "/media/skills/ai.png" },
    { abbr: "Ae", name: "After Effects", fg: "#9999FF", bg: "#00005B", src: "/media/skills/ae.png" },
    { abbr: "F", name: "Figma", fg: "#fff", bg: "#A259FF", src: "/media/skills/figma.png" },
    { abbr: "AG", name: "AIGC", fg: "#fff", bg: "#A259FF", src: "/media/skills/aigc.png" },
  ],
  education: {
    period: "2014 - 2018",
    degree: "视觉传达设计 / 本科",
    school: "江南大学设计学院",
  },
  quote: "设计不是让事物变得更复杂,而是建立更容易理解的视觉秩序。",
};

// 关于我 —— 左侧白边相片卡 + 个人小档案(照片放 public/media/about.jpg)
export const about = {
  photo: "/media/about.jpg",
  meta: ["生日 03.12", "双鱼座", "INFJ"],
};

// 关于我 —— 右侧 4 张便签卡
// desc:卡片上的单行简介;full:点击弹出详情卡里的完整介绍;color:详情卡图标与底色
export const principles = [
  {
    no: "01",
    title: "我对细节敏感",
    en: "Detail Sensitive",
    desc: "我留意界面里每一个微妙的对齐和留白、间距、层级、图片情绪、文字节奏。",
    full: "我留意界面里每一个微妙的对齐:留白、间距、层级、图片情绪、文字节奏。很多时候用户说不出哪里不对,但正是这些细节的松紧,决定了页面给人的第一感受。",
    color: "#9C60FC",
  },
  {
    no: "02",
    title: "我用排版塑造高级秩序",
    en: "Visual Order",
    desc: "我不会盲目堆视觉元素,深耕排版逻辑与视觉节奏,优先信息组织。",
    full: "我不会盲目堆砌视觉元素。深耕排版逻辑与视觉节奏,先把信息组织清楚,再谈风格表达。清晰的秩序本身,就是一种高级感。",
    color: "#5B8DEF",
  },
  {
    no: "03",
    title: "我在意用户体验和情绪",
    en: "User Feeling",
    desc: "我认为界面不只是信息容器,色彩、留白、图片、动效、文案语气共同塑造体验。",
    full: "我认为界面不只是信息容器。色彩、留白、图片、动效、文案语气,都在影响人的感受。我希望每一个页面都有自己的氛围,让用户看得舒服、愿意停留、自然往下浏览。",
    color: "#F0B429",
  },
  {
    no: "04",
    title: "我坚持做有用的设计",
    en: "Useful Design",
    desc: "我不太喜欢只停在“好看”的设计。我更看重设计是否易懂、是否能落地。",
    full: "我不太喜欢只停在“好看”的设计。我更看重设计是否易懂、是否能落地、是否真的帮用户和业务解决了问题。有用,是好设计的底线。",
    color: "#3EBD93",
  },
];
