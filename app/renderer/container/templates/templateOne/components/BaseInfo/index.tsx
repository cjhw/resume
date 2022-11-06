/**
 * @desc 基本信息
 * @author cjhw
 */
import React from 'react'
import '../../../styles/template-one.less'

function BaseInfo() {
  return (
    <div styleName="container">
      <p styleName="title">基本信息 Basic</p>
      <ul styleName="content">
        <li>院校：XXXX</li>
        <li>专业：电子信息工程</li>
        <li>学历：本科</li>
        <li>学年：2020.09 - 2024.06</li>
        <li>籍贯：广东·汕头</li>
      </ul>
    </div>
  )
}

export default BaseInfo
