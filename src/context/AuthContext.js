import {createContext} from 'react'

function temp() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: temp,
  logout: temp,
  isAuthenticated: false,
  url: "https://api.doover.tech/api",
  imgUrl :'https://api.doover.tech'
})