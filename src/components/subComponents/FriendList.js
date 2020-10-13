import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

function FriendList(props){
    return (

        <div className='modal-narrow'>
            <button onClick={props.toggle}>X</button>
            <div className='friend-list'>
                {props.friendList.length > 0 ? props.friendList.map(friend => (
                    <Link className='list-item' to={`/profile/${friend.id}`}>{friend.first_name} {friend.last_name} aka {friend.username}</Link>
                )) : <p> you have no friends</p>}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    friendList: state.friendList
})

export default connect(mapStateToProps)(FriendList)