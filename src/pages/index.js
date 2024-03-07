import React from 'react'
import Comparison from '../components/comparison'
import Correlation from '../components/correlation'
import Details from '../components/details'

export default function Main() {
  return (
    <div>
      <Comparison />
      <Correlation />
      <Details/>
    </div>
  )
}
