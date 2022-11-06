/**
 * @desc 简单介绍
 * @author cjhw
 */
import React from 'react'
import { useSelector } from 'react-redux'
import './index.less'

function Synopsis() {
  const base: TSResume.Base = useSelector((state: any) => state.resume.base)
  const work: TSResume.Work = useSelector((state: any) => state.resume.work)
  const evaluation: string = useSelector(
    (state: any) => state.resume.evaluation
  )
  const evaluationList: string[] = useSelector(
    (state: any) => state.resume.evaluationList
  )

  return (
    <div styleName="content">
      {base?.username && <p styleName="name">{base?.username}</p>}
      {work?.job && <p styleName="job">{work?.job}</p>}
      {evaluation && <p styleName="summary">{evaluationList?.join('，')}</p>}
    </div>
  )
}

export default Synopsis
