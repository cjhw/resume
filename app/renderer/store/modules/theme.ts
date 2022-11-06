import { createSlice } from '@reduxjs/toolkit'

export interface TStore {
  /**
   * @description 主题列表
   */
  themeList: TSTheme.Item[]
  /**
   * @description 当前选中的主题
   */
  currentTheme: TSTheme.Item
}

const initialState = {
  themeList: [],
  currentTheme: {
    id: '',
    fontColor: '',
    backgroundColor: '',
  },
}

const themeSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setThemeList(state, { payload }) {
      state.themeList = payload
    },
    setCurrentTheme(state, { payload }) {
      state.currentTheme = payload
    },
  },
})

export const { setCurrentTheme, setThemeList } = themeSlice.actions

export default themeSlice.reducer
