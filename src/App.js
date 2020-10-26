import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hook/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import { Footer } from './components/Footer'
import './App.scss'


function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const url = "https://api.doover.tech/api"
  const imgUrl = 'https://api.doover.tech'
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, url, imgUrl
    }}>
      <Router>
      <Navbar /> 
        <div className="container">
          {routes}
        </div>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
