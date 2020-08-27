import React, {useState} from 'react'
import axios from 'axios'

export default function SignIn(props){

    const [data, setData] = useState({})

    const handleChange = e => {
        data[e.target.name] = e.target.value
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post('https://social-1.herokuapp.com/api/login', data).then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
        })
    }
    return (
        <div className='sign-in'>
            <h5 className='header'>Sign In</h5>
            <form onSubmit={handleSubmit}>
                <div className='input-box' name='username' value={data.username} onChange={handleChange}>
                    <p>username</p>
                    <input/>
                </div>
                <div  className='input-box' name='password' value={data.password} onChange={handleChange}>
                    <p>password</p>
                    <input/>
                </div>
                <button>Submit</button>
                
            </form>
        </div>
    )
}