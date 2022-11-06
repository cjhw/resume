/**
 * @desc 简单介绍
 * @author cjhw
 */
import React from 'react'
import './index.less'

function Synopsis() {
  return (
    <div styleName="content">
      <p styleName="name">蔡键浩</p>
      <p styleName="job">前端工程师</p>
      <p styleName="summary">
        {[
          '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
          '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
          '具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境。',
          '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
        ].join('，')}
      </p>
    </div>
  )
}

export default Synopsis
