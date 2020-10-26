import React, {useContext, useState, useEffect} from 'react'
import '../App.scss'
import {AuthContext} from '../context/AuthContext'
import Modal from './Modal'

export const ProductCard = ({ product }) => {
    const days = product.duration/86400;
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const {imgUrl} = useContext(AuthContext)

   

    const addProduct = (newItem)=>{
        const oldproduct = localStorage.getItem('products') ? localStorage.getItem('products') : "[]";
        const arrayproduct =  JSON.parse(oldproduct);  
        arrayproduct.push(newItem);
        localStorage.setItem('products', JSON.stringify(arrayproduct));
        setCount(count + 1);
    }

    const removeProduct = (removeItem)=>{
        setCount(count > 0 ? count - 1 : count);
        if(count > 0){
        const oldproduct = localStorage.getItem('products') ? localStorage.getItem('products') : "[]";
        const arrayproduct =  JSON.parse(oldproduct); 
        let removeProduct = arrayproduct.find((product)=>{return product.uuid===removeItem.uuid})
        arrayproduct.splice(arrayproduct.indexOf(removeProduct), 1);
        localStorage.setItem('products', JSON.stringify(arrayproduct));
        }
    }

  
  return (
    <div className='productCard'>
        <button className='sign' onClick={() => setIsOpen(true)}>?</button>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <button onClick={() => setIsOpen(false)}>X</button>
                        <h3>{product.hint.title}</h3>
                        <p>{product.hint.description}</p>
                    </Modal>
        <div className="productCardInfo">
            <img src={imgUrl + product.picture} alt='picture'/>
            <div>
                <h3>{product.name}</h3>
                <p><span>Срок доставки</span>/ {days} {days>1? 'дня' : 'день'} </p>
                <p>{product.price} тг</p>
                <div className="counter">
                    <button onClick={ () => addProduct(product) }>+</button>
                    <p>{count}</p>
                    <button onClick={ ()=> removeProduct(product) }>-</button>
                </div>
            </div>
            
        </div>
    </div>
     
  )
}