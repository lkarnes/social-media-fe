import React, {useEffect} from 'react'
import SignUp from './subComponents/SignUp'
import SignIn from './subComponents/SignIn'
import stockPhoto from '../images/women-on-computer.jpg'
export default function Home(props){
    useEffect(() =>{
        if(localStorage.getItem('token')){
            props.history.push('/feed')
        }
    },[props])
    return (
        <div className='home'>
            <img className='marketing-photo' src={stockPhoto} alt='women on computer Captured by Brooke Cagle'/>
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