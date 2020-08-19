import React from 'react'

export default function signIn(props){
    return (
        <div className='sign-in'>
            <h2 className='header'>Sign In</h2>
            <form>
                <div className='input-box'>
                    <p>username</p>
                    <input className='input' type='text' />
                </div>
                <div  className='input-box'>
                    <p>password</p>
                    <input className='input' type='password'/>
                </div>
                
                
            </form>
        </div>
    )
}