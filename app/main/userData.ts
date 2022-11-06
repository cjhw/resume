import { app, ipcMain } from 'electron'
import path from 'path'
import fileAction from '@common/utils/file'

// 1. 得到应用程序设置文件的文件夹，然后查看 appConfig 目录
const appConfigPath = path.resolve(app.getPath('userData'), 'appConfig')

// 2 appConfig 文件夹是否可读
fileAction
  .canRead(appConfigPath)
  .then(() => {
    // 2.1 appConfig 可读情况下，判断是否存在 theme.config.json
    fileAction.hasFile(`${appConfigPath}/theme.config.json`).catch(() => {
      createThemeConfigJson()
    })
    // 2.2  appConfig 可读情况下，判断是否存在 global.config.json
    fileAction.hasFile(`${appConfigPath}/global.config.json`).catch(() => {
      createGlobalConfigJson()
    })
  })
  .catch(() => {
    // 2.3 appConfig 文件夹不可读，说明不存在此文件夹，则新增文件夹
    fileAction.mkdirDir(appConfigPath).then(() => {
      createThemeConfigJson()
      createGlobalConfigJson()
    })
  })

const createThemeConfigJson = () => {
  fileAction?.write(
    `${appConfigPath}/theme.config.json`,
    {
      name: '主题配置表',
      currentTheme: {
        id: 'green',
        fontColor: '#ffffff',
        backgroundColor: '#416f5b',
      },
      themeList: [
        { id: 'dark', fontColor: '#ffffff', backgroundColor: '#27292c' },
        { id: 'blue', fontColor: '#ffffff', backgroundColor: '#35495e' },
        { id: 'green', fontColor: '#ffffff', backgroundColor: '#416f5b' },
        { id: 'purple', fontColor: '#ffffff', backgroundColor: '#54546c' },
        { id: 'princess', fontColor: '#ffffff', backgroundColor: '#945454' },
      ],
    },
    'utf8'
  )
}

const createGlobalConfigJson = () => {
  fileAction?.write(
    `${appConfigPath}/global.config.json`,
    { name: '全局配置表', resumeSavePath: '' },
    'utf8'
  )
}

ipcMain.on('Electron:get-userData-path', (event, arg) => {
  event.reply('Electron:reply-userData-path', app.getPath('userData'))
})
