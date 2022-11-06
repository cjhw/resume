import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  base: {
    avatar: '',
    username: '蔡键浩',
    area: '广东汕头',
    school: 'XXXX',
    major: '电子信息工程',
    degree: '本科',
    hometown: '广州',
    onSchoolTime: {
      beginTime: '2020.09',
      endTime: '2024.06',
    },
  },
  contact: {
    phone: '135****4998',
    email: '1784581164@qq.com',
    github: 'https://github.com/cjhw',
    juejin: 'https://juejin.cn/user/1662924342429416',
  },
  work: {
    job: '前端工程师',
    city: '广州',
    cityList: ['广州', '成都', '海口'],
  },
  hobby: '唱跳rap',
  skill:
    '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神，具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神，具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境。，具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
  skillList: [
    '熟悉HTML、CSS、了解Less、Sass预处理语言，具有扎实的JS基础',
    '熟练ES6+新特性，熟悉TypeScript，用TS和Vue3、TS和React开发过个人项目',
    '熟悉Vue全家桶开发，研究过Vue的原理，熟悉React开发',
    '熟悉Webpack的使用，了解基本的配置，了解基本的Loader和Plugin',
    '熟悉Vite的使用，研究过Vite的原理',
    '了解Nodejs，使用过node开发过脚手架，使用express和koa搭建过后台',
    '了解常见的数据结构与算法和常见的设计模式',
  ],
  evaluation:
    '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神，具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神，具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境。，具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
  evaluationList: [
    '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
    '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
    '具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境。',
    '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
  ],
  certificate: '广州第一届喝酒大赛参与奖',
  certificateList: ['广州第一届喝酒大赛参与奖'],
  schoolExperience: [
    {
      beginTime: '2020.09',
      endTime: '2022.09',
      post: '文艺部会长',
      department: '校团委学生会',
      content:
        '计划、组织、协调各年级学生组织的文艺和文化娱乐活动｜承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
      parseContent: [
        '计划、组织、协调各年级学生组织的文艺和文化娱乐活动',
        '承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
      ],
    },
  ],
  workExperience: [
    {
      beginTime: '2022.11',
      endTime: '2022....',
      post: '前端工程师',
      department: '广州瞎说大学网络中心',
      content:
        '担任TickNet工作室前端工程师，与广州瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用｜任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与广州xxx科技有限公司合作，主导开发该公司官网及后台管理',
      parseContent: [
        '担任TickNet工作室前端工程师，与广州瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用',
        '任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与广州xxx科技有限公司合作，主导开发该公司官网及后台管理',
      ],
    },
  ],
  projectExperience: [
    {
      beginTime: '2022.03',
      endTime: '2022.05',
      projectName: 'ResumeMook 可视化简历平台',
      post: '前端工程师',
      content:
        'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版｜通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档｜通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
      parseContent: [
        'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版',
        '通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档',
        '通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
      ],
      date: 1621145137865,
    },
  ],
}

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setBase(state, { payload }) {
      state.base = payload
    },
  },
})

export const { setBase } = resumeSlice.actions

export default resumeSlice.reducer
