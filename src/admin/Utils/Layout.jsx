import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-full md:w-64">
        <Sidebar/>
      </div>

      {/* Content */}
      <div className="flex-1 w-full p-3 sm:p-5 md:p-2">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 min-h-[calc(100vh-20px)]">
          {children}
        </div>
      </div>

    </div>
  )
}

export default Layout