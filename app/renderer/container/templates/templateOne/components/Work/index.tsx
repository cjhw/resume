/**
 * @desc 工作经历
 * @author cjhw
 */
import './index.less'
import React from 'react'

function Work() {
  return (
    <div styleName="content">
      <p styleName="label">工作经历 Post</p>
      <ul styleName="list">
        <li styleName="flex">
          <div styleName="left">
            <p>2022.11</p>
            <p>前端工程师</p>
          </div>
          <div styleName="right">
            <p>母鸡</p>
            <p>广州彭于晏，其他的没啥介绍了</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Work
