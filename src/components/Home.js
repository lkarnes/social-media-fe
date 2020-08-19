import React from 'react'
import SignUp from './subComponents/signUp'
import SignIn from './subComponents/signIn'
export default function Home(props){
    return (
        <div className='home'>
            <div className='call-to-action'>
                <div className='box'>
                    <SignUp/>
                </div>
                <div className='box'>
                    <SignIn/>
                </div>
                
                
            </div>
            
        </div>
    )
}