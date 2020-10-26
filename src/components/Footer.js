import React from 'react'
import whatsapp from '../assets/whatsapp.png'
import facebook from '../assets/facebook.png'
import youtube from '../assets/youtube.png'
import '../App.scss'

export const Footer = ()=>{
    return(
    <div className="footer">
        <h1>Concept</h1>
        <div>
            <img src={whatsapp} alt="whatsapp" />
            <img src={facebook} alt="facebook" />
            <img src={youtube} alt="youtube" />
        </div>
        <a >+7 (708) 380-70-09</a>
    </div>)
}