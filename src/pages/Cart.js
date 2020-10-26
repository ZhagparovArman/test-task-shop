import React, {useContext, useState} from 'react'
import { useHistory} from 'react-router-dom'
import '../App.scss'
import {AuthContext} from '../context/AuthContext'
import Modal from '../components/Modal'
import '../App.scss'

export const Cart = ()=>{
    const history = useHistory();
    const {imgUrl} = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenTwo, setIsOpenTwo] = useState(false)
    const [count, setCount] = useState(0);
    
    let localProducts = localStorage.getItem("products");
    if(!localProducts){return <div>Пусто - значит нет денег</div>}
    let allProducts=JSON.parse(localProducts);
    let numberOfProducts = [...new Set(allProducts.map(item => item.uuid))].length;
    const summa = allProducts.map(item => item.price).reduce((prev, next) => prev + next);
    let counts = {};
    allProducts.forEach(function(x) { counts[x.uuid] = (counts[x.uuid] || 0)+1; });
    console.log(counts)

    const checkout = ()=> {
        localStorage.clear();
        history.push('/');
      }

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

    return(
        <div className='cart'>
            <h3>Корзина</h3>
            <div className='cart-content'>
                <div className='cart-left'>
                    
                        {allProducts.map((product, index)=>{
                            return(
                            <div className='cart-prod' key={index}>
                            <div className='productCard'>
                        <button className='sign' onClick={() => setIsOpen(true)}>?</button>
                            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                                <button onClick={() => setIsOpen(false)}>X</button>
                                <h3>{product.hint.title}</h3>
                                <p>{product.hint.description}</p>
                            </Modal>
                                <div className="productCardInfo">
                                    <img src={imgUrl+product.picture} alt='picture'/>
                                    <div>
                                        <h3>{product.name}</h3>
                                        <p><span>Срок доставки</span>/ {product.duration/86400} {product.duration/86400>1? 'дня' : 'день'} </p>
                                        <p>{product.price} тг</p>
                                        <div className="counter">
                                            <button onClick={ () => addProduct(product) }>+</button>
                                            <p>{count}</p>
                                            <button onClick={ ()=> removeProduct(product) }>-</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                    </div>)
                        })}
                    
                </div>

                <div className='cart-right'>
                    <div className='summa'>
                         <h2>ИТОГО</h2>
                         <p>{numberOfProducts} вещи</p>
                        <p>Общая сумма {summa} тг</p>
                        <button onClick={() => setIsOpenTwo(true)}>Оформить</button>
                        <Modal open={isOpenTwo} onClose={() => setIsOpenTwo(false)}>
                                <button onClick={() => setIsOpenTwo(false)}>X</button>
                                <h3>Спасибо за заказ</h3>
                                <p>Отслеживайте статус вашего заказа в профиле</p>
                                <button onClick={checkout}>На главную</button>
                            </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}