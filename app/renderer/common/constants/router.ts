// 模块路径
const ROUTER = {
  root: '/',
  // 这里我们改一下简历制作的路由，规则：/来源/模版ID/模版索引
  resume: '/resume/:fromPath/:templateId/:templateIndex',
  templateList: '/template',
}

export default ROUTER

export const ROUTER_KEY = {
  root: 'root',
  resume: 'resume',
  templateList: 'templateList',
}

// 入口模块
export const ROUTER_ENTRY = [
  {
    url: 'https://github.com/cjhw/resume',
    key: 'intro',
    text: '介绍',
  },
  {
    url: ROUTER.resume,
    key: ROUTER_KEY.resume,
    text: '简历',
  },
  {
    url: 'https://github.com/cjhw/resume',
    key: 'code',
    text: '源码',
  },
  {
    url: ROUTER.templateList,
    key: ROUTER_KEY.templateList,
    text: '模版',
  },
]
