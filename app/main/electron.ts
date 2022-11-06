import path from 'path'
import customMenu from './customMenu'
import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  dialog,
  Menu,
} from 'electron'

import './userData'

export interface MyBrowserWindow extends BrowserWindow {
  uid?: string
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}

function createWindow() {
  // 创建浏览器窗口
  const mainWindow: MyBrowserWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // 注入node模块
      contextIsolation: false,
    },
  })

  mainWindow.uid = 'mainWindow'

  // 创建应用设置窗口
  const settingWindow: MyBrowserWindow = new BrowserWindow({
    width: 720,
    height: 240,
    show: false, // 设置为 false，使得窗口创建时不展示
    resizable: isDev(), // 根据环境进行判断，我们设置该窗口不可拉伸宽高
    webPreferences: {
      devTools: isDev(), // 根据环境进行判断
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  settingWindow.uid = 'settingWindow' // 添加自己唯一的窗口属性

  function registryShortcut() {
    globalShortcut.register('1', () => {
      // 获取当前窗口
      mainWindow.webContents.openDevTools()
    })
  }

  if (isDev()) {
    // 在开发环境下，我们加载的是运行在 7001 端口的 React
    registryShortcut()
    mainWindow.loadURL(`http://127.0.0.1:7001/index.html`)
    settingWindow.loadURL(`http://127.0.0.1:7001/setting.html`)
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)
    settingWindow.loadURL(
      `file://${path.join(__dirname, '../dist/setting.html')}`
    )
  }

  ipcMain.on('Electron:SettingWindow-hide-event', () => {
    if (settingWindow.isVisible()) {
      settingWindow.hide()
    }
  })
  ipcMain.on('Electron:SettingWindow-min-event', () => {
    if (settingWindow.isVisible()) {
      settingWindow.minimize()
    }
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(customMenu)
  Menu.setApplicationMenu(menu)
})

const ROOT_PATH = path.join(app.getAppPath(), '../')

ipcMain.on('get-root-path', (event, arg) => {
  event.reply('reply-root-path', isDev() ? ROOT_PATH : __dirname)
})

// 应用设置，保存自定义存储路径
ipcMain.on('open-save-resume-path', (event, arg) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then((result) => {
      event.reply('reply-save-resume-path', result.filePaths)
    })
    .catch((err) => {
      event.reply('reply-save-resume-path', err)
    })
})
