import React, {useContext} from 'react'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const CategoryCard = ({ category }) => {
    const {imgUrl} = useContext(AuthContext)
    const history = useHistory();
    const navigateTo = () => history.push({
        pathname: '/products',
        state: { detail: category.uuid }
      });

  
  return (
    <div className="categoryCard" onClick={navigateTo}>
        <img src={imgUrl + category.picture} alt='picture'/>
        <h1>{category.name}</h1>
    </div>
     
  )
}