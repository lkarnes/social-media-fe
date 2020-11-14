import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth';
import Post from '../subComponents/Post';
import FriendButton from './FriendButton';
import UserIcon from '../../images/user-icon.png';

import { addFriend, removeFriend } from '../../redux/actions';

function Profile(props) {
    const [data,setData] = useState({})
    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
        axiosWithAuth().get(`/friends/${props.match.params.id}`).then(res => {
            setData(res.data)
            axiosWithAuth().get(`/posts/${props.match.params.id}/0`).then(res => {
                setPosts(res.data.reverse())
            })
        })   
    },[props])
    
   return (
        <div className='profile'>
            <div className='profile-header'>
                <img className='user-icon-large' src={data.image === null ? UserIcon : data.image} alt={`${data.first_name}s profile`} />
                <h2>{data.first_name} {data.last_name} aka {data.username}</h2>
                <h5>email: {data.email}</h5>
                <FriendButton data={data}/>
            </div>
            
            <div className='post-box'>
                {posts.map(post => (
                <Post key={post.id} data={post}/>
                ))}
                {posts.length >= 15 ? <button>Load More</button>: <></>}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    friendList : state.friendList                                    
})

export default connect(mapStateToProps, {addFriend,removeFriend})(Profile)