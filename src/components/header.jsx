import React from 'react'
import Rate from "./rate"
import logoType from "../assets/icons8-results-100.png"

export default function Header() {
  return (
    <div className='header_container'>
      <div className='logo_container'>
        <img src={logoType} alt='Macro Analitycs' className='logo_img'/>
        <p className='logo_txt'>Macro Analitycs</p>
      </div>
      <Rate />
    </div>
  )
}
