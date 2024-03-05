import { Outlet } from 'react-router-dom'
import Navigation from '../components/navigation'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout() {
  return (
    <div>
      <Header />
      <Navigation />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
