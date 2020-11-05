import React from 'react';
import {connect} from 'react-redux'
import Icon from '../../images/user-icon.png'

function MyProfileHeader(props){
    return (
        <>
            <div className='profile-header'>
                <img className='user-icon-large profile-picture' src={props.userData.image?props.userData.image: Icon} alt={`${props.userData.first_name}s profile`} />
                <div className='user-data'>
                    <h5>{props.userData.first_name} {props.userData.last_name} aka {props.userData.username}</h5>
                    <p>email: {props.userData.email}</p>
                    
                    
                </div> 
                <div className='profile-button-menu'>
                    <button className='button-1 friends' onClick={props.toggleFriendList}>Friends</button>
                    <button  className='button-1 likes' onClick={props.toggleLikes}>Likes</button>
                    <button className='edit button-2' onClick={props.toggleEdit}>Edit</button>
                </div>
            </div>
        </>
    )
}


export default MyProfileHeader