import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { addFriend, removeFriend } from '../../redux/actions';
import axiosWithAuth from '../../functions/axiosWithAuth'

function FriendButton(props){
    var friends = true
    useEffect(()=>{
        if (props.friendList.some(f =>f['friend_id'] === props.data.id)) {
            friends = true
        }else{
            friends = false
        }
    })
    
    const handleAddFriend = () => {
        props.addFriend(props.data)
        friends = true
        console.log(props)
        axiosWithAuth().post('/friends/add', {friend_id: props.data.id, user_id: props.userData.id, friendship_status:'high'}).then(res =>{
            console.log(res)
        }).catch(err => {
            console.log({err})
        })
    }

    const handleRemoveFriend = () => {
        
        props.removeFriend(props.data.id)
        friends = false
        axiosWithAuth().delete(`/friends/remove/${props.userData.id}/${props.data.id}`).then(res => {
            console.log(res)
        }).catch(err => {
            console.log({err})
        })
    }

    return !friends?(
        <button onClick={handleAddFriend}>Add as Friend</button>
    ):<button onClick={handleRemoveFriend}>Remove as Friend</button>
}

const mapStateToProps = state => ({
    friendList: state.friendList,
    userData: state.userData
})

export default connect(mapStateToProps,{addFriend,removeFriend})(FriendButton)
