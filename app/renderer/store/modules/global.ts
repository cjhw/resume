import { createSlice } from '@reduxjs/toolkit'

const initialState = { appName: '简历应用平台' }

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setStore(state, { payload }) {
      state.appName = payload
    },
  },
})

export const { setStore } = globalSlice.actions

export default globalSlice.reducer
