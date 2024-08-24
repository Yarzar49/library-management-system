import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Navbar from '../../components/Navbar'
import './style.css'

const Layout = () => {
  const location = useLocation();
  return (
    <div>
      <Navbar />
      <SwitchTransition >
          <CSSTransition timeout={200} classNames='fade' key={location.pathname}>
            {/* dynamic router change content */}
            <div className='max-w-6xl mx-auto p-3'>
              <Outlet />
            </div>            
          </CSSTransition>
        </SwitchTransition>
    </div>
  )
}

export default Layout