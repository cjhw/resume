/**
 * @description 编辑简历-工具条模块
 */
import React, { useEffect, useState } from 'react'
import './index.less'
import MyScrollBox from '@common/components/MyScrollBox'
import RESUME_TOOLBAR_LIST from '@common/constants/resume'
import { onAddToolbar, onDeleteToolbar } from './uitils'
import { useDispatch } from 'react-redux'
import { setToolbarKeys } from '@src/store/modules/template'
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@src/common/messager'

function ResumeToolbar() {
  const dispatch = useDispatch()
  const height = document.body.clientHeight
  // 定义已添加模块与未添加模块
  const [addToolbarList, setAddToolbarList] = useState<TSResume.SliderItem[]>(
    []
  )
  const [unAddToolbarList, setUnAddToolbarList] = useState<
    TSResume.SliderItem[]
  >([])

  // 在生命周期中，根据 require 字段，分别加入对应的数据源
  useEffect(() => {
    if (RESUME_TOOLBAR_LIST.length > 0) {
      let _addToolbarList: TSResume.SliderItem[] = []
      let _unAddToolbarList: TSResume.SliderItem[] = []
      RESUME_TOOLBAR_LIST.forEach((s: TSResume.SliderItem) => {
        if (s.require) _addToolbarList.push(s)
        if (!s.require) _unAddToolbarList.push(s)
      })
      setAddToolbarList(_addToolbarList)
      setUnAddToolbarList(_unAddToolbarList)
      // 将已添加模块的所有keys进行修改
      changeResumeToolbarKeys(_addToolbarList.map((s) => s.key))
    }
  }, [])

  const changeResumeToolbarKeys = (moduleKeys: string[]) => {
    if (moduleKeys.length > 0) {
      dispatch(setToolbarKeys(moduleKeys))
    }
  }

  // 添加模块
  const onAddSliderAction = (moduleToolbar: TSResume.SliderItem) => {
    const nextAddSliderList = onAddToolbar(addToolbarList, moduleToolbar)
    setAddToolbarList(nextAddSliderList)
    const nextUnAddSliderList = onDeleteToolbar(unAddToolbarList, moduleToolbar)
    setUnAddToolbarList(nextUnAddSliderList)
    changeResumeToolbarKeys(
      nextAddSliderList.map((s: TSResume.SliderItem) => s.key)
    )
  }

  // 删除模块
  const onDeleteSliderAction = (moduleSlider: TSResume.SliderItem) => {
    const nextAddSliderList = onDeleteToolbar(addToolbarList, moduleSlider)
    setAddToolbarList(nextAddSliderList)
    const nextUnAddSliderList = onAddToolbar(unAddToolbarList, moduleSlider)
    setUnAddToolbarList(nextUnAddSliderList)
    changeResumeToolbarKeys(
      nextAddSliderList.map((s: TSResume.SliderItem) => s.key)
    )
  }

  return (
    <div styleName="slider">
      <MyScrollBox maxHeight={height - 180}>
        {!!addToolbarList.length && (
          <div styleName="module">
            <div styleName="title">
              <span styleName="line" />
              已添加模块
            </div>
            <div styleName="content">
              {addToolbarList.map((addSlider: TSResume.SliderItem) => {
                return (
                  <div
                    styleName="box"
                    key={addSlider.key}
                    onClick={() => {
                      Messager.send(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, {
                        form_name: addSlider.key,
                      })
                    }}
                  >
                    <div styleName="info">
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{addSlider.name}</div>
                        <div styleName="summary">{addSlider.summary}</div>
                      </div>
                      {addSlider.require && <div styleName="tips">必选项</div>}
                      {!addSlider.require && (
                        <div styleName="action">
                          <i
                            styleName="edit"
                            onClick={(e: React.MouseEvent) => {}}
                          />
                          <i
                            styleName="delete"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation && e.stopPropagation()
                              onDeleteSliderAction(addSlider)
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {!!unAddToolbarList.length && (
          <div styleName="module">
            <div styleName="title un-first">
              <span styleName="line" />
              未添加模块
            </div>
            <div styleName="content">
              {unAddToolbarList.map((unAddSlider: TSResume.SliderItem) => {
                return (
                  <div
                    styleName="box"
                    key={unAddSlider.key}
                    onClick={() => onAddSliderAction(unAddSlider)}
                  >
                    <div styleName="info">
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{unAddSlider.name}</div>
                        <div styleName="summary">{unAddSlider.summary}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </MyScrollBox>
    </div>
  )
}

export default ResumeToolbar
