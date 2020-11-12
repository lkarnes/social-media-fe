import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {signIn} from '../../redux/actions'


function SignIn(props){
    const [data] = useState({})

    const handleChange = e => {
        data[e.target.name] = e.target.value
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post('https://social-1.herokuapp.com/api/login', data).then(res => {
            localStorage.setItem('token', res.data.token)
            props.signIn(res.data.userData)
            props.props.history.push('/feed')
        })
    }
    return (
        <div className='sign-in'>
            <h5 className=''>Sign In</h5>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <p>username</p>
                    <input name='username' value={data.username} onChange={handleChange}/>
                </div>
                <div  className='input-box' >
                    <p>password</p>
                    <input type='password' name='password' value={data.password} onChange={handleChange}/>
                </div>
                <button>Submit</button>
                
            </form>
        </div>
    )
}
const mapStateToProps = state => ({
    userData: state.userData,
    feedArray: state.feedArray
})

export default connect(mapStateToProps, {signIn})(SignIn)
