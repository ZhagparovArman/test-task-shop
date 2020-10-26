import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hook/http.hook'
import {AuthContext} from '../context/AuthContext'
import '../App.scss'


export const AuthModal = ({closeModal}) => {
  const auth = useContext(AuthContext)
  
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  

  useEffect(() => {
    clearError()
  }, [error, clearError])

 

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

 

  const loginHandler = async () => {
    try {
      const data = await request(`${auth.url}/token/`, 'POST', {...form})
      auth.login(data.access)
      closeModal()
    } catch (e) {}
  }

  return (
   
        <div className="form-card">
          <div className="content">
            <p className="title">Войти</p>
            <div>

              <div className="input-field">
                <input
                  placeholder="Логин"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  required
                />
                <label htmlFor="email"></label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  required
                />
                <label htmlFor="email"></label>
              </div>

            </div>
          </div>
          <div className="form-btn">
            <button
              className="btn "
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            
          </div>
          
        </div>
  )
}