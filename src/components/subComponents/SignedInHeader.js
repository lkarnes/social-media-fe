import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import menu from '../../images/menu.png';
import SearchBar from '../SearchBar';
import Logo3 from '../../images/logo-3.png'

function SignedInHeader(props) {
    const [bool, setBool] = useState(true)
    const handleLogout = () => {
        console.log(props)
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
            <img className='logo' src={Logo3}/>
        </div>
        <SearchBar/>
        <div className='Navigation'>
            <img className='NavIcon' src={menu} onClick={toggleDrop} alt=''/>
            <div id='dropdown1' className='NavDropDown'>
    <p>{props.userData.first_name} {props.userData.last_name}</p>
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