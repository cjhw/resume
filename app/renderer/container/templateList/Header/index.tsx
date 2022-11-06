import React from 'react'
import './index.less'
import { useNavigate } from 'react-router'

function Header() {
  const navigate = useNavigate()
  const goBack = () => navigate('/')
  return (
    <div styleName="header">
      <div styleName="back" onClick={goBack}>
        返回
      </div>
      <p styleName="title">简历模版仓库</p>
    </div>
  )
}
export default Header
