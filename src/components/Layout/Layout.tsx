import { ReactNode } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { useAppSelector } from '../../store/hooks'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

