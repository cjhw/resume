import React, { useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Root from './container/root'
import Resume from './container/resume'
import ROUTER from './common/constants/router'
import TemplateList from './container/templateList/index'
import useReadDirAssetsTemplateHooks from './hooks/useReadDirAssetsTemplateHooks'
import useThemeActionHooks from './hooks/useThemeActionHooks'
import KeepAlive, { AliveScope } from 'react-activation'

function Router() {
  const readDirAssetsTemplateHooks = useReadDirAssetsTemplateHooks()
  const initThemeConfig = useThemeActionHooks.useInitThemeConfig()

  // 进行初始化工作
  useEffect(() => {
    initThemeConfig()
    readDirAssetsTemplateHooks()
  }, [])

  return (
    <HashRouter>
      <Routes>
        {/*  一定要添加 exact */}
        <Route
          path={ROUTER.root}
          element={
            <AliveScope>
              <Root />
            </AliveScope>
          }
        />
        <Route
          path={ROUTER.resume}
          element={
            <AliveScope>
              <Resume />
            </AliveScope>
          }
        />
        <Route
          path={ROUTER.templateList}
          element={
            <AliveScope>
              <TemplateList />
            </AliveScope>
          }
        />
        {/* 重定向到首页 */}
        <Route element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </HashRouter>
  )
}
export default Router
