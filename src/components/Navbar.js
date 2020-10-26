import React, {useContext, useState, useCallback, useEffect} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {AuthModal} from './AuthModal'
import Modal from './Modal'
import {useHttp} from '../hook/http.hook'
import '../App.scss'
import info from '../assets/info.svg'
import Switch from './Switch'
import {Search} from './Search'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(true)
  const [userInfo, setUserInfo] = useState({})
  const [value, setValue] = useState(true);
  const {request} = useHttp()

  const fetchUserInfo = useCallback(async () => {
    try {
      const fetchedInfo = await request(`${auth.url}/users/me/`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setUserInfo(fetchedInfo)
      setValue(userInfo.settings.notify)
    } catch (e) {}
  }, [auth.token, request])

  const handleToggleInput = useCallback(async () => {
    try {
      await request(`${auth.url}/users/settings/`, 'PUT', {notify : `${value}`}, {
        Authorization: `Bearer ${auth.token}`
      })
      console.log('success note')
      
    } catch (e) { console.log("Error in notify")}
  }, [value])

  useEffect(() => {
    if(auth.isAuthenticated){
    fetchUserInfo()}
  }, [fetchUserInfo,auth.isAuthenticated])

  useEffect(() => {
    if(auth.isAuthenticated){
      handleToggleInput()}
  }, [value])

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const toggleModal = ()=>{
    setIsOpen(false)
  }

  return (
    <nav>
      <div className="nav" style={{ padding: '0 2rem' }}>
        <ul  className="left">
          <li><NavLink to="/">Главная</NavLink></li>
          <li><NavLink to="/cart">Корзина</NavLink></li>
        </ul> 
        <h1>Concept</h1>
        <Search/>
        <div>
            {auth.isAuthenticated?
            <div >
                <div className='exit'>
                    <a onClick={() => setIsOpen(true)}> {userInfo.username} <img src={info}/></a>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                      <button onClick={() => setIsOpen(false)}>X</button>
                      <h4>Профиль {userInfo.username}</h4>
                      <div>
                        Уведомление <Switch isOn={value} handleToggle={() => setValue(!value)}/>
                      </div>
                       <button onClick={logoutHandler}>Выйти</button>
                    </Modal>
                </div>
            </div>:   
            <div>
                <div className='enter'>
                <a onClick={() => setIsOpen(true)}> Войти <img src={info}/></a>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                       <AuthModal closeModal={toggleModal}/>
                    </Modal>
                </div>
            </div>
          }
        </div> 
      </div>
    </nav>
  )
}