import React, {useState} from 'react';
import menu from '../images/menu.png'


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
                    <p>Home</p>
                    <p>Profile</p>
                    <p>Logout</p>
                </div>
                
            </div>
        </div>
    )
}