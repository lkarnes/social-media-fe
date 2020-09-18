import React, {useState} from 'react'
import axios from 'axios'
import Icon from '../../images/user-icon.png'
import {connect} from 'react-redux'
import {signIn} from '../../redux/actions'

function SignUp(props){
    const [data] = useState({})
    var usernameError = React.createRef()
    const handleChange = e => {
        data[e.target.name] = e.target.value
        console.log(data)
    }
    const handleConfirm = e => {
        handleChange(e)
        var item = document.getElementById('light')
        if (e.target.value === data.password){
            item.style.background = '#63f765'
        }else{
            item.style.background = '#fc4f4c'
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        delete data['confirm-password']
        axios.post('https://social-1.herokuapp.com/api/register', data).then(res =>{
            localStorage.setItem('token', res.data.token)
            props.signIn(res.data.userData)
            props.props.history.push('/feed')
        }
        ).catch(err => {
            console.log(err.response.data.detail)
        })
    }
    return (
        <div className='sign-up'>
            <h5 className='header'>Sign Up</h5>
            <form onSubmit={handleSubmit}>
                <div className='image-input'>
                    <p>profile picture</p>
                    <img src={Icon} width='30px' alt='profile'/>  
                    <input type='file' onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p ref={usernameError} style={{display: 'none'}}>username already taken</p>
                    <p>username</p>
                    <input className='input' type='text' name='username' value={data.username} onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <p>password</p>                    
                    <input className='input' type='password' name='password' value={data.password} onChange={handleChange}/>
                </div>
                <div className='input-box'>
                    <div className='confirm-password'>
                        <p>confirm password</p>
                        <span id='light' className='confirm'></span>
                    </div>
                    <input className='input' type='password' name='confirm-password' value={data.confirmPassword} onChange={handleConfirm}/>
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

const mapStateToProps = state => ({
    userData: state.userData,
    feedArray: state.feedArray
})


export default connect(mapStateToProps, {signIn})(SignUp)