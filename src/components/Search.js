import React, {useState, useEffect, useContext, useCallback} from "react";
import {useHistory, useLocation} from 'react-router-dom'
import {useHttp} from '../hook/http.hook'
import {Loader} from '../components/Loader'
import { ProductCard } from '../components/ProductCard'
import {AuthContext} from '../context/AuthContext'



 export const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const {loading, request} = useHttp()
    const {token, url, isAuthenticated} = useContext(AuthContext)

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

  const fetchProds = useCallback(async () => {
    try {
      const fetched = await request(`${url}/products/?search=${searchTerm}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setSearchResults(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    if(isAuthenticated){
    fetchProds()}
  }, [fetchProds,searchTerm])

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}