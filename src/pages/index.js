import React from 'react'
import Comparison from '../components/comparison'
import Correlation from '../components/correlation'
import Details from '../components/details'
import Industrial from '../components/industrial'

export default function Main() {
  return (
    <div>
      <Comparison />
      <Correlation />
      <Details />
      <Industrial />
    </div>
  )
}
