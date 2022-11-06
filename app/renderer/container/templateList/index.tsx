/*
 * @Description:
 * @Author: cjhw
 * @LastEditors: cjhw
 */
import React from 'react'
import './index.less'
import Header from './Header'
import Navigation from './Navigation'
import StaticResume from './StaticResume'
import MyRectSize from '@common/components/MyRectSize'

function TemplateList() {
  return (
    <div styleName="container">
      <Header />
      <div styleName="content">
        <MyRectSize>
          <MyRectSize.Left>
            <Navigation />
          </MyRectSize.Left>
          <MyRectSize.Right>
            <StaticResume />
          </MyRectSize.Right>
        </MyRectSize>
      </div>
    </div>
  )
}
export default TemplateList
