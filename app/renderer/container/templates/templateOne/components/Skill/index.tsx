/**
 * @desc 技能
 * @author cjhw
 */
import React from 'react'
import './index.less'

function Skill() {
  return (
    <div styleName="content">
      <p styleName="label">技能证书 Skill</p>
      <ul styleName="skill">
        <li styleName="item">
          熟悉HTML、CSS、了解Less、Sass预处理语言，具有扎实的JS基础
        </li>
        <li styleName="item">
          熟练ES6+新特性，熟悉TypeScript，用TS和Vue3、TS和React开发过个人项目
        </li>
        <li styleName="item">
          熟悉Vue全家桶开发，研究过Vue的原理，熟悉React开发
        </li>
        <li styleName="item">
          熟悉Webpack的使用，了解基本的配置，了解基本的Loader和Plugin
        </li>
        <li styleName="item">熟悉Vite的使用，研究过Vite的原理</li>
        <li styleName="item">
          了解Nodejs，使用过node开发过脚手架，使用express和koa搭建过后台
        </li>
        <li styleName="item">了解常见的数据结构与算法和常见的设计模式</li>
      </ul>
    </div>
  )
}

export default Skill
