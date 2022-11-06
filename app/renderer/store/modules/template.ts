import { createSlice } from '@reduxjs/toolkit'

export interface TStore {
  /**
   * @description 选中工具条模块的keys
   */
  resumeToolbarKeys: string[]
  /**
   * @description 模块列表
   */
  templateList: TSTemplate.Item[]
  /**
   * @description 当前选中的模版
   */
  selectTemplate: TSTemplate.Item
}

const initialState = {
  resumeToolbarKeys: [],
  templateList: [],
  selectTemplate: {
    templateId: '',
    templateName: '',
    templateCover: '',
  },
}

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setToolbarKeys(state, { payload }) {
      state.resumeToolbarKeys = payload
    },
    setTemplateList(state, { payload }) {
      state.templateList = payload
    },
    setSelectTemplate(state, { payload }) {
      state.selectTemplate = payload
    },
  },
})

export const { setToolbarKeys, setSelectTemplate, setTemplateList } =
  templateSlice.actions

export default templateSlice.reducer
