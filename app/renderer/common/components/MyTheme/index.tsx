/**
 * @description:主题组件
 * @author cjhw
 */
import React from 'react'
import './index.less'
import { useSelector } from 'react-redux'
import useThemeActionHooks from '@src/hooks/useThemeActionHooks'

function MyTheme() {
  const themeList = useSelector((state: any) => state.theme.themeList)
  const [currentTheme, setCurrentTheme] =
    useThemeActionHooks.useGetCurrentTheme()

  console.log(currentTheme)
  return (
    <div styleName="box">
      {themeList &&
        themeList.length > 0 &&
        [...themeList].map((t: TSTheme.Item, index: number) => {
          return (
            <span
              key={index}
              style={{ backgroundColor: t.backgroundColor }}
              styleName={`${currentTheme?.id === t?.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentTheme && setCurrentTheme(t, true)
              }}
            />
          )
        })}
    </div>
  )
}

export default MyTheme
