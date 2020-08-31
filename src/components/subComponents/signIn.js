import React, {useState} from 'react'
import axios from 'axios'

export default function SignIn(props){

    const [data] = useState({})

    const handleChange = e => {
        data[e.target.name] = e.target.value
    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(data)
        axios.post('https://social-1.herokuapp.com/api/login', data).then(res => {
            localStorage.setItem('token', res.data.token)
            props.history.push('/feed')
            console.log(props)
        })
    }
    return (
        <div className='sign-in'>
            <h5 className='header'>Sign In</h5>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <p>username</p>
                    <input name='username' value={data.username} onChange={handleChange}/>
                </div>
                <div  className='input-box' >yet
                    <p>password</p>
                    <input name='password' value={data.password} onChange={handleChange}/>
                </div>
                <button>Submit</button>
                
            </form>
        </div>
    )
}