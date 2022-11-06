import fileAction from '@common/utils/file'
import { getAppPath } from '@common/utils/appPath'
import { useDispatch } from 'react-redux'
import { createUID } from '@src/common/utils'
import { setSelectTemplate, setTemplateList } from '@src/store/modules/template'
import path from 'path'

export default function () {
  const dispatch = useDispatch()

  return () => {
    // 1. 先获取应用地址
    getAppPath().then((appPath: string) => {
      console.log(`${appPath}/assets/template`)
      // 2. 从assets读取模版图片信息，构造模版列表
      fileAction
        .readDir(`${appPath}/assets/template`)
        .then(async (files: string[]) => {
          // 3. 构造模版列表
          if (files.length > 0) {
            let templateList: TSTemplate.Item[] = []
            for (let idx = 0; idx < files.length; idx++) {
              const base64URL = await fileAction.read(
                // `${appPath}assets/template/${files[idx]}`,
                path.join(appPath, 'assets/template', files[idx]),
                'base64'
              )
              templateList.push({
                templateName: files[idx],
                // 添加索引
                templateIndex: idx,
                templateId: createUID(),
                templateCover: `data:image/png;base64,${base64URL}`,
              })
            }
            // 4. 存入到 redux 中，并默认选中第一条
            dispatch(setTemplateList(templateList))
            dispatch(setSelectTemplate(templateList[0]))
          }
        })
        .catch((err: NodeJS.ErrnoException) => {
          throw new Error(err.message)
        })
    })
  }
}
