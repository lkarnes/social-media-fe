import React, {useState} from 'react'
import axios from 'axios'
import Icon from '../../images/user-icon.png'
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux'
import {signIn} from '../../redux/actions'
import axiosWithAuth from '../../functions/axiosWithAuth';

function SignUp(props){
    const [data] = useState({})
    var usernameError = React.createRef()
    var formElement = React.useRef()
    const handleSelect = e => {
        e.preventDefault()
        var hiddenInput = document.getElementById('file-input')
        hiddenInput.click()
    }
    const handleUpload = e => {
        const photoBox = document.getElementById('profile-picture')
        if(e.target.value){   
            photoBox.src = URL.createObjectURL(e.target.files[0])
            photoBox.style.display = 'block'
        }
    }
    const handleChange = e => {
        data[e.target.name] = e.target.value
    }
    const handleConfirm = e => {
        var form = new FormData(formElement.current)
        handleChange(e)
        var item = document.getElementById('light')
        if (e.target.value === form.get('password')){
            item.style.background = '#63f765'
        }else{
            item.style.background = '#fc4f4c'
        }
    }
    const handleSubmit = e => {
        var form = new FormData(formElement.current)
        e.preventDefault()
        form.delete('confirm-password')
        //registers user
        axios.post('https://social-1.herokuapp.com/api/register', form).then(res =>{
            localStorage.setItem('token', res.data.token)
            props.signIn(res.data.userData)
            //force follows the official account
            axiosWithAuth().post('/friends/add', { user_id: res.data.id[0],friend_id: 10, friendship_status: 'low'}).then(res => {
                props.props.history.push('/feed')
            }).catch(err => console.log({err}) );
            
        }
        ).catch(err => {
            console.log({err})
            alert('there was an error while creating your account please try to log in and then try to register again')
        })
    }
    return (
        <div className='sign-up'>
            <h5 className=''>Sign Up</h5>
            <form ref={formElement} onSubmit={handleSubmit}>
                <div className='image-input'>
                    <p>Profile Picture</p>
                    <img id='profile-picture'  src={Icon} width='60px' alt='profile'/>  
                    <input id='file-input' type='file' name='image' style={{display: 'none'}} onChange={handleUpload}/>
                    <button className='upload-button' onClick={handleSelect}>Add a Image</button>
                </div>
                <div className='input-box'>
                    <p ref={usernameError} style={{display: 'none'}}>username already taken</p>
                    <p>Username</p>
                    <input className='input' type='text' name='username'/>
                </div>
                <div className='input-box'>
                    <p>Password</p>                    
                    <input className='input' type='password' name='password'/>
                </div>
                <div className='input-box'>
                    <div className='confirm-password'>
                        <p>Confirm Password</p>
                        <span id='light' className='confirm'></span>
                    </div>
                    <input className='input' type='password' name='confirm-password' onChange={handleConfirm}/>
                </div>
                <div className='input-box'>
                    <p>First Name</p>
                    <input className='input' type='text' name='first_name'/>
                </div>
                <div className='input-box'>
                    <p>Last Name</p>
                    <input className='input' type='text' name='last_name'/>
                </div>
                <div className='input-box'>
                    <p>Email</p>
                    <input className='input' type='email' name='email'/>
                </div>
                <button className='button-1 submit' type='submit'>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    feedArray: state.feedArray
})


export default connect(mapStateToProps, {signIn})(SignUp)