import React from 'react';
import Icon from '../../images/user-icon.png'
import UserStats from './UserStats';

function MyProfileHeader(props){
    return (
        <>
            
            <div className='profile-header'>
            
                <img className='user-icon-large profile-picture' src={props.userData.image?props.userData.image: Icon} alt={`${props.userData.first_name}s profile`} />
                <div className='profile-button-menu'>
                    {/* <UserStats id={props.userData.id} LikeToggle={props.toggleLikes}/> */}
                    <button className='edit button-2' onClick={props.toggleEdit}>Edit</button>
                </div>
                <div className='user-data'>
                    <h5>{props.userData.first_name} {props.userData.last_name} aka {props.userData.username}</h5>
                    <p>email: {props.userData.email}</p>   
                </div> 
                
            </div>
        </>
    )
}


export default MyProfileHeader