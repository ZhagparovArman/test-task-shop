import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hook/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import { CategoryCard } from '../components/CategoryCard'
import '../App.scss'



export const Main = () => {
  const history = useHistory()
  const [categories, setCategories] = useState([])
  const {loading, request} = useHttp()
  const {token, url, isAuthenticated} = useContext(AuthContext)

  const fetchCategories = useCallback(async () => {
    try {
      const fetched = await request(`${url}/products/categories/`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCategories(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    if(isAuthenticated){
    fetchCategories()}
  }, [fetchCategories,isAuthenticated])

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="main">
        <div className='categories'>
          {categories.map((category)=>{
            return <CategoryCard  key={category.uuid} category={category}/>
          })}
        </div>
      {!isAuthenticated && <div className='tempDiv'></div>}
    </div>
  )
}