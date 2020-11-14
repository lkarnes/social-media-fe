import React, {useEffect} from 'react'
import SignUp from './SignUp.js'
import SignIn from './SignIn.js'
import Logo3 from '../../images/logo-3.png';
export default function Home(props){
    useEffect(() =>{
        if(localStorage.getItem('token')){
            props.history.push('/feed')
        }
    },[props])
    return (
        <div className='home'>
            <img className ='logo' src={Logo3} alt='logo'/>
            <div className='call-to-action'>
                
                <div className='box'>
                    <SignUp props={props}/>
                </div>
                <div className='box'>
                    <SignIn  props={props}/>
                </div>
            </div>
            
        </div>
    )
}