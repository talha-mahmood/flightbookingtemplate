import React from 'react'
import type { FunctionComponent } from "react"
type Props = {
  name: string,
  perce: Number
}
const Offer: FunctionComponent<Props> = ({name,perce}:Props)=> {
  return (
    <div className="offer-card">
      <p className="percent"> <span className="perce">{perce}%</span> <span className="off">Off</span></p>
      <p className="name">{name}</p>
    </div>
  )
}

export default Offer;