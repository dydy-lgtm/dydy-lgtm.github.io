// ⭐ 简历 / 关于我 内容 —— 改这里换成你自己的资料

export const hero = {
  kicker: "PORTFOLIO 2026",
  title: "UI设计作品集",
  subtitle: "视觉设计 / UI 设计 / 品牌设计",
  // 把首屏的多镜头 AI 视频放到 public/ 下,改这里的路径
  videoSrc: "/media/hero.mp4",
  badge: "AI生成",
  ctas: [
    { label: "去看看", to: "featured", primary: true },
    { label: "联系我", to: "contact", primary: false },
  ],
};

export const resume = {
  title: ["设计", "创造价值"],
  roles: "视觉设计师 / UI 设计师 / 品牌设计师",
  intro: "专注于品牌视觉、界面体验与页面秩序,让复杂信息更清晰地被看见。",
  person: {
    name: "翟雯婷",
    tagEn: "Designer",
    location: "中国 · 杭州",
    email: "zwt.design@email.com",
    note: "可自由远程工作",
  },
  // 翻入简历屏时,数字会从 0 滚动到目标值(count-up)
  stats: [
    { value: 3, suffix: "年+", label: "UI 设计经验" },
    { value: 20, suffix: "+", label: "项目落地参与" },
    { value: 4, suffix: "端", label: "多端界面设计" },
    { value: 5, suffix: "套+", label: "设计规范沉淀" },
  ],
  timeline: [
    {
      period: "2022 - 至今",
      title: "视觉设计师 · 品牌与运营设计方向",
      desc: "负责品牌视觉系统、活动专题页、运营物料与项目包装设计。参与需求拆解、视觉方向制定和页面落地。",
    },
    {
      period: "2020 - 2022",
      title: "UI 设计师 · 产品界面设计方向",
      desc: "负责 Web 页面、移动端界面、后台管理系统与组件规范设计。参与从信息架构、交互流程到高保真视觉的完整设计过程。",
    },
  ],
  skills: ["Sketch", "Photoshop", "Illustrator"],
  education: {
    period: "2014 - 2018",
    degree: "视觉传达设计 / 本科",
    school: "江南大学设计学院",
  },
  quote: "设计不是让事物变得更复杂,而是建立更容易理解的视觉秩序。",
};

// 方法 / 关于我 —— 4 张说明卡
export const principles = [
  {
    no: "01",
    title: "我对细节敏感",
    en: "Detail Sensitive",
    desc: "我留意界面里每一个微妙的对齐和留白、间距、层级、图片情绪、文字节奏。",
  },
  {
    no: "02",
    title: "我用排版塑造高级秩序",
    en: "Visual Order",
    desc: "我不会盲目堆视觉元素,深耕排版逻辑与视觉节奏,优先信息组织。",
  },
  {
    no: "03",
    title: "我在意用户体验和情绪",
    en: "User Feeling",
    desc: "我认为界面不只是信息容器,色彩、留白、图片、动效、文案语气共同塑造体验。",
  },
  {
    no: "04",
    title: "我坚持做有用的设计",
    en: "Useful Design",
    desc: "我不太喜欢只停在“好看”的设计。我更看重设计是否易懂、是否能落地。",
  },
];
