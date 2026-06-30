// ⭐ 作品数据 —— 改这里换成你自己的项目

export interface Work {
  id: string;
  tag: string; // 角标分类:B2B / AI / APP / UX / VIS ...
  title: string;
  subtitle?: string;
  desc: string;
  category: string; // 用于目录页筛选:网页 / 小程序 / app / 运营插画 / 平面
  cover: string; // public/ 下的图片路径
  chips?: string[];
}

// 精选作品(横向手风琴,建议 5~6 条)
export const featured: Work[] = [
  {
    id: "edu",
    tag: "B2B",
    title: "教优伴教育后台管理系统",
    desc: "围绕教务流程的后台系统,信息架构与组件规范设计。",
    category: "网页",
    cover: "/media/works/edu.jpg",
  },
  {
    id: "ai-cs",
    tag: "AI",
    title: "小弘帽智能客服平台",
    subtitle: "AI INTELLIGENT CUSTOMER SERVICE",
    desc: "围绕知识库、会话处理和移动端服务路径,建立更轻量的智能客服使用体验。",
    category: "网页",
    cover: "/media/works/ai-cs.jpg",
    chips: ["需求整理", "移动端体验", "界面设计"],
  },
  {
    id: "travel",
    tag: "APP",
    title: "趣行 app",
    subtitle: "TRAVEL EXPERIENCE",
    desc: "以行程规划、目的地内容和移动端浏览节奏为核心,强化轻松、明确的出行体验。",
    category: "app",
    cover: "/media/works/travel.jpg",
    chips: ["移动端界面", "用户路径", "视觉系统"],
  },
  {
    id: "health",
    tag: "UX",
    title: "移动健康检测平台",
    desc: "数据展示、检测流程、体验改版。",
    category: "app",
    cover: "/media/works/health.jpg",
  },
  {
    id: "illus",
    tag: "VIS",
    title: "运营插画与视觉表达",
    desc: "活动画面、图形语言、视觉传播。",
    category: "运营插画",
    cover: "/media/works/illus.jpg",
  },
];

// 作品目录(筛选网格,可比精选更全)
export const catalogFilters = [
  "全部",
  "网页",
  "小程序",
  "app",
  "运营插画",
  "平面",
];

export const catalog: Work[] = [
  {
    id: "site-corp",
    tag: "WEBSITE",
    title: "企业官网设计",
    desc: "品牌表达、页面设计、内容组织。",
    category: "网页",
    cover: "/media/works/site-corp.jpg",
  },
  {
    id: "site-vis",
    tag: "WEBSITE",
    title: "公司官网与视觉包装",
    desc: "官网结构、视觉包装、项目展示。",
    category: "网页",
    cover: "/media/works/site-vis.jpg",
  },
  {
    id: "b-system",
    tag: "SERVICE SYSTEM",
    title: "B 端资源技术专家客服",
    desc: "流程梳理、表格设计、任务处理。",
    category: "网页",
    cover: "/media/works/b-system.jpg",
  },
  {
    id: "mini",
    tag: "MINI PROGRAM",
    title: "小程序装修平台",
    desc: "配置体验、模板搭建、页面编辑。",
    category: "小程序",
    cover: "/media/works/mini.jpg",
  },
  {
    id: "saas",
    tag: "SAAS",
    title: "收银 SaaS 后台 3.0",
    desc: "信息架构、筛选效率、视觉规范。",
    category: "网页",
    cover: "/media/works/saas.jpg",
  },
  {
    id: "dashboard",
    tag: "DASHBOARD",
    title: "SaaS 详情页组件",
    desc: "详情布局、状态反馈、组件规范。",
    category: "网页",
    cover: "/media/works/dashboard.jpg",
  },
  {
    id: "illus2",
    tag: "ILLUSTRATION",
    title: "运营插画",
    desc: "活动画面、图形语言、视觉传播。",
    category: "运营插画",
    cover: "/media/works/illus.jpg",
  },
  {
    id: "graphic-ai",
    tag: "GRAPHIC",
    title: "AI 服务品牌封面",
    desc: "项目包装、封面设计、视觉识别。",
    category: "平面",
    cover: "/media/works/graphic-ai.jpg",
  },
  {
    id: "graphic-flow",
    tag: "GRAPHIC",
    title: "AI 产品流程图",
    desc: "路径梳理、图形表达、信息设计。",
    category: "平面",
    cover: "/media/works/graphic-flow.jpg",
  },
];
