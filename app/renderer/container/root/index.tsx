import React, { useEffect } from 'react'
import './index.less'
import { shell } from 'electron'
import { useNavigate } from 'react-router'
import Logo from '@assets/logo.png'
import { ROUTER_ENTRY, ROUTER_KEY } from '@common/constants/router'
import { compilePath, isHttpOrHttpsUrl } from '@src/common/utils/router'
import MyTheme from '@common/components/MyTheme'
import useThemeActionHooks from '@src/hooks/useThemeActionHooks'
import { useSelector } from 'react-redux'

function Root() {
  const navigate = useNavigate()
  const [currentTheme] = useThemeActionHooks.useGetCurrentTheme()
  const selectTemplate = useSelector(
    (state: any) => state.template.selectTemplate
  )

  const onRouterToLink = (router: TSRouter.Item) => {
    if (isHttpOrHttpsUrl(router.url)) {
      shell.openExternal(router.url)
    } else {
      if (router.key !== ROUTER_KEY.resume) {
        navigate(router.url)
      } else {
        navigate(
          compilePath(router.url, {
            fromPath: ROUTER_KEY.root,
            templateId: selectTemplate?.templateId,
            templateIndex: selectTemplate?.templateIndex,
          })
        )
      }
    }
  }
  return (
    <div
      styleName="root"
      style={{ backgroundColor: currentTheme?.backgroundColor }}
    >
      <div styleName="container">
        <img src={Logo} alt="" />
        <div styleName="title">ResumeMook</div>
        <div styleName="tips">一个模板简历制作平台, 让你的简历更加出众 ~</div>
        <div styleName="theme">
          <MyTheme />
        </div>
        <div styleName="action">
          {ROUTER_ENTRY.map((router: TSRouter.Item) => {
            return (
              <div
                key={router.key}
                styleName="item"
                onClick={() => {
                  onRouterToLink(router)
                }}
              >
                {router.text}
              </div>
            )
          })}
        </div>
        <div styleName="copyright">
          <div styleName="footer">
            <p styleName="copyright">
              Copyright © 2018-{new Date().getFullYear()} All Rights Reserved.
              Copyright By cjhw
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Root
