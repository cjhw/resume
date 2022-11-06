import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './modules/global'
import resumeReducer from './modules/resume'
import templateReducer from './modules/template'
import themeReducer from './modules/theme'

const store = configureStore({
  reducer: {
    global: globalReducer,
    resume: resumeReducer,
    template: templateReducer,
    theme: themeReducer,
  },
})

export default store
