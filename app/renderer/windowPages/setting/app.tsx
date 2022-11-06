import React from 'react'
import { createRoot } from 'react-dom/client'
//  引入Redux
import { Provider } from 'react-redux'
import store from '@src/store'
//  应用设置的入口组件
import Setting from './index'

function App() {
  return (
    <Provider store={store}>
      <Setting />
    </Provider>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
