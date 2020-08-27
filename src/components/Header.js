import React, {useState} from 'react';
import menu from '../images/menu.png'
import {Link} from 'react-router-dom';

export default function Header(props) {
    const [bool, setBool] = useState(false)
    let toggleDrop = () => {
        let item = document.getElementById('dropdown1')
        if(bool){
            setBool(!bool)
            item.style.display = 'block'
        }else{
            setBool(!bool)
            item.style.display = 'none'
        }
    }
    return (
        <div className='Header'>
            <div className=''>
                <h1>Social-1</h1>
            </div>
            <div className='Navigation'>
                <img className='NavIcon' src={menu} onClick={toggleDrop} />
                <div id='dropdown1' className='NavDropDown'>
                    <Link>Home</Link>
                    <Link>Profile</Link>
                    <Link>Logout</Link>
                </div>
            </div>
        </div>
    )
}