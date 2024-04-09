import { Outlet } from 'react-router-dom'
import Navigation from '../components/navigation'
import Header from '../components/header'
import Footer from '../components/footer'
import { Children } from 'react'

export default function Layout({children}) {
  return (
    <div>
      <Navigation />
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}
