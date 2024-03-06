import React, { useEffect, useState } from 'react'
import logo from "../assets/icon_logo.png"
import Rate from "./rate"
import Comparison from './comparison'

export default function Header() {
  return (
    <div className='header_container'>
      <div className='logo_container'>
        <img src={logo} alt='logo type' className='logo_img'/>
        <p className='logo_txt'>Macro Analytics</p>
      </div>
      <Rate />
      <Comparison />
    </div>
  )
}
