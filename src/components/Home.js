import React, {useEffect} from 'react'
import SignUp from './subComponents/SignUp.js'
import SignIn from './subComponents/SignIn.js'
import stockPhoto from '../images/women-on-computer.jpg';
import Logo3 from '../images/logo-3.png';
export default function Home(props){
    useEffect(() =>{
        if(localStorage.getItem('token')){
            props.history.push('/feed')
        }
    },[props])
    return (
        <div className='home'>
            <img className ='logo' src={Logo3}/>
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