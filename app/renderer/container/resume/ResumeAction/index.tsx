import React, { useState } from 'react'
import './index.less'
import { useNavigate, useParams } from 'react-router'
import ROUTER, { ROUTER_KEY } from '@common/constants/router'

// 这里调用我们封装好的通用组件即可
import MyButton from '@common/components/MyButton'
import { toPrintPdf } from '@src/common/utils/htmlToPdf'
import { useSelector } from 'react-redux'
import {
  useReadGlobalConfigFile,
  useUpdateGlobalConfigFile,
} from '@src/hooks/useGlobalConfigActionHooks'
import { getUserStoreDataPath } from '@src/common/utils/appPath'
import { intToDateString } from '@src/common/utils/time'
import fileAction from '@src/common/utils/file'
import { createUID } from '@src/common/utils'
import MyModal from '@src/common/components/MyModal'
import { compilePath } from '../../../common/utils/router'
import useClickAway from '@common/hook/useClickAway'

function ResumeAction() {
  const navigate = useNavigate()
  const { ref, componentVisible, setComponentVisible } = useClickAway(false)

  // 定义参数类型
  const routerParams = useParams<{
    fromPath: string
    templateId: string
    templateIndex: string
  }>()
  // 返回首页
  const onBack = () => {
    if (routerParams?.fromPath === ROUTER_KEY.root) {
      navigate(compilePath(ROUTER.root))
    } else if (routerParams?.fromPath === ROUTER_KEY.templateList) {
      navigate(compilePath(ROUTER.templateList))
    } else {
      console.log('here')
    }
  }

  const base: TSResume.Base = useSelector((state: any) => state.resume.base)
  const work: TSResume.Work = useSelector((state: any) => state.resume.work)
  const resume = useSelector((state: any) => state.resume)

  // 1.引入hooks
  const readAppConfigThemeFile = useReadGlobalConfigFile()
  const updateGlobalConfigFile = useUpdateGlobalConfigFile()

  // 导出PDF
  const exportPdf = () => {
    toPrintPdf(`${base?.username}+${base?.school}+${work?.job}`)
    setComponentVisible(false)
    readAppConfigThemeFile().then((value: { [key: string]: any }) => {
      if (value?.resumeSavePath) {
        saveResumeJson(value?.resumeSavePath)
      } else {
        //  2.2 不存在默认路径，则设置默认路径并更新文件内容
        getUserStoreDataPath().then((appPath: string) => {
          updateGlobalConfigFile('resumeSavePath', `${appPath}resumeCache`)
          saveResumeJson(`${appPath}resumeCache`)
        })
      }
    })
  }

  // 存储数据json
  const saveResumeJson = (resumeSavePath: string) => {
    const date = intToDateString(new Date().valueOf(), '_')
    const prefix = `${date}_${base?.username}_${base?.school}_${
      work?.job
    }_${createUID()}.json`
    // 如果路径中不存在 resumeCache 文件夹，则默认创建此文件夹
    if (resumeSavePath && resumeSavePath.search('resumeCache') > -1) {
      fileAction
        .canRead(resumeSavePath)
        .then(() => {
          fileAction?.write(`${resumeSavePath}/${prefix}`, resume, 'utf8')
        })
        .catch(() => {
          fileAction
            .mkdirDir(resumeSavePath)
            .then(() => {
              fileAction?.write(`${resumeSavePath}/${prefix}`, resume, 'utf8')
            })
            .catch(() => {
              console.log('创建文件夹失败')
            })
        })
    } else {
      fileAction
        ?.mkdirDir(`${resumeSavePath}/resumeCache`)
        .then((path) => {
          if (path) fileAction?.write(`${path}/${prefix}`, resume, 'utf8')
        })
        .catch(() => {
          console.log('创建文件夹失败')
        })
    }
  }

  return (
    <div styleName="actions">
      <div styleName="back" onClick={onBack}>
        返回
      </div>
      <MyButton
        size="middle"
        className="export-btn"
        onClick={() => setComponentVisible(true)}
      >
        导出PDF
      </MyButton>
      {componentVisible && (
        <MyModal.Confirm
          eleRef={ref}
          title="确定要打印简历吗？"
          description="请确保信息的正确，目前仅支持单页打印哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: () => setComponentVisible(false),
            },
            submitBtn: {
              isShow: true,
              callback: exportPdf,
            },
          }}
        />
      )}
    </div>
  )
}

export default ResumeAction
