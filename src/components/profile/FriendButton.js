import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { addFriend, removeFriend } from '../../redux/actions';
import axiosWithAuth from '../../functions/axiosWithAuth'

function FriendButton(props){
    const [friends, setFriends] = useState(null)
    useEffect(()=>{
        if (props.friendList){
            console.log(props.friendList)
            if (props.friendList.some(f =>f['id'] === props.data.id)) {
                setFriends(true)
            }else{
                setFriends(false)
            }
        }  
    }, [setFriends, props.data.id, props.friendList])
    
    const handleAddFriend = () => {
        props.addFriend(props.data)
        setFriends(true)
        axiosWithAuth().post('/friends/add', {friend_id: props.data.id, user_id: props.userData.id, friendship_status:'high'}).then(res =>{
            console.log(res)
        }).catch(err => {
            console.log({err})
        })
    }

    const handleRemoveFriend = () => {
        
        props.removeFriend(props.data.id)
        setFriends(false)
        axiosWithAuth().delete(`/friends/remove/${props.userData.id}/${props.data.id}`).then(res => {
            
        }).catch(err => {
            console.log({err})
        })
    }

    if(friends === null){
        return <div>Loading...</div>
    }else if(friends){
        
        return <button className='button-3 friend-button' onClick={handleRemoveFriend}>UnFollow</button>
    }else{
        console.log(friends)
        return <button className='button-1' onClick={handleAddFriend}>Follow</button>
    }
}

const mapStateToProps = state => ({
    friendList: state.friendList,
    userData: state.userData
})

export default connect(mapStateToProps,{addFriend,removeFriend})(FriendButton)
