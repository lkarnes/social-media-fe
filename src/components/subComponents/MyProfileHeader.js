import React, {useState} from 'react';
import {connect} from 'react-redux'
import Icon from '../../images/user-icon.png'

function MyProfileHeader(props){
    
    return (
        <>
            <div className='profile-header'>
                <img className='user-icon-large' src={props.userData.image?props.userData.image: Icon} alt={`${props.userData.first_name}s profile`} />
                <div className='user-data'>
                    <h5>{props.userData.first_name} {props.userData.last_name} aka {props.userData.username}</h5>
                    <p>email: {props.userData.email}</p>
                    <button onClick={props.toggleFriendList}>FriendsList</button>
                    <button onClick={props.toggleLikes}>Likes</button>
                </div> 
            </div>
        </>
        
    )
}
const mapStateToProps = state => ({
    userData: state.userData,
})

export default connect(mapStateToProps)(MyProfileHeader)