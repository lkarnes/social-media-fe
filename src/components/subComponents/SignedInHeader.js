import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import menu from '../../images/menu.png'


function SignedInHeader(props) {
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
    <p>{props.userData.first_name} {props.userData.last_name}</p>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
                <button>Logout</button>
            </div>
        </div>
    </div>
    )
}

var mapStateToProps = state => ({
    userData: state.userData
})

export default connect(mapStateToProps)(SignedInHeader)