/**
 * @desc 荣誉奖励
 * @author cjhw
 */
import React from 'react'
import { useSelector } from 'react-redux'
import '../../../styles/template-one.less'

function Certificate() {
  const certificate: string = useSelector(
    (state: any) => state.resume.certificate
  )
  const certificateList: string[] = useSelector(
    (state: any) => state.resume.certificateList
  )
  return (
    <div styleName="container">
      <p styleName="title">荣誉奖励 Certificate</p>
      <ul styleName="content">
        {certificate &&
          certificateList.length > 0 &&
          certificateList?.map((value: string, index: number) => {
            return <li key={index}>{value}</li>
          })}
      </ul>
    </div>
  )
}

export default Certificate
