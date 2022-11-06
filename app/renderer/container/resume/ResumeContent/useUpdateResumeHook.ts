import { useSelector, useDispatch } from 'react-redux'
import { setBase } from '../../../store/modules/resume'

/**
 * @description 更新简历信息，这是修改 redux 简历信息的唯一方法
 * @param {string[]} stateKey 关键key，如路径为 [base/username] 表示修改 base 对象下的 username
 * @param {string} stateValue
 */

function useUpdateResumeHook() {
  const updatePersonalHook = useUpdatePersonalHook()
  return <T>(stateKey: string, stateValue: T) => {
    const keys = stateKey.split('/') || []
    if (keys[0]) {
      if (keys[0] === 'base') updatePersonalHook(keys[1], stateValue)
    }
  }
}

/**
 * @description 修改个人信息（base）
 */
function useUpdatePersonalHook() {
  const dispatch = useDispatch()
  const base: TSResume.Base = useSelector((state: any) => state.resume.base)
  return <T>(stateKey: string, stateValue: T) => {
    dispatch(setBase({ ...base, [stateKey]: stateValue }))
  }
}

export default useUpdateResumeHook
