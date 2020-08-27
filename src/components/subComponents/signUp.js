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
    const handleSubmit = e => {
        e.preventDefault()
        console.log(data)
        delete data['confirm-password']
        console.log(data)
        axios.post('https://social-1.herokuapp.com/api/register', data).then(res =>{
            console.log(res)
            let token = res.data.token
        }
        )
    }
    return (
        <div className='sign-up'>
            <h2 className='header'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
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
                    <span id='light' className='confirm'> </span><input className='input' type='password' name='confirm-password' value={data.confirmPassword} onChange={handleConfirm}/>
                </div>
                <div className='input-box'>
                    <p>first name</p>
                    <input className='input' type='text' name='first_name' onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p>last name</p>
                    <input className='input' type='text' name='last_name' onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p>email</p>
                    <input className='input' type='email' name='email' onChange={handleChange}/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}