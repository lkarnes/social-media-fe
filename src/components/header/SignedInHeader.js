import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import menu from '../../images/menu-dark.png';
import SearchBar from '../SearchBar';
import Logo3 from '../../images/logo-3.png'

function SignedInHeader(props) {
    const [bool, setBool] = useState(true)
    const handleLogout = () => {
        let item = document.getElementById('dropdown1')
        item.style.display = 'none'
        localStorage.removeItem('token')
    } 
    const toggleDrop = () => {
        let item = document.getElementById('dropdown1')
        if(bool){
            setBool(!bool)
            item.style.display = 'flex'
        }else{
            setBool(!bool)
            item.style.display = 'none'
        }
    }
    return (
    <div className='header'>
        <div className='heading'>
            <img className='logo' src={Logo3} alt=''/>
        </div>
        <SearchBar/>
        <div className='Navigation'>
            <div className='user-card' onClick={toggleDrop}>
                <img className='user-icon-xsmall' src={props.userData.image}  alt=''/>
                <p>{props.userData.first_name} {props.userData.last_name}</p>
                <img className='menu' src={menu} alt='dropdown'/>
            </div>
            <div id='dropdown1' className='NavDropDown'>
                <Link className='link' to='/' onClick={toggleDrop}>Home</Link>
                <Link className='link' to='/myprofile' onClick={toggleDrop} >Profile</Link>
                <Link className='link' onClick={handleLogout} to='/'>Logout</Link>
            </div>

        </div>
    </div>
    )
}

var mapStateToProps = state => ({
    userData: state.userData
})

export default connect(mapStateToProps)(SignedInHeader)