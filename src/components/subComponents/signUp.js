import React, {useState} from 'react'
import axios from 'axios'
import Icon from '../../images/user-icon.png'
export default function SignIn(props){
    const [data, setData] = useState({})
    const handleChange = e => {
        data[e.target.name] = e.target.value
        console.log(data)
    }
    const handleConfirm = e => {
        handleChange(e)
        var item = document.getElementById('light')
        console.log(data)
        if (e.target.value === data.password){
            item.style.background = '#63f765'
        }else{
            item.style.background = '#fc4f4c'
        }
    }
    return (
        <div className='sign-up'>
            <h2 className='header'>Sign Up</h2>
            <form>
                <div className='image-input'>
                    <p>profile picture</p>
                    <img src={Icon} width='30px'/>  
                    <input type='file' onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p>username</p>
                    <input className='input' type='text' name='username' value={data.username} onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p>password</p>                    
                    <input className='input' type='password' name='password' value={data.password} onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p>confirm password</p>
                    <input className='input' type='password' name='confirm-password' value={data.confirmPassword} onChange={handleConfirm}/><span id='light' className='confirm'> </span>
                </div>
                <div className='input-box'>
                    <p>first name</p>
                    <input className='input' type='text' onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p>last name</p>
                    <input className='input' type='text' onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p>email</p>
                    <input className='input' type='email' onChange={handleChange}/>
                </div>
                    
            </form>
        </div>
    )
}