// ⭐ 作品数据 —— 改这里换成你自己的项目

export interface Work {
  id: string;
  tag: string; // 角标分类:G端 / AI / AI / UX / VIS ...
  title: string;
  subtitle?: string;
  desc: string;
  category: string; // 用于目录页筛选:可视化大屏 / 小程序 / APP / b端后台
  cover: string; // public/ 下的图片路径
  chips?: string[];
}

// 精选作品(横向手风琴,建议 5~6 条)
export const featured: Work[] = [
  {
    id: "edu",
    tag: "G端",
    title: "现代农业DAP管理平台",
    desc: "三端设计体系构建，从0到1构建县域农业数字底座。",
    category: "可视化大屏",
    cover: "/media/works/edu.png",
  },
  {
    id: "ai-cs",
    tag: "AI",
    title: "识农AI小程序",
    subtitle: "AI INTELLIGENT CUSTOMER SERVICE",
    desc: "围绕知识库、会话处理和移动端服务路径,专业农业AI智能助手。",
    category: "小程序",
    cover: "/media/works/ai-cs.png",
    chips: ["需求整理", "移动端体验", "界面设计"],
  },
  {
    id: "ASTRO",
    tag: "AI",
    title: "星座骰子",
    subtitle: "TRAVEL EXPERIENCE",
    desc: "融合占星学与AI解读的智能决策应用，通过投掷星座骰子获取命运指引。",
    category: "小程序",
    cover: "/media/works/b-system.png",
    chips: ["移动端界面", "用户路径", "视觉系统"],
  },
  {
    id: "education",
    tag: "UX",
    title: "青葱守护APP",
    desc: "视觉重心、检测流程、体验改版。",
    category: "App",
    cover: "/media/works/mini.png",
  },
  {
    id: "b端后台",
    tag: "VIS",
    title: "青葱守护校企端",
    desc: "降本增效、图形语言、设计规范。",
    category: "校企后台",
    cover: "/media/works/illus.png",
  },
];

// 作品目录(筛选网格,可比精选更全)
export const catalogFilters = [
  "全部",
  "可视化大屏",
  "移动端",
  "B端后台",
];

export const catalog: Work[] = [
  {
    id: "G端",
    tag: "BIG SCREEN",
    title: "现代农业DAP管理平台",
    desc: "可视化大屏、页面设计、动效设计。",
    category: "可视化大屏",
    cover: "/media/works/site-corp.png",
  },
  {
    id: "mini",
    tag: "MINI PROGRAM",
    title: "识农AI小程序",
    desc: "AI问答、需求整理、交互优化。",
    category: "移动端",
    cover: "/media/works/aisn.png",
  },
  {
    id: "mini2",
    tag: "MINI PROGRAM",
    title: "星座骰子小程序",
    desc: "需求调研、交互体验、页面设计。",
    category: "移动端",
    cover: "/media/works/xzsz.png",
  },
  {
    id: "APP1",
    tag: "APP",
    title: "青葱守护APP",
    desc: "教育管控、页面优化、交互体验。",
    category: "移动端",
    cover: "/media/works/qcsh_app.png",
  },
  {
    id: "saas",
    tag: "SAAS",
    title: "青葱守护-校企管理后台",
    desc: "信息架构、筛选效率、视觉规范。",
    category: "B端后台",
    cover: "/media/works/qcsh_web.png",
  },
  {
    id: "mini3",
    tag: "MINI PROGRAM",
    title: "青葱守护-校企管理小程序",
    desc: "详情布局、状态反馈、组件规范。",
    category: "移动端",
    cover: "/media/works/qcsh_mini.png",
  },
  {
    id: "pc",
    tag: "WEBSITE",
    title: "青葱守护-平板/pc端",
    desc: "0-1、需求分析、页面设计。",
    category: "B端后台",
    cover: "/media/works/qcsh_ipad.png",
  },
  {
    id: "APP2",
    tag: "APP",
    title: "微喇对讲",
    desc: "页面优化、交互体验、软硬结合。",
    category: "移动端",
    cover: "/media/works/wldj.png",
  },
  {
    id: "APP3",
    tag: "APP",
    title: "万安智能-移动端/手表",
    desc: "智能家居、图形表达、表盘设计计。",
    category: "移动端",
    cover: "/media/works/wazn.png",
  },
];
