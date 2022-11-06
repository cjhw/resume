import React from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router'
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
