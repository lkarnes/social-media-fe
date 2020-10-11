import React from 'react';
import {connect} from 'react-redux';

function FriendList(props){
    return (

        <div className='modal-medium'>
            <button onClick={props.toggle}>X</button>
            {props.friendList.map(friend => (
                <p key={friend.friend_id}>{friend.friend_id}</p>
            ))}
        </div>
        // <div className='friend-list'>
        //     <p>Hellooo!!!!!!!!!!!!!!!!!</p>
        //     
        // </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    friendList: state.friendList
})

export default connect(mapStateToProps)(FriendList)