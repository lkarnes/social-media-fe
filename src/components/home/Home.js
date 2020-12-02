import React, {useEffect, useState} from 'react'
import SignUp from './SignUp.js'
import SignIn from './SignIn.js'
import Logo3 from '../../images/logo-3.png';
export default function Home(props){
    const [signInOpen, setSignInOpen] = useState(true)
    useEffect(() =>{
        if(localStorage.getItem('token')){
            props.history.push('/feed')
        }
    },[props])
    return (
        <div className='home'>
            <img className ='logo' src={Logo3} alt='logo'/>
            <div className='call-to-action'>
                    {signInOpen?<SignIn  props={props}/>:<SignUp/>}
                    <button className='button-2 toggle-button' onClick={()=>setSignInOpen(!signInOpen)}>{signInOpen?'Go To Sign Up':'Go To Sign In'}</button>
            </div>
            
        </div>
    )
}