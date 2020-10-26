import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { Cart } from './pages/Cart'

import { Main } from './pages/Main'
import { Products } from './pages/Products'


export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <Main/>
        </Route>
        <Route path="/cart" exact>
          <Cart/>
        </Route>
        <Route path="/products">
          <Products/>
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
       <Main/>
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}