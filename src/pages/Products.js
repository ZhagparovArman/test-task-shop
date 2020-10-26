import React, {useCallback, useContext, useEffect, useState} from 'react'
import '../App.scss'
import {useHistory, useLocation} from 'react-router-dom'
import {useHttp} from '../hook/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import { ProductCard } from '../components/ProductCard'



export const Products = () => {
  const history = useHistory();
  const location = useLocation();
  const [products, setProducts] = useState([])
  const {loading, request} = useHttp()
  const {token, url, isAuthenticated} = useContext(AuthContext)

  const fetchProducts = useCallback(async () => {
    try {
      const fetched = await request(`${url}/products/?category=${location.state.detail}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProducts(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    if(isAuthenticated){
    fetchProducts()}
  }, [fetchProducts,isAuthenticated])

  if (loading) {
    return <Loader/>
  }

  return (
    <div className='products'>
      {products.map((product)=>{
         return <ProductCard key={product.uuid} product={product}/>
      })}
    </div>
  )
}